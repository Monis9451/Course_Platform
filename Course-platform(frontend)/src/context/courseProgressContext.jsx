import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { saveProgress, getUserCourseProgress } from '../api/progressAPI';
import { useAuth } from './authContext';

// Simple debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const CourseProgressContext = createContext();

export const useCourseProgress = () => {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
};

export const CourseProgressProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [courseProgress, setCourseProgress] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [courseData, setCourseData] = useState(null); // Store course data for mapping

  // Debounced save function to prevent too many API calls
  const debouncedSaveProgress = useCallback(
    debounce(async (progressData) => {
      try {
        await saveProgress(progressData);
        console.log('Progress saved successfully');
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    }, 1000), // Wait 1 second after user stops scrolling
    []
  );

  // Helper function to create lesson key from indices
  const createLessonKey = (moduleIndex, lessonIndex) => {
    return `${moduleIndex}-${lessonIndex}`;
  };

  // Helper function to get database IDs from indices
  const getDatabaseIdsFromIndices = (moduleIndex, lessonIndex) => {
    if (!courseData?.modules) return { moduleId: moduleIndex, lessonId: lessonIndex };
    
    const module = courseData.modules[moduleIndex];
    const lesson = module?.lessons?.[lessonIndex];
    
    return {
      moduleId: module?.moduleId || moduleIndex,
      lessonId: lesson?.lessonData?.lessonID || lessonIndex
    };
  };

  // Set course data for mapping (called from TempCourseContent)
  const setCourseDataForMapping = useCallback((data) => {
    setCourseData(data);
  }, []);

  // Load progress for a specific course
  const loadCourseProgress = useCallback(async (courseId) => {
    if (!currentUser?.id || !courseId) return;

    setIsLoading(true);
    setCurrentCourseId(courseId);

    try {
      const response = await getUserCourseProgress(currentUser.id, courseId);
      
      if (response.success && response.data) {
        const progressMap = {};
        const completedLessonsSet = new Set();
        
        // Store raw database progress for later mapping
        const rawDbProgress = {};
        response.data.forEach(progress => {
          const dbKey = `${progress.moduleID}-${progress.lessonID}`;
          rawDbProgress[dbKey] = progress.progressPercentage;
          
          if (progress.progressPercentage >= 95) {
            completedLessonsSet.add(dbKey);
          }
        });

        setCourseProgress(prevProgress => ({
          ...prevProgress,
          [courseId]: {
            rawDbProgress,
            lessonProgress: {},
            completedLessons: new Set()
          }
        }));
      }
    } catch (error) {
      console.error('Error loading course progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?.id]);

  // Save lesson progress (called from TempCourseContent with both indices and database IDs)
  const saveLessonProgress = useCallback((courseId, moduleIndex, lessonIndex, moduleDbId, lessonDbId, progressPercentage) => {
    if (!currentUser?.id || !courseId) return;

    // Update local state immediately using index-based key for UI compatibility
    const indexKey = createLessonKey(moduleIndex, lessonIndex);
    setCourseProgress(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        lessonProgress: {
          ...prev[courseId]?.lessonProgress,
          [indexKey]: progressPercentage
        },
        completedLessons: progressPercentage >= 95 
          ? new Set([...prev[courseId]?.completedLessons || [], indexKey])
          : prev[courseId]?.completedLessons || new Set()
      }
    }));

    // Use database IDs for saving to database
    const finalModuleId = moduleDbId || moduleIndex;
    const finalLessonId = lessonDbId || lessonIndex;

    // Prepare progress data
    const progressData = {
      userID: currentUser.id,
      courseID: parseInt(courseId),
      moduleID: parseInt(finalModuleId),
      lessonID: parseInt(finalLessonId),
      status: progressPercentage >= 95 ? 'completed' : 'in-progress',
      progressPercentage: parseInt(progressPercentage)
    };

    // Save to database with debouncing
    debouncedSaveProgress(progressData);
  }, [currentUser?.id, debouncedSaveProgress]);

  // Mark lesson as completed
  const markLessonCompleted = useCallback((courseId, moduleIndex, lessonIndex, moduleDbId, lessonDbId) => {
    saveLessonProgress(courseId, moduleIndex, lessonIndex, moduleDbId, lessonDbId, 100);
  }, [saveLessonProgress]);

  // Map database progress to UI indices (call this when course data is loaded)
  const mapDatabaseProgressToIndices = useCallback((courseId, courseData) => {
    if (!courseData?.modules || !courseProgress[courseId]?.rawDbProgress) return;

    const { rawDbProgress } = courseProgress[courseId];
    const lessonProgress = {};
    const completedLessons = new Set();

    // Map database progress to index-based keys
    courseData.modules.forEach((module, moduleIndex) => {
      module.lessons?.forEach((lesson, lessonIndex) => {
        const moduleDbId = module.moduleId;
        const lessonDbId = lesson.lessonData?.lessonID;
        
        if (moduleDbId && lessonDbId) {
          const dbKey = `${moduleDbId}-${lessonDbId}`;
          const progressPercentage = rawDbProgress[dbKey];
          
          if (progressPercentage !== undefined) {
            const indexKey = createLessonKey(moduleIndex, lessonIndex);
            lessonProgress[indexKey] = progressPercentage;
            
            if (progressPercentage >= 95) {
              completedLessons.add(indexKey);
            }
          }
        }
      });
    });

    // Update progress with mapped data
    setCourseProgress(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        lessonProgress,
        completedLessons
      }
    }));
  }, [courseProgress]);

  // Get progress for current course
  const getCurrentCourseProgress = () => {
    if (!currentCourseId) return { lessonProgress: {}, completedLessons: new Set() };
    return courseProgress[currentCourseId] || { lessonProgress: {}, completedLessons: new Set() };
  };

  // Get lesson progress percentage
  const getLessonProgress = (moduleId, lessonId) => {
    if (!currentCourseId) return 0;
    const lessonKey = `${moduleId}-${lessonId}`;
    return courseProgress[currentCourseId]?.lessonProgress?.[lessonKey] || 0;
  };

  // Check if lesson is completed
  const isLessonCompleted = (moduleId, lessonId) => {
    if (!currentCourseId) return false;
    const lessonKey = `${moduleId}-${lessonId}`;
    return courseProgress[currentCourseId]?.completedLessons?.has(lessonKey) || false;
  };

  // Calculate overall course progress percentage
  const getCourseCompletionPercentage = (courseData) => {
    if (!currentCourseId || !courseData?.modules) return 0;

    let totalLessons = 0;
    let completedLessons = 0;

    courseData.modules.forEach((module, moduleIndex) => {
      module.lessons?.forEach((lesson, lessonIndex) => {
        totalLessons++;
        if (isLessonCompleted(moduleIndex, lessonIndex)) {
          completedLessons++;
        }
      });
    });

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  // Clear progress for current course
  const clearCourseProgress = () => {
    if (currentCourseId) {
      setCourseProgress(prev => ({
        ...prev,
        [currentCourseId]: { lessonProgress: {}, completedLessons: new Set() }
      }));
    }
  };

  const value = {
    courseProgress,
    isLoading,
    currentCourseId,
    loadCourseProgress,
    saveLessonProgress,
    markLessonCompleted,
    mapDatabaseProgressToIndices,
    getCurrentCourseProgress,
    getLessonProgress,
    isLessonCompleted,
    getCourseCompletionPercentage,
    clearCourseProgress,
    setCourseDataForMapping
  };

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
};

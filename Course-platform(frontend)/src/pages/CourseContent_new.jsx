import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseWithDetails } from '../api/courseAPI';
import WorkshopSidebar from '../components/CourseSidebar';
import DynamicContentRenderer from '../components/DynamicContentRenderer';
import SaveButton from '../components/SaveButton';
import { useUserResponses } from '../context/userResponsesContext';
import { useCourseProgress } from '../context/courseProgressContext';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
  
  .marcellus-font {
    font-family: 'Marcellus', serif;
  }
  
  .marcellus-font * {
    font-family: 'Marcellus', serif !important;
  }
`;

// Default compulsory pages components
const WelcomeComponent = ({ courseTitle }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-primary mb-6">Welcome</h1>
    <div className="bg-cream p-6 rounded-lg">
      <h2 className="text-xl font-medium text-black mb-4">A Note Before We Begin</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Welcome to <strong>{courseTitle}</strong>. This course has been designed to guide you through 
        a transformative learning experience.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Take your time with each module and lesson. This is your journey, and you can progress at 
        your own pace. Each lesson builds upon the previous one, so we recommend following the 
        suggested order.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Remember, real transformation takes time. Be patient and compassionate with yourself 
        throughout this process.
      </p>
    </div>
  </div>
);

const ClosingReflectionsComponent = ({ courseTitle }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-primary mb-6">Closing Reflections</h1>
    <div className="bg-cream p-6 rounded-lg">
      <h2 className="text-xl font-medium text-black mb-4">Congratulations on Your Journey</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Reaching this point in <strong>{courseTitle}</strong> means something important. You've 
        committed to your growth and transformation.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        The work you've done here is just the beginning. The real transformation happens as you 
        integrate these learnings into your daily life.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Take a moment to acknowledge how far you've come. You have the tools now - trust yourself 
        to use them.
      </p>
    </div>
  </div>
);

const YourExperienceComponent = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-primary mb-6">Your Experience</h1>
    <div className="bg-cream p-6 rounded-lg">
      <h2 className="text-xl font-medium text-black mb-4">Reflecting on Your Journey</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Your feedback helps us improve this course for future participants. Please take a moment 
        to reflect on your experience.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-black mb-3">What was most valuable to you?</h3>
          <textarea 
            className="w-full p-4 border border-gray-300 rounded-lg resize-none"
            rows="4"
            placeholder="Share what aspects of the course were most helpful..."
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-black mb-3">How has this course impacted you?</h3>
          <textarea 
            className="w-full p-4 border border-gray-300 rounded-lg resize-none"
            rows="4"
            placeholder="Describe any changes or insights you've experienced..."
          />
        </div>
        
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
          Submit Feedback
        </button>
      </div>
    </div>
  </div>
);

const SupportResourcesComponent = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-primary mb-6">Support Resources</h1>
    <div className="space-y-6">
      <div className="bg-cream p-6 rounded-lg">
        <h2 className="text-xl font-medium text-black mb-4">Continued Care and Resources</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Your healing journey doesn't end with this course. Here are some additional resources 
          and support options to help you continue growing.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium text-black mb-3">Professional Support</h3>
          <p className="text-gray-600 text-sm mb-3">
            If you need additional support, consider reaching out to a qualified therapist or counselor.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Psychology Today - Find therapists in your area</li>
            <li>• National crisis helplines</li>
            <li>• Local mental health services</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium text-black mb-3">Community Support</h3>
          <p className="text-gray-600 text-sm mb-3">
            Connect with others on similar journeys through support groups and communities.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Online support communities</li>
            <li>• Local support groups</li>
            <li>• Peer support networks</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const CourseContent_new = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState({ moduleIndex: 0, lessonIndex: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0); // Track current scroll progress
  
  const { saveLessonResponses, hasUnsavedChanges, getUnsavedChangesCount } = useUserResponses();
  const { 
    loadCourseProgress, 
    saveLessonProgress, 
    saveAllUnsavedProgress,
    hasUnsavedProgressChanges,
    getUnsavedProgressChangesCount,
    markLessonCompleted,
    mapDatabaseProgressToIndices,
    getLessonProgress,
    isLessonCompleted,
    getCurrentCourseProgress,
    setCourseDataForMapping,
    saveOverallCourseProgress,
    loadOverallCourseProgress,
    applyCourseProgressToState
  } = useCourseProgress();
  
  const lessonContentRef = useRef(null);
  const sidebarRef = useRef(null);

  // Calculate overall progress percentage
  const calculateOverallProgress = () => {
    if (!courseData) return 0;
    
    const totalLessons = courseData.modules.reduce((total, module) => total + module.lessons.length, 0);
    const totalPossibleProgress = totalLessons * 100;
    let totalProgress = 0;
    
    const currentProgress = getCurrentCourseProgress();
    const completedLessons = currentProgress.completedLessons || new Set();
    const lessonProgress = currentProgress.lessonProgress || {};
    
    // Add 100% for each completed lesson
    completedLessons.forEach(() => {
      totalProgress += 100;
    });
    
    // Add partial progress for non-completed lessons
    Object.entries(lessonProgress).forEach(([lessonKey, progress]) => {
      if (!completedLessons.has(lessonKey)) {
        totalProgress += progress;
      }
    });
    
    return Math.min(100, Math.round((totalProgress / totalPossibleProgress) * 100));
  };

  // Handle lesson completion toggling from sidebar
  const handleLessonCompletionToggle = (moduleIndex, lessonIndex) => {
    const lessonKey = `${moduleIndex}-${lessonIndex}`;
    const currentProgress = getCurrentCourseProgress();
    const completedLessons = new Set(currentProgress.completedLessons || new Set());
    
    if (completedLessons.has(lessonKey)) {
      // Mark as incomplete (remove from completed lessons and set progress to 0)
      completedLessons.delete(lessonKey);
      saveLessonProgress(id, moduleIndex, lessonIndex, moduleIndex, lessonIndex, 0);
    } else {
      // Mark as complete (add to completed lessons and set progress to 100)
      completedLessons.add(lessonKey);
      saveLessonProgress(id, moduleIndex, lessonIndex, moduleIndex, lessonIndex, 100);
    }
  };

  // Get current lesson data for tracking
  const getCurrentLessonData = () => {
    if (!courseData) return null;
    const { moduleIndex, lessonIndex } = selectedLesson;
    const currentModule = courseData.modules[moduleIndex];
    const currentLesson = currentModule?.lessons[lessonIndex];
    return { currentModule, currentLesson, moduleIndex, lessonIndex };
  };

  // Check if there are any unsaved changes (progress or responses)
  const hasAnyUnsavedChanges = () => {
    const lessonData = getCurrentLessonData();
    if (!lessonData) return false;
    
    const { currentLesson } = lessonData;
    const lessonId = currentLesson?.lessonData?.lessonID;
    
    // Check for unsaved responses in current lesson
    const hasUnsavedResponses = lessonId ? hasUnsavedChanges(lessonId) : false;
    
    // Check for unsaved progress changes in current course
    const hasUnsavedProgress = hasUnsavedProgressChanges(id);
    
    return hasUnsavedResponses || hasUnsavedProgress;
  };

  // Get counts of unsaved changes
  const getUnsavedChangesCounts = () => {
    const lessonData = getCurrentLessonData();
    if (!lessonData) return { progressCount: 0, responseCount: 0 };
    
    const { currentLesson } = lessonData;
    const lessonId = currentLesson?.lessonData?.lessonID;
    
    const responseCount = lessonId ? getUnsavedChangesCount(lessonId) : 0;
    const progressCount = getUnsavedProgressChangesCount(id);
    
    return { progressCount, responseCount };
  };

  // Save all unsaved changes (both progress and responses)
  const saveAllChanges = async () => {
    const lessonData = getCurrentLessonData();
    if (!lessonData) return;
    
    const { currentLesson } = lessonData;
    const lessonId = currentLesson?.lessonData?.lessonID;
    
    try {
      // Save progress changes (individual lesson progress)
      if (hasUnsavedProgressChanges(id)) {
        await saveAllUnsavedProgress(id);
        toast.success('Progress saved successfully!');
      }
      
      // Save response changes for current lesson
      if (lessonId && hasUnsavedChanges(lessonId)) {
        await saveLessonResponses(lessonId);
        toast.success('Responses saved successfully!');
      }

      // Save overall course progress and lesson completion status
      const currentProgress = getCurrentCourseProgress();
      const overallProgressPercentage = calculateOverallProgress();
      const completedLessonsArray = Array.from(currentProgress.completedLessons || new Set());
      const lessonProgressObj = currentProgress.lessonProgress || {};
      
      // Get current lesson info for last accessed lesson
      const lastAccessedLesson = {
        moduleIndex: selectedLesson.moduleIndex,
        lessonIndex: selectedLesson.lessonIndex
      };

      await saveOverallCourseProgress(
        id, 
        overallProgressPercentage, 
        completedLessonsArray, 
        lessonProgressObj, 
        lastAccessedLesson
      );
      
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Failed to save changes. Please try again.');
      throw error;
    }
  };

  // Helper function to handle navigation
  const handleNavigateWithSave = async (path) => {
    navigate(path);
  };

  // Fetch course data from database
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        
        const course = await getCourseWithDetails(id);
        
        if (!course) {
          throw new Error('Course not found');
        }

        // Transform the database course data to match the expected format
        const transformedCourse = transformCourseData(course);
        setCourseData(transformedCourse);
        
        // Set course data for progress mapping
        setCourseDataForMapping(transformedCourse);
        
        // Load user's progress for this course
        if (currentUser?.id) {
          await loadCourseProgress(id);
          // Map database progress to indices after course data is available
          setTimeout(() => mapDatabaseProgressToIndices(id, transformedCourse), 100);
          
          // Load overall course progress and apply to state
          setTimeout(async () => {
            const overallProgress = await loadOverallCourseProgress(id);
            
            if (overallProgress) {
              applyCourseProgressToState(id, overallProgress);
              
              // Set the last accessed lesson if available
              if (overallProgress.last_accessed_lesson) {
                setSelectedLesson({
                  moduleIndex: overallProgress.last_accessed_lesson.moduleIndex || 0,
                  lessonIndex: overallProgress.last_accessed_lesson.lessonIndex || 0
                });
              }
            }
          }, 200);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, currentUser?.id]); // Removed function dependencies to prevent infinite loop

  const transformCourseData = (dbCourse) => {
    // Create modules array with compulsory pages and database modules
    const modules = [
      // Welcome page (always first)
      {
        title: "Welcome",
        description: "A Note Before We Begin",
        lessons: [
          { 
            title: "A Note Before We Begin", 
            component: () => <WelcomeComponent courseTitle={dbCourse.title} />
          }
        ]
      }
    ];

    // Add database modules
    if (dbCourse.modules && dbCourse.modules.length > 0) {
      dbCourse.modules
        .sort((a, b) => a.order - b.order)
        .forEach(module => {
          const lessons = module.lessons || [];
          const sortedLessons = lessons
            .sort((a, b) => a.order - b.order)
            .map(lesson => ({
              title: lesson.title,
              icon: lesson.icon,
              lessonData: lesson, // Pass the full lesson data
              component: () => <DynamicContentRenderer 
                content={lesson.content} 
                lessonId={lesson.lessonID} 
                lesson={lesson} 
              />
            }));

          if (sortedLessons.length > 0) {
            modules.push({
              title: module.title,
              description: module.description,
              moduleId: module.moduleID, // Add module ID for progress tracking
              lessons: sortedLessons
            });
          }
        });
    }

    // Add compulsory closing pages
    modules.push(
      {
        title: "Closing Reflections",
        description: "Reaching this point means something important",
        lessons: [
          { 
            title: "Closing Reflections", 
            component: () => <ClosingReflectionsComponent courseTitle={dbCourse.title} />
          }
        ]
      },
      {
        title: "Your Experience",
        description: "Reflecting on Your Journey",
        lessons: [
          { 
            title: "Reflecting on Your Experience", 
            component: YourExperienceComponent
          }
        ]
      },
      {
        title: "Support Resources",
        description: "Continued Care and Resources",
        lessons: [
          { 
            title: "Ongoing Support", 
            component: SupportResourcesComponent
          }
        ]
      }
    );

    return {
      title: dbCourse.title,
      description: dbCourse.description,
      modules
    };
  };

  const handleLessonSelect = (moduleIndex, lessonIndex) => {
    if (selectedLesson.moduleIndex !== moduleIndex || selectedLesson.lessonIndex !== lessonIndex) {
      setSelectedLesson({ moduleIndex, lessonIndex });
      setIsSidebarOpen(false);
      
      if (lessonContentRef.current) {
        lessonContentRef.current.scrollTop = 0;
      }
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const goToPreviousLesson = () => {
    const { moduleIndex, lessonIndex } = selectedLesson;
    
    if (lessonIndex > 0) {
      setSelectedLesson({ moduleIndex, lessonIndex: lessonIndex - 1 });
    } else if (moduleIndex > 0) {
      const prevModule = courseData.modules[moduleIndex - 1];
      setSelectedLesson({ moduleIndex: moduleIndex - 1, lessonIndex: prevModule.lessons.length - 1 });
    }
    
    if (lessonContentRef.current) {
      lessonContentRef.current.scrollTop = 0;
    }
  };

  const completeAndContinue = () => {
    const { moduleIndex, lessonIndex } = selectedLesson;
    
    // Get current module and lesson from courseData to get IDs
    const currentModule = courseData.modules[moduleIndex];
    const currentLesson = currentModule.lessons[lessonIndex];
    
    // Mark lesson as completed in the database
    if (currentLesson?.lessonData) {
      markLessonCompleted(id, moduleIndex, lessonIndex, currentModule.moduleId, currentLesson.lessonData.lessonID);
    }
    
    // Navigate to next lesson
    if (lessonIndex < currentModule.lessons.length - 1) {
      setSelectedLesson({ moduleIndex, lessonIndex: lessonIndex + 1 });
    } else if (moduleIndex < courseData.modules.length - 1) {
      setSelectedLesson({ moduleIndex: moduleIndex + 1, lessonIndex: 0 });
    }
    
    if (lessonContentRef.current) {
      lessonContentRef.current.scrollTop = 0;
    }
  };

  const isFirstLesson = selectedLesson.moduleIndex === 0 && selectedLesson.lessonIndex === 0;
  const isLastLesson = courseData && selectedLesson.moduleIndex === courseData.modules.length - 1 && 
                      selectedLesson.lessonIndex === courseData.modules[courseData.modules.length - 1].lessons.length - 1;

  // Get current lesson ID for saving responses
  const getCurrentLessonId = () => {
    if (!courseData) return null;
    const currentModule = courseData.modules[selectedLesson.moduleIndex];
    const currentLesson = currentModule?.lessons[selectedLesson.lessonIndex];
    return currentLesson?.lessonData?.lessonID || null;
  };

  // Auto-save is now handled by individual components

  const getCurrentLessonComponent = () => {
    if (!courseData) return null;
    
    const currentModule = courseData.modules[selectedLesson.moduleIndex];
    const currentLesson = currentModule?.lessons[selectedLesson.lessonIndex];
    const LessonComponent = currentLesson?.component;
    
    return (
      <div className="flex flex-col h-full">
        <div className="bg-white border-b border-gray-200">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center p-4">
            <button
              onClick={goToPreviousLesson}
              disabled={isFirstLesson}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                isFirstLesson 
                  ? 'text-[#6B7280] cursor-not-allowed' 
                  : 'text-[#6B7280] hover:bg-gray-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous Lecture</span>
              <span className="sm:hidden">Previous</span>
            </button>

            {/* Auto-save handles saving automatically - no manual save button needed */}

            <button
              onClick={completeAndContinue}
              disabled={isLastLesson}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                isLastLesson
                  ? 'text-[#6B7280] cursor-not-allowed'
                  : 'text-[#6B7280] hover:bg-primary-dark'
              }`}
            >
              <span className="hidden sm:inline">Complete and Continue</span>
              <span className="sm:hidden">Complete</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Hamburger Menu - Only visible on mobile */}
          <div className="md:hidden px-4 pb-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors w-full justify-center py-2 border border-primary rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-sm font-medium">Course Menu</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto" ref={lessonContentRef}>
          <div className="pb-48 px-4 sm:px-8 md:px-16 lg:px-24">
            {LessonComponent ? <LessonComponent /> : (
              <div className="p-4 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Welcome to {courseData.title}
                </h1>
                <p className="text-base sm:text-lg text-gray-600">
                  Select a lesson from the sidebar to begin your learning journey.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Progress tracking effect
  useEffect(() => {
    if (!lessonContentRef.current || !courseData || !currentUser?.id) return;
    
    // Reset scroll progress when lesson changes
    setCurrentScrollProgress(0);
    
    const scrollContainer = lessonContentRef.current;
    const { moduleIndex, lessonIndex } = selectedLesson;
    
    const calculateScrollProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const scrollableDistance = scrollHeight - clientHeight;
      if (scrollableDistance <= 0) return;
      
      const scrollPercentage = Math.min(100, Math.ceil((scrollTop / scrollableDistance) * 100));
      
      // Update current scroll progress state for auto-save functionality
      setCurrentScrollProgress(scrollPercentage);
      
      // Get current module and lesson data
      const currentModule = courseData.modules[moduleIndex];
      const currentLesson = currentModule?.lessons[lessonIndex];
      
      // Only save progress for lessons that have actual lesson data (not default pages)
      if (currentLesson?.lessonData && scrollPercentage > 0) {
        const moduleDbId = currentModule.moduleId;
        const lessonDbId = currentLesson.lessonData.lessonID;
        
        // Save progress to database (debounced)
        saveLessonProgress(id, moduleIndex, lessonIndex, moduleDbId, lessonDbId, scrollPercentage);
      }
    };
    
    scrollContainer.addEventListener('scroll', calculateScrollProgress);
    
    return () => {
      scrollContainer.removeEventListener('scroll', calculateScrollProgress);
    };
  }, [selectedLesson, courseData, currentUser?.id, id, saveLessonProgress, setCourseDataForMapping, mapDatabaseProgressToIndices]);

  // Loading state
  if (loading) {
    return (
      <>
        <style>{fontStyle}</style>
        <div className="flex flex-col h-screen bg-gray-50 marcellus-font">
          <div className="bg-primary text-white px-4 sm:px-6 py-4 sm:py-8 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <button 
                  onClick={() => handleNavigateWithSave('/courses')}
                  className="flex items-center gap-1 sm:gap-2 text-white hover:text-orange-200 transition-colors"
                >
                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm sm:text-base">Back</span>
                </button>
              </div>
              
              <h1 className="text-sm sm:text-xl font-semibold absolute left-1/2 transform -translate-x-1/2 text-center max-w-[60%] truncate">
                Loading Course...
              </h1>
              
              <div></div>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <style>{fontStyle}</style>
        <div className="flex flex-col h-screen bg-gray-50 marcellus-font">
          <div className="bg-primary text-white px-4 sm:px-6 py-4 sm:py-8 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <button 
                  onClick={() => handleNavigateWithSave('/courses')}
                  className="flex items-center gap-1 sm:gap-2 text-white hover:text-orange-200 transition-colors"
                >
                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm sm:text-base">Back</span>
                </button>
              </div>
              
              <h1 className="text-sm sm:text-xl font-semibold absolute left-1/2 transform -translate-x-1/2 text-center max-w-[60%] truncate">
                Error Loading Course
              </h1>
              
              <div></div>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
              <p className="text-gray-600 mb-8">{error}</p>
              <button
                onClick={() => handleNavigateWithSave('/courses')}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Go Back to Course List
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{fontStyle}</style>
      
      <div className="flex flex-col h-screen bg-gray-50 marcellus-font">
        <div className="bg-primary text-white px-4 sm:px-6 py-4 sm:py-8 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => handleNavigateWithSave('/courses')}
                className="flex items-center gap-1 sm:gap-2 text-white hover:text-orange-200 transition-colors"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm sm:text-base">Back</span>
              </button>
            </div>
            
            <h1 className="text-sm sm:text-xl font-semibold absolute left-1/2 transform -translate-x-1/2 text-center max-w-[60%] truncate">
              {courseData?.title}
            </h1>
            
            <div></div>
          </div>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar-track {
            margin-bottom: 80px;
          }
        `}</style>
        
        <div className="flex flex-1 overflow-hidden relative">
          {/* Desktop Sidebar */}
          <div className="hidden md:block sidebar-container h-full" style={{ minHeight: "calc(100vh - 120px)" }}>
            <WorkshopSidebar 
              courseData={courseData}
              selectedLesson={selectedLesson}
              onLessonSelect={handleLessonSelect}
              completedLessons={getCurrentCourseProgress().completedLessons}
              setCompletedLessons={handleLessonCompletionToggle}
              lessonProgress={getCurrentCourseProgress().lessonProgress}
            />
          </div>

          {/* Mobile Sidebar Overlay */}
          <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-white bg-opacity-75"
              onClick={() => setIsSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <div 
              ref={sidebarRef}
              className={`absolute left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
              style={{ minHeight: "100vh" }}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary">
                <h2 className="text-white font-semibold">Course Content</h2>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-white hover:text-orange-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto" style={{ height: "calc(100vh - 80px)" }}>
                <WorkshopSidebar 
                  courseData={courseData}
                  selectedLesson={selectedLesson}
                  onLessonSelect={handleLessonSelect}
                  completedLessons={getCurrentCourseProgress().completedLessons}
                  setCompletedLessons={handleLessonCompletionToggle}
                  lessonProgress={getCurrentCourseProgress().lessonProgress}
                />
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {getCurrentLessonComponent()}
          </div>
        </div>
        
        {/* Save Button */}
        <SaveButton
          onSave={saveAllChanges}
          hasChanges={hasAnyUnsavedChanges()}
          progressChangesCount={getUnsavedChangesCounts().progressCount}
          responseChangesCount={getUnsavedChangesCounts().responseCount}
        />
      </div>
    </>
  );
};

export default CourseContent_new;

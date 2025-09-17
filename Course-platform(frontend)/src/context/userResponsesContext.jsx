import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './authContext';
import { 
  getAllUserResponses, 
  getUserResponsesByLesson, 
  saveUserResponse as saveUserResponseAPI,
  batchSaveUserResponses
} from '../api/userResponseAPI';

const UserResponsesContext = createContext();

export const useUserResponses = () => {
  const context = useContext(UserResponsesContext);
  if (!context) {
    throw new Error('useUserResponses must be used within a UserResponsesProvider');
  }
  return context;
};

export const UserResponsesProvider = ({ children }) => {
  const { currentUser, authToken } = useAuth();
  const [userResponses, setUserResponses] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState({}); // Track unsaved changes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all user responses when user logs in
  useEffect(() => {
    if (currentUser && authToken) {
      loadAllUserResponses();
    } else {
      setUserResponses({});
      setUnsavedChanges({});
    }
  }, [currentUser, authToken]);

  // Load all user responses from API
  const loadAllUserResponses = async () => {
    if (!currentUser || !authToken) return;
    
    setLoading(true);
    setError(null);
    try {
      const responses = await getAllUserResponses(authToken);
      setUserResponses(responses);
      setUnsavedChanges({}); // Clear unsaved changes after loading
    } catch (err) {
      console.error('Error loading user responses:', err);
      setError(err.message);
      // Fallback to localStorage if API fails
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  // Load responses for a specific lesson
  const loadLessonResponses = async (lessonId) => {
    if (!currentUser || !lessonId) return;
    
    try {
      const responses = await getUserResponsesByLesson(lessonId);
      setUserResponses(prev => ({
        ...prev,
        [lessonId]: responses
      }));
      
      // Clear unsaved changes for this lesson since we just loaded fresh data
      setUnsavedChanges(prev => {
        const newUnsaved = { ...prev };
        delete newUnsaved[lessonId];
        return newUnsaved;
      });
    } catch (err) {
      console.error('Error loading lesson responses:', err);
      setError(err.message);
    }
  };

  // Fallback to localStorage (for when API is not available)
  const loadFromLocalStorage = () => {
    if (!currentUser) return;
    
    try {
      const savedResponses = localStorage.getItem(`userResponses_${currentUser.id}`);
      if (savedResponses) {
        setUserResponses(JSON.parse(savedResponses));
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err);
    }
  };

  // Save to localStorage as backup
  const saveToLocalStorage = (responses) => {
    if (!currentUser) return;
    
    try {
      localStorage.setItem(`userResponses_${currentUser.id}`, JSON.stringify(responses));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }
  };

  // Update response locally (not saved to API until saveResponse is called)
  const updateResponse = (lessonId, componentId, responseData) => {
    const newResponses = {
      ...userResponses,
      [lessonId]: {
        ...userResponses[lessonId],
        [componentId]: {
          ...userResponses[lessonId]?.[componentId],
          ...responseData,
          updatedAt: new Date().toISOString()
        }
      }
    };
    
    setUserResponses(newResponses);
    saveToLocalStorage(newResponses);
    
    // Mark as unsaved
    setUnsavedChanges(prev => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        [componentId]: true
      }
    }));
  };

  // Save a single response to API
  const saveResponse = async (lessonId, componentId, componentType, responseData) => {
    if (!currentUser || !authToken) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);
    
    try {
      const savedResponse = await saveUserResponseAPI(lessonId, componentId, componentType, responseData, authToken);
      
      // Update local state with saved response
      const newResponses = {
        ...userResponses,
        [lessonId]: {
          ...userResponses[lessonId],
          [componentId]: savedResponse
        }
      };
      
      setUserResponses(newResponses);
      saveToLocalStorage(newResponses);
      
      // Remove from unsaved changes
      setUnsavedChanges(prev => {
        const newUnsaved = { ...prev };
        if (newUnsaved[lessonId]) {
          delete newUnsaved[lessonId][componentId];
          if (Object.keys(newUnsaved[lessonId]).length === 0) {
            delete newUnsaved[lessonId];
          }
        }
        return newUnsaved;
      });
      
      return savedResponse;
    } catch (err) {
      console.error('Error saving response:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Save all unsaved changes for a lesson
  const saveLessonResponses = async (lessonId) => {
    if (!currentUser || !authToken || !unsavedChanges[lessonId]) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const responsesToSave = [];
      const lessonUnsaved = unsavedChanges[lessonId];
      
      Object.keys(lessonUnsaved).forEach(componentId => {
        if (lessonUnsaved[componentId] && userResponses[lessonId]?.[componentId]) {
          const responseData = userResponses[lessonId][componentId];
          responsesToSave.push({
            componentId,
            componentType: responseData.type || 'unknown',
            responseData
          });
        }
      });

      if (responsesToSave.length > 0) {
        const savedResponses = await batchSaveUserResponses(lessonId, responsesToSave, authToken);
        
        // Update local state with saved responses
        const newResponses = { ...userResponses };
        savedResponses.forEach((response, index) => {
          const componentId = responsesToSave[index].componentId;
          newResponses[lessonId][componentId] = response;
        });
        
        setUserResponses(newResponses);
        saveToLocalStorage(newResponses);
        
        // Clear unsaved changes for this lesson
        setUnsavedChanges(prev => {
          const newUnsaved = { ...prev };
          delete newUnsaved[lessonId];
          return newUnsaved;
        });
      }
    } catch (err) {
      console.error('Error saving lesson responses:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get a specific response
  const getResponse = (lessonId, componentId) => {
    return userResponses[lessonId]?.[componentId] || {};
  };

  // Check if a component has been completed
  const isComponentCompleted = (lessonId, componentId) => {
    const response = getResponse(lessonId, componentId);
    return response.completed || false;
  };

  // Mark a component as completed
  const markComponentCompleted = (lessonId, componentId, completed = true) => {
    updateResponse(lessonId, componentId, { completed });
  };

  // Get lesson progress (percentage of completed components)
  const getLessonProgress = (lessonId, totalComponents) => {
    if (!lessonId || !userResponses[lessonId] || !totalComponents) return 0;
    
    const completedCount = Object.values(userResponses[lessonId]).filter(
      response => response.completed
    ).length;
    
    return Math.round((completedCount / totalComponents) * 100);
  };

  // Check if there are unsaved changes for a lesson
  const hasUnsavedChanges = (lessonId) => {
    return !!unsavedChanges[lessonId] && Object.keys(unsavedChanges[lessonId]).length > 0;
  };

  // Get count of unsaved changes for a lesson
  const getUnsavedChangesCount = (lessonId) => {
    if (!unsavedChanges[lessonId]) return 0;
    return Object.values(unsavedChanges[lessonId]).filter(Boolean).length;
  };

  // Clear all responses (for testing or reset)
  const clearAllResponses = () => {
    if (currentUser) {
      localStorage.removeItem(`userResponses_${currentUser.id}`);
      setUserResponses({});
      setUnsavedChanges({});
    }
  };

  const value = {
    userResponses,
    unsavedChanges,
    loading,
    error,
    updateResponse,
    saveResponse,
    saveLessonResponses,
    getResponse,
    isComponentCompleted,
    markComponentCompleted,
    getLessonProgress,
    hasUnsavedChanges,
    getUnsavedChangesCount,
    loadLessonResponses,
    loadAllUserResponses,
    clearAllResponses
  };

  return (
    <UserResponsesContext.Provider value={value}>
      {children}
    </UserResponsesContext.Provider>
  );
};

export default UserResponsesContext;

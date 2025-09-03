import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';

const UserProgressContext = createContext();

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};

export const UserProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [userResponses, setUserResponses] = useState({});
  const [loading, setLoading] = useState(false);

  // Load user responses from localStorage (or API in future)
  useEffect(() => {
    if (user) {
      const savedResponses = localStorage.getItem(`userResponses_${user.id}`);
      if (savedResponses) {
        try {
          setUserResponses(JSON.parse(savedResponses));
        } catch (error) {
          console.error('Error loading user responses:', error);
        }
      }
    }
  }, [user]);

  // Save user responses to localStorage (or API in future)
  const saveUserResponses = (responses) => {
    if (user) {
      localStorage.setItem(`userResponses_${user.id}`, JSON.stringify(responses));
      setUserResponses(responses);
    }
  };

  // Update a specific response
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
    
    saveUserResponses(newResponses);
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

  // Clear all responses (for testing or reset)
  const clearAllResponses = () => {
    if (user) {
      localStorage.removeItem(`userResponses_${user.id}`);
      setUserResponses({});
    }
  };

  const value = {
    userResponses,
    loading,
    updateResponse,
    getResponse,
    isComponentCompleted,
    markComponentCompleted,
    getLessonProgress,
    clearAllResponses,
    saveUserResponses
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContext;

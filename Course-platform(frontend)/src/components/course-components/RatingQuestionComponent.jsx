import React, { useState, useEffect, useCallback } from 'react';
import { useUserResponses } from '../../context/userResponsesContext';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';

const RatingQuestionComponent = ({ 
  data, 
  isEditMode = false, 
  onUpdate, 
  lessonId = null, 
  componentId = null, 
  isHalfWidth = false, 
  ...props 
}) => {
  // Handle different ways data might be passed
  const actualData = data || props || {};
  const displayTitle = actualData.title || 'Rating Questions';
  const displayDescription = actualData.description || '';
  const displayQuestions = actualData.questions || [
    'How stressed do you feel right now?',
    'How confident are you in managing your emotions?'
  ];

  const { getResponse, updateResponse, saveResponse, hasUnsavedChanges, loading } = useUserResponses();
  const { currentUser } = useAuth();
  
  // Get saved responses when in view mode
  const [userRatings, setUserRatings] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveTimeoutId, setAutoSaveTimeoutId] = useState(null);

  useEffect(() => {
    if (!isEditMode && lessonId && componentId) {
      const savedResponse = getResponse(lessonId, componentId);
      setUserRatings(savedResponse.ratings || {});
    }
  }, [lessonId, componentId, isEditMode, getResponse]);

  // Auto-save functionality with debouncing
  const debouncedAutoSave = useCallback(async () => {
    if (!lessonId || !componentId || isEditMode || !hasUnsavedChanges(lessonId) || !currentUser) return;
    
    try {
      setIsSaving(true);
      const responseData = {
        ratings: userRatings,
        type: 'rating_questions',
        completed: Object.keys(userRatings).length === displayQuestions.length
      };
      
      await saveResponse(lessonId, componentId, 'rating_questions', responseData);
    } catch (error) {
      console.error('Auto-save failed:', error);
      if (currentUser) {
        toast.error('Failed to save your progress automatically');
      }
    } finally {
      setIsSaving(false);
    }
  }, [lessonId, componentId, isEditMode, userRatings, displayQuestions, saveResponse, hasUnsavedChanges, currentUser]);

  // Trigger auto-save after user interaction (immediate for ratings)
  useEffect(() => {
    if (autoSaveTimeoutId) {
      clearTimeout(autoSaveTimeoutId);
    }
    
    if (!isEditMode && lessonId && componentId && hasUnsavedChanges(lessonId) && currentUser) {
      const timeoutId = setTimeout(() => {
        debouncedAutoSave();
      }, 1000); // 1 second delay for ratings
      
      setAutoSaveTimeoutId(timeoutId);
    }
    
    return () => {
      if (autoSaveTimeoutId) {
        clearTimeout(autoSaveTimeoutId);
      }
    };
  }, [userRatings, debouncedAutoSave, lessonId, componentId, isEditMode, hasUnsavedChanges, autoSaveTimeoutId]);

  const handleRatingChange = (questionIndex, rating) => {
    if (isEditMode) {
      // Edit mode - if needed for editing functionality
      return;
    } else {
      // View mode - save user response locally (not to API yet)
      const newRatings = { ...userRatings, [questionIndex]: parseInt(rating) };
      setUserRatings(newRatings);
      
      if (lessonId && componentId) {
        updateResponse(lessonId, componentId, { 
          ratings: newRatings,
          type: 'rating_questions',
          completed: Object.keys(newRatings).length === displayQuestions.length
        });
      }
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-white border border-gray-200 p-5 rounded-lg">
        <h4 className="font-medium mb-3 text-[#bd6334]">{displayTitle}</h4>
        {displayDescription && (
          <p className="text-gray-700 mb-4">{displayDescription}</p>
        )}
        
        <div className="space-y-6">
          {displayQuestions.map((question, index) => (
            <div key={index} className="space-y-3">
              <div>
                <p className="text-gray-700 mb-3">
                  {index + 1}. {question}
                </p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input 
                        type="radio" 
                        name={`question-${lessonId}-${componentId}-${index}`} 
                        value={num} 
                        checked={userRatings[index] === num}
                        onChange={(e) => handleRatingChange(index, e.target.value)}
                        className="mr-1 accent-[#bd6334]" 
                      />
                      <label className="text-sm">{num}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingQuestionComponent;

import React, { useState, useEffect, useCallback } from 'react';
import { useUserResponses } from '../../context/userResponsesContext';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';

const ExerciseBox = ({ data, isEditMode = false, onUpdate, lessonId = null, componentId = null }) => {
  const { title, situation, questions = [{ question: '', placeholder: '' }] } = data;
  const { getResponse, updateResponse, saveResponse, hasUnsavedChanges, loading } = useUserResponses();
  const { currentUser } = useAuth();
  
  // Get saved responses when in view mode
  const [userAnswers, setUserAnswers] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveTimeoutId, setAutoSaveTimeoutId] = useState(null);

  useEffect(() => {
    if (!isEditMode && lessonId && componentId) {
      const savedResponse = getResponse(lessonId, componentId);
      setUserAnswers(savedResponse.answers || {});
    }
  }, [lessonId, componentId, isEditMode, getResponse]);

  // Auto-save functionality with debouncing
  const debouncedAutoSave = useCallback(async () => {
    if (!lessonId || !componentId || isEditMode || !hasUnsavedChanges(lessonId) || !currentUser) return;
    
    try {
      setIsSaving(true);
      const responseData = {
        answers: userAnswers,
        type: 'exercise',
        completed: Object.keys(userAnswers).length === questions.length && 
                  Object.values(userAnswers).every(a => a.trim().length > 0)
      };
      
      await saveResponse(lessonId, componentId, 'exercise', responseData);
      // Silent save - no toast notification
    } catch (error) {
      console.error('Auto-save failed:', error);
      // Only show error toast for failed auto-saves if user is authenticated
      if (currentUser) {
        toast.error('Failed to save your progress automatically');
      }
    } finally {
      setIsSaving(false);
    }
  }, [lessonId, componentId, isEditMode, userAnswers, questions, saveResponse, hasUnsavedChanges, currentUser]);

  // Trigger auto-save after user stops typing for 3 seconds
  useEffect(() => {
    if (autoSaveTimeoutId) {
      clearTimeout(autoSaveTimeoutId);
    }
    
    if (!isEditMode && lessonId && componentId && hasUnsavedChanges(lessonId) && currentUser) {
      const timeoutId = setTimeout(() => {
        debouncedAutoSave();
      }, 3000); // 3 second delay
      
      setAutoSaveTimeoutId(timeoutId);
    }
    
    return () => {
      if (autoSaveTimeoutId) {
        clearTimeout(autoSaveTimeoutId);
      }
    };
  }, [userAnswers, debouncedAutoSave, lessonId, componentId, isEditMode, hasUnsavedChanges, autoSaveTimeoutId]);

  const handleAnswerChange = (questionIndex, answer) => {
    if (isEditMode) {
      // Edit mode - update component data
      updateQuestion(questionIndex, 'answer', answer);
    } else {
      // View mode - save user response locally (not to API yet)
      const newAnswers = { ...userAnswers, [questionIndex]: answer };
      setUserAnswers(newAnswers);
      
      if (lessonId && componentId) {
        updateResponse(lessonId, componentId, { 
          answers: newAnswers,
          type: 'exercise',
          completed: Object.keys(newAnswers).length === questions.length && 
                    Object.values(newAnswers).every(a => a.trim().length > 0)
        });
      }
    }
  };

  const addQuestion = () => {
    if (onUpdate) {
      const newQuestions = [...questions, { question: '', placeholder: '' }];
      onUpdate({ ...data, questions: newQuestions });
    }
  };

  const removeQuestion = (index) => {
    if (onUpdate && questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      onUpdate({ ...data, questions: newQuestions });
    }
  };

  const updateQuestion = (index, field, value) => {
    if (onUpdate) {
      const newQuestions = [...questions];
      newQuestions[index] = { ...newQuestions[index], [field]: value };
      onUpdate({ ...data, questions: newQuestions });
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="p-6 border border-dashed border-[#bd6334] rounded-md mb-8">
        <p className="mb-4 whitespace-pre-wrap">{situation}</p>
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{q.question}</p>
                {isEditMode && questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                    type="button"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>
              <textarea 
                rows={2} 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent" 
                placeholder={q.placeholder}
                value={isEditMode ? (q.answer || '') : (userAnswers[index] || '')}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </div>
          ))}
          
          {isEditMode && (
            <button
              onClick={addQuestion}
              className="w-full py-2 border border-dashed border-[#bd6334] text-[#bd6334] rounded-md hover:bg-orange-50 transition-colors"
              type="button"
            >
              + Add Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseBox;

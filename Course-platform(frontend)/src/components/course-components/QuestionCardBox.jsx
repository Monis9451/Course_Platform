import React, { useState, useEffect, useCallback } from 'react';
import { useUserResponses } from '../../context/userResponsesContext';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';

const QuestionCardBox = ({ data, isEditMode = false, onUpdate, lessonId = null, componentId = null, isHalfWidth = false }) => {
  const { title, questions = [{ questionTitle: '', questionText: '', placeholder: '', consideration: '' }] } = data;
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
        type: 'question_card',
        completed: Object.keys(userAnswers).length === questions.length && 
                  Object.values(userAnswers).every(a => a.trim().length > 0)
      };
      
      await saveResponse(lessonId, componentId, 'question_card', responseData);
    } catch (error) {
      console.error('Auto-save failed:', error);
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
      }, 3000);
      
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
      if (onUpdate) {
        const newQuestions = [...questions];
        newQuestions[questionIndex] = { ...newQuestions[questionIndex], answer };
        onUpdate({ ...data, questions: newQuestions });
      }
    } else {
      // View mode - save user response locally (not to API yet)
      const newAnswers = { ...userAnswers, [questionIndex]: answer };
      setUserAnswers(newAnswers);
      
      if (lessonId && componentId) {
        updateResponse(lessonId, componentId, { 
          answers: newAnswers,
          type: 'question_card',
          completed: Object.keys(newAnswers).length === questions.length && 
                    Object.values(newAnswers).every(a => a.trim().length > 0)
        });
      }
    }
  };

  const addQuestion = () => {
    if (onUpdate) {
      const newQuestions = [...questions, { questionTitle: '', questionText: '', placeholder: '', consideration: '' }];
      onUpdate({ ...data, questions: newQuestions });
    }
  };

  const removeQuestion = (index) => {
    if (onUpdate && questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      onUpdate({ ...data, questions: newQuestions });
    }
  };

  return (
    <div className={`mb-6 ${isHalfWidth ? 'w-full' : ''}`}>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      
      {/* Questions Grid - Responsive based on isHalfWidth */}
      <div className={`grid gap-6 ${isHalfWidth ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        {questions.map((question, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
            {/* Edit Mode Controls */}
            {isEditMode && (
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-gray-600">Card {index + 1}</span>
                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                    type="button"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>
            )}
            
            {/* Question Title */}
            <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">
              {question.questionTitle}
            </h3>
            
            {/* Question Text */}
            <p className="mb-4 font-medium">{question.questionText}</p>
            
            {/* Textarea */}
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent" 
              placeholder={question.placeholder}
              value={isEditMode ? (question.answer || '') : (userAnswers[index] || '')}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
            
            {/* Consideration Text */}
            {question.consideration && (
              <div className="mt-3 text-sm text-gray-500">
                <p>{question.consideration}</p>
              </div>
            )}
          </div>
        ))}
        
        {/* Add Question Card - Only in Edit Mode */}
        {isEditMode && (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <button
              onClick={addQuestion}
              className="text-[#bd6334] font-medium hover:text-[#a0542a] transition-colors"
              type="button"
            >
              + Add Question Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCardBox;

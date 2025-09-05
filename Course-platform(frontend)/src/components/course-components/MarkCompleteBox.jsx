import React, { useState, useEffect } from 'react';
import { useUserProgress } from '../../context/userProgressContext';

const MarkCompleteBox = ({ data, isEditMode = false, onUpdate, lessonId = null, componentId = null }) => {
  const { title, description, question, checkboxes = [{ text: '', checked: false }], showCheckboxes = true } = data;
  const { getResponse, updateResponse, isComponentCompleted, markComponentCompleted } = useUserProgress();
  
  // Get saved responses when in view mode
  const [userChecked, setUserChecked] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isEditMode && lessonId && componentId) {
      const savedResponse = getResponse(lessonId, componentId);
      setUserChecked(savedResponse.checked || {});
      setIsCompleted(isComponentCompleted(lessonId, componentId));
    }
  }, [lessonId, componentId, isEditMode, getResponse, isComponentCompleted]);

  const handleCheckboxChange = (index, checked) => {
    if (isEditMode) {
      // Edit mode - update component data
      updateCheckbox(index, 'checked', checked);
    } else {
      // View mode - save user response
      const newChecked = { ...userChecked, [index]: checked };
      setUserChecked(newChecked);
      
      if (lessonId && componentId) {
        updateResponse(lessonId, componentId, { 
          checked: newChecked,
          type: 'mark_complete',
          completed: isCompleted
        });
      }
    }
  };

  const handleMarkComplete = () => {
    if (!isEditMode && lessonId && componentId) {
      const newCompleted = !isCompleted;
      setIsCompleted(newCompleted);
      markComponentCompleted(lessonId, componentId, newCompleted);
      
      // Also update the response data
      updateResponse(lessonId, componentId, { 
        checked: userChecked,
        type: 'mark_complete',
        completed: newCompleted
      });
    }
  };

  const addCheckbox = () => {
    if (onUpdate) {
      const newCheckboxes = [...checkboxes, { text: '', checked: false }];
      onUpdate({ ...data, checkboxes: newCheckboxes });
    }
  };

  const removeCheckbox = (index) => {
    if (onUpdate && checkboxes.length > 1) {
      const newCheckboxes = checkboxes.filter((_, i) => i !== index);
      onUpdate({ ...data, checkboxes: newCheckboxes });
    }
  };

  const updateCheckbox = (index, field, value) => {
    if (onUpdate) {
      const newCheckboxes = [...checkboxes];
      newCheckboxes[index] = { ...newCheckboxes[index], [field]: value };
      onUpdate({ ...data, checkboxes: newCheckboxes });
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="border border-gray-200 rounded-md p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">{data.boxTitle}</h3>
          {!isEditMode && (
            <button 
              className={`h-8 px-3 rounded-full text-sm flex items-center transition-colors ${
                isCompleted 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={handleMarkComplete}
            >
              {isCompleted ? '✓ Completed' : 'Mark Complete'}
            </button>
          )}
          {isEditMode && (
            <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
              Mark Complete
            </button>
          )}
        </div>
        
        <p className="mb-4">{description}</p>
        
        {showCheckboxes && (
          <div className="space-y-6 mb-6">
            <div>
              {question && <p className="mb-3 text-sm">{question}</p>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {checkboxes.map((checkbox, index) => (
                  <div key={index} className="flex items-start">
                    <input 
                      type="checkbox" 
                      className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]"
                      checked={isEditMode ? (checkbox.checked || false) : (userChecked[index] || false)}
                      onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm flex-1">{checkbox.text}</span>
                        {isEditMode && checkboxes.length > 1 && (
                          <button
                            onClick={() => removeCheckbox(index)}
                            className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded ml-2"
                            type="button"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isEditMode && (
                  <div className="flex items-center justify-center col-span-1 md:col-span-2">
                    <button
                      onClick={addCheckbox}
                      className="w-full py-2 border border-dashed border-[#bd6334] text-[#bd6334] rounded-md hover:bg-orange-50 transition-colors"
                      type="button"
                    >
                      + Add Checkbox
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkCompleteBox;

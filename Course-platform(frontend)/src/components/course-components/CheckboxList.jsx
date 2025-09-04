import React, { useState, useEffect } from 'react';
import { useUserProgress } from '../../context/userProgressContext';

const CheckboxList = ({ data, isEditMode = false, onUpdate, lessonId = null, componentId = null, isHalfWidth = false }) => {
  const { title, checkboxes = [{ text: '', checked: false }] } = data;
  const { getResponse, updateResponse } = useUserProgress();
  
  // Get saved responses when in view mode
  const [userChecked, setUserChecked] = useState({});

  useEffect(() => {
    if (!isEditMode && lessonId && componentId) {
      const savedResponse = getResponse(lessonId, componentId);
      setUserChecked(savedResponse.checked || {});
    }
  }, [lessonId, componentId, isEditMode, getResponse]);

  const handleCheckboxChange = (index, checked) => {
    if (isEditMode) {
      // Edit mode - update component data
      updateCheckbox(index, 'checked', checked);
    } else {
      // View mode - save user response
      const newChecked = { ...userChecked, [index]: checked };
      setUserChecked(newChecked);
      
      if (lessonId && componentId) {
        const checkedCount = Object.values(newChecked).filter(Boolean).length;
        updateResponse(lessonId, componentId, { 
          checked: newChecked,
          type: 'checkbox_list',
          completed: checkedCount > 0 // At least one checkbox checked
        });
      }
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
      <h3 className={`font-semibold mb-3 ${isHalfWidth ? 'text-lg' : 'text-xl'}`}>{title}</h3>
      <div className="bg-[#f8f0e6] p-5 rounded-lg">
        <ul className="space-y-3 pl-5">
          {checkboxes.map((checkbox, index) => (
            <li key={index} className="flex items-start">
              <input 
                type="checkbox" 
                className="mt-1 mr-3 h-4 w-4 accent-[#bd6334] flex-shrink-0"
                checked={isEditMode ? (checkbox.checked || false) : (userChecked[index] || false)}
                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="flex-1 break-words">{checkbox.text}</span>
                  {isEditMode && checkboxes.length > 1 && (
                    <button
                      onClick={() => removeCheckbox(index)}
                      className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded ml-2 flex-shrink-0"
                      type="button"
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
          
          {isEditMode && (
            <li className="flex items-center justify-center pt-2">
              <button
                onClick={addCheckbox}
                className="w-full py-2 border border-dashed border-[#bd6334] text-[#bd6334] rounded-md hover:bg-[#f0e6d6] transition-colors"
                type="button"
              >
                + Add Checkbox
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CheckboxList;

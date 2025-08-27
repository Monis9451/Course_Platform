import React from 'react';

const MarkCompleteBox = ({ data, isEditMode = false, onUpdate }) => {
  const { title, description, question, checkboxes = [{ text: '', checked: false }] } = data;

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
          <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
            Mark Complete
          </button>
        </div>
        
        <p className="mb-4">{description}</p>
        
        <div className="space-y-6 mb-6">
          <div>
            <p className="mb-3 text-sm">{question}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {checkboxes.map((checkbox, index) => (
                <div key={index} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]"
                    checked={checkbox.checked || false}
                    onChange={(e) => updateCheckbox(index, 'checked', e.target.checked)}
                    disabled={!isEditMode}
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
      </div>
    </div>
  );
};

export default MarkCompleteBox;

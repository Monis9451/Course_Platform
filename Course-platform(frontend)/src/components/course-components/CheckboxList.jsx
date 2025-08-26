import React from 'react';

const CheckboxList = ({ data, isEditMode = false, onUpdate }) => {
  const { title, checkboxes = [{ text: '', checked: false }] } = data;

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
      <div className="bg-[#f8f0e6] p-5 rounded-lg">
        <ul className="space-y-3 pl-5">
          {checkboxes.map((checkbox, index) => (
            <li key={index} className="flex items-start">
              <input 
                type="checkbox" 
                className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]"
                checked={checkbox.checked || false}
                onChange={(e) => updateCheckbox(index, 'checked', e.target.checked)}
                disabled={!isEditMode}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex-1">{checkbox.text}</span>
                  {isEditMode && checkboxes.length > 1 && (
                    <button
                      onClick={() => removeCheckbox(index)}
                      className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded ml-2"
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

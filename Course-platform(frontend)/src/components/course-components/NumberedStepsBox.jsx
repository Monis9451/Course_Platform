import React from 'react';

const NumberedStepsBox = ({ data, isEditMode = false, onUpdate, isHalfWidth = false }) => {
  const { title, paragraph, steps = [{ title: '', description: '' }], listItems } = data;

  const handleStepChange = (stepIndex, field, value) => {
    if (isEditMode && onUpdate) {
      const newSteps = [...steps];
      newSteps[stepIndex] = { ...newSteps[stepIndex], [field]: value };
      onUpdate({ ...data, steps: newSteps });
    }
  };

  const addStep = () => {
    if (onUpdate) {
      const newSteps = [...steps, { title: '', description: '' }];
      onUpdate({ ...data, steps: newSteps });
    }
  };

  const removeStep = (index) => {
    if (onUpdate && steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      onUpdate({ ...data, steps: newSteps });
    }
  };

  return (
    <div className={`mb-6 ${isHalfWidth ? 'w-full' : ''}`}>
      <h3 className="text-xl font-semibold mb-3">{data.sectionTitle}</h3>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        {/* Edit Mode: Title Input */}
        {isEditMode ? (
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => onUpdate({ ...data, title: e.target.value })}
              className="w-full font-semibold text-[#bd6334] border-b pb-2 border-gray-300 focus:border-[#bd6334] focus:outline-none"
              placeholder="Enter box title..."
            />
          </div>
        ) : (
          <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">{title}</h3>
        )}

        {/* Optional Paragraph */}
        {isEditMode ? (
          <div className="mb-4">
            <textarea
              value={paragraph || ''}
              onChange={(e) => onUpdate({ ...data, paragraph: e.target.value })}
              rows={2}
              className="w-full text-gray-700 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
              placeholder="Optional paragraph (leave empty if not needed)..."
            />
          </div>
        ) : (
          paragraph && paragraph.trim() !== '' && (
            <p className="mb-4 text-gray-700">{paragraph}</p>
          )
        )}

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                {isEditMode ? (
                  <div className="space-y-2">
                    {/* Edit Mode Controls */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-600">Step {index + 1}</span>
                      {steps.length > 1 && (
                        <button
                          onClick={() => removeStep(index)}
                          className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                          type="button"
                        >
                          ✕ Remove
                        </button>
                      )}
                    </div>
                    
                    {/* Step Title Input */}
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                      className="w-full font-medium border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
                      placeholder="Step title..."
                    />
                    
                    {/* Step Description Textarea */}
                    <textarea
                      value={step.description}
                      onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full text-gray-700 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
                      placeholder="Step description..."
                    />
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Add Step Button - Only in Edit Mode */}
          {isEditMode && (
            <div className="flex items-start">
              <div className="bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                +
              </div>
              <div className="flex-1">
                <button
                  onClick={addStep}
                  className="text-[#bd6334] font-medium hover:text-[#a0542a] transition-colors"
                  type="button"
                >
                  Add New Step
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Optional Unordered List */}
        {isEditMode ? (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Optional List Items</label>
            <div className="space-y-2">
              {(listItems || []).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newListItems = [...(listItems || [])];
                      newListItems[index] = e.target.value;
                      onUpdate({ ...data, listItems: newListItems });
                    }}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
                    placeholder={`List item ${index + 1}...`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newListItems = (listItems || []).filter((_, i) => i !== index);
                      onUpdate({ ...data, listItems: newListItems });
                    }}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newListItems = [...(listItems || []), ''];
                  onUpdate({ ...data, listItems: newListItems });
                }}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add List Item
              </button>
            </div>
          </div>
        ) : (
          listItems && listItems.length > 0 && listItems.some(item => item.trim() !== '') && (
            <ul className="mt-4 list-disc list-inside space-y-1">
              {listItems.filter(item => item.trim() !== '').map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default NumberedStepsBox;

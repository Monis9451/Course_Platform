import React from 'react';

const UnorderedListBox = ({ data, isEditMode = false, onUpdate }) => {
  const { title, description, listBoxes = [{ title: 'Example Title', items: ['Example item'] }] } = data;

  const addListBox = () => {
    if (onUpdate) {
      const newListBoxes = [...listBoxes, { title: 'New Title', items: ['New item'] }];
      onUpdate({ ...data, listBoxes: newListBoxes });
    }
  };

  const removeListBox = (index) => {
    if (onUpdate && listBoxes.length > 1) {
      const newListBoxes = listBoxes.filter((_, i) => i !== index);
      onUpdate({ ...data, listBoxes: newListBoxes });
    }
  };

  const addListItem = (boxIndex) => {
    if (onUpdate) {
      const newListBoxes = [...listBoxes];
      newListBoxes[boxIndex].items = [...newListBoxes[boxIndex].items, 'New item'];
      onUpdate({ ...data, listBoxes: newListBoxes });
    }
  };

  const removeListItem = (boxIndex, itemIndex) => {
    if (onUpdate && listBoxes[boxIndex].items.length > 1) {
      const newListBoxes = [...listBoxes];
      newListBoxes[boxIndex].items = newListBoxes[boxIndex].items.filter((_, i) => i !== itemIndex);
      onUpdate({ ...data, listBoxes: newListBoxes });
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">{data.sectionTitle}</h3>
        
        <p className="mb-4">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {listBoxes.map((listBox, boxIndex) => (
            <div key={boxIndex} className="bg-[#f8f0e6] p-5 rounded-lg relative">
              {isEditMode && listBoxes.length > 1 && (
                <button
                  onClick={() => removeListBox(boxIndex)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                  type="button"
                >
                  ✕
                </button>
              )}
              
              <h4 className="font-medium mb-3">{listBox.title}</h4>
              <ul className="space-y-2 pl-6 list-disc">
                {listBox.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start justify-between">
                    <span className="flex-1">{item}</span>
                    {isEditMode && listBox.items.length > 1 && (
                      <button
                        onClick={() => removeListItem(boxIndex, itemIndex)}
                        className="text-red-500 hover:text-red-700 text-xs px-1 ml-2"
                        type="button"
                      >
                        ✕
                      </button>
                    )}
                  </li>
                ))}
                
                {isEditMode && (
                  <li className="list-none">
                    <button
                      onClick={() => addListItem(boxIndex)}
                      className="w-full py-1 border border-dashed border-[#bd6334] text-[#bd6334] rounded text-sm hover:bg-orange-50 transition-colors"
                      type="button"
                    >
                      + Add Item
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}
          
          {isEditMode && (
            <div className="bg-[#f8f0e6] p-5 rounded-lg border-2 border-dashed border-[#bd6334] flex items-center justify-center min-h-[120px]">
              <button
                onClick={addListBox}
                className="text-[#bd6334] font-medium hover:bg-orange-50 px-4 py-2 rounded transition-colors"
                type="button"
              >
                + Add List Box
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnorderedListBox;

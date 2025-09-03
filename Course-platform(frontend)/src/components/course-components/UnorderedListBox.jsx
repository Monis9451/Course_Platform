import React, { useEffect, useState } from 'react';

const UnorderedListBox = ({ 
  data, 
  isEditMode = false, 
  onUpdate,
  lessonId,
  componentId,
  userProgress,
  updateUserProgress
}) => {
  const { title, description, listBoxes = [{ title: 'Example Title', items: ['Example item'] }] } = data;
  const [userNotes, setUserNotes] = useState('');

  // Load saved user notes on component mount
  useEffect(() => {
    if (lessonId && componentId && userProgress) {
      const savedNotes = userProgress.getResponse(lessonId, componentId, 'notes');
      if (savedNotes) {
        setUserNotes(savedNotes);
      }
    }
  }, [lessonId, componentId, userProgress]);

  // Handle user notes change
  const handleNotesChange = (event) => {
    const notes = event.target.value;
    setUserNotes(notes);
    
    if (updateUserProgress) {
      updateUserProgress(lessonId, componentId, 'notes', notes);
    }
  };

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
        
        {/* Interactive notes section for view mode */}
        {!isEditMode && lessonId && (
          <div className="mt-6 border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              My Notes:
            </label>
            <textarea
              value={userNotes}
              onChange={handleNotesChange}
              className="w-full p-3 border border-gray-300 rounded-md resize-vertical min-h-[100px] focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
              placeholder="Add your personal notes about this content..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UnorderedListBox;

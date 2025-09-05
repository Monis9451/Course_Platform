import React from 'react';

const SimpleUnorderList = ({ 
  data, 
  isEditMode = false, 
  onUpdate 
}) => {
  const { title = 'Title', listItems = ['List 1'] } = data;

  const addListItem = () => {
    if (onUpdate) {
      const newListItems = [...listItems, ''];
      onUpdate({ ...data, listItems: newListItems });
    }
  };

  const removeListItem = (index) => {
    if (onUpdate && listItems.length > 1) {
      const newListItems = listItems.filter((_, i) => i !== index);
      onUpdate({ ...data, listItems: newListItems });
    }
  };

  const updateListItem = (index, value) => {
    if (onUpdate) {
      const newListItems = [...listItems];
      newListItems[index] = value;
      onUpdate({ ...data, listItems: newListItems });
    }
  };

  const updateTitle = (value) => {
    if (onUpdate) {
      onUpdate({ ...data, title: value });
    }
  };

  return (
    <div className="mb-8">
      {isEditMode ? (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1 text-gray-700 whitespace-pre-wrap">Title</label>
            <textarea
              value={title}
              onChange={(e) => updateTitle(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-vertical min-h-[2.5rem]"
              placeholder="Enter title..."
              rows="2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2 text-gray-700">List Items</label>
            <div className="space-y-2">
              {listItems.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateListItem(index, e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                    placeholder={`List item ${index + 1}...`}
                  />
                  {listItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeListItem(index)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addListItem}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add List Item
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="font-semibold text-lg mb-3 whitespace-pre-wrap">{title}</p>
          <ul className="list-disc pl-6 space-y-2">
            {listItems.map((item, index) => (
              <li key={index} className="whitespace-pre-wrap">{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SimpleUnorderList;

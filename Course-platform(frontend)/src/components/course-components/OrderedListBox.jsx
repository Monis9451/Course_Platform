import React from 'react';

const OrderedListBox = ({ data, isEditMode = false, onUpdate }) => {
  const { title, description, points = [{ text: '' }], footerText } = data;

  const addPoint = () => {
    if (onUpdate) {
      const newPoints = [...points, { text: '' }];
      onUpdate({ ...data, points: newPoints });
    }
  };

  const removePoint = (index) => {
    if (onUpdate && points.length > 1) {
      const newPoints = points.filter((_, i) => i !== index);
      onUpdate({ ...data, points: newPoints });
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="border rounded-md p-6">
        <h3 className="font-semibold mb-4">{data.boxTitle}</h3>
        <p className="mb-4">{description}</p>
        <div className="space-y-3">
          {points.map((point, index) => {
            // Calculate countdown number (starting from total points down to 1)
            const countdownNumber = points.length - index;
            
            return (
              <div key={index} className="flex items-start">
                <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  {countdownNumber}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="flex-1">
                      <strong>{point.text}</strong>
                    </p>
                    {isEditMode && points.length > 1 && (
                      <button
                        onClick={() => removePoint(index)}
                        className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded ml-2"
                        type="button"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {isEditMode && (
            <button
              onClick={addPoint}
              className="w-full py-2 border border-dashed border-gray-400 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
              type="button"
            >
              + Add Point
            </button>
          )}
        </div>
        <p className="mt-4 text-sm italic">{footerText}</p>
      </div>
    </div>
  );
};

export default OrderedListBox;

import React, { useEffect, useState } from 'react';

const OrderedListBox = ({ 
  data, 
  isEditMode = false, 
  onUpdate,
  lessonId,
  componentId,
  userProgress,
  updateUserProgress
}) => {
  const { title, description, points = [{ text: '' }], footerText } = data;
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

export default OrderedListBox;

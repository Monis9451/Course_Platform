import React, { useState, useEffect } from 'react';

const TimelineComponent = ({ data, isEditMode = false, onUpdate, originalItem }) => {
  const { 
    title = "Timeline Component",
    timelineTitle = "Your Personal Timeline",
    stages = [
      "Early Childhood",
      "Adolescence", 
      "Early Adulthood",
      "Mid Adulthood",
      "Present"
    ],
    events = [
      { event: '', impact: '', userCanEdit: true },
      { event: '', impact: '', userCanEdit: true },
      { event: '', impact: '', userCanEdit: true }
    ]
  } = data;

  // State for user responses (when not in edit mode)
  const [userResponses, setUserResponses] = useState(events);

  // Load saved user responses when component mounts
  useEffect(() => {
    if (!isEditMode && originalItem) {
      const savedResponses = localStorage.getItem(`timeline_${originalItem.id}_responses`);
      if (savedResponses) {
        try {
          const parsed = JSON.parse(savedResponses);
          setUserResponses(parsed);
        } catch (error) {
          console.error('Error loading saved timeline responses:', error);
        }
      }
    }
  }, [isEditMode, originalItem]);

  // Save user responses to localStorage
  const saveUserResponse = (index, field, value) => {
    const newResponses = [...userResponses];
    newResponses[index] = { ...newResponses[index], [field]: value };
    setUserResponses(newResponses);
    
    // Save to localStorage for persistence
    if (originalItem) {
      localStorage.setItem(`timeline_${originalItem.id}_responses`, JSON.stringify(newResponses));
    }
  };

  const addStage = () => {
    if (onUpdate) {
      const newStages = [...stages, 'New Stage'];
      onUpdate({ ...data, stages: newStages });
    }
  };

  const removeStage = (index) => {
    if (onUpdate && stages.length > 2) {
      const newStages = stages.filter((_, i) => i !== index);
      onUpdate({ ...data, stages: newStages });
    }
  };

  const updateStage = (index, value) => {
    if (onUpdate) {
      const newStages = [...stages];
      newStages[index] = value;
      onUpdate({ ...data, stages: newStages });
    }
  };

  const addEvent = () => {
    if (onUpdate) {
      const newEvents = [...events, { event: '', impact: '', userCanEdit: true }];
      onUpdate({ ...data, events: newEvents });
    }
  };

  const removeEvent = (index) => {
    if (onUpdate && events.length > 1) {
      const newEvents = events.filter((_, i) => i !== index);
      onUpdate({ ...data, events: newEvents });
    }
  };

  const updateEvent = (index, field, value) => {
    if (onUpdate) {
      const newEvents = [...events];
      newEvents[index] = { ...newEvents[index], [field]: value };
      onUpdate({ ...data, events: newEvents });
    }
  };

  const updateTitle = (value) => {
    if (onUpdate) {
      onUpdate({ ...data, title: value });
    }
  };

  const updateTimelineTitle = (value) => {
    if (onUpdate) {
      onUpdate({ ...data, timelineTitle: value });
    }
  };

  // Calculate positions for timeline stages
  const getStagePosition = (index) => {
    if (stages.length === 1) return '50%';
    return `${(index / (stages.length - 1)) * 100}%`;
  };

  // Use either editing data or user responses depending on mode
  const displayEvents = isEditMode ? events : userResponses;

  return (
    <div className="mb-6">
      {isEditMode ? (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Component Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Timeline Component"
          />
        </div>
      ) : (
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
      )}

      <div className="p-1 border-4 border-[#f7f1e9] rounded-lg mb-8">
        <div className="p-6 border border-dashed border-[#bd6334] rounded-lg bg-white">
          {isEditMode ? (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Timeline Title:</label>
              <input
                type="text"
                value={timelineTitle}
                onChange={(e) => updateTimelineTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-center font-semibold"
                placeholder="Your Personal Timeline"
              />
            </div>
          ) : (
            <h3 className="font-semibold mb-6 text-center">{timelineTitle}</h3>
          )}
          
          {/* Timeline Stages Editor (Edit Mode Only) */}
          {isEditMode && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Timeline Stages:</h4>
              <div className="space-y-2">
                {stages.map((stage, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={stage}
                      onChange={(e) => updateStage(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      placeholder={`Stage ${index + 1}`}
                    />
                    {stages.length > 2 && (
                      <button
                        onClick={() => removeStage(index)}
                        className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                        type="button"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addStage}
                  className="w-full py-2 border border-dashed border-gray-400 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                  type="button"
                >
                  + Add Stage
                </button>
              </div>
            </div>
          )}
          
          {/* Timeline Visual */}
          <div className="w-full h-1 bg-[#bd6334] my-8 relative">
            {stages.map((stage, index) => (
              <div key={index}>
                <div 
                  className="absolute -top-7 text-sm font-medium transform -translate-x-1/2"
                  style={{ left: getStagePosition(index) }}
                >
                  {stage}
                </div>
                <div 
                  className="absolute bottom-2 h-4 w-0.5 bg-[#bd6334] transform -translate-x-1/2"
                  style={{ left: getStagePosition(index) }}
                ></div>
              </div>
            ))}
          </div>
          
          {/* Events Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayEvents.map((eventData, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Event:</p>
                  {isEditMode && events.length > 1 && (
                    <button
                      onClick={() => removeEvent(index)}
                      className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                      type="button"
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>
                <textarea 
                  rows={2} 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  placeholder="Describe a significant event..."
                  value={eventData.event || ''}
                  onChange={(e) => {
                    if (isEditMode) {
                      updateEvent(index, 'event', e.target.value);
                    } else {
                      saveUserResponse(index, 'event', e.target.value);
                    }
                  }}
                  disabled={!isEditMode && !eventData.userCanEdit}
                />
                <p className="font-medium mt-3 mb-2">Impact:</p>
                <textarea 
                  rows={3} 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  placeholder="How did this affect you emotionally, physically, mentally?"
                  value={eventData.impact || ''}
                  onChange={(e) => {
                    if (isEditMode) {
                      updateEvent(index, 'impact', e.target.value);
                    } else {
                      saveUserResponse(index, 'impact', e.target.value);
                    }
                  }}
                  disabled={!isEditMode && !eventData.userCanEdit}
                />
              </div>
            ))}
            
            {/* Add Another Event Button */}
            {isEditMode && (
              <div className="p-4 border border-dashed border-gray-300 rounded-md flex items-center justify-center">
                <button 
                  className="flex items-center text-[#bd6334] hover:text-[#9d5429] transition-colors"
                  onClick={addEvent}
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Another Event
                </button>
              </div>
            )}
          </div>
          
          {/* Save Progress Button for Users */}
          {!isEditMode && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  // Save current state to localStorage
                  if (originalItem) {
                    localStorage.setItem(`timeline_${originalItem.id}_responses`, JSON.stringify(userResponses));
                    // Show temporary success message
                    const button = document.activeElement;
                    const originalText = button.textContent;
                    button.textContent = '✓ Saved!';
                    button.className = button.className.replace('bg-[#bd6334]', 'bg-green-600');
                    setTimeout(() => {
                      button.textContent = originalText;
                      button.className = button.className.replace('bg-green-600', 'bg-[#bd6334]');
                    }, 2000);
                  }
                }}
                className="px-6 py-2 bg-[#bd6334] text-white rounded-md hover:bg-[#9d5429] transition-colors font-medium"
              >
                Save My Timeline
              </button>
              <p className="text-xs text-gray-500 mt-2">Your responses are saved locally and will persist between sessions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;

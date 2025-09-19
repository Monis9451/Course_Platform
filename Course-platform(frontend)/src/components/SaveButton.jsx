import React, { useState } from 'react';
import { FiSave, FiCheck } from 'react-icons/fi';

const SaveButton = ({ 
  onSave, 
  hasChanges, 
  progressChangesCount = 0, 
  responseChangesCount = 0,
  className = "" 
}) => {
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = async () => {
    if (!hasChanges || saving) return;
    
    setSaving(true);
    try {
      await onSave();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000); // Show success for 2 seconds
    } catch (error) {
      console.error('Error saving:', error);
      // Could add error state/toast here
    } finally {
      setSaving(false);
    }
  };

  const totalChanges = progressChangesCount + responseChangesCount;

  if (!hasChanges && !justSaved) {
    return null; // Don't show button if no changes
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        hasChanges ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      } ${className}`}
    >
      <button
        onClick={handleSave}
        disabled={saving || !hasChanges}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-white
          shadow-lg hover:shadow-xl transition-all duration-200
          ${justSaved 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-primary hover:bg-primary-dark'
          }
          ${saving ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}
        `}
      >
        {saving ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Saving...</span>
          </>
        ) : justSaved ? (
          <>
            <FiCheck className="w-4 h-4" />
            <span>Saved!</span>
          </>
        ) : (
          <>
            <FiSave className="w-4 h-4" />
            <span>Save Progress</span>
            {totalChanges > 0 && (
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {totalChanges}
              </span>
            )}
          </>
        )}
      </button>
      
      {/* Tooltip showing what will be saved */}
      {hasChanges && !saving && !justSaved && (
        <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
          Save:
          {progressChangesCount > 0 && (
            <span className="block">• {progressChangesCount} progress change{progressChangesCount !== 1 ? 's' : ''}</span>
          )}
          {responseChangesCount > 0 && (
            <span className="block">• {responseChangesCount} response{responseChangesCount !== 1 ? 's' : ''}</span>
          )}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default SaveButton;

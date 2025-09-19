import React, { useState, useEffect, useCallback } from 'react';
import { useUserResponses } from '../../context/userResponsesContext';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';

const PracticeIntegrationTable = ({ data, isEditMode = false, onUpdate, onChange, lessonId = null, componentId = null }) => {
  const { 
    title = 'Practice Integration Planning',
    description = 'For each practice, decide how you\'ll realistically integrate it into your life:',
    headers = {
      practice: 'Practice',
      frequency: 'Frequency',
      duration: 'Duration',
      whenWhere: 'When/Where',
      reminders: 'Reminders'
    },
    frequencyOptions = ['Daily', '2-3 times/week', 'Weekly', 'As needed', 'Other'],
    rows = [
      {
        practicePlaceholder: 'Practice 1',
        durationPlaceholder: '5 min',
        whenWherePlaceholder: 'Morning, bedroom',
        remindersPlaceholder: 'Phone alarm'
      },
      {
        practicePlaceholder: 'Practice 2',
        durationPlaceholder: '10 min',
        whenWherePlaceholder: 'Evening, living room',
        remindersPlaceholder: 'After dinner'
      },
      {
        practicePlaceholder: 'Practice 3',
        durationPlaceholder: '15 min',
        whenWherePlaceholder: 'Weekend, park',
        remindersPlaceholder: 'Calendar event'
      }
    ]
  } = data;

  const { getResponse, updateResponse, saveResponse, hasUnsavedChanges, loading } = useUserResponses();
  const { currentUser } = useAuth();
  
  // Get saved responses when in view mode
  const [userTableData, setUserTableData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveTimeoutId, setAutoSaveTimeoutId] = useState(null);

  useEffect(() => {
    if (!isEditMode && lessonId && componentId) {
      const savedResponse = getResponse(lessonId, componentId);
      setUserTableData(savedResponse.tableData || {});
    }
  }, [lessonId, componentId, isEditMode, getResponse]);

  // Auto-save functionality with debouncing
  const debouncedAutoSave = useCallback(async () => {
    if (!lessonId || !componentId || isEditMode || !hasUnsavedChanges(lessonId) || !currentUser) return;
    
    try {
      setIsSaving(true);
      const responseData = {
        tableData: userTableData,
        type: 'practice_integration_table',
        completed: Object.keys(userTableData).length > 0
      };
      
      await saveResponse(lessonId, componentId, 'practice_integration_table', responseData);
    } catch (error) {
      console.error('Auto-save failed:', error);
      if (currentUser) {
        toast.error('Failed to save your progress automatically');
      }
    } finally {
      setIsSaving(false);
    }
  }, [lessonId, componentId, isEditMode, userTableData, saveResponse, hasUnsavedChanges, currentUser]);

  // Trigger auto-save after user stops typing for 3 seconds
  useEffect(() => {
    if (autoSaveTimeoutId) {
      clearTimeout(autoSaveTimeoutId);
    }
    
    if (!isEditMode && lessonId && componentId && hasUnsavedChanges(lessonId) && currentUser) {
      const timeoutId = setTimeout(() => {
        debouncedAutoSave();
      }, 3000);
      
      setAutoSaveTimeoutId(timeoutId);
    }
    
    return () => {
      if (autoSaveTimeoutId) {
        clearTimeout(autoSaveTimeoutId);
      }
    };
  }, [userTableData, debouncedAutoSave, lessonId, componentId, isEditMode, hasUnsavedChanges, autoSaveTimeoutId]);

  const handleCellChange = (rowIndex, field, value) => {
    if (isEditMode) {
      // Edit mode - update component data based on field type
      if (field.startsWith('header_')) {
        const headerKey = field.replace('header_', '');
        updateHeaders(headerKey, value);
      } else if (field === 'title' || field === 'description') {
        updateBasicField(field, value);
      } else if (field.startsWith('placeholder_')) {
        const placeholderKey = field.replace('placeholder_', '');
        updatePlaceholder(rowIndex, placeholderKey, value);
      } else if (field === 'frequencyOptions') {
        updateFrequencyOptions(value);
      }
    } else {
      // View mode - save user response locally
      const newTableData = { 
        ...userTableData, 
        [`${rowIndex}_${field}`]: value 
      };
      setUserTableData(newTableData);
      
      if (lessonId && componentId) {
        updateResponse(lessonId, componentId, { 
          tableData: newTableData,
          type: 'practice_integration_table',
          completed: Object.keys(newTableData).length > 0
        });
      }
    }
  };

  const updateBasicField = (field, value) => {
    const updatedData = { ...data, [field]: value };
    if (onUpdate) {
      onUpdate(updatedData);
    }
    if (onChange) {
      onChange(updatedData);
    }
  };

  const updateHeaders = (headerKey, value) => {
    const newHeaders = { ...headers, [headerKey]: value };
    const updatedData = { ...data, headers: newHeaders };
    if (onUpdate) {
      onUpdate(updatedData);
    }
    if (onChange) {
      onChange(updatedData);
    }
  };

  const updatePlaceholder = (rowIndex, placeholderKey, value) => {
    const newRows = [...rows];
    newRows[rowIndex] = { 
      ...newRows[rowIndex], 
      [`${placeholderKey}Placeholder`]: value 
    };
    const updatedData = { ...data, rows: newRows };
    if (onUpdate) {
      onUpdate(updatedData);
    }
    if (onChange) {
      onChange(updatedData);
    }
  };

  const updateFrequencyOptions = (newOptions) => {
    const optionsArray = newOptions.split('\n').filter(option => option.trim());
    const updatedData = { ...data, frequencyOptions: optionsArray };
    if (onUpdate) {
      onUpdate(updatedData);
    }
    if (onChange) {
      onChange(updatedData);
    }
  };

  const addRow = () => {
    const newRow = {
      practicePlaceholder: `Practice ${rows.length + 1}`,
      durationPlaceholder: '10 min',
      whenWherePlaceholder: 'Location, time',
      remindersPlaceholder: 'Reminder method'
    };
    const newRows = [...rows, newRow];
    const updatedData = { ...data, rows: newRows };
    if (onUpdate) {
      onUpdate(updatedData);
    }
    if (onChange) {
      onChange(updatedData);
    }
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      const updatedData = { ...data, rows: newRows };
      if (onUpdate) {
        onUpdate(updatedData);
      }
      if (onChange) {
        onChange(updatedData);
      }
    }
  };

  if (isEditMode) {
    return (
      <div className="mb-6">
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => updateBasicField('title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
              placeholder="Section title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => updateBasicField('description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
              rows={3}
              placeholder="Description text"
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Practice Header</label>
              <input
                type="text"
                value={headers.practice}
                onChange={(e) => updateHeaders('practice', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency Header</label>
              <input
                type="text"
                value={headers.frequency}
                onChange={(e) => updateHeaders('frequency', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration Header</label>
              <input
                type="text"
                value={headers.duration}
                onChange={(e) => updateHeaders('duration', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">When/Where Header</label>
              <input
                type="text"
                value={headers.whenWhere}
                onChange={(e) => updateHeaders('whenWhere', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reminders Header</label>
              <input
                type="text"
                value={headers.reminders}
                onChange={(e) => updateHeaders('reminders', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frequency Options (one per line)</label>
            <textarea
              value={frequencyOptions.join('\n')}
              onChange={(e) => updateFrequencyOptions(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
              rows={5}
              placeholder="Daily&#10;2-3 times/week&#10;Weekly&#10;As needed&#10;Other"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Row Placeholders</h4>
          {rows.map((row, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-medium">Row {index + 1}</h5>
                {rows.length > 1 && (
                  <button
                    onClick={() => removeRow(index)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                    type="button"
                  >
                    ✕ Remove Row
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <input
                  type="text"
                  value={row.practicePlaceholder}
                  onChange={(e) => updatePlaceholder(index, 'practice', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
                  placeholder="Practice placeholder"
                />
                <input
                  type="text"
                  value={row.durationPlaceholder}
                  onChange={(e) => updatePlaceholder(index, 'duration', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
                  placeholder="Duration placeholder"
                />
                <input
                  type="text"
                  value={row.whenWherePlaceholder}
                  onChange={(e) => updatePlaceholder(index, 'whenWhere', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
                  placeholder="When/Where placeholder"
                />
                <input
                  type="text"
                  value={row.remindersPlaceholder}
                  onChange={(e) => updatePlaceholder(index, 'reminders', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd6334] focus:border-transparent"
                  placeholder="Reminders placeholder"
                />
              </div>
            </div>
          ))}
          
          <button
            onClick={addRow}
            className="w-full py-2 border border-dashed border-[#bd6334] text-[#bd6334] rounded-md hover:bg-orange-50 transition-colors"
            type="button"
          >
            + Add Row
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h4 className="font-medium mb-3 text-primary">{title}</h4>
      <p className="text-gray-700 mb-2">{description}</p>
      
      <div className="overflow-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-[#f8f0e6]">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">{headers.practice}</th>
              <th className="border border-gray-300 px-4 py-2 text-left">{headers.frequency}</th>
              <th className="border border-gray-300 px-4 py-2 text-left">{headers.duration}</th>
              <th className="border border-gray-300 px-4 py-2 text-left">{headers.whenWhere}</th>
              <th className="border border-gray-300 px-4 py-2 text-left">{headers.reminders}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  <input 
                    type="text" 
                    className="w-full p-1 border border-gray-200 rounded-sm" 
                    placeholder={row.practicePlaceholder}
                    value={userTableData[`${index}_practice`] || ''}
                    onChange={(e) => handleCellChange(index, 'practice', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select 
                    className="w-full p-1 border border-gray-200 rounded-sm"
                    value={userTableData[`${index}_frequency`] || ''}
                    onChange={(e) => handleCellChange(index, 'frequency', e.target.value)}
                  >
                    <option value="">Select frequency</option>
                    {frequencyOptions.map((option, optIndex) => (
                      <option key={optIndex} value={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input 
                    type="text" 
                    className="w-full p-1 border border-gray-200 rounded-sm" 
                    placeholder={row.durationPlaceholder}
                    value={userTableData[`${index}_duration`] || ''}
                    onChange={(e) => handleCellChange(index, 'duration', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input 
                    type="text" 
                    className="w-full p-1 border border-gray-200 rounded-sm" 
                    placeholder={row.whenWherePlaceholder}
                    value={userTableData[`${index}_whenWhere`] || ''}
                    onChange={(e) => handleCellChange(index, 'whenWhere', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input 
                    type="text" 
                    className="w-full p-1 border border-gray-200 rounded-sm" 
                    placeholder={row.remindersPlaceholder}
                    value={userTableData[`${index}_reminders`] || ''}
                    onChange={(e) => handleCellChange(index, 'reminders', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isSaving && (
        <div className="text-sm text-gray-500 mt-2">
          Saving your responses...
        </div>
      )}
    </div>
  );
};

export default PracticeIntegrationTable;

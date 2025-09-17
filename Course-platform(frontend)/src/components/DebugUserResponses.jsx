import React, { useEffect, useState } from 'react';
import { useUserResponses } from '../context/userResponsesContext';
import { useAuth } from '../context/authContext';

const DebugUserResponses = () => {
  const { currentUser } = useAuth();
  const { 
    userResponses, 
    unsavedChanges, 
    loading, 
    error, 
    updateResponse, 
    hasUnsavedChanges,
    getUnsavedChangesCount 
  } = useUserResponses();
  
  const [testAnswers, setTestAnswers] = useState('');

  const handleTestInput = (value) => {
    setTestAnswers(value);
    // Simulate updating a response for lesson 1, component 'test'
    updateResponse(1, 'test-component', {
      answers: { 0: value },
      type: 'exercise',
      completed: value.trim().length > 0
    });
  };

  return (
    <div className="p-6 bg-gray-100 m-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Debug User Responses</h2>
      
      <div className="space-y-4">
        <div>
          <strong>Current User:</strong> {currentUser ? currentUser.email : 'Not logged in'}
        </div>
        
        <div>
          <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
        </div>
        
        <div>
          <strong>Error:</strong> {error || 'None'}
        </div>
        
        <div>
          <strong>User Responses:</strong>
          <pre className="bg-white p-2 rounded text-xs">
            {JSON.stringify(userResponses, null, 2)}
          </pre>
        </div>
        
        <div>
          <strong>Unsaved Changes:</strong>
          <pre className="bg-white p-2 rounded text-xs">
            {JSON.stringify(unsavedChanges, null, 2)}
          </pre>
        </div>
        
        <div>
          <strong>Test Input:</strong>
          <input
            type="text"
            value={testAnswers}
            onChange={(e) => handleTestInput(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Type here to test response tracking..."
          />
        </div>
        
        <div>
          <strong>Has Unsaved Changes (Lesson 1):</strong> {hasUnsavedChanges(1) ? 'Yes' : 'No'}
        </div>
        
        <div>
          <strong>Unsaved Changes Count (Lesson 1):</strong> {getUnsavedChangesCount(1)}
        </div>
      </div>
    </div>
  );
};

export default DebugUserResponses;

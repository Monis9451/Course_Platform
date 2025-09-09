import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const RatingQuestionComponent = ({ data, isHalfWidth = false, ...props }) => {
  // Handle different ways data might be passed
  const actualData = data || props || {};
  const displayTitle = actualData.title || 'Rating Questions';
  const displayDescription = actualData.description || '';
  const displayQuestions = actualData.questions || [
    'How stressed do you feel right now?',
    'How confident are you in managing your emotions?'
  ];

  // Display mode (for course content viewing)
  return (
    <div className="mb-6">
      <div className="bg-white border border-gray-200 p-5 rounded-lg">
        <h4 className="font-medium mb-3 text-[#bd6334]">{displayTitle}</h4>
        {displayDescription && (
          <p className="text-gray-700 mb-4">{displayDescription}</p>
        )}
        
        <div className="space-y-6">
          {displayQuestions.map((question, index) => (
            <div key={index} className="space-y-3">
              <div>
                <p className="text-gray-700 mb-3">
                  {index + 1}. {question}
                </p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input 
                        type="radio" 
                        name={`question-${index}`} 
                        value={num} 
                        className="mr-1 accent-[#bd6334]" 
                      />
                      <label className="text-sm">{num}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingQuestionComponent;

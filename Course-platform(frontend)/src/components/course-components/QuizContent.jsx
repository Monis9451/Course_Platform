import React from 'react';

const QuizContent = ({ data }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="font-medium mb-4">{data.question}</p>
        <div className="space-y-2">
          {data.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full border-2 border-blue-300 flex items-center justify-center text-xs font-medium">
                {String.fromCharCode(65 + index)}
              </div>
              <span className={option.isCorrect ? 'text-green-600 font-medium' : 'text-gray-700'}>
                {option.text}
                {option.isCorrect && ' ✓'}
              </span>
            </div>
          )) || (
            <p className="text-gray-500 italic">Quiz options will appear here</p>
          )}
        </div>
        {data.explanation && (
          <div className="mt-4 p-3 bg-green-50 rounded border-l-4 border-green-400">
            <p className="text-sm text-green-800">
              <strong>Explanation:</strong> {data.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizContent;

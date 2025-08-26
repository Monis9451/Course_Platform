import React from 'react';

const QuestionCardBox = ({ data, isEditMode = false, onUpdate }) => {
  const { title, questions = [{ questionTitle: '', questionText: '', placeholder: '', consideration: '' }] } = data;

  const addQuestion = () => {
    if (onUpdate) {
      const newQuestions = [...questions, { questionTitle: '', questionText: '', placeholder: '', consideration: '' }];
      onUpdate({ ...data, questions: newQuestions });
    }
  };

  const removeQuestion = (index) => {
    if (onUpdate && questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      onUpdate({ ...data, questions: newQuestions });
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      
      {/* Questions Grid - 2 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
            {/* Edit Mode Controls */}
            {isEditMode && (
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-gray-600">Card {index + 1}</span>
                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                    type="button"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>
            )}
            
            {/* Question Title */}
            <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">
              {question.questionTitle}
            </h3>
            
            {/* Question Text */}
            <p className="mb-4 font-medium">{question.questionText}</p>
            
            {/* Textarea */}
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md h-32" 
              placeholder={question.placeholder}
              disabled={!isEditMode}
              value={question.answer || ''}
              onChange={(e) => {
                if (isEditMode && onUpdate) {
                  const newQuestions = [...questions];
                  newQuestions[index] = { ...newQuestions[index], answer: e.target.value };
                  onUpdate({ ...data, questions: newQuestions });
                }
              }}
            />
            
            {/* Consideration Text */}
            {question.consideration && (
              <div className="mt-3 text-sm text-gray-500">
                <p>{question.consideration}</p>
              </div>
            )}
          </div>
        ))}
        
        {/* Add Question Card - Only in Edit Mode */}
        {isEditMode && (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <button
              onClick={addQuestion}
              className="text-[#bd6334] font-medium hover:text-[#a0542a] transition-colors"
              type="button"
            >
              + Add Question Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCardBox;

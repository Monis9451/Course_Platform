import React from 'react';

const QuoteComponent = ({ data, title, quotes, isHalfWidth = false, ...props }) => {
  // Handle different ways data might be passed
  const actualData = data || props || {};
  const displayTitle = actualData.title || title || 'Quote Section';
  const displayQuotes = actualData.quotes || quotes || [''];

  // Filter out empty quotes for display
  const validQuotes = displayQuotes.filter(quote => quote && quote.trim() !== '');

  // If no valid quotes, show the title with empty state message
  if (validQuotes.length === 0) {
    return (
      <div className={`${isHalfWidth ? 'w-full' : 'mb-6 w-full'}`}>
        <div className="bg-white border border-gray-200 p-5 rounded-lg">
          <h4 className="font-medium mb-3 text-[#bd6334]">{displayTitle}</h4>
          <div className="space-y-4">
            <div className="bg-[#f8f0e6] p-3 rounded-md">
              <p className="text-sm italic text-gray-500">"No quotes added yet"</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display mode (for course content viewing)
  return (
    <div className={`${isHalfWidth ? 'w-full' : 'mb-6 w-full'}`}>
      <div className="bg-white border border-gray-200 p-5 rounded-lg">
        <h4 className="font-medium mb-3 text-[#bd6334]">{displayTitle}</h4>
        
        <div className="space-y-4">
          {validQuotes.map((quote, index) => (
            <div key={index} className="bg-[#f8f0e6] p-3 rounded-md">
              <p className="text-sm italic">"{quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuoteComponent;

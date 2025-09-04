import React from 'react';

const LeftBorderBox = ({ data, isHalfWidth = false }) => {
  return (
    <div className={`mb-6 ${isHalfWidth ? 'w-full' : ''}`}>
      <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
      <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-primary">
        <h3 className="font-bold text-xl mb-3 text-primary flex items-center">
          {data.boxTitle}
        </h3>
        <p className="mb-3">{data.paragraph}</p>
        <p className="italic text-primary">"{data.quote}"</p>
        
        <div className="mt-4 text-sm">
          {data.footerText}
        </div>

        {/* Render unordered list if listItems exist and have content */}
        {data.listItems && data.listItems.length > 0 && data.listItems.some(item => item.trim() !== '') && (
          <ul className="mt-4 mb-3 list-disc list-inside space-y-1">
            {data.listItems.filter(item => item.trim() !== '').map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        )}
        
      </div>
    </div>
  );
};

export default LeftBorderBox;

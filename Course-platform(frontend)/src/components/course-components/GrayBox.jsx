import React from 'react';

const GrayBox = ({ data }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
      <div className="bg-gray-100 p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">{data.boxTitle}</h3>
        <p className="mb-4 whitespace-pre-wrap">{data.paragraph}</p>
        
        {/* Render unordered list if listItems exist and have content */}
        {data.listItems && data.listItems.length > 0 && data.listItems.some(item => item.trim() !== '') && (
          <ul className="mb-4 list-disc list-inside space-y-1">
            {data.listItems.filter(item => item.trim() !== '').map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        )}
        
        <p className="italic">{data.italicLines}</p>
      </div>
    </div>
  );
};

export default GrayBox;

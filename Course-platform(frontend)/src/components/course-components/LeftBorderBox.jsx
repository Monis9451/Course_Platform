import React from 'react';

const LeftBorderBox = ({ data }) => {
  return (
    <div className="mb-6">
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
      </div>
    </div>
  );
};

export default LeftBorderBox;

import React from 'react';

const GrayBox = ({ data }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
      <div className="bg-gray-100 p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">{data.boxTitle}</h3>
        <p className="mb-4">{data.paragraph}</p>
        <p className="italic">{data.italicLines}</p>
      </div>
    </div>
  );
};

export default GrayBox;

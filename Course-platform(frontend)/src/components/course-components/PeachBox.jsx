import React from 'react';

const PeachBox = ({ data }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
      <div className="bg-[#FFF1DC] p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-primary">{data.boxTitle}</h3>
        <p className="mb-4">{data.paragraph}</p>
        <div className="flex items-center">
          <p className="italic">{data.italicLines}</p>
        </div>
      </div>
    </div>
  );
};

export default PeachBox;

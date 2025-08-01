import React from 'react';

const TextContent = ({ data }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {data.content}
      </div>
    </div>
  );
};

export default TextContent;

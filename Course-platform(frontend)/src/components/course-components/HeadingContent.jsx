import React from 'react';

const HeadingContent = ({ data }) => {
  return (
    <div className="mb-4">
      <h1 className="text-black text-2xl mb-6 text-center">{data.content || data.title || 'Heading'}</h1>
    </div>
  );
};

export default HeadingContent;

import React from 'react';

const HeadingContent = ({ data, title, content, ...props }) => {
  // Handle different ways data might be passed
  const actualData = data || props || {};
  const displayContent = actualData.content || actualData.title || title || content || 'Heading';

  return (
    <div className="mb-4">
      <h1 className="text-black text-2xl mb-6 text-center">{displayContent}</h1>
    </div>
  );
};

export default HeadingContent;

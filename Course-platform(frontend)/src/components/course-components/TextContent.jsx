import React from 'react';

const TextContent = ({ data, title, content, ...props }) => {
  // Handle different ways data might be passed
  const actualData = data || props || {};
  const displayTitle = actualData.title || title || 'Content';
  const displayContent = actualData.content || content || actualData.text || '';

  // If content is empty, don't render anything
  if (!displayContent) {
    return null;
  }

  return (
    <div className="mb-6">
      {displayTitle && displayTitle !== 'Content' && (
        <h3 className="text-xl font-semibold mb-3 text-[#bd6334]">{displayTitle}</h3>
      )}
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {displayContent}
      </div>
    </div>
  );
};

export default TextContent;

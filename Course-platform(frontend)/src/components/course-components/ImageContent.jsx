import React from 'react';

const ImageContent = ({ data }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
      <div className="rounded-lg overflow-hidden bg-gray-100">
        {data.imageUrl ? (
          <img
            src={data.imageUrl}
            alt={data.alt || data.title}
            className="w-full h-auto max-h-96 object-contain"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">🖼️</div>
              <p>Image will appear here</p>
            </div>
          </div>
        )}
      </div>
      {data.caption && (
        <p className="mt-3 text-sm text-gray-600 italic">{data.caption}</p>
      )}
    </div>
  );
};

export default ImageContent;

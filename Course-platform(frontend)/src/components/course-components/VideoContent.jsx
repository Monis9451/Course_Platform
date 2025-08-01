import React from 'react';

const VideoContent = ({ data }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {data.videoUrl ? (
          <video
            controls
            className="w-full h-full object-cover"
            poster={data.thumbnailUrl}
          >
            <source src={data.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">🎥</div>
              <p>Video will appear here</p>
            </div>
          </div>
        )}
      </div>
      {data.description && (
        <p className="mt-3 text-gray-600">{data.description}</p>
      )}
    </div>
  );
};

export default VideoContent;

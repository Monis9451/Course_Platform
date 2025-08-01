import React from 'react';

const AudioContent = ({ data }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        {data.audioUrl ? (
          <audio controls className="w-full">
            <source src={data.audioUrl} type="audio/mpeg" />
            <source src={data.audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <div className="w-full h-16 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-2xl mb-1">🎵</div>
              <p className="text-sm">Audio will appear here</p>
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

export default AudioContent;

import React, { useState, useRef, useEffect } from 'react';

const AudioContent = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleLoadedData = () => setIsLoading(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [data.audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getAudioFileName = () => {
    if (!data.audioUrl) return "Audio File";
    const urlParts = data.audioUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    return fileName || data.title || "Audio File";
  };

  return (
    <div className="mb-8">
      <h2 className="font-semibold text-lg mb-3">LISTEN</h2>
      
      <div className="bg-primary p-1 rounded-md">
        {data.audioUrl ? (
          <div>
            <audio ref={audioRef} src={data.audioUrl} preload="metadata" />
            <button 
              onClick={togglePlay}
              className="flex items-center w-full px-4 py-3 bg-primary text-white hover:bg-gray-900 rounded-md transition-colors duration-200"
            >
              <span className="flex-shrink-0 mr-3">
                {isLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                ) : isPlaying ? (
                  <div className="flex space-x-0.5">
                    <div className="w-1 h-4 bg-white rounded-full"></div>
                    <div className="w-1 h-4 bg-white rounded-full"></div>
                  </div>
                ) : (
                  "▶"
                )}
              </span>
              
              {!isPlaying ? (
                <span className="text-sm">{getAudioFileName()}</span>
              ) : (
                <div className="flex-1 flex items-center space-x-3">
                  <div 
                    className="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProgressClick(e);
                    }}
                  >
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-100"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-300 flex space-x-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}
            </button>
          </div>
        ) : (
          <button className="flex items-center w-full px-4 py-3 bg-primary text-white rounded-md cursor-not-allowed opacity-50">
            <span className="flex-shrink-0 mr-3">▶</span>
            <span className="text-sm">No audio file available</span>
          </button>
        )}
      </div>
      
      {data.description && (
        <p className="mt-3 text-gray-600">{data.description}</p>
      )}
    </div>
  );
};

export default AudioContent;

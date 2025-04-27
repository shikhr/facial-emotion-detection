import React from 'react';
import LoadingOverlay from './LoadingOverlay';

const VideoDetector = ({
  videoRef,
  isLoading,
  loadingError,
  isCanvasVisible,
  handleVideoPlay,
  toggleCanvasVisibility,
}) => {
  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay muted onPlay={handleVideoPlay} />

      {!isLoading && (
        <button
          className="canvas-toggle-button"
          onClick={toggleCanvasVisibility}
          title={
            isCanvasVisible
              ? 'Hide detection overlay'
              : 'Show detection overlay'
          }
        >
          {isCanvasVisible ? 'Hide Outline' : 'Show Outline'}
        </button>
      )}

      {isLoading && <LoadingOverlay loadingError={loadingError} />}
    </div>
  );
};

export default VideoDetector;

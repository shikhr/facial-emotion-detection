import React from 'react';
import './App.css';
import { useFaceDetection } from './hooks/useFaceDetection';
import EmotionDisplay from './components/EmotionDisplay';
import VideoDetector from './components/VideoDetector';

function App() {
  const {
    videoRef,
    isLoading,
    loadingError,
    currentEmotion,
    isCanvasVisible,
    handleVideoPlay,
    toggleCanvasVisibility,
  } = useFaceDetection();

  return (
    <div className="app">
      <div className="content-container">
        <header>
          <h1>Face Emotion Recognition</h1>
          <p className="subtitle">Real-time facial expression analysis</p>
        </header>

        <div className={`main-content ${isLoading ? 'loading' : 'loaded'}`}>
          <VideoDetector
            videoRef={videoRef}
            isLoading={isLoading}
            loadingError={loadingError}
            isCanvasVisible={isCanvasVisible}
            handleVideoPlay={handleVideoPlay}
            toggleCanvasVisibility={toggleCanvasVisibility}
          />

          <EmotionDisplay
            isLoading={isLoading}
            currentEmotion={currentEmotion}
          />
        </div>

        <footer>
          <p>© {new Date().getFullYear()} Face Emotion Recognition App</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

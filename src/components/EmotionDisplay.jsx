import React from 'react';
import { getEmotionColor } from '../utils/emotionUtils';

const EmotionDisplay = ({ isLoading, currentEmotion }) => {
  return (
    <div
      className="emotion-display"
      style={
        isLoading
          ? {}
          : currentEmotion
          ? {
              borderColor: getEmotionColor(currentEmotion.emotion),
              backgroundColor: `${getEmotionColor(currentEmotion.emotion)}22`,
            }
          : {}
      }
    >
      <h2>{isLoading ? 'Loading Models' : 'Detected Emotion'}</h2>
      {isLoading ? (
        <div className="loading-status">
          <div className="loading-spinner"></div>
          <p>Preparing face detection...</p>
        </div>
      ) : currentEmotion ? (
        <>
          <div
            className="emotion-name"
            style={{ color: getEmotionColor(currentEmotion.emotion) }}
          >
            {currentEmotion.emotion.toUpperCase()}
          </div>
          <div className="emotion-confidence">
            Confidence: {Math.round(currentEmotion.probability * 100)}%
          </div>
        </>
      ) : (
        <div className="no-emotion">No face detected</div>
      )}
    </div>
  );
};

export default EmotionDisplay;

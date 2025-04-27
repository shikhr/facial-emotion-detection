// Utility functions for emotion detection and display

/**
 * Find the dominant emotion from the face expression detection
 * @param {Object} expressions - The expression data from faceapi
 * @returns {Object} - The dominant emotion and its probability
 */
export const findDominantEmotion = (expressions) => {
  if (!expressions) return null;

  return Object.entries(expressions).reduce(
    (dominant, [emotion, probability]) => {
      return probability > dominant.probability
        ? { emotion, probability }
        : dominant;
    },
    { emotion: 'neutral', probability: 0 }
  );
};

/**
 * Get a color associated with an emotion
 * @param {string} emotion - The emotion name
 * @returns {string} - The color for the emotion
 */
export const getEmotionColor = (emotion) => {
  const colors = {
    happy: '#FFC107',
    sad: '#2196F3',
    angry: '#F44336',
    fearful: '#9C27B0',
    disgusted: '#4CAF50',
    surprised: '#FF9800',
    neutral: '#607D8B',
  };

  return colors[emotion] || colors.neutral;
};

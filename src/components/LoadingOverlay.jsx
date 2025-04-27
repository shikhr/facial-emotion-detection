import React from 'react';

const LoadingOverlay = ({ loadingError }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Loading face detection models...</p>
      {loadingError && (
        <div className="error-message">
          Error: {loadingError}
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default LoadingOverlay;

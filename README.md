# Face Emotion Recognition App

A real-time facial expression analysis application built with React and face-api.js. This application uses your webcam to detect faces and analyze emotions in real-time.

[Live Demo](https://shikhr.github.io/facial-emotion-detection/)

![Face Emotion Recognition Demo](/public/demo.png)

## Features

- Real-time face detection
- Emotion recognition (happy, sad, angry, fearful, disgusted, surprised, neutral)
- Display of emotion confidence levels
- Toggle face detection overlay visibility
- Responsive design for various screen sizes
- Elegant UI with emotion-specific color coding

## Technologies Used

- React.js
- Vite
- face-api.js (TensorFlow.js-based face detection)
- CSS3 with flexbox and grid
- Modern JavaScript (ES6+)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Modern web browser with camera access
- Webcam/camera device

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/face-emotion-recognition-react.git
   cd face-emotion-recognition-react
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the URL provided in the terminal)

## Usage

1. When you first open the application, you'll be prompted to allow camera access. Accept this request.
2. The application will begin loading the face detection models (this may take a few moments depending on your internet connection).
3. Once loaded, your camera feed will appear and the application will begin detecting faces and emotions.
4. The detected emotion and confidence level will be displayed in the panel to the right of the video feed.
5. Use the "Show/Hide Outline" button to toggle the visibility of the face detection outline.

## Project Structure

```
src/
├── components/              # UI components
│   ├── EmotionDisplay.jsx   # Emotion visualization component
│   ├── LoadingOverlay.jsx   # Loading screen component
│   └── VideoDetector.jsx    # Camera feed component
├── hooks/
│   └── useFaceDetection.js  # Core face detection logic
├── utils/
│   └── emotionUtils.js      # Utility functions for emotion data
├── App.jsx                  # Main application component
└── main.jsx                 # Application entry point
```

## How It Works

The application uses TensorFlow.js and face-api.js to:

1. Detect faces in the video stream
2. Extract facial landmarks
3. Analyze facial expressions
4. Determine the dominant emotion
5. Provide a confidence score for the detected emotion

The models are loaded from the `public/models` directory and run entirely in the browser - no server processing or data transfer is required.

## Browser Compatibility

This application works best in modern browsers that support the Web Camera API:

- Chrome (recommended)
- Firefox
- Edge
- Safari

## Troubleshooting

- **Camera not working**: Ensure you've granted camera permissions to the site
- **Slow performance**: Try closing other applications or tabs that might be using system resources
- **Models not loading**: Check your internet connection and try refreshing the page

## License

[MIT License](LICENSE)

## Acknowledgments

- [face-api.js](https://github.com/justadudewhohacks/face-api.js) for the face detection models
- [Vite](https://vitejs.dev/) for the fast development environment
- [React](https://reactjs.org/) for the UI library

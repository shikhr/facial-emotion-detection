import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { findDominantEmotion } from '../utils/emotionUtils';

export const useFaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [isCanvasVisible, setIsCanvasVisible] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      try {
        const MODEL_URL = './models';

        console.log('Starting to load models from:', MODEL_URL);

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);

        console.log('Models loaded successfully');
        startVideo();
      } catch (error) {
        console.error('Error loading models:', error);
        setLoadingError(`Model loading error: ${error.message}`);
        setIsLoading(false);
      }
    };

    loadModels();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const handleResize = () => {
        if (videoRef.current && canvasRef.current) {
          const displayedWidth = videoRef.current.clientWidth;
          const displayedHeight = videoRef.current.clientHeight;

          canvasRef.current.width = displayedWidth;
          canvasRef.current.height = displayedHeight;

          faceapi.matchDimensions(canvasRef.current, {
            width: displayedWidth,
            height: displayedHeight,
          });

          console.log('Resized canvas to:', displayedWidth, displayedHeight);
        }
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isLoading]);

  const startVideo = () => {
    if (!videoRef.current) {
      console.error('Video element still not available');
      setLoadingError('Video element not found. Please refresh the page.');
      setIsLoading(false);
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        console.log('Camera accessed successfully');
        videoRef.current.srcObject = stream;
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
        setLoadingError(`Failed to access camera: ${err.message}`);
        setIsLoading(false);
      });
  };

  const handleVideoPlay = () => {
    console.log('Video is playing, setting up detection');

    if (!canvasRef.current) {
      try {
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvasRef.current = canvas;

        const videoContainer = videoRef.current.parentElement;
        if (videoContainer) {
          videoContainer.appendChild(canvas);
        } else {
          console.error('Video container not found');
          return;
        }
      } catch (err) {
        console.error('Error creating canvas:', err);
        return;
      }
    }

    if (canvasRef.current) {
      canvasRef.current.style.display = isCanvasVisible ? 'block' : 'none';
    }

    const displayedWidth = videoRef.current.clientWidth;
    const displayedHeight = videoRef.current.clientHeight;

    canvasRef.current.width = displayedWidth;
    canvasRef.current.height = displayedHeight;

    const displaySize = {
      width: displayedWidth,
      height: displayedHeight,
    };

    faceapi.matchDimensions(canvasRef.current, displaySize);

    const interval = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, {
          width: canvasRef.current.width,
          height: canvasRef.current.height,
        });

        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (isCanvasVisible) {
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
        }

        if (detections.length > 0) {
          const dominantEmotion = findDominantEmotion(
            detections[0].expressions
          );
          if (dominantEmotion) {
            setCurrentEmotion(dominantEmotion);
          }
        } else {
          setCurrentEmotion(null);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  };

  const toggleCanvasVisibility = () => {
    setIsCanvasVisible((prev) => !prev);
    if (canvasRef.current) {
      canvasRef.current.style.display = isCanvasVisible ? 'none' : 'block';
    }
  };

  return {
    videoRef,
    isLoading,
    loadingError,
    currentEmotion,
    isCanvasVisible,
    handleVideoPlay,
    toggleCanvasVisibility,
  };
};

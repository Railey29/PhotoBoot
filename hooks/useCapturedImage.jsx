import { useRef, useState } from "react";

export default function useCapturedImage() {
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showChoices, setShowChoices] = useState(false);

  const capture = () => {
    if (!isCapturing && webcamRef.current) {
      setIsCapturing(true);
      setShowChoices(false); // Reset choices when capturing starts
      const photos = [];
      let count = 0;

      const captureWithDelay = () => {
        if (count < 3 && webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          if (imageSrc) {
            photos.push(imageSrc);
            setCapturedImages((prevImages) => [...prevImages, imageSrc]);
          }
          count++;
          setTimeout(captureWithDelay, 3000); // Capture every 3 seconds
        } else {
          setIsCapturing(false); // Reset capturing state after 3 captures
          setShowChoices(true); // Show choices after capturing 3 images
        }
      };

      // Delay 3 seconds before the first capture
      setTimeout(() => {
        captureWithDelay();
      }, 3000);
    }
  };

  const tryAgain = () => {
    setCapturedImages([]);
    setShowChoices(false);
  };

  return {
    capturedImages,
    isCapturing,
    capture,
    showChoices,
    tryAgain,
    webcamRef,
  };
}

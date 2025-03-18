import React, { useState } from "react";
import useCapturedImage from "./useCapturedImage";
export default function useShowChoices() {
  const { capturedImages, isCapturing, capture, webcamRef } =
    useCapturedImage();

  const [showChoices, setShowChoices] = useState(false);
  const handleCapture = () => {
    capture(); // Capture the 3 photos
    setTimeout(() => {
      setShowChoices(true); // Show buttons after 3 photos
    }, 9000); // Delay to show choices after the capture (3 x 3 seconds)
  };

  const tryAgain = () => {
    setShowChoices(false);
    // Reset captured images or implement reset logic if needed
  };

  const continuePhotos = () => {
    alert("Proceeding without collage..."); // You can replace this with actual navigation
  };
  return { handleCapture, showChoices, tryAgain, continuePhotos };
}

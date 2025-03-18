import React from "react";
import Webcam from "react-webcam";
import useCapturedImage from "@/hooks/useCapturedImage";

export default function PhotoModeComponents() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const {
    capturedImages,
    isCapturing,
    capture,
    showChoices,
    tryAgain,
    webcamRef,
  } = useCapturedImage();

  // Function to download the images
  const downloadImages = () => {
    capturedImages.forEach((image, index) => {
      const link = document.createElement("a");
      link.href = image; // Image source in base64 format
      link.download = `Photo-${index + 1}.jpg`; // File name for each image
      document.body.appendChild(link); // Append the link to the body (required for the download to work)
      link.click(); // Trigger download
      document.body.removeChild(link); // Remove the link after download
      window.location.href = "/PhotoCollage";
    });
  };

  return (
    <div className="flex justify-center items-center h-screen position-absolute">
      {/* Webcam Display */}
      <Webcam
        audio={false}
        height={500}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={500}
        videoConstraints={videoConstraints}
        className="absolute md:top-1 md:left-1"
      />

      {/* Capture Button */}
      {!showChoices && (
        <button
          onClick={capture}
          disabled={isCapturing} // Disable button while capturing
          className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded absolute md:top-70 md:left-50 ${
            isCapturing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isCapturing ? "Capturing..." : "Capture 4 Photos"}
        </button>
      )}

      {/* Display the captured images in a single row */}
      <div className="absolute md:top-90 md:left-20 flex gap-4 mt-4">
        {capturedImages.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={image}
              alt={`Captured ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <p className="text-center text-sm mt-2">Photo {index + 1}</p>
          </div>
        ))}
      </div>

      {/* Show Choices after capturing 3 photos */}
      {showChoices && (
        <div className="absolute bottom-10 flex space-x-4">
          <button
            onClick={tryAgain}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
          <button
            onClick={downloadImages} // Call the function to download images
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue & Download Photos
          </button>
        </div>
      )}
    </div>
  );
}

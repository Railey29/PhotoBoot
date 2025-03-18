import React, { useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

// PhotoStrip component with border styles
const PhotoStrip = ({ capturedImages, borderStyle }) => {
  return (
    <div className={`flex overflow-x-auto space-x-4 p-4 ${borderStyle}`}>
      {capturedImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.3, duration: 0.5 }}
          className={`rounded-lg p-2 ${borderStyle}`} // Apply selected border style
        >
          <img
            src={image}
            alt={`Captured ${index + 1}`}
            className="w-64 h-64 object-cover"
            style={{ filter: "brightness(1.2) contrast(1.3)" }} // Apply filter
          />
        </motion.div>
      ))}
    </div>
  );
};

// Main component for the photo strip with drag-and-drop functionality and border choices
export default function PhotoStripBooth() {
  const [capturedImages, setCapturedImages] = useState([]);
  const [selectedBorder, setSelectedBorder] = useState(
    "border-8 border-pink-300"
  ); // Default border

  // Border style options
  const borderOptions = [
    { label: "Pink Border", value: "border-8 border-pink-300" },
    { label: "Blue Border", value: "border-8 border-blue-300" },
    { label: "Green Border", value: "border-8 border-green-300" },
    { label: "Dashed Border", value: "border-4 border-dashed border-gray-400" },
  ];

  // Handle border selection
  const handleBorderChange = (event) => {
    setSelectedBorder(event.target.value);
  };

  // Handle dropped images
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const newImages = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result); // Base64 image data
        if (newImages.length === files.length) {
          setCapturedImages((prevImages) => [...prevImages, ...newImages]); // Add new images
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Prevent the default behavior for dragover
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to download collage as an image
  const downloadPhotoStrip = () => {
    const strip = document.querySelector("#strip-container");
    if (strip) {
      html2canvas(strip).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "photo-strip.jpg";
        link.click();
      });
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen border-4 border-dashed border-gray-400 rounded-lg p-4"
      onDrop={handleDrop} // Handle image drop
      onDragOver={handleDragOver} // Allow dragging
    >
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Drag & Drop Images Here
        </h2>
        <p className="text-sm text-gray-500">
          Drop your images below to create a photo strip
        </p>
      </div>

      {/* Border Style Selection */}
      <div className="mb-4">
        <label htmlFor="borderStyle" className="mr-2">
          Select Border Style:{" "}
        </label>
        <select
          id="borderStyle"
          value={selectedBorder}
          onChange={handleBorderChange}
          className="p-2 border rounded-md"
        >
          {borderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Drop area and photo strip */}
      {capturedImages.length > 0 ? (
        <div id="strip-container" className="w-full">
          <PhotoStrip
            capturedImages={capturedImages}
            borderStyle={selectedBorder}
          />
        </div>
      ) : (
        <div className="w-64 h-64 bg-gray-100 flex justify-center items-center rounded-lg">
          <p className="text-gray-400">No Images Yet</p>
        </div>
      )}

      {/* Download button */}
      {capturedImages.length > 0 && (
        <button
          onClick={downloadPhotoStrip}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download Photo Strip
        </button>
      )}
    </div>
  );
}

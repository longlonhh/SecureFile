import React from "react";

export default function UploadBox({ onUpload, setSelectedFiles }) {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      if (onUpload) onUpload(selectedFiles);
      if (setSelectedFiles)
        setSelectedFiles(selectedFiles.map((f) => f.name));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      if (onUpload) onUpload(droppedFiles);
      if (setSelectedFiles)
        setSelectedFiles(droppedFiles.map((f) => f.name));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className="flex flex-col items-center justify-center border-2 border-dashed border-purple-400/50 
      rounded-2xl p-16 w-[70%] text-center bg-black/20 backdrop-blur-md 
      hover:bg-white/5 transition-all duration-300"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-2xl font-bold mb-2">Drag & Drop Files Here</h2>
      <p className="text-gray-300 mb-4">or</p>

      <label
        className="px-5 py-2 bg-purple-600 hover:bg-purple-700 
        text-white font-semibold rounded-xl cursor-pointer 
        transition-all duration-300"
      >
        Choose Files
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

import React, { useState } from "react";
import UploadBox from "../components_upload/UploadBox";
import UploadConfirmModal from "../components_upload/UploadConfirmModal";
import FavoriteToolbar from "../components_favorite/FavoriteToolbar";
import UnfavoriteToolbar from "../components_favorite/UnfavoriteToolbar";

export default function UploadPage({ uploadedFiles, setUploadedFiles, user, onLogout }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [pendingFile, setPendingFile] = useState(null);

  const handleFileUpload = (newFiles) => {
    if (newFiles.length > 0) setPendingFile(newFiles[0]);
  };

  const handleConfirmUpload = (options) => {
    if (!pendingFile) return;

    const newFile = {
      id: Date.now(),
      name: pendingFile.name,
      size: pendingFile.size,
      favorite: options.favorite,
      encryptStatus: options.encryptStatus, 
      password: options.password,
      uploadedAt: new Date().toLocaleString(),
    };

    setUploadedFiles([...uploadedFiles, newFile]);
    setPendingFile(null);
    alert(`Đã tải lên "${newFile.name}" thành công ✅`);
  };

  const handleCancelUpload = () => setPendingFile(null);

  const handleFavorite = () => {
    const updated = uploadedFiles.map(f =>
      selectedFiles.includes(f.id) ? { ...f, favorite: true } : f
    );
    setUploadedFiles(updated);
    setSelectedFiles([]);
  };

  const handleUnfavorite = () => {
    const updated = uploadedFiles.map(f =>
      selectedFiles.includes(f.id) ? { ...f, favorite: false } : f
    );
    setUploadedFiles(updated);
    setSelectedFiles([]);
  };

  return (
    <div className="w-full text-white relative flex flex-col items-center justify-center">
      {pendingFile && (
        <UploadConfirmModal
          file={pendingFile}
          onConfirm={handleConfirmUpload}
          onCancel={handleCancelUpload}
        />
      )}

      <div className="flex gap-3 mb-6">
        <FavoriteToolbar onFavorite={handleFavorite} disabled={selectedFiles.length === 0} />
        <UnfavoriteToolbar onUnfavorite={handleUnfavorite} disabled={selectedFiles.length === 0} />
      </div>

      <UploadBox onUpload={handleFileUpload} setSelectedFiles={setSelectedFiles} />
    </div>
  );
}

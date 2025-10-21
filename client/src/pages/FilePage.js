import React, { useState } from "react";
import FileSearchBar from "../components_file/FileSearchBar";
import FileToolbar from "../components_file/FileToolbar";
import FileTable from "../components_file/FileTable";
import ConfirmDeleteModal from "../components_file/ConfirmDeleteModal";

export default function FilePage({ uploadedFiles, setUploadedFiles }) {
  const [search, setSearch] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => setShowConfirm(true);
  const confirmDelete = () => {
    const remaining = uploadedFiles.filter(f => !selectedFiles.includes(f.id));
    setUploadedFiles(remaining);
    setSelectedFiles([]);
    setShowConfirm(false);
  };

  const handleShare = () => alert(`Đã share ${selectedFiles.length} file`);

  const filteredFiles = uploadedFiles.filter(
  (f) => f && f.name && typeof f.name === "string" && f.name.toLowerCase().includes(search.toLowerCase())
);


  return (
    <div className="w-full text-white relative">
      <div className="flex justify-between items-center mb-6">
        <FileSearchBar search={search} setSearch={setSearch} />
        <FileToolbar onShare={handleShare} onDelete={handleDelete} disabled={selectedFiles.length === 0} />
      </div>

      <FileTable files={filteredFiles} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} setFiles={setUploadedFiles} />

      {showConfirm && (
        <ConfirmDeleteModal count={selectedFiles.length} onConfirm={confirmDelete} onCancel={() => setShowConfirm(false)} />
      )}
    </div>
  );
}

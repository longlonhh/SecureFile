import React, { useState, useEffect } from "react";
import FileSearchBar from "../components_file/FileSearchBar";
import FileToolbar from "../components_file/FileToolbar";
import FileTable from "../components_file/FileTable";
import ConfirmDeleteModal from "../components_file/ConfirmDeleteModal";
import UnfavoriteToolbar from "../components_favorite/UnfavoriteToolbar"; // ⬅️ thêm mới

export default function FavoritePage() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    const favorites = stored.filter((f) => f.favorite === true);
    setFiles(favorites);
  }, []);

  const handleDelete = () => setShowConfirm(true);

  const confirmDelete = () => {
    const remaining = files.filter((f) => !selectedFiles.includes(f.name));
    setFiles(remaining);

    // Xóa khỏi localStorage
    const all = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    const updated = all.filter((f) => !selectedFiles.includes(f.name));
    localStorage.setItem("uploadedFiles", JSON.stringify(updated));

    setSelectedFiles([]);
    setShowConfirm(false);
  };

  const handleShare = () => {
    alert(`Đã share ${selectedFiles.length} file`);
  };

  // 🔹 Bỏ yêu thích nhiều file cùng lúc
  const handleUnfavorite = () => {
    const all = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    const updated = all.map((f) =>
      selectedFiles.includes(f.name) ? { ...f, favorite: false } : f
    );
    localStorage.setItem("uploadedFiles", JSON.stringify(updated));

    const favorites = updated.filter((f) => f.favorite === true);
    setFiles(favorites);
    setSelectedFiles([]);
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full text-white relative">
      <div className="flex justify-between items-center mb-6">
        <FileSearchBar search={search} setSearch={setSearch} />

        <div className="flex gap-3">
          <FileToolbar
            onShare={handleShare}
            onDelete={handleDelete}
            disabled={selectedFiles.length === 0}
          />
          <UnfavoriteToolbar
            onUnfavorite={handleUnfavorite}
            disabled={selectedFiles.length === 0}
          />
        </div>
      </div>

      <FileTable
        files={filteredFiles}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        setFiles={setFiles}
      />

      {showConfirm && (
        <ConfirmDeleteModal
          count={selectedFiles.length}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

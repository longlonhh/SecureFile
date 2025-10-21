import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FileActionsMenu({ file, setFiles, setMenuOpen }) {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");

  const toggleFavorite = () => {
    const current = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    const updated = current.map((f) =>
      f.name === file.name ? { ...f, favorite: !f.favorite } : f
    );
    localStorage.setItem("uploadedFiles", JSON.stringify(updated));
    setFiles(updated);
  };

  const handleEncryptDecrypt = () => {
    setShowPasswordPrompt(true);
  };

  const confirmPassword = () => {
    if (!password.trim()) {
      alert("Vui lòng nhập mật khẩu!");
      return;
    }

    const current = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    const updated = current.map((f) =>
      f.name === file.name
        ? {
            ...f,
            encryptStatus: f.encryptStatus === "encrypt" ? "decrypt" : "encrypt",
          }
        : f
    );

    localStorage.setItem("uploadedFiles", JSON.stringify(updated));
    setFiles(updated);
    setShowPasswordPrompt(false);
    setMenuOpen(false);
    setPassword("");
  };

  const shareFile = () => alert(`Share ${file.name}`);

  const deleteFile = () => {
    if (window.confirm(`Xóa file "${file.name}"?`)) {
      const current = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
      const updated = current.filter((f) => f.name !== file.name);
      localStorage.setItem("uploadedFiles", JSON.stringify(updated));
      setFiles(updated);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <div className="absolute right-4 bg-white/10 border border-white/20 rounded-md backdrop-blur-md text-sm z-40 shadow-lg overflow-hidden">
        <button
          onClick={toggleFavorite}
          className="block w-full text-left px-4 py-2 hover:bg-white/20 flex justify-between"
        >
          <span>{file.favorite ? "Unfavorite" : "Favorite"}</span>
        </button>

        <button
          onClick={handleEncryptDecrypt}
          className="block w-full text-left px-4 py-2 hover:bg-white/20"
        >
          {file.encryptStatus === "encrypt" ? "Decrypt" : "Encrypt"}
        </button>

        <button
          onClick={shareFile}
          className="block w-full text-left px-4 py-2 hover:bg-white/20"
        >
          Share
        </button>

        <button
          onClick={deleteFile}
          className="block w-full text-left px-4 py-2 hover:bg-red-500/30 text-red-300"
        >
          Delete
        </button>
      </div>

      <AnimatePresence>
        {showPasswordPrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center z-[9999]" 
          >
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-[320px]">
              <h3 className="text-lg mb-4 text-white text-center">
                Nhập mật khẩu để{" "}
                {file.encryptStatus === "encrypt" ? "giải mã" : "mã hóa"} file
              </h3>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPasswordPrompt(false)}
                  className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmPassword}
                  className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

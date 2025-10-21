import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLock,
  FaUnlock,
  FaEllipsisV,
  FaFileAlt,
  FaFileImage,
  FaFileVideo,
} from "react-icons/fa";
import FileActionsMenu from "./FileActionsMenu";

export default function FileRow({
  file,
  selected,
  selectedFiles,
  setSelectedFiles,
  setFiles,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSelect = () => {
    if (selected) {
      setSelectedFiles(selectedFiles.filter((name) => name !== file.name));
    } else {
      setSelectedFiles([...selectedFiles, file.name]);
    }
  };

  const getFileIcon = () => {
    if (file.name.endsWith(".jpg") || file.name.endsWith(".png"))
      return <FaFileImage className="text-blue-300" />;
    if (file.name.endsWith(".mp4"))
      return <FaFileVideo className="text-purple-300" />;
    return <FaFileAlt className="text-green-300" />;
  };

  const getEncryptStatus = () => {
    if (file.encryptStatus === "encrypt") {
      return (
        <div className="flex items-center justify-center gap-2 text-green-300">
          <FaLock /> <span>Encrypted</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center gap-2 text-yellow-300">
          <FaUnlock /> <span>Decrypted</span>
        </div>
      );
    }
  };

  return (
    <tr
      className={`hover:bg-white/5 transition border-b border-white/5 text-sm ${
        selected ? "bg-white/10" : ""
      }`}
    >
      <td className="py-3 px-4">
        <input type="checkbox" checked={selected} onChange={toggleSelect} />
      </td>
      <td className="py-3 px-4 flex items-center gap-2">
        {getFileIcon()} {file.name}
      </td>
      <td className="py-3 px-4">{file.size || "—"}</td>
      <td className="py-3 px-4">{file.date || "—"}</td>
      <td className="py-3 px-4 text-center">{getEncryptStatus()}</td>
      <td className="py-3 px-4 text-center relative">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FaEllipsisV className="hover:text-gray-300" />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute right-6 top-2 z-10"
            >
              <FileActionsMenu
                file={file}
                setFiles={setFiles}
                setMenuOpen={setMenuOpen}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </td>
    </tr>
  );
}

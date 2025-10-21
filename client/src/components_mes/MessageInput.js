import React, { useState } from "react";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onSend({
          type: "file",
          fileName: file.name,
          fileData: e.target.result,
          time: new Date().toLocaleTimeString(),
        });
        setFile(null);
      };
      reader.readAsDataURL(file);
    } else if (text.trim()) {
      onSend({
        type: "text",
        text,
        time: new Date().toLocaleTimeString(),
      });
      setText("");
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
      {/* Nút chọn file */}
      <label htmlFor="fileInput" className="cursor-pointer text-purple-300 text-xl">
        <FaPaperclip />
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      {/* Ô nhập tin nhắn */}
      <input
        type="text"
        value={text}
        placeholder="Nhập tin nhắn..."
        onChange={(e) => setText(e.target.value)}
        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* Nút gửi */}
      <button
        onClick={handleSend}
        className="bg-purple-600/70 hover:bg-purple-700/80 p-2 rounded-xl transition-all text-white"
      >
        <FaPaperPlane />
      </button>
    </div>
  );
}

import React from "react";

export default function FileToolbar({ onShare, onDelete, disabled }) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onShare}
        disabled={disabled}
        className={`px-3 py-1 rounded-lg transition ${
          disabled
            ? "bg-white/5 text-gray-400 cursor-not-allowed"
            : "bg-white/10 hover:bg-white/20"
        }`}
      >
        Share
      </button>
      <button
        onClick={onDelete}
        disabled={disabled}
        className={`px-3 py-1 rounded-lg transition ${
          disabled
            ? "bg-red-500/20 text-gray-400 cursor-not-allowed"
            : "bg-red-500/60 hover:bg-red-600"
        }`}
      >
        Delete
      </button>
    </div>
  );
}

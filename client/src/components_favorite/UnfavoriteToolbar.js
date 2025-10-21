import React from "react";
import { StarOff } from "lucide-react";

export default function UnfavoriteToolbar({ onUnfavorite, disabled }) {
  return (
    <button
      onClick={onUnfavorite}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-white 
      transition-all duration-200 
      ${disabled 
        ? "opacity-50 cursor-not-allowed" 
        : "hover:bg-red-500/20 hover:border-red-400/60"}`}
    >
      <StarOff size={18} className="text-red-400" />
      <span>Unfavorite</span>
    </button>
  );
}

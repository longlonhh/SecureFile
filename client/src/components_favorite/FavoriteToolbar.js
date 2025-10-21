import React from "react";
import { Star } from "lucide-react";

export default function FavoriteToolbar({ onFavorite, disabled }) {
  return (
    <button
      onClick={onFavorite}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-white 
      transition-all duration-200 
      ${disabled 
        ? "opacity-50 cursor-not-allowed" 
        : "hover:bg-purple-500/20 hover:border-purple-400/60"}`}
    >
      <Star size={18} className="text-yellow-400" />
      <span>Favorite</span>
    </button>
  );
}

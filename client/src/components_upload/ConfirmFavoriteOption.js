import React from "react";

export default function ConfirmFavoriteOption({ wantFavorite, setWantFavorite }) {
  return (
    <div className="flex items-center mb-3">
      <input
        type="checkbox"
        id="favorite"
        checked={wantFavorite}
        onChange={(e) => setWantFavorite(e.target.checked)}
        className="mr-3 w-4 h-4 accent-purple-500"
      />
      <label htmlFor="favorite">Thêm vào mục yêu thích 💜</label>
    </div>
  );
}

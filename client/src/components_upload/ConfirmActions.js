import React from "react";

export default function ConfirmActions({ onCancel, onConfirm }) {
  return (
    <div className="flex justify-between">
      <button
        onClick={onCancel}
        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
      >
        Bỏ qua
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition"
      >
        Xác nhận
      </button>
    </div>
  );
}

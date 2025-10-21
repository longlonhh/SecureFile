import React, { useState } from "react";

function ConfirmActions({ onCancel, onConfirm }) {
  return (
    <div className="flex justify-between mt-4">
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

function ConfirmFavoriteOption({ wantFavorite, setWantFavorite }) {
  return (
    <div className="flex items-center mb-3">
      <input
        type="checkbox"
        checked={wantFavorite}
        onChange={(e) => setWantFavorite(e.target.checked)}
        className="mr-3 w-4 h-4 accent-purple-500"
      />
      <label>Thêm vào mục yêu thích 💜</label>
    </div>
  );
}

function ConfirmEncryptOption({ encrypt, setEncrypt, password, setPassword }) {
  return (
    <>
      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={encrypt}
          onChange={(e) => setEncrypt(e.target.checked)}
          className="mr-3 w-4 h-4 accent-purple-500"
        />
        <label>Mã hóa bằng mật khẩu 🔐</label>
      </div>
      {encrypt && (
        <input
          type="password"
          placeholder="Nhập mật khẩu..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-300/30 mb-4 focus:outline-none focus:ring-1 focus:ring-purple-400"
        />
      )}
    </>
  );
}

export default function UploadConfirmModal({ file, onConfirm, onCancel }) {
  const [wantFavorite, setWantFavorite] = useState(false);
  const [encrypt, setEncrypt] = useState(false);
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    const encryptStatus = encrypt ? "encrypt" : "decrypt"; 
    onConfirm({
      favorite: wantFavorite,
      encryptStatus: encryptStatus,
      password: encrypt && password.trim() !== "" ? password : null,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999] backdrop-blur-sm">
      <div className="bg-[#1a1a1a] text-white p-6 rounded-2xl shadow-lg w-[400px] border border-purple-400/30">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Cài đặt cho file "{file.name}"
        </h2>

        <ConfirmFavoriteOption
          wantFavorite={wantFavorite}
          setWantFavorite={setWantFavorite}
        />

        <ConfirmEncryptOption
          encrypt={encrypt}
          setEncrypt={setEncrypt}
          password={password}
          setPassword={setPassword}
        />

        <ConfirmActions onCancel={onCancel} onConfirm={handleConfirm} />
      </div>
    </div>
  );
}

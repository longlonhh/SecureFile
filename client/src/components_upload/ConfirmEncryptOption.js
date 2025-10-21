import React from "react";

export default function ConfirmEncryptOption({ encrypt, setEncrypt, password, setPassword }) {
  return (
    <>
      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          id="encrypt"
          checked={encrypt}
          onChange={(e) => setEncrypt(e.target.checked)}
          className="mr-3 w-4 h-4 accent-purple-500"
        />
        <label htmlFor="encrypt">Mã hóa bằng mật khẩu 🔐</label>
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

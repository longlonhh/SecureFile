import { useState } from "react";
import pic from "../assets/pic.jpg"; // Cập nhật đường dẫn tới assets

export default function LoginPage({ user, onLoginSuccess, switchPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Ngăn reload trang
    if (!username || !password) {
      setError("Vui lòng nhập username và password!");
      return;
    }
    const foundUser = user.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      onLoginSuccess(foundUser);
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="relative w-[400px] bg-[#a5e6e6]/90 rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-light text-gray-700">SecureFile</h1>
          <span className="text-2xl">🔒</span>
        </div>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          WELCOME BACK!
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
          required
        />

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-yellow-400 hover:bg-black text-white font-semibold mb-3"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mb-3">HOẶC</p>
        <button
          type="button"
          className="w-full py-3 rounded-full bg-black hover:bg-yellow-400 text-white font-semibold"
          onClick={switchPage}
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}
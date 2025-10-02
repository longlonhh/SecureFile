import { useState } from "react";
import pic from "../assets/pic.jpg";

export default function RegisterPage({ onRegister, switchPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = () => {
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    onRegister({ username, password });
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${pic})` }}
    >
      <div className="relative w-[450px] bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-gray-700">SecureFile</h1>
          <span className="text-2xl">🔒</span>
        </div>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-8">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
        />
        <input
          type="password"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-6"
        />

        <button
          className="w-full py-3 rounded-full bg-yellow-400 hover:bg-black text-white font-semibold mb-3"
          onClick={handleRegister}
        >
          Sign up
        </button>

        <div className="text-center mb-3">OR</div>

        <button
          className="w-full py-3 rounded-full bg-black hover:bg-yellow-500 text-white font-semibold"
          onClick={switchPage}
        >
          Login
        </button>
      </div>
    </div>
  );
}

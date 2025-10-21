import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import api from "../services/api";

export default function LoginPage({ onLoginSuccess, switchPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("Vui lòng nhập username và password!");
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.login({ username, password });
      
      if (response.success) {
        // Lưu token vào localStorage
        localStorage.setItem('token', response.data.token);
        
        // Lưu thông tin user
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        
        // Gọi callback để cập nhật state
        onLoginSuccess(response.data.user);
      }
    } catch (error) {
      setError(error.message || "Đăng nhập thất bại!");
    }
    
    setLoading(false);
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleLogin} className="space-y-4">
        <AuthInput
          label="Username"
          type="text"
          placeholder="Nhập tên đăng nhập của bạn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-200">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
                rememberMe 
                  ? 'bg-purple-500 border-purple-500' 
                  : 'border-gray-400 group-hover:border-purple-400'
              }`}>
                {rememberMe && (
                  <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="group-hover:text-white transition-colors">Ghi nhớ đăng nhập</span>
          </label>
          <span className="cursor-pointer hover:text-white hover:underline transition-all duration-200">
            Quên mật khẩu?
          </span>
        </div>

        <AuthButton type="submit" loading={loading} disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </AuthButton>

        <div className="text-center">
          <p className="text-gray-300 text-sm">
            Chưa có tài khoản?{" "}
            <span
              onClick={() => switchPage("register")}
              className="cursor-pointer text-purple-400 font-medium hover:text-purple-300 hover:underline transition-all duration-200"
            >
              Đăng ký ngay
            </span>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

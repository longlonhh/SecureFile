import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import api from "../services/api";

export default function RegisterPage({ switchPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [success, setSuccess] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password || !rePassword) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== rePassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }

    if (!acceptTerms) {
      setError("Vui lòng chấp nhận điều khoản sử dụng!");
      return;
    }

    setLoading(true);

    try {
      const response = await api.register({
        username,
        password,
        email: username + "@example.com",
        fullName: username,
      });

      // Kiểm tra response có chuẩn hay không
      if (response?.success) {
        setSuccess(true);
        setUsername("");
        setPassword("");
        setRePassword("");
        setAcceptTerms(false);
        setError("");
        setLoading(false);

        setTimeout(() => {
          switchPage("login");
        }, 2000);
      } else {
        setError(response?.message || "Đăng ký thất bại!");
        setLoading(false);
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!");
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleRegister} className="space-y-6">
        <AuthInput
          label="Username"
          type="text"
          placeholder="Nhập tên đăng nhập của bạn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading || success}
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading || success}
        />
        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
          disabled={loading || success}
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-green-400 text-sm">
              Đăng ký thành công! Đang chuyển về trang đăng nhập...
            </p>
          </div>
        )}

        <label
          className={`flex items-start gap-3 text-sm text-gray-200 ${
            loading || success
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          <div className="relative mt-1">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="sr-only"
              disabled={loading || success}
            />
            <div
              className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                loading || success ? "border-gray-600 opacity-50 cursor-not-allowed" : acceptTerms ? "bg-purple-500 border-purple-500" : "border-gray-400 hover:border-purple-400"
              }`}
            > {acceptTerms && (
                <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <span>
            Tôi đồng ý với{" "}
            <span className="text-purple-400 hover:text-purple-300 hover:underline">
              Điều khoản sử dụng
            </span>{" "}
            và{" "}
            <span className="text-purple-400 hover:text-purple-300 hover:underline">
              Chính sách bảo mật
            </span>
          </span>
        </label>

        <AuthButton type="submit" loading={loading} disabled={loading}>
          {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
        </AuthButton>

        <div className="text-center">
          <p className="text-gray-300 text-sm">
            Đã có tài khoản?{" "}
            <span
              onClick={() => switchPage("login")}
              className="cursor-pointer text-purple-400 font-medium hover:text-purple-300 hover:underline transition-all duration-200"
            >
              Đăng nhập ngay
            </span>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

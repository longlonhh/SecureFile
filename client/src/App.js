import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import api from "./services/api";

function App() {
  const [page, setPage] = useState("login"); 
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra xem user đã đăng nhập chưa
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.getCurrentUser();
          if (response.success) {
            setCurrentUser(response.data.user);
            setPage("dashboard");
          }
        } catch (error) {
          // Token không hợp lệ, xóa token
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setPage("dashboard");
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      localStorage.removeItem("uploadedFiles"); 
      setPage("login"); 
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {page === "login" && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          switchPage={setPage}
        />
      )}
      {page === "register" && (
        <RegisterPage switchPage={setPage} />
      )}
      {page === "dashboard" && (
        <DashboardPage user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
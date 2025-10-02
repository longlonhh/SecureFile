import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import VideoPage from "./pages/VideoPage";
import PicturesPage from "./pages/PicturesPage";
import OtherPage from "./pages/OtherPage";
import FavoritePage from "./pages/FavoritePage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";

function App() {
  const [page, setPage] = useState("login");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Xử lý đăng ký người dùng mới
  const handleRegister = (newUser) => {
    if (users.some((u) => u.username === newUser.username)) {
      alert("Username đã tồn tại! Vui lòng chọn username khác.");
      return;
    }
    setUsers([...users, newUser]);
    setPage("login");
  };

  // Xử lý đăng nhập thành công
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setPage("dashboard");
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    setCurrentUser(null);
    setPage("login");
  };

  // Hàm chuyển trang từ sidebar
  const handleSidebarClick = (newPage) => {
    console.log("Switching to page:", newPage); // Debug log
    setPage(newPage);
  };

  return (
    <div>
      {page === "login" && (
        <LoginPage
          user={users}
          onLoginSuccess={handleLoginSuccess}
          switchPage={() => setPage("register")}
        />
      )}
      {page === "register" && (
        <RegisterPage
          onRegister={handleRegister}
          switchPage={() => setPage("login")}
        />
      )}
      {page === "dashboard" && currentUser && (
        <Dashboard
          user={currentUser}
          onLogout={handleLogout}
          currentPage="Dashboard"
          onSidebarClick={handleSidebarClick}
        />
      )}
      {page === "upload" && currentUser && (
        <UploadPage
          user={currentUser}
          onLogout={handleLogout}
          currentPage="Upload"
          onSidebarClick={handleSidebarClick}
        />
      )}
      {page === "video" && currentUser && (
        <VideoPage
          user={currentUser}
          onLogout={handleLogout}
          currentPage="Video"
          onSidebarClick={handleSidebarClick}
        />
      )}
      {page === "pictures" && currentUser && (
        <PicturesPage
          user={currentUser}
          onLogout={handleLogout}
          currentPage="Pictures"
          onSidebarClick={handleSidebarClick}
        />
      )}
      {page === "other" && currentUser && (
        <OtherPage
          user={currentUser}
          onLogout={handleLogout}
          currentPage="Other"
          onSidebarClick={handleSidebarClick}
        />
      )}
      {page === "favorite" && currentUser && (
        <FavoritePage
          user={currentUser}
          onLogout={handleLogout}
          currentPage="Favorite"
          onSidebarClick={handleSidebarClick}
        />
      )}
      {page === "settings" && currentUser && (
        <SettingsPage
          user={currentUser}
          onLogout={handleLogout}
          currentPage="Settings"
          onSidebarClick={handleSidebarClick}
        />
      )}
      {page === "help" && currentUser && (
        <HelpPage
          user={currentUser}
          onLogout={handleLogout}
          currentPage="Help"
          onSidebarClick={handleSidebarClick}
        />
      )}
    </div>
  );
}

export default App;
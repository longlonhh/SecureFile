import React, { useState, useEffect } from "react";
import Sidebar from "../components_dashboard/Sidebar"; 
import StorageCard from "../components_dashboard/StorageCard";
import RecentActivity from "../components_dashboard/RecentActivity";
import Notifications from "../components_dashboard/Notifications";
import UserInfo from "../components_dashboard/UserInfo";
import UploadPage from "./UploadPage";
import FilePage from "./FilePage";
import FavoritePage from "./FavoritePage";
import MessengerPage from "./MessengerPage";
import backgroundImage from "../assets/background.jpg";

export default function DashboardPage({ user, onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setUploadedFiles(storedFiles);
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <div className="flex flex-wrap gap-4">
              <StorageCard files={uploadedFiles} />
              <RecentActivity files={uploadedFiles} />
            </div>
            <div className="mt-6">
              <Notifications />
            </div>
          </>
        );

      case "upload":
        return (
          <UploadPage
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            user={user}
            onLogout={onLogout}
          />
        );

      case "myfiles":
        return <FilePage uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />;

      case "favorite":
        return <FavoritePage uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />;
       
      case "messenger":
        return <MessengerPage user={user} />;

      default:
        return <div className="text-center text-gray-300"><p>Coming soon...</p></div>;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="relative w-full max-w-7xl h-[90vh] bg-white/5 border border-purple-400/20 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.25)] flex flex-col lg:flex-row overflow-hidden transition-all duration-500">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden bg-black/50 backdrop-blur-[20px] p-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">SF</span>
              </div>
              <h2 className="text-lg font-bold text-white">SecureFile</h2>
            </div>
            <UserInfo user={user} onLogout={onLogout} />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-1/5 bg-black/50 backdrop-blur-[20px] p-4 flex flex-col justify-between border-r border-white/5 relative z-10">
          <Sidebar onNavigate={setActivePage} onLogout={onLogout} activePage={activePage} />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden bg-black/30 backdrop-blur-[20px] p-2 border-b border-white/5">
          <div className="flex overflow-x-auto gap-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "upload", label: "Upload", icon: "📤" },
              { id: "myfiles", label: "Files", icon: "📁" },
              { id: "favorite", label: "Favorite", icon: "⭐" },
              { id: "messenger", label: "Chat", icon: "💬" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activePage === item.id
                    ? "bg-purple-600/40 text-white border border-purple-400/50"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 relative z-10 text-white overflow-y-auto">
          <div className="hidden lg:block absolute top-5 right-8">
            <UserInfo user={user} onLogout={onLogout} />
          </div>
          <div className="mt-8 lg:mt-12">{renderPage()}</div>
        </div>
      </div>
    </div>
  );
}

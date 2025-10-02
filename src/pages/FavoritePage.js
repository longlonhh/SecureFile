import React, { useState, useEffect } from "react";
import avata from "../assets/avata.jpg";

export default function FavoritesPage({ user, onLogout, currentPage, onSidebarClick }) {
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    return savedFiles ? JSON.parse(savedFiles) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedFiles = localStorage.getItem("uploadedFiles");
      setUploadedFiles(savedFiles ? JSON.parse(savedFiles) : []);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const favoriteFiles = uploadedFiles.filter((file) => file.favorite === true);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-teal-100 to-teal-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-teal-500 text-white p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-6">
            <img src={avata} alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
            <span className="text-lg">Hi, {user.username}!</span>
          </div>
          <ul className="space-y-2">
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                currentPage === "Dashboard" ? "bg-teal-600 font-bold" : "hover:bg-teal-600"
              }`}
              onClick={() => {
                console.log("Clicked Dashboard");
                onSidebarClick("dashboard");
              }}
            >
              <span className="mr-2">📊</span> Dashboard
            </li>
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                currentPage === "Upload" ? "bg-teal-600 font-bold" : "hover:bg-teal-600"
              }`}
              onClick={() => {
                console.log("Clicked Upload");
                onSidebarClick("upload");
              }}
            >
              <span className="mr-2">📤</span> Upload
            </li>
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                currentPage === "Video" ? "bg-teal-600 font-bold" : "hover:bg-teal-600"
              }`}
              onClick={() => {
                console.log("Clicked Video");
                onSidebarClick("video");
              }}
            >
              <span className="mr-2">🎥</span> Video
            </li>
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                currentPage === "Pictures" ? "bg-teal-600 font-bold" : "hover:bg-teal-600"
              }`}
              onClick={() => {
                console.log("Clicked Pictures");
                onSidebarClick("pictures");
              }}
            >
              <span className="mr-2">🖼️</span> Pictures
            </li>
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                currentPage === "Other" ? "bg-teal-600 font-bold" : "hover:bg-teal-600"
              }`}
              onClick={() => {
                console.log("Clicked Other");
                onSidebarClick("other");
              }}
            >
              <span className="mr-2">📂</span> Other
            </li>
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                currentPage === "Favorite" ? "bg-teal-600 font-bold" : "hover:bg-teal-600"
              }`}
              onClick={() => {
                console.log("Clicked Favorite");
                onSidebarClick("favorite");
              }}
            >
              <span className="mr-2">⭐</span> Favorite
            </li>
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                currentPage === "Settings" ? "bg-teal-600 font-bold" : "hover:bg-teal-600"
              }`}
              onClick={() => {
                console.log("Clicked Settings");
                onSidebarClick("settings");
              }}
            >
              <span className="mr-2">⚙️</span> Settings
            </li>
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                currentPage === "Help" ? "bg-teal-600 font-bold" : "hover:bg-teal-600"
              }`}
              onClick={() => {
                console.log("Clicked Help");
                onSidebarClick("help");
              }}
            >
              <span className="mr-2">ℹ️</span> Help
            </li>
          </ul>
        </div>
        <div>
          <button
            onClick={onLogout}
            className="w-full bg-white text-black px-4 py-2 rounded border mt-4"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-lg p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700">Favorites</h2>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          {/* Favorite Files Table */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Danh sách file yêu thích</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Tên file</th>
                    <th className="p-2 border">Dung lượng</th>
                    <th className="p-2 border">Ngày upload</th>
                    <th className="p-2 border">Tải về</th>
                  </tr>
                </thead>
                <tbody>
                  {favoriteFiles.map((file, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="p-2 border">{file.name}</td>
                      <td className="p-2 border">{file.size}</td>
                      <td className="p-2 border">{file.date}</td>
                      <td className="p-2 border">
                        <a href={file.content} download={file.name} className="text-blue-500 hover:underline">
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
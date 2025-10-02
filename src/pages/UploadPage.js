import React, { useState, useEffect } from "react";
import avata from "../assets/avata.jpg";

export default function UploadPage({ user, onLogout, currentPage, onSidebarClick }) {
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    return savedFiles ? JSON.parse(savedFiles) : [];
  });

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => {
      let type = "OTHER";
      if (file.type.startsWith("video/")) type = "VIDEO";
      else if (file.type.startsWith("image/")) type = "IMAGE";
      return {
        name: file.name,
        type,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        date: new Date().toLocaleDateString(),
        favorite: false,
        content: URL.createObjectURL(file), // Lưu URL để download
      };
    });
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const toggleFavorite = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].favorite = !updatedFiles[index].favorite;
    setUploadedFiles(updatedFiles);
  };

  const totalFiles = uploadedFiles.length;
  const totalSize = uploadedFiles.reduce((sum, file) => sum + parseFloat(file.size), 0).toFixed(2) + " MB";
  const latestDate = uploadedFiles.length > 0 ? uploadedFiles[uploadedFiles.length - 1].date : "Chưa có";

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
            <h2 className="text-xl font-bold text-gray-700">Upload</h2>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <div className="bg-teal-50 p-6 rounded-lg shadow flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Kéo và thả file vào đây hoặc</p>
                <label className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-teal-600">
                  Chọn file
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Uploaded Files Table */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Danh sách file đã upload</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Tên file</th>
                    <th className="p-2 border">Loại</th>
                    <th className="p-2 border">Dung lượng</th>
                    <th className="p-2 border">Ngày upload</th>
                    <th className="p-2 border">Favorite</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.map((file, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="p-2 border">{file.name}</td>
                      <td className="p-2 border">{file.type}</td>
                      <td className="p-2 border">{file.size}</td>
                      <td className="p-2 border">{file.date}</td>
                      <td className="p-2 border">
                        <input
                          type="checkbox"
                          checked={file.favorite}
                          onChange={() => toggleFavorite(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload Statistics */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Thống kê upload</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-teal-50 p-4 rounded-lg shadow">
                <span className="text-gray-600">Tổng file</span>
                <div className="text-2xl font-bold">{totalFiles}</div>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg shadow">
                <span className="text-gray-600">Dung lượng</span>
                <div className="text-2xl font-bold">{totalSize}</div>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg shadow">
                <span className="text-gray-600">Ngày gần nhất</span>
                <div className="text-2xl font-bold">{latestDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import avata from "../assets/avata.jpg";

export default function DashboardPage({ user, onLogout, currentPage, onSidebarClick }) {
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

  // Tính tổng số file và dung lượng
  const totalFiles = uploadedFiles.length;
  const totalSize = uploadedFiles.reduce((sum, file) => sum + (file.size ? parseFloat(file.size) : 0), 0).toFixed(2) + " MB";
  const latestDate = uploadedFiles.length > 0 ? uploadedFiles[uploadedFiles.length - 1].date : "Chưa có";

  // Tính phân phối dung lượng và số lượng file
  const sizeByType = uploadedFiles.reduce(
    (acc, file) => {
      const sizeNum = file.size ? parseFloat(file.size) : 0;
      if (file.type === "IMAGE") {
        acc.pictures.size += sizeNum;
        acc.pictures.count += 1;
      } else if (file.type === "VIDEO") {
        acc.videos.size += sizeNum;
        acc.videos.count += 1;
      } else if (file.type === "OTHER") {
        acc.other.size += sizeNum;
        acc.other.count += 1;
      }
      return acc;
    },
    { pictures: { size: 0, count: 0 }, videos: { size: 0, count: 0 }, other: { size: 0, count: 0 } }
  );

  const totalSizeNum = parseFloat(totalSize) || 0;
  const percentages = {
    pictures: totalSizeNum > 0 ? ((sizeByType.pictures.size / totalSizeNum) * 100).toFixed(1) : 0,
    videos: totalSizeNum > 0 ? ((sizeByType.videos.size / totalSizeNum) * 100).toFixed(1) : 0,
    other: totalSizeNum > 0 ? ((sizeByType.other.size / totalSizeNum) * 100).toFixed(1) : 0,
  };

  // Logic vẽ biểu đồ tròn
  const drawPieChart = () => {
    const canvas = document.getElementById("storagePieChart");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    let startAngle = 0;

    const colors = ["#FF6384", "#36A2EB", "#FFCE56"]; // Màu cho Pictures, Videos, Other
    const types = ["pictures", "videos", "other"]; // Đã thêm "other"

    types.forEach((type, index) => {
      const angle = ((percentages[type] || 0) / 100) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle, false);
      ctx.fillStyle = colors[index];
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
      startAngle += angle;
    });

    // Thêm chú thích với số lượng file và tổng dung lượng
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial"; // Giảm kích thước font để vừa chỗ
    types.forEach((type, index) => {
      const typeName = type.charAt(0).toUpperCase() + type.slice(1);
      const count = sizeByType[type].count;
      const size = sizeByType[type].size.toFixed(2) + " MB";
      const percentage = percentages[type] + "%";
      ctx.fillText(
        `${typeName}: ${count} files, ${size} (${percentage})`,
        centerX - 100,
        centerY + radius + 20 + (index * 30) // Tăng khoảng cách giữa các dòng
      );
      ctx.fillStyle = colors[index];
      ctx.fillRect(centerX - 110, centerY + radius + 10 + (index * 30), 10, 10);
      ctx.fillStyle = "#000";
    });
  };

  useEffect(() => {
    drawPieChart();
  }, [percentages]);

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
            <h2 className="text-xl font-bold text-gray-700">Dashboard</h2>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          {/* Upload Statistics */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Thống kê tổng quan</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
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

            {/* Biểu đồ phân phối dung lượng */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Phân phối dung lượng</h3>
              <canvas id="storagePieChart" width="300" height="350"></canvas> {/* Tăng height để chứa chú thích */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
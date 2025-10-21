import React, { useState } from "react";
import {
  FaChartBar,
  FaUpload,
  FaFolder,
  FaStar,
  FaComments,
  FaSignOutAlt,
  FaCog,
  FaBell,
} from "react-icons/fa";

export default function Sidebar({ onNavigate, onLogout, activePage }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaChartBar />, color: "from-blue-500 to-cyan-500" },
    { id: "upload", label: "Upload", icon: <FaUpload />, color: "from-green-500 to-emerald-500" },
    { id: "myfiles", label: "My Files", icon: <FaFolder />, color: "from-orange-500 to-yellow-500" }, 
    { id: "favorite", label: "Favorite", icon: <FaStar />, color: "from-pink-500 to-rose-500" },
    { id: "messenger", label: "Messenger", icon: <FaComments />, color: "from-purple-500 to-indigo-500" },
  ];

  return (
    <div className="flex flex-col h-full justify-between text-white">
      {/* Logo/Brand */}
      <div className="mb-8">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <FaChartBar className="text-white text-lg" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">SecureFile</h2>
            <p className="text-xs text-gray-400">File Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`group relative flex items-center gap-4 w-full text-left px-4 py-4 rounded-2xl transition-all duration-300 transform ${
                activePage === item.id
                  ? "bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-400/50 text-white shadow-lg shadow-purple-500/25 scale-105"
                  : "hover:bg-white/10 text-gray-300 hover:text-white hover:scale-105"
              }`}
            >
              {/* Active indicator */}
              {activePage === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400 rounded-r-full"></div>
              )}
              
              {/* Icon with gradient background */}
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                activePage === item.id 
                  ? `bg-gradient-to-r ${item.color} shadow-lg` 
                  : "bg-white/10 group-hover:bg-white/20"
              }`}>
                <span className="text-lg">{item.icon}</span>
              </div>
              
              <div className="flex-1">
                <span className="font-medium text-sm">{item.label}</span>
                {activePage === item.id && (
                  <div className="text-xs text-purple-200 mt-1">Active</div>
                )}
              </div>

              {/* Hover effect */}
              {hoveredItem === item.id && activePage !== item.id && (
                <div className="absolute right-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-3">
        {/* Settings */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300">
          <FaCog className="text-lg" />
          <span className="font-medium">Settings</span>
        </button>

        {/* Notifications */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300">
          <div className="relative">
            <FaBell className="text-lg" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <span className="font-medium">Notifications</span>
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-red-600/60 to-red-700/60 hover:from-red-700/70 hover:to-red-800/70 
                     transition-all duration-300 font-semibold text-white 
                     flex items-center justify-center gap-3 hover:scale-105 transform shadow-lg"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

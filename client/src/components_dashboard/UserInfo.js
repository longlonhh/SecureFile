import React, { useState } from "react";
import { FaUserCircle, FaCrown, FaCog, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

export default function UserInfo({ user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-3 bg-gradient-to-r from-white/10 to-white/5 px-4 py-3 rounded-2xl border border-purple-300/40 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <FaUserCircle className="text-xl text-white" />
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        
        {/* User info */}
        <div className="text-white flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">{user?.username || "Guest"}</p>
            <FaCrown className="text-yellow-400 text-xs" />
          </div>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Online
          </p>
        </div>
        
        {/* Dropdown arrow */}
        <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* User details */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-2xl text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">{user?.username || "Guest"}</p>
                <p className="text-xs text-gray-400">Premium User</p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">
              <FaCog className="text-sm" />
              <span className="text-sm">Settings</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">
              <FaUserCircle className="text-sm" />
              <span className="text-sm">Profile</span>
            </button>
            
            <div className="border-t border-white/10 my-2"></div>
            
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
            >
              <FaSignOutAlt className="text-sm" />
              <span className="text-sm">Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}

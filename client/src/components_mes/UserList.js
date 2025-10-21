import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function UserList({ users, selectedUser, onSelectUser }) {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative mb-3">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 pl-10 rounded-xl bg-white/10 text-sm text-white placeholder-gray-400 outline-none border border-white/10"
        />
      </div>

      {filtered.length > 0 ? (
        filtered.map((u) => (
          <div
            key={u.id}
            onClick={() => onSelectUser(u)}
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedUser?.id === u.id
                ? "bg-purple-600/40 border border-purple-400 shadow-md"
                : "hover:bg-white/10"
            }`}
          >
            {/* Icon user */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <FaUserCircle className="text-xl text-white" />
            </div>

            <div className="flex-1">
              <p className="font-medium text-white">{u.name}</p>
              <p className="text-xs text-gray-400">{u.online ? "Online" : "Offline"}</p>
            </div>

            {u.online && <span className="w-3 h-3 bg-green-400 rounded-full"></span>}
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center">Không tìm thấy người dùng</p>
      )}
    </div>
  );
}

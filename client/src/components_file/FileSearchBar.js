import React from "react";
import { FaSearch } from "react-icons/fa";

export default function FileSearchBar({ search, setSearch }) {
  return (
    <div className="relative w-72">
      <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
      <input
        type="text"
        placeholder="Search files..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-9 pr-3 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-400"
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setActivities(storedFiles.slice(-5).reverse());
  }, []);

  return (
    <div className="bg-black/20 backdrop-blur-md border border-purple-300/30 rounded-2xl shadow-md text-white flex flex-col items-center p-4 w-[500px] h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
      {activities.length > 0 ? (
        <ul className="w-full text-sm space-y-2">
          {activities.map((file, index) => (
            <li key={index} className="flex justify-between border-b border-white/10 pb-1">
              <span className="truncate w-2/3">{file.name}</span>
              <span className="text-gray-400 text-xs">{file.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300 text-sm text-center">No recent activity yet.</p>
      )}
    </div>
  );
}

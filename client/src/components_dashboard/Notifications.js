import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotes(storedNotes.slice(0, 5));
  }, []);

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-md text-white w-[600px] h-[200px] flex flex-col items-center justify-start overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">Notifications</h2>
      {notes.length > 0 ? (
        <ul className="w-full text-sm space-y-2">
          {notes.map((n, i) => (
            <li key={i} className="flex justify-between border-b border-white/10 pb-1">
              <span>{n.message}</span>
              <span className="text-gray-400 text-xs">{n.time}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300 text-sm">No notifications yet.</p>
      )}
    </div>
  );
}

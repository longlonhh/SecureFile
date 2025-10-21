import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaUserCircle } from "react-icons/fa";
import MessageInput from "./MessageInput";

const socket = io("http://localhost:5001", {
  transports: ["websocket"],
});

export default function ChatWindow({ user, selectedUser, messages, onSendMessage }) {
  const endRef = useRef(null);
  const [chatMessages, setChatMessages] = useState(messages || []);

  useEffect(() => setChatMessages(messages), [messages]);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [chatMessages]);

  useEffect(() => {
    if (user?.username) socket.emit("register", user.username);

    socket.on("receiveMessage", (msg) => {
      if (msg.receiver === user.username && msg.sender === selectedUser.name) {
        setChatMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [user, selectedUser]);

  const handleSend = (msg) => {
    if (!selectedUser) return;

    const newMsg = {
      ...msg,
      sender: user.username,
      receiver: selectedUser.name,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", newMsg);
    setChatMessages((prev) => [...prev, newMsg]);
    onSendMessage(newMsg);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <FaUserCircle className="text-xl text-white" />
        </div>
        <div>
          <p className="font-semibold text-white">{selectedUser.name}</p>
          <p className="text-xs text-gray-400">
            {selectedUser.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 px-2">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === user.username ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-md ${
                msg.sender === user.username ? "bg-purple-600/60" : "bg-white/10"
              }`}
            >
              {msg.type === "text" ? <p>{msg.text}</p> : (
                <a href={msg.fileData} download={msg.fileName} className="flex items-center gap-2 text-blue-300 underline">
                  📎 {msg.fileName}
                </a>
              )}
              <p className="text-[10px] text-gray-300 text-right mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      {/* Input */}
      <div className="mt-4">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import UserList from "../components_mes/UserList";
import ChatWindow from "../components_mes/ChatWindow";

const socket = io("http://localhost:5000");

export default function MessengerPage({ user, switchPage }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user?.username) return;

    // Đăng ký user khi vào
    socket.emit("register", user.username);

    // Nhận danh sách user online
    socket.on("onlineUsers", (list) => {
      const mapped = list
        .filter((name) => name !== user.username)
        .map((name, i) => ({
          id: i,
          name,
          avatar: `https://i.pravatar.cc/100?u=${name}`,
          online: true,
        }));
      setUsers(mapped);
    });

    // Nhận tin nhắn mới
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("receiveMessage");
    };
  }, [user]);

  const handleSendMessage = (msg) => {
    if (!selectedUser) return;
    const newMsg = {
      ...msg,
      sender: user.username,
      receiver: selectedUser.name,
    };
    socket.emit("sendMessage", newMsg);
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="flex gap-6 w-[90%] h-[70vh] mx-auto mt-10 text-white">
      {/* Danh sách người dùng */}
      <div className="w-1/3 backdrop-blur-xl bg-white/10 border border-purple-400/30 rounded-3xl p-4 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
        <h2 className="text-lg font-semibold mb-3 text-white-300">Người dùng online</h2>
        <div className="flex-1 overflow-y-auto">
          <UserList
            users={users}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        </div>
      </div>

      {/* Khung chat */}
      <div className="flex-1 backdrop-blur-xl bg-white/10 border border-purple-400/30 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.25)] p-4">
        {selectedUser ? (
          <ChatWindow
            user={user}
            selectedUser={selectedUser}
            messages={messages.filter(
              (m) =>
                (m.sender === user.username &&
                  m.receiver === selectedUser.name) ||
                (m.sender === selectedUser.name &&
                  m.receiver === user.username)
            )}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
             Chọn người dùng để bắt đầu trò chuyện
          </div>
        )}
      </div>
    </div>
  );
}

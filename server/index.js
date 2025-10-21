const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

let users = {}; // username -> socketId

io.on("connection", (socket) => {
  console.log(" Client connected:", socket.id);

  socket.on("register", (username) => {
    users[username] = socket.id;
    console.log(` ${username} online`);
    io.emit("onlineUsers", Object.keys(users)); // Gửi danh sách online cho tất cả
  });

  socket.on("sendMessage", (msg) => {
    console.log(" New message:", msg);
    const receiverSocket = users[msg.receiver];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", msg);
    }
  });

  socket.on("disconnect", () => {
    const disconnectedUser = Object.keys(users).find(
      (u) => users[u] === socket.id
    );
    if (disconnectedUser) {
      delete users[disconnectedUser];
      console.log(` ${disconnectedUser} disconnected`);
      io.emit("onlineUsers", Object.keys(users));
    }
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () =>
  console.log(` Server with socket.io running on port ${PORT}`)
);

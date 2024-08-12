const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messageWrapper.js");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users.js");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

//set static folders
app.use(express.static(path.join(__dirname, "public")));

const serverBotName = "ChatCord Bot";

//Excetute when client connects
io.on("connection", (socket) => {
  console.log("New client connection");

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    //Welcome current user
    //socket.emit sends message to the client that is connecting
    socket.emit("message", formatMessage(serverBotName, "Welcome to ChatCord"));

    //Broadcast when a user connects
    //socket.broadcast.emit sends message to all clients except the one that is connecting
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(serverBotName, `${user.username} just joined the chat.`)
      );

    //Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  //Listen for chatMessage
  socket.on("chatMessage", (message) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, message));
  });

  //excute when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (!user) return "User not found";
    //io.emit sends message to all clients
    io.emit(
      "message",
      formatMessage(serverBotName, `${user.username} has left the chat.`)
    );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

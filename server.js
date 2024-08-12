const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

//set static folders
app.use(express.static(path.join(__dirname, "public")));

//Excetute when client connects
io.on("connection", (socket) => {
  console.log("New client connection");

  //Welcome current user
  //socket.emit sends message to the client that is connecting
  socket.emit("message", "Welcome to ChatCord");

  //Broadcast when a user connects
  //socket.broadcast.emit sends message to all clients except the one that is connecting
  socket.broadcast.emit("message", "New User just joined the chat.");

  //excute when client disconnects
  socket.on("disconnect", () => {
    //io.emit sends message to all clients
    io.emit("message", "A user has left the chat.");
  });

  //Listen for chatMessage
  socket.on("chatMessage", (message) => {
    io.emit("message", message);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

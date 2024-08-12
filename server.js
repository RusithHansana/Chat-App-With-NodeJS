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
io.on("connection", (socekt) => {
  console.log("New client connection");
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

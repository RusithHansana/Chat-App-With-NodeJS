const path = require("path");
const http = require("http");
const express = require("express");
const chatSocket = require("./socket/chatSocket.js");

const app = express();
const server = http.createServer(app);

//set static folders
app.use(express.static(path.join(__dirname, "public")));

chatSocket(server);

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

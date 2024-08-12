const path = require("path");
const http = require("http");
const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const chatSocket = require("./socket/chatSocket.js");

dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();
const server = http.createServer(app);

app.use(express.json()); // Middleware to parse JSON bodies

// Set static folders
app.use(express.static(path.join(__dirname, "public")));

chatSocket(server); // Initialize Socket.IO

app.use("/api/auth", authRoutes); // Use authentication routes
app.use("/", chatRoutes); // Use chat routes

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000; // This line has an issue

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { getChatPage } = require("../controllers/chatController"); // Ensure this path is correct

const router = express.Router();

// Protect the chat route with the verifyToken middleware
router.get("/chat", verifyToken, getChatPage);

module.exports = router;

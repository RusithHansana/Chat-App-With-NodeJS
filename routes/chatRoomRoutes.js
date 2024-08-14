const express = require("express");
const {
  getChatRooms,
  getChatRoomById,
  createChatRoom,
  addMessageToChatRoom,
} = require("../controllers/chatRoomController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getChatRooms);
router.get("/:id", verifyToken, getChatRoomById);
router.post("/new", verifyToken, createChatRoom);
router.post("/:id", verifyToken, addMessageToChatRoom);

module.exports = router;

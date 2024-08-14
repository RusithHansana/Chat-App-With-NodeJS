const asyncHandler = require("express-async-handler");
const ChatRoom = require("../models/chatRoom/chatRoom");
const User = require("../models/users/userModel");
const formatMessage = require("../utils/messageWrapper");

//@desc get all chat rooms
//@route GET /api/chatRooms
//@access Public
const getChatRooms = asyncHandler(async (req, res) => {
  const chatRooms = await ChatRoom.find({});
  res.status(200).json(chatRooms);
});

// @desc   Get chat room by id
// @route  GET /api/chatRooms/:id
// @access Private
const getChatRoomById = asyncHandler(async (req, res) => {
  const chatRoom = await ChatRoom.findById(req.params.id);

  if (!chatRoom) {
    return res.status(404).send("Chat room not found");
  }

  res.status(200).json(chatRoom);
});

// @desc    Create a new chat room
// @route   POST /api/chatRooms
// @access  Private
const createChatRoom = asyncHandler(async (req, res) => {
  const { roomName } = req.body;

  try {
    const chatRoom = new ChatRoom({
      roomName,
      users: [],
      messages: [],
    });

    const createdChatRoom = await chatRoom.save();

    res.status(201).json(createdChatRoom);
  } catch (err) {
    res.status(400);
    throw new Error("Error creating chat room");
  }
});

// @desc add message to chat room
// @route POST /api/chatRooms/:id
// @access Private

const addMessageToChatRoom = asyncHandler(async (req, res) => {
  const roomId = req.params.id;
  const { message, senderId } = req.body;

  try {
    const chatRoom = await ChatRoom.findById(roomId);
    const sender = await User.findById(senderId);

    if (!chatRoom) {
      return res.status(404).send("Chat room not found");
    }

    const newMessage = formatMessage(sender.username, message);

    chatRoom.messages.push(newMessage);

    const updatedChatRoom = await chatRoom.save();

    if (updatedChatRoom) {
      res.status(201).send("Message added to chat room");
    } else {
      res.status(400).send("Error adding message to chat room");
    }
  } catch (error) {
    res.status(400).send("Error adding message to chat room:" + error);
  }
});

module.exports = {
  getChatRooms,
  getChatRoomById,
  createChatRoom,
  addMessageToChatRoom,
};

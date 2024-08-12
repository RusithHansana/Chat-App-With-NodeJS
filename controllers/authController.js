const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/users/userModel");

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({
        _id: user._id,
        username: user.username,
        token,
      });
    }

    return res.status(401).json({ error: "Invalid credentials" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = { loginUser, registerUser };

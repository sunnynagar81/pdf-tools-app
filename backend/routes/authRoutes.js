const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({ msg: "Registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id },
    "secretkey",
    { expiresIn: "1d" }
  );

  res.json({ token });
});

router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.post("/save-signature", protect, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ msg: "User not found" });

  user.signature = req.body.signature;
  await user.save();

  res.json({ msg: "Signature saved successfully" });
});

module.exports = router;
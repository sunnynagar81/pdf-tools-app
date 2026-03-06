const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const File = require("../models/File");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  const file = new File({
    filename: req.file.filename,
    user: req.user.id,
  });

  await file.save();
  res.json(file);
});

router.get("/", authMiddleware, async (req, res) => {
  const files = await File.find({ user: req.user.id });
  res.json(files);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await File.findByIdAndDelete(req.params.id);
  res.json({ message: "File deleted" });
});

module.exports = router;
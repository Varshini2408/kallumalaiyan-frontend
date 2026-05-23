const express = require("express");
const router = express.Router();
const { upload, uploadToCloudinary } = require("../services/upload");
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../categories.json");

function loadCategories() {
  try {
    if (fs.existsSync(FILE)) {
      return JSON.parse(fs.readFileSync(FILE, "utf8"));
    }
  } catch (e) {}
  return [
    { name: "Lord Murugan", image: null },
    { name: "Lord Shiva", image: null },
    { name: "Lord Sai Baba", image: null }
  ];
}

function saveCategories(cats) {
  fs.writeFileSync(FILE, JSON.stringify(cats, null, 2));
}

router.get("/", function(req, res) {
  res.json(loadCategories());
});

router.post("/", upload.single("image"), async function(req, res) {
  try {
    const name = req.body.name;
    if (!name) return res.status(400).json({ error: "Name required" });

    const categories = loadCategories();
    const exists = categories.find(function(c) { return c.name === name; });
    if (exists) return res.status(400).json({ error: "Already exists" });

    let image = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
      image = result.secure_url;
    }

    categories.push({ name: name, image: image });
    saveCategories(categories);
    res.json({ success: true, categories: categories });
  } catch (err) {
    console.error("Category error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:name", function(req, res) {
  try {
    const name = decodeURIComponent(req.params.name);
    const categories = loadCategories().filter(function(c) { return c.name !== name; });
    saveCategories(categories);
    res.json({ success: true, categories: categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router: router };

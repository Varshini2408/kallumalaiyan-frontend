const express = require("express")
const router = express.Router()
const Category = require("../models/Category")
const { upload, uploadToCloudinary } = require("../services/upload")

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 })
    res.json(categories)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ error: "Name required" })

    const exists = await Category.findOne({ name })
    if (exists) return res.status(400).json({ error: "Already exists" })

    let image = null
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, req.file.originalname)
      image = result.secure_url
    }

    const category = await Category.create({ name, image })
    const categories = await Category.find().sort({ createdAt: 1 })
    res.json({ success: true, categories })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete("/:name", async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name)
    await Category.deleteOne({ name })
    const categories = await Category.find().sort({ createdAt: 1 })
    res.json({ success: true, categories })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = { router }
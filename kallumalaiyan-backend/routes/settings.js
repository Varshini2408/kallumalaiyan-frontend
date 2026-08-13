const express = require("express")
const router = express.Router()
const Settings = require("../models/Settings")

const DEFAULT_PASSWORD = "kallumalaiyan2024"

// Get password (to verify login)
router.post("/verify-password", async (req, res) => {
  try {
    const { password } = req.body
    let setting = await Settings.findOne({ key: "adminPassword" })
    if (!setting) {
      // First time — create default password
      setting = await Settings.create({ key: "adminPassword", value: DEFAULT_PASSWORD })
    }
    if (password === setting.value) {
      res.json({ success: true })
    } else {
      res.json({ success: false, error: "Wrong password!" })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Change password
router.post("/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters!" })
    }
    let setting = await Settings.findOne({ key: "adminPassword" })
    if (!setting) {
      setting = await Settings.create({ key: "adminPassword", value: DEFAULT_PASSWORD })
    }
    if (currentPassword !== setting.value) {
      return res.status(400).json({ error: "Current password is wrong!" })
    }
    setting.value = newPassword
    await setting.save()
    res.json({ success: true, message: "Password changed successfully!" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
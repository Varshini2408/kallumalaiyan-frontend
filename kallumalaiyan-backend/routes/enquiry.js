const express = require("express");
const router = express.Router();
const { sendEnquiryNotification } = require("../services/telegram");

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, comment } = req.body;
    if (!name || !email || !comment) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }
    await sendEnquiryNotification({ name, phone, email, comment });
    res.json({ success: true });
  } catch (err) {
    console.error("Enquiry error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
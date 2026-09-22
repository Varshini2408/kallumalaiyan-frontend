const express = require("express")
const router = express.Router()
const Order = require("../models/Order")
const { sendOrderNotification } = require("../services/telegram")

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create order
router.post("/", async (req, res) => {
  try {
    const { customer, items, subtotal, shipping, total } = req.body
    const order = await Order.create({
      customer, items, subtotal, shipping, total, status: "pending"
    })
    await sendOrderNotification(order)
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH update status
router.patch("/:id/status", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE order
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
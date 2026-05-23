const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { sendOrderNotification } = require("../services/telegram");

router.post("/create", async (req, res) => {
  try {
    console.log("Order received!");
    const { customer, items, subtotal, shipping, total } = req.body;

    const order = await Order.create({
      customer,
      items,
      subtotal,
      shipping,
      total,
      status: "pending"
    });

    console.log("Order saved:", order._id.toString());

    await sendOrderNotification({
      _id: order._id,
      customer,
      items,
      subtotal,
      shipping,
      total
    });

    console.log("Telegram sent!");
    res.json({ success: true, orderId: order._id });

  } catch (err) {
    console.error("Order error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

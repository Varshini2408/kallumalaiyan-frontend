const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { createBill } = require("../services/toyyibpay");
const { sendOrderNotification } = require("../services/telegram");

// POST /api/payment/create-bill
router.post("/create-bill", async (req, res) => {
  try {
    const { customer, items, subtotal, shipping, total } = req.body;
    const order = await Order.create({
      customer, items, subtotal, shipping, total, status: "pending"
    });
    const bill = await createBill({
      orderRef: order._id.toString(),
      amount: total,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      description: `Order ${order._id}`,
    });
    order.billCode = bill.BillCode;
    await order.save();
    res.json({
      paymentUrl: `https://toyyibpay.com/${bill.BillCode}`,
      orderId: order._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/payment/callback (ToyyibPay Return URL)
router.get("/callback", async (req, res) => {
  console.log("GET callback received:", req.query);
  const { status_id, billcode, order_id } = req.query;
  try {
    if (status_id === "1") {
      const order = await Order.findById(order_id)
      if (order) {
        order.status = "paid"
        await order.save()
        await sendOrderNotification(order)
      }
    }
  } catch (err) {
    console.error("Callback error:", err)
  }
  const redirectUrl = status_id === "1"
    ? "https://www.kallumalaiyansketchart.com/order-confirmation?status=success"
    : "https://www.kallumalaiyansketchart.com/order-confirmation?status=failed"
  res.redirect(redirectUrl)
});

// POST /api/payment/callback (ToyyibPay server-side callback)
router.post("/callback", async (req, res) => {
  console.log("POST callback received:", req.body);
  const { status, order_id, refno } = req.body;
  try {
    if (status === "1") {
      const order = await Order.findById(order_id)
      if (order) {
        order.status = "paid"
        order.transactionId = refno
        await order.save()
        await sendOrderNotification(order)
      }
    }
  } catch (err) {
    console.error("POST callback error:", err)
  }
  res.status(200).send("OK");
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { createBill } = require("../services/toyyibpay");
const { sendOrderNotification } = require("../services/telegram");
// POST /api/payment/create-bill
router.post("/create-bill", async (req, res) => {
try {
const { customer, items, subtotal, shipping, total } = req.body;
// 1. Save order as pending
const order = await Order.create({
customer, items, subtotal, shipping, total, status: "pending"
});
// 2. Create ToyyibPay bill
const bill = await createBill({
orderRef: order._id.toString(),
amount: total,
customerName: customer.name,
customerEmail: customer.email,
customerPhone: customer.phone,
description: `Order ${order._id}`,
});
// 3. Save bill code
order.billCode = bill.BillCode;
await order.save();
// 4. Return payment URL to frontend
res.json({
paymentUrl: `https://toyyibpay.com/demoks/${bill.BillCode}`,
orderId: order._id,
});
} catch (err) {
res.status(500).json({ error: err.message });
}
});
// POST /api/payment/callback (ToyyibPay calls this after payment)
router.post("/callback", async (req, res) => {
const { billcode, order_id, status_id, transaction_id } = req.body;
if (status_id === "1") { // 1 = successful
const order = await Order.findById(order_id)
.populate("items.product");
order.status = "paid";
order.transactionId = transaction_id;
await order.save();
await sendOrderNotification(order); // Telegram notification
}
res.status(200).send("OK");
});
module.exports = router;
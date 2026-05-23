const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postcode: String,
    state: String,
  },
  items: [{
    name: String,
    color: String,
    size: String,
    qty: Number,
    price: Number,
  }],
  subtotal: Number,
  shipping: { type: Number, default: 8 },
  total: Number,
  status: { type: String, default: "pending" },
  billCode: String,
  transactionId: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);

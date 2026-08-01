const fetch = require("node-fetch");

async function sendOrderNotification(order) {
  const url = "https://api.telegram.org/bot" +
    process.env.TELEGRAM_BOT_TOKEN + "/sendMessage";

  const items = order.items && order.items.length > 0
    ? order.items.map(i => `  - ${i.name} | Size: ${i.size} | Qty: ${i.qty} | RM ${i.price}`).join("\n")
    : "  - No items"

  const text =
    "🎨 NEW ORDER RECEIVED!\n" +
    "━━━━━━━━━━━━━━━━━━━━\n\n" +
    "👤 CUSTOMER DETAILS\n" +
    "Name: " + order.customer.name + "\n" +
    "Phone: " + order.customer.phone + "\n" +
    "Email: " + order.customer.email + "\n" +
    "Address: " + order.customer.address + "\n" +
    order.customer.city + ", " + order.customer.postcode + "\n" +
    order.customer.state + "\n\n" +
    "🛍️ ORDER ITEMS\n" +
    items + "\n\n" +
    "💰 PAYMENT SUMMARY\n" +
    "Subtotal: RM " + (order.subtotal || order.total) + "\n" +
    "Shipping: RM " + (order.shipping || 0) + "\n" +
    "Total Paid: RM " + order.total + "\n\n" +
    "📦 Status: PAID ✅\n" +
    "🔖 Order ID: " + order._id + "\n" +
    "━━━━━━━━━━━━━━━━━━━━"

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: text
    })
  });
  const result = await response.json();
  console.log("Telegram result:", JSON.stringify(result));
}

async function sendEnquiryNotification(enquiry) {
  const url = "https://api.telegram.org/bot" +
    process.env.TELEGRAM_BOT_TOKEN + "/sendMessage";

  const text =
    "📩 NEW ENQUIRY RECEIVED!\n" +
    "━━━━━━━━━━━━━━━━━━━━\n\n" +
    "👤 Name: " + enquiry.name + "\n" +
    "📱 Phone: " + enquiry.phone + "\n" +
    "📧 Email: " + enquiry.email + "\n\n" +
    "💬 MESSAGE:\n" + enquiry.comment + "\n" +
    "━━━━━━━━━━━━━━━━━━━━"

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: text
    })
  });
  const result = await response.json();
  console.log("Enquiry Telegram result:", JSON.stringify(result));
}

module.exports = { sendOrderNotification, sendEnquiryNotification };
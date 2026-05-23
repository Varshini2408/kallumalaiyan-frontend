const fetch = require("node-fetch");

async function sendOrderNotification(order) {
  const url = "https://api.telegram.org/bot" + 
    process.env.TELEGRAM_BOT_TOKEN + "/sendMessage";

  const text = "New Order!\nCustomer: " + 
    order.customer.name + 
    "\nPhone: " + order.customer.phone + 
    "\nCity: " + order.customer.city + 
    "\nTotal: RM" + order.total;

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

module.exports = { sendOrderNotification };
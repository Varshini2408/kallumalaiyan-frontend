const fetch = require("node-fetch");
const TOYYIBPAY_BASE = "https://toyyibpay.com/index.php/api";

async function createBill({ orderRef, amount, customerName,
  customerEmail, customerPhone, description }) {

  console.log("Return URL:", process.env.TOYYIBPAY_RETURN_URL)
  console.log("Callback URL:", process.env.TOYYIBPAY_CALLBACK_URL)
  console.log("Category:", process.env.TOYYIBPAY_CATEGORY)
  console.log("Secret Key exists:", !!process.env.TOYYIBPAY_SECRET)

  const params = new URLSearchParams({
    userSecretKey: process.env.TOYYIBPAY_SECRET,
    categoryCode: process.env.TOYYIBPAY_CATEGORY,
    billName: "Kallumalaiyan_SketchArt",
    billDescription: "Sketch_Art_Order",
    billPriceSetting: 1,
    billPayorInfo: 1,
    billAmount: Math.round(amount * 100),
    billReturnUrl: process.env.TOYYIBPAY_RETURN_URL,
    billCallbackUrl: process.env.TOYYIBPAY_CALLBACK_URL,
    billExternalReferenceNo: orderRef,
    billTo: customerName,
    billEmail: customerEmail,
    billPhone: customerPhone,
    billSplitPayment: 0,
    billPaymentChannel: 0,
  });

  const res = await fetch(`${TOYYIBPAY_BASE}/createBill`, {
    method: "POST",
    body: params,
  });
  const data = await res.json();
  console.log("ToyyibPay createBill response:", JSON.stringify(data));
  return data[0];
}

module.exports = { createBill };
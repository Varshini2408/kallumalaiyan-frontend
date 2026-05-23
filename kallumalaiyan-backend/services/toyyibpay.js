const fetch = require("node-fetch");
const TOYYIBPAY_BASE = "https://toyyibpay.com/index.php/api";
async function createBill({ orderRef, amount, customerName,
customerEmail, customerPhone, description }) {
const params = new URLSearchParams({
userSecretKey: process.env.TOYYIBPAY_SECRET,
categoryCode: process.env.TOYYIBPAY_CATEGORY,
billName: "Kallumalaiyan SketchArt Order",
billDescription: description,
billPriceSetting: 1,
billPayorInfo: 1,
billAmount: Math.round(amount * 100), // in cents
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
return data[0]; // { BillCode: "abc123" }
}
module.exports = { createBill };
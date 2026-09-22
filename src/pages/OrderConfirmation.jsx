import { useNavigate, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import KsQR from "../assets/KS_QR.png"

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { orderId, customerName, customerPhone, total, items } = location.state || {}

  const whatsappMessage = encodeURIComponent(
    `Hi! I have made payment for my order.\n\nOrder ID: ${orderId}\nName: ${customerName}\nPhone: ${customerPhone}\nTotal: RM ${total}.00\n\nPlease find my payment receipt attached.`
  )
  const whatsappUrl = `https://wa.me/60194079787?text=${whatsappMessage}`

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Success Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "72px", height: "72px",
            background: "#EAF3DE", borderRadius: "50%",
            display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 16px",
            fontSize: "32px"
          }}>✓</div>
          <h1 style={{
            fontSize: "26px", fontWeight: "700",
            color: "#1A1714", marginBottom: "8px"
          }}>
            Order Placed Successfully!
          </h1>
          <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.7" }}>
            Thank you <b>{customerName || "there"}</b>! Your order has been received.
            Please complete your payment using the instructions below.
          </p>
          {orderId && (
            <div style={{
              display: "inline-block",
              background: "#F5F5F5", border: "1px solid #E8E2D9",
              borderRadius: "6px", padding: "8px 16px", marginTop: "12px"
            }}>
              <p style={{ fontSize: "12px", color: "#888", marginBottom: "2px" }}>Order ID</p>
              <p style={{ fontSize: "13px", fontWeight: "700", color: "#1A1714" }}>{orderId}</p>
            </div>
          )}
        </div>

        {/* Payment Instructions */}
        <div style={{
          border: "2px solid #1A1714", borderRadius: "12px",
          overflow: "hidden", marginBottom: "24px"
        }}>
          {/* Header */}
          <div style={{
            background: "#1A1714", padding: "16px 20px",
            textAlign: "center"
          }}>
            <p style={{ color: "white", fontWeight: "700", fontSize: "16px", margin: 0 }}>
              💳 Payment Instructions
            </p>
          </div>

          <div style={{ padding: "24px" }}>

            {/* Steps */}
            <div style={{ marginBottom: "24px" }}>
              {[
                {
                  step: "1",
                  title: "Scan QR Code or Transfer to Bank",
                  desc: "Scan the DuitNow QR below using any banking app or e-wallet (Maybank, CIMB, Touch n Go, GrabPay etc.)"
                },
                {
                  step: "2",
                  title: "Enter Amount",
                  desc: `Transfer exactly RM ${total || "XX"}.00`
                },
                {
                  step: "3",
                  title: "Use Your Phone as Reference",
                  desc: `Enter your phone number (${customerPhone || "your phone"}) as the payment reference/description`
                },
                {
                  step: "4",
                  title: "Send Receipt via WhatsApp",
                  desc: "Screenshot your payment receipt and send it to +60 19-407 9787 via WhatsApp"
                },
              ].map(item => (
                <div key={item.step} style={{
                  display: "flex", gap: "14px",
                  marginBottom: "16px", alignItems: "flex-start"
                }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: "#1A1714", color: "white",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "14px",
                    fontWeight: "700", flexShrink: 0
                  }}>{item.step}</div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "700", marginBottom: "2px" }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.6" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Amount highlight */}
            <div style={{
              background: "#EAF3DE", border: "1px solid #16A34A",
              borderRadius: "8px", padding: "14px", textAlign: "center",
              marginBottom: "24px"
            }}>
              <p style={{ fontSize: "13px", color: "#16A34A", marginBottom: "4px" }}>
                Amount to Transfer
              </p>
              <p style={{ fontSize: "28px", fontWeight: "700", color: "#14532D" }}>
                RM {total || "XX"}.00
              </p>
              <p style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>
                Reference: {customerPhone || "your phone number"}
              </p>
            </div>

            {/* QR Code */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <p style={{
                fontSize: "14px", fontWeight: "700",
                marginBottom: "12px", color: "#1A1714"
              }}>
                Scan DuitNow QR
              </p>
              <div style={{
                display: "inline-block",
                border: "2px solid #E8E2D9",
                borderRadius: "12px", padding: "12px",
                background: "white"
              }}>
                <img
                  src={KsQR}
                  alt="DuitNow QR Code"
                  style={{
                    width: "220px", height: "auto",
                    display: "block"
                  }}
                />
              </div>
              <p style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>
                Kallumalaiyan Sketchart Enterprise · Hong Leong Bank
              </p>
            </div>

            {/* Bank Details */}
            <div style={{
              background: "#F5F5F5", border: "1px solid #E8E2D9",
              borderRadius: "8px", padding: "16px", marginBottom: "24px"
            }}>
              <p style={{ fontSize: "13px", fontWeight: "700", marginBottom: "10px" }}>
                Or Transfer via Bank:
              </p>
              {[
                { label: "Bank", value: "Hong Leong Bank" },
                { label: "Account Name", value: "Kallumalaiyan Sketchart Enterprise" },
                { label: "Account No", value: "XXXXXXXXXX" },
                { label: "Reference", value: customerPhone || "Your phone number" },
              ].map(row => (
                <div key={row.label} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "6px 0", borderBottom: "1px solid #E8E2D9",
                  fontSize: "13px"
                }}>
                  <p style={{ color: "#888" }}>{row.label}</p>
                  <p style={{ fontWeight: "600", color: "#1A1714" }}>{row.value}</p>
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block", width: "100%",
                padding: "14px", textAlign: "center",
                background: "#25D366", color: "white",
                borderRadius: "8px", textDecoration: "none",
                fontSize: "15px", fontWeight: "700",
                marginBottom: "12px", boxSizing: "border-box"
              }}
            >
              📲 Send Receipt via WhatsApp
            </a>

            <p style={{
              fontSize: "12px", color: "#888",
              textAlign: "center", lineHeight: "1.6"
            }}>
              After sending receipt, Sharrman will confirm your payment
              and begin your sketch within 1-2 working days.
            </p>
          </div>
        </div>

        {/* Important Note */}
        <div style={{
          background: "#FEF9C3", border: "1px solid #EAB308",
          borderRadius: "8px", padding: "14px 16px", marginBottom: "24px"
        }}>
          <p style={{ fontSize: "13px", color: "#854D0E", lineHeight: "1.7" }}>
            ⚠️ <b>Important:</b> Your order will only be processed after payment confirmation.
            Please send your receipt to WhatsApp +60 19-407 9787 within 24 hours.
            Orders without payment will be cancelled automatically.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button onClick={() => navigate("/shop")} style={{
            background: "#1A1714", color: "white",
            border: "none", padding: "12px 28px",
            borderRadius: "6px", cursor: "pointer",
            fontSize: "14px", fontFamily: "inherit"
          }}>
            Shop More
          </button>
          <button onClick={() => navigate("/")} style={{
            background: "white", color: "#1A1714",
            border: "1px solid #1A1714", padding: "12px 28px",
            borderRadius: "6px", cursor: "pointer",
            fontSize: "14px", fontFamily: "inherit"
          }}>
            Go Home
          </button>
        </div>

      </div>
      <Footer />
    </div>
  )
}
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useCart } from "../context/CartContext"
import { useEffect } from "react"

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const { clearCart } = useCart()

  const params = new URLSearchParams(window.location.search)
  const status = params.get("status")
  const success = status === "success" || !status

  useEffect(() => {
    if (success) {
      clearCart()
    }
  }, [])

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />
      <div style={{
        maxWidth: "500px", margin: "0 auto",
        padding: "60px 24px", textAlign: "center"
      }}>
        {/* Icon */}
        <div style={{
          width: "80px", height: "80px",
          background: success ? "#EAF3DE" : "#FEE2E2",
          borderRadius: "50%",
          display: "flex", alignItems: "center",
          justifyContent: "center", margin: "0 auto 24px",
          fontSize: "32px"
        }}>
          {success ? "✓" : "✗"}
        </div>

        <h1 style={{
          fontSize: "26px", fontWeight: "700",
          marginBottom: "12px",
          color: success ? "#1A1714" : "#DC2626"
        }}>
          {success ? "Order Confirmed!" : "Payment Failed"}
        </h1>

        <p style={{
          color: "#555", lineHeight: "1.8",
          marginBottom: "32px", fontSize: "14px"
        }}>
          {success
            ? "Thank you for your order!  Your order has been successfully received. We’ve received your payment and your sketch is now in our queue for processing."
            : "Your payment was not successful. Please try again or contact us via Telegram for assistance."
          }
        </p>

        {/* Details Box */}
        <div style={{
          background: "#FAFAFA", border: "1px solid #E8E2D9",
          borderRadius: "8px", padding: "20px",
          textAlign: "left", marginBottom: "32px"
        }}>
          {(success ? [
            { label: "Payment Status", value: "✅ Paid" },
            { label: "Processing & Delivery", value: "📦 Your order will be processed and delivered within 3-5 working days." },
            { label: "Questions?", value: "💬 Have any questions about your order? Feel free to contact us anytime." },
          ] : [
            { label: "Payment Status", value: "❌ Failed" },
            { label: "Action", value: "Please try again" },
            { label: "Need Help?", value: "💬 Contact us via Whatsapp" },
          ]).map(row => (
            <div key={row.label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "10px 0", borderBottom: "1px solid #E8E2D9"
            }}>
              <p style={{ fontSize: "13px", color: "#888" }}>{row.label}</p>
              <p style={{ fontSize: "13px", fontWeight: "600" }}>{row.value}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          {success ? (
            <>
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
            </>
          ) : (
            <>
              <button onClick={() => navigate("/checkout")} style={{
                background: "#DC2626", color: "white",
                border: "none", padding: "12px 28px",
                borderRadius: "6px", cursor: "pointer",
                fontSize: "14px", fontFamily: "inherit"
              }}>
                Try Again
              </button>
              <button onClick={() => navigate("/")} style={{
                background: "white", color: "#1A1714",
                border: "1px solid #1A1714", padding: "12px 28px",
                borderRadius: "6px", cursor: "pointer",
                fontSize: "14px", fontFamily: "inherit"
              }}>
                Go Home
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

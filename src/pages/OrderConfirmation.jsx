import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function OrderConfirmation() {
  const navigate = useNavigate()

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{
        maxWidth: "500px", margin: "0 auto",
        padding: "60px 24px", textAlign: "center"
      }}>

        {/* Success Icon */}
        <div style={{
          width: "72px", height: "72px",
          background: "#EAF3DE", borderRadius: "50%",
          display: "flex", alignItems: "center",
          justifyContent: "center", margin: "0 auto 24px",
          fontSize: "28px"
        }}>
          ✓
        </div>

        <h1 style={{
          fontSize: "26px", fontWeight: "700",
          marginBottom: "12px", color: "#1A1714"
        }}>
          Order Confirmed!
        </h1>

        <p style={{
          color: "#555", lineHeight: "1.8",
          marginBottom: "32px", fontSize: "14px"
        }}>
          Thank you for your order! You will receive a confirmation
          on Telegram shortly. Your sketch will be carefully crafted
          and shipped within 7 working days.
        </p>

        {/* Order Details */}
        <div style={{
          background: "#FAFAFA", border: "1px solid #E8E2D9",
          borderRadius: "8px", padding: "20px",
          textAlign: "left", marginBottom: "32px"
        }}>
          {[
            { label: "Status", value: "Paid" },
            { label: "Notification", value: "Telegram sent" },
            { label: "Delivery", value: "Within 7 working days" },
          ].map(row => (
            <div key={row.label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "10px 0", borderBottom: "1px solid #E8E2D9"
            }}>
              <p style={{ fontSize: "13px", color: "#888" }}>{row.label}</p>
              <p style={{ fontSize: "13px", fontWeight: "600" }}>{row.value}</p>
            </div>
          ))}
          <div style={{
            display: "flex", justifyContent: "space-between",
            padding: "10px 0"
          }}>
            <p style={{ fontSize: "13px", color: "#888" }}>Questions?</p>
            <p style={{ fontSize: "13px", color: "#555" }}>Telegram us anytime</p>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/shop")}
            style={{
              background: "#1A1714", color: "white",
              border: "none", padding: "12px 28px",
              borderRadius: "6px", cursor: "pointer",
              fontSize: "14px", fontFamily: "inherit"
            }}
          >
            Shop More
          </button>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "white", color: "#1A1714",
              border: "1px solid #1A1714", padding: "12px 28px",
              borderRadius: "6px", cursor: "pointer",
              fontSize: "14px", fontFamily: "inherit"
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
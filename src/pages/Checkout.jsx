import { useState } from "react"
import Navbar from "../components/Navbar"
import { useCart } from "../context/CartContext"
import Footer from "../components/Footer"

const API = "https://kallumalaiyan-backend.onrender.com"

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    state: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePay = async () => {
    const empty = Object.values(form).some(v => v.trim() === "")
    if (empty) {
      setError("Please fill in all fields!")
      return
    }
    if (cartItems.length === 0) {
      setError("Your cart is empty!")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch(API + "/api/payment/create-bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            postcode: form.postcode,
            state: form.state,
          },
          items: cartItems.map(i => ({
            name: i.product.name,
            color: i.variant.color,
            size: i.variant.size,
            qty: i.qty,
            price: i.product.price
          })),
          subtotal: total,
          shipping: 0,
          total: total
        })
      })
      const data = await res.json()
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        setError("Payment error: " + (data.error || "Unknown error"))
        setLoading(false)
      }
    } catch (err) {
      setError("Error: " + err.message)
      setLoading(false)
    }
  }

  const inputStyle = {
    width: "100%", padding: "12px 14px",
    border: "1px solid #E8E2D9", borderRadius: "6px",
    fontSize: "14px", fontFamily: "inherit",
    outline: "none", boxSizing: "border-box",
    marginBottom: "12px"
  }

  const labelStyle = {
    display: "block", fontSize: "12px",
    color: "#888", marginBottom: "4px",
    letterSpacing: "0.04em"
  }

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>

        <h1 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "32px" }}>
          Checkout
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px", alignItems: "start"
        }}>

          {/* Left - Delivery Form */}
          <div>
            <h2 style={{
              fontSize: "16px", fontWeight: "700",
              marginBottom: "20px", color: "#1A1714"
            }}>
              Delivery Details
            </h2>

            {error && (
              <div style={{
                background: "#FCEBEB", color: "#A32D2D",
                padding: "12px 14px", borderRadius: "6px",
                fontSize: "13px", marginBottom: "16px"
              }}>
                {error}
              </div>
            )}

            <label style={labelStyle}>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange}
              placeholder="John Doe" style={inputStyle} />

            <label style={labelStyle}>Email</label>
            <input name="email" value={form.email} onChange={handleChange}
              placeholder="john@email.com" type="email" style={inputStyle} />

            <label style={labelStyle}>Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange}
              placeholder="+60 12-345 6789" style={inputStyle} />

            <label style={labelStyle}>Address</label>
            <input name="address" value={form.address} onChange={handleChange}
              placeholder="No. 12, Jalan Seri Petaling" style={inputStyle} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>City</label>
                <input name="city" value={form.city} onChange={handleChange}
                  placeholder="Kuala Lumpur"
                  style={{ ...inputStyle, marginBottom: "0" }} />
              </div>
              <div>
                <label style={labelStyle}>Postcode</label>
                <input name="postcode" value={form.postcode} onChange={handleChange}
                  placeholder="57000"
                  style={{ ...inputStyle, marginBottom: "0" }} />
              </div>
            </div>

            <div style={{ marginTop: "12px" }}>
              <label style={labelStyle}>State</label>
              <input name="state" value={form.state} onChange={handleChange}
                placeholder="Wilayah Persekutuan" style={inputStyle} />
            </div>

            <div style={{
              padding: "14px 16px", background: "#F5F5F5",
              border: "1px solid #E8E2D9", borderRadius: "6px",
              fontSize: "13px", color: "#555", marginTop: "4px",
              lineHeight: "1.6"
            }}>
              🚚 Free delivery within Malaysia. Your sketch will be carefully
              crafted and shipped within 7 working days.
            </div>
          </div>

          {/* Right - Order Summary */}
          <div style={{
            border: "1px solid #E8E2D9", borderRadius: "8px",
            padding: "24px", background: "#FAFAFA"
          }}>
            <h2 style={{
              fontSize: "16px", fontWeight: "700",
              marginBottom: "20px", color: "#1A1714"
            }}>
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <p style={{ color: "#888", fontSize: "13px" }}>
                No items in cart.{" "}
                <a href="/shop" style={{ color: "#1A1714" }}>Go shop!</a>
              </p>
            ) : (
              <>
                {cartItems.map(item => {
                  const img = item.variant.color === "Color"
                    ? (item.product.imagesColor?.[0] || item.product.imageColor ||
                       item.product.imageBW || item.product.image)
                    : (item.product.imagesBW?.[0] || item.product.imageBW ||
                       item.product.images?.[0] || item.product.image)
                  return (
                    <div key={item.key} style={{
                      display: "flex", gap: "12px",
                      padding: "12px 0",
                      borderBottom: "1px solid #E8E2D9"
                    }}>
                      {img && (
                        <img src={img} alt={item.product.name} style={{
                          width: "56px", height: "70px",
                          objectFit: "contain", borderRadius: "4px",
                          border: "1px solid #E8E2D9", background: "#F5F5F5",
                          flexShrink: 0
                        }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: "flex", justifyContent: "space-between"
                        }}>
                          <p style={{ fontSize: "13px", fontWeight: "600" }}>
                            {item.product.name}
                          </p>
                          <p style={{ fontSize: "13px", fontWeight: "600" }}>
                            RM {item.product.price * item.qty}
                          </p>
                        </div>
                        <p style={{ fontSize: "13px", color: "#888", marginTop: "2px" }}>
                          {item.variant.size} x{item.qty}
                        </p>
                      </div>
                    </div>
                  )
                })}

                <div style={{ paddingTop: "16px" }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginBottom: "8px"
                  }}>
                    <p style={{ fontSize: "13px", color: "#888" }}>Subtotal</p>
                    <p style={{ fontSize: "13px" }}>RM {total}.00</p>
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginBottom: "16px"
                  }}>
                    <p style={{ fontSize: "13px", color: "#888" }}>Shipping</p>
                    <p style={{ fontSize: "13px", color: "#16A34A" }}>FREE</p>
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    borderTop: "1px solid #E8E2D9", paddingTop: "12px",
                    marginBottom: "20px"
                  }}>
                    <p style={{ fontSize: "15px", fontWeight: "700" }}>Total</p>
                    <p style={{ fontSize: "15px", fontWeight: "700" }}>RM {total}.00</p>
                  </div>

                  <button
                    onClick={handlePay}
                    disabled={loading}
                    style={{
                      width: "100%", padding: "14px",
                      background: loading ? "#888" : "#1A1714",
                      color: "white", border: "none",
                      borderRadius: "6px", cursor: loading ? "not-allowed" : "pointer",
                      fontSize: "14px", fontFamily: "inherit", fontWeight: "500"
                    }}
                  >
                    {loading ? "Processing..." : "Pay RM " + total + ".00"}
                  </button>

                  <p style={{
                    textAlign: "center", fontSize: "11px",
                    color: "#888", marginTop: "10px"
                  }}>
                    Secure payment via ToyyibPay · FPX
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
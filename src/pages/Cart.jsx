import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useCart } from "../context/CartContext"
import Footer from "../components/Footer"

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, total } = useCart()
  const navigate = useNavigate()

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "24px"
        }}>
          <h1 style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>
            Your Cart
          </h1>
          <button
            onClick={() => navigate("/shop")}
            style={{
              background: "none", border: "none",
              cursor: "pointer", fontSize: "13px",
              color: "#888", textDecoration: "underline"
            }}
          >
            Continue Shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ color: "#888", marginBottom: "24px", fontSize: "16px" }}>
              Your cart is empty
            </p>
            <button onClick={() => navigate("/shop")} style={{
              background: "#1A1714", color: "white", border: "none",
              padding: "12px 32px", borderRadius: "6px",
              cursor: "pointer", fontSize: "14px"
            }}>
              Shop Now
            </button>
          </div>
        ) : (
          <>
            {/* Column headers */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              padding: "8px 0", borderBottom: "1px solid #E8E2D9",
              marginBottom: "8px"
            }}>
              <p style={{
                fontSize: "11px", color: "#888",
                letterSpacing: "0.1em", textTransform: "uppercase"
              }}>Product</p>
              <p style={{
                fontSize: "11px", color: "#888",
                letterSpacing: "0.1em", textTransform: "uppercase"
              }}>Total</p>
            </div>

            {/* Cart Items */}
            {cartItems.map(item => {
              const img = item.variant.color === "Color"
  ? (item.product.imagesColor?.[0] || item.product.imageColor ||
     item.product.imageBW || item.product.image)
  : (item.product.imagesBW?.[0] || item.product.imageBW ||
     item.product.images?.[0] || item.product.image)
              return (
                <div key={item.key} style={{
                  display: "flex", gap: "16px",
                  padding: "20px 0", borderBottom: "1px solid #E8E2D9"
                }}>
                  {/* Product Image */}
                  {img && (
                    <img src={img} alt={item.product.name} style={{
                      width: "90px", height: "110px",
                      objectFit: "contain", borderRadius: "6px",
                      border: "1px solid #E8E2D9", background: "#F5F5F5",
                      flexShrink: 0
                    }} />
                  )}

                  {/* Product Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "flex-start", marginBottom: "6px"
                    }}>
                      <p style={{ fontSize: "15px", fontWeight: "700", color: "#1A1714" }}>
                        {item.product.name}
                      </p>
                      <p style={{ fontSize: "15px", fontWeight: "700", marginLeft: "12px" }}>
                        RM {item.product.price * item.qty}.00
                      </p>
                    </div>

                    <p style={{ fontSize: "12px", color: "#666", marginBottom: "2px" }}>
                      Sketch Style: {item.variant.color}
                    </p>
                    <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
                      Size: {item.variant.size}
                    </p>

                    {/* Qty + Delete */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        display: "flex", alignItems: "center",
                        border: "1px solid #E8E2D9", borderRadius: "6px"
                      }}>
                        <button
  onClick={() => updateQty(item.key, item.qty - 1)}
  style={{
    background: "none", border: "none",
    cursor: "pointer", padding: "6px 14px",
    fontSize: "16px", color: "#1A1714"
  }}>-</button>
<span style={{
  padding: "6px 14px", fontSize: "13px",
  borderLeft: "1px solid #E8E2D9",
  borderRight: "1px solid #E8E2D9"
}}>{item.qty}</span>
<button
  onClick={() => updateQty(item.key, item.qty + 1)}
  style={{
    background: "none", border: "none",
    cursor: "pointer", padding: "6px 14px",
    fontSize: "16px", color: "#1A1714"
  }}>+</button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        style={{
                          background: "none", border: "1px solid #E8E2D9",
                          borderRadius: "6px", cursor: "pointer",
                          padding: "6px 12px", fontSize: "12px", color: "#888"
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Summary */}
            <div style={{ padding: "24px 0" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: "6px"
              }}>
                <p style={{ fontSize: "15px", fontWeight: "700" }}>
                  Estimated Total Cost
                </p>
                <p style={{ fontSize: "15px", fontWeight: "700" }}>
                  RM {total}.00
                </p>
              </div>
              <p style={{ fontSize: "12px", color: "#888", marginBottom: "24px" }}>
                Taxes and shipping fee will be calculated at checkout
              </p>
              <button
                onClick={() => navigate("/checkout")}
                style={{
                  width: "100%", padding: "14px",
                  background: "#1A1714", color: "white",
                  border: "none", borderRadius: "6px",
                  cursor: "pointer", fontSize: "15px",
                  fontFamily: "inherit", fontWeight: "500"
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
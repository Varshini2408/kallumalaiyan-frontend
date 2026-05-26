import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useCart } from "../context/CartContext"

export default function Cart() {
  const { cartItems, removeFromCart, total } = useCart()
  const navigate = useNavigate()

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "16px"
        }}>
          <h1 style={{ fontSize: "18px", fontWeight: "700" }}>Your Cart</h1>
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
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ color: "#888", marginBottom: "20px" }}>Your cart is empty</p>
            <button onClick={() => navigate("/shop")} style={{
              background: "#1A1714", color: "white", border: "none",
              padding: "12px 28px", borderRadius: "6px", cursor: "pointer"
            }}>Shop Now</button>
          </div>
        ) : (
          <>
            <div style={{
              display: "flex", justifyContent: "space-between",
              padding: "8px 0", borderBottom: "1px solid #E8E2D9",
              marginBottom: "12px"
            }}>
              <p style={{ fontSize: "11px", color: "#888", letterSpacing: "0.1em" }}>PRODUCT</p>
              <p style={{ fontSize: "11px", color: "#888", letterSpacing: "0.1em" }}>TOTAL</p>
            </div>

            {cartItems.map(item => {
              const img = item.product.images && item.product.images.length > 0
                ? item.product.images[0] : item.product.image
              return (
                <div key={item.key} style={{
                  display: "flex", gap: "12px",
                  padding: "16px 0", borderBottom: "1px solid #E8E2D9"
                }}>
                  <img src={img} alt={item.product.name} style={{
                    width: "80px", height: "100px",
                    objectFit: "contain", borderRadius: "6px",
                    border: "1px solid #E8E2D9", background: "#F5F5F5"
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      marginBottom: "4px"
                    }}>
                      <p style={{ fontSize: "14px", fontWeight: "700" }}>
                        {item.product.name}
                      </p>
                      <p style={{ fontSize: "14px", fontWeight: "700" }}>
                        RM {item.product.price * item.qty}.00
                      </p>
                    </div>
                    <p style={{ fontSize: "12px", color: "#666", marginBottom: "2px" }}>
                      Sketch Style: {item.variant.color}
                    </p>
                    <p style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}>
                      Size: {item.variant.size}
                    </p>
                    <div style={{
                      display: "flex", alignItems: "center",
                      gap: "0", border: "1px solid #E8E2D9",
                      borderRadius: "6px", width: "fit-content"
                    }}>
                      <button style={{
                        background: "none", border: "none",
                        cursor: "pointer", padding: "6px 12px", fontSize: "16px"
                      }}>-</button>
                      <span style={{
                        padding: "6px 12px", fontSize: "13px",
                        borderLeft: "1px solid #E8E2D9",
                        borderRight: "1px solid #E8E2D9"
                      }}>{item.qty}</span>
                      <button style={{
                        background: "none", border: "none",
                        cursor: "pointer", padding: "6px 12px", fontSize: "16px"
                      }}>+</button>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        style={{
                          background: "none", border: "none",
                          cursor: "pointer", padding: "6px 12px",
                          fontSize: "14px", color: "#888",
                          borderLeft: "1px solid #E8E2D9"
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

            <div style={{ padding: "20px 0" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                marginBottom: "6px"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Estimated Total Cost</p>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>RM {total}.00</p>
              </div>
              <p style={{ fontSize: "12px", color: "#888", marginBottom: "20px" }}>
                Taxes and shipping fee will be calculated at checkout
              </p>
              <button
                onClick={() => navigate("/checkout")}
                style={{
                  width: "100%", padding: "14px",
                  background: "#1A1714", color: "white",
                  border: "none", borderRadius: "6px",
                  cursor: "pointer", fontSize: "14px",
                  fontFamily: "inherit"
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <footer style={{
        background: "white", borderTop: "1px solid #E8E2D9",
        padding: "32px 20px 20px"
      }}>
        <div style={{ borderTop: "1px solid #E8E2D9", paddingTop: "16px" }}>
          <p style={{ fontSize: "12px", color: "#888", textAlign: "center", marginBottom: "4px" }}>
            @Kallumalaiyan Sketch Art. All right reserved.
          </p>
          <p style={{ fontSize: "11px", color: "#aaa", textAlign: "center" }}>
            Powered by TechMentor Solutions
          </p>
        </div>
      </footer>
    </div>
  )
}
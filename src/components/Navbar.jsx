import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import logo from "../assets/logoKS1.png"

export default function Navbar() {
  const { cartItems } = useCart()
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0 24px", height: "64px",
      borderBottom: "1px solid #E8E2D9",
      backgroundColor: "#FAF8F4", position: "sticky", top: 0, zIndex: 100
    }}>

      <Link to="/" style={{
        textDecoration: "none", color: "#1A1714",
        display: "flex", alignItems: "center", gap: "10px"
      }}>
        <img src={logo} alt="Logo" style={{
          width: "55px", height: "55px", objectFit: "contain", borderRadius: "4px"
        }} />
        <span style={{ fontSize: "18px", fontWeight: "600" }}>
          Kallumalaiyan SketchArt
        </span>
      </Link>

      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}
        className="desktop-nav">
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/shop" style={linkStyle}>Shop</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/cart" style={cartStyle}>
          Cart
          {totalItems > 0 && (
            <span style={{
              background: "#C4A882", color: "#1A1714", borderRadius: "50%",
              width: "18px", height: "18px", fontSize: "11px",
              display: "inline-flex", alignItems: "center",
              justifyContent: "center", marginLeft: "6px", fontWeight: "600"
            }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none", background: "none", border: "none",
          fontSize: "22px", cursor: "pointer", color: "#1A1714"
        }}
        className="hamburger"
      >
        {menuOpen ? "x" : "="}
      </button>

      {menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "#FAF8F4", borderBottom: "1px solid #E8E2D9",
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: "16px",
          zIndex: 99
        }}
          className="mobile-menu"
        >
          <Link to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" style={linkStyle} onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/about" style={linkStyle} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/cart" style={linkStyle} onClick={() => setMenuOpen(false)}>
            Cart {totalItems > 0 && "(" + totalItems + ")"}
          </Link>
        </div>
      )}
    </nav>
  )
}

const linkStyle = {
  textDecoration: "none", color: "#3D3830",
  fontSize: "14px", letterSpacing: "0.05em"
}

const cartStyle = {
  textDecoration: "none", color: "#FAF8F4",
  backgroundColor: "#1A1714", padding: "8px 16px",
  borderRadius: "4px", fontSize: "13px",
  display: "flex", alignItems: "center"
}

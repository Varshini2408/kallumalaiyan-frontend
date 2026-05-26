import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import logo from "../assets/logoKS1.png"

export default function Navbar() {
  const { cartItems } = useCart()
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate("/shop?search=" + encodeURIComponent(searchQuery.trim()))
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <>
      <nav style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", padding: "12px 20px",
        background: "white", borderBottom: "1px solid #E8E2D9",
        position: "sticky", top: 0, zIndex: 100
      }}>

        {/* Left - Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: "none", border: "none",
            cursor: "pointer", padding: "4px",
            display: "flex", flexDirection: "column",
            gap: "5px", width: "40px"
          }}
        >
          <span style={{ display: "block", height: "1.5px", background: "#1A1714", width: "24px" }} />
          <span style={{ display: "block", height: "1.5px", background: "#1A1714", width: "24px" }} />
          <span style={{ display: "block", height: "1.5px", background: "#1A1714", width: "24px" }} />
        </button>

        {/* Center - Logo */}
        <Link to="/" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <img
            src={logo}
            alt="Kallumalaiyan SketchArt"
            style={{
              width: "60px", height: "60px",
              objectFit: "contain", borderRadius: "50%",
              border: "1px solid #E8E2D9"
            }}
          />
        </Link>

        {/* Right - Search + Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7"/>
              <line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </button>

          <Link to="/cart" style={{ position: "relative", textDecoration: "none" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span style={{
                position: "absolute", top: "-6px", right: "-6px",
                background: "#1A1714", color: "white",
                borderRadius: "50%", width: "16px", height: "16px",
                fontSize: "10px", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontWeight: "600"
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Search Bar */}
      {searchOpen && (
        <div style={{
          background: "white", borderBottom: "1px solid #E8E2D9",
          padding: "12px 20px"
        }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
            <input
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              style={{
                flex: 1, padding: "10px 14px",
                border: "1px solid #E8E2D9", borderRadius: "4px",
                fontSize: "14px", fontFamily: "inherit", outline: "none"
              }}
            />
            <button type="submit" style={{
              background: "#1A1714", color: "white", border: "none",
              padding: "10px 20px", borderRadius: "4px",
              cursor: "pointer", fontSize: "13px"
            }}>
              Search
            </button>
            <button type="button" onClick={() => setSearchOpen(false)} style={{
              background: "none", border: "1px solid #E8E2D9",
              padding: "10px 14px", borderRadius: "4px",
              cursor: "pointer", fontSize: "13px"
            }}>
              X
            </button>
          </form>
        </div>
      )}

      {/* Side Menu Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.3)", zIndex: 200
          }}
        />
      )}

      {/* Side Menu Panel */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0,
          width: "280px", height: "100vh",
          background: "white", zIndex: 201,
          overflowY: "auto",
          boxShadow: "4px 0 20px rgba(0,0,0,0.1)"
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "16px 20px",
            borderBottom: "1px solid #E8E2D9"
          }}>
            <img src={logo} alt="Logo" style={{
              width: "44px", height: "44px",
              objectFit: "contain", borderRadius: "50%",
              border: "1px solid #E8E2D9"
            }} />
            <button onClick={() => setMenuOpen(false)} style={{
              background: "none", border: "none",
              cursor: "pointer", fontSize: "20px", color: "#1A1714"
            }}>
              X
            </button>
          </div>

          <a href="/about" onClick={() => setMenuOpen(false)} style={{
            display: "block", padding: "18px 20px",
            fontSize: "15px", fontWeight: "600",
            color: "#1A1714", textDecoration: "none",
            borderBottom: "1px solid #F0EDE8",
            background: "#F5F5F5"
          }}>
            Bio
          </a>
          <a href="/shop" onClick={() => setMenuOpen(false)} style={{
            display: "block", padding: "18px 20px",
            fontSize: "15px", fontWeight: "600",
            color: "#1A1714", textDecoration: "none",
            borderBottom: "1px solid #F0EDE8",
            background: "white"
          }}>
            Art Categories
          </a>
          <a href="/enquiry" onClick={() => setMenuOpen(false)} style={{
            display: "block", padding: "18px 20px",
            fontSize: "15px", fontWeight: "600",
            color: "#1A1714", textDecoration: "none",
            borderBottom: "1px solid #F0EDE8",
            background: "white"
          }}>
            Enquiry
          </a>
        </div>
      )}
    </>
  )
}
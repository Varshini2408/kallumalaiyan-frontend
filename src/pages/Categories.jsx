import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const API = "https://kallumalaiyan-backend.onrender.com"


export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [cols, setCols] = useState(2)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(API + "/api/categories")
      .then(r => r.json())
      .then(d => setCategories(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoading(false))

    const handleResize = () => {
      if (window.innerWidth >= 1024) setCols(4)
      else if (window.innerWidth >= 640) setCols(3)
      else setCols(2)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const dynamicGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(" + cols + ", 1fr)",
    gap: cols === 2 ? "12px" : "16px"
  }

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
        <h1 style={{
          fontSize: "clamp(18px, 3vw, 28px)", fontWeight: "700",
          color: "#1A1714", marginBottom: "8px"
        }}>
          Sketch Art Categories
        </h1>
        <p style={{
          fontSize: "15px", color: "#555", lineHeight: "1.8",
          marginBottom: "24px"
        }}>
          Browse our collection of sacred devotional artwork by category.
        </p>

        {loading ? (
          <p style={{ textAlign: "center", padding: "60px", color: "#888" }}>Loading...</p>
        ) : categories.length === 0 ? (
          <p style={{ textAlign: "center", padding: "60px", color: "#888" }}>No categories yet!</p>
        ) : (
          <div style={dynamicGrid}>
            {categories.map(cat => {
              const name = typeof cat === "string" ? cat : cat.name
              const img = typeof cat === "object" ? cat.image : null
              return (
                <div
                  key={name}
                  onClick={() => navigate("/shop?category=" + encodeURIComponent(name))}
                  style={{
                    border: "1px solid #E8E2D9", borderRadius: "8px",
                    overflow: "hidden", cursor: "pointer", position: "relative",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#F5F5F5" }}>
                    {img ? (
                      <img src={img} alt={name} style={{
                        width: "100%", height: "100%", objectFit: "contain"
                      }} />
                    ) : (
                      <div style={{
                        width: "100%", height: "100%", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: "13px", color: "#ccc"
                      }}>No Image</div>
                    )}
                  </div>
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "rgba(255,255,255,0.92)",
                    padding: "10px 12px", textAlign: "center"
                  }}>
                    <p style={{ fontSize: "15px", fontWeight: "700", marginBottom: "2px" }}>{name}</p>
                    <p style={{ fontSize: "13px", color: "#888" }}>Click to explore</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

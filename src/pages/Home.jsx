import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const API = "https://kallumalaiyan-backend.onrender.com"


function SectionHeader({ title }) {
  return (
    <div style={{
      background: "#F0F0F0", padding: "14px 24px", marginBottom: "20px"
    }}>
      <h2 style={{
        fontSize: "16px", fontWeight: "700",
        color: "#1A1714", margin: 0, textAlign: "center"
      }}>{title}</h2>
    </div>
  )
}

export default function Home() {
  const [categories, setCategories] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [cols, setCols] = useState(2)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(API + "/api/categories")
      .then(r => r.json())
      .then(d => setCategories(Array.isArray(d) ? d : []))
      .catch(console.error)

    fetch(API + "/api/products")
      .then(r => r.json())
      .then(d => setAllProducts(Array.isArray(d) ? d : []))
      .catch(console.error)

    const handleResize = () => {
      if (window.innerWidth >= 1024) setCols(4)
      else if (window.innerWidth >= 640) setCols(3)
      else setCols(2)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const hotSelling = allProducts.filter(p => p.isHotSelling)
  const newArrivals = allProducts.filter(p => p.isNewArrival)

  const getProductImg = (product) =>
    (product.imagesBW && product.imagesBW.length > 0 ? product.imagesBW[0] : null) ||
    product.imageBW ||
    (product.images && product.images.length > 0 ? product.images[0] : null) ||
    product.image || null

  const dynamicGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(" + cols + ", 1fr)",
    gap: cols === 2 ? "12px" : "16px"
  }

  const ProductCard = ({ product }) => {
    const img = getProductImg(product)
    return (
      <div
        onClick={() => navigate("/product/" + product._id)}
        style={{
          border: "1px solid #E8E2D9", borderRadius: "8px",
          overflow: "hidden", background: "white", cursor: "pointer"
        }}
      >
        <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#F5F5F5" }}>
          {img ? (
            <img src={img} alt={product.name} style={{
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
        <div style={{ padding: "10px 12px", textAlign: "center" }}>
          {product.isHotSelling && (
            <span style={{
              background: "#FEE2E2", color: "#DC2626", fontSize: "9px",
              padding: "2px 8px", borderRadius: "10px", fontWeight: "600",
              display: "inline-block", marginBottom: "4px"
            }}>HOT</span>
          )}
          {product.isNewArrival && (
            <span style={{
              background: "#DCFCE7", color: "#16A34A", fontSize: "9px",
              padding: "2px 8px", borderRadius: "10px", fontWeight: "600",
              display: "inline-block", marginBottom: "4px", marginLeft: "4px"
            }}>NEW</span>
          )}
          <p style={{
            fontSize: "15px", fontWeight: "700",
            color: "#1A1714", marginBottom: "2px"
          }}>{product.name}</p>
          <p style={{ fontSize: "14px", color: "#666" }}>From RM 45</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Intro */}
        <div style={{ padding: "24px 24px 16px" }}>
          <h1 style={{
            fontSize: "clamp(18px, 3vw, 28px)", fontWeight: "700",
            color: "#1A1714", marginBottom: "10px"
          }}>
            Sketch Art
          </h1>
          <p style={{
            fontSize: "15px", color: "#555",
            lineHeight: "1.8", maxWidth: "600px"
          }}>
            Sacred devotional artwork - digitally sketched portraits of Hindu deities
            and lord names in artistic calligraphy, crafted with soul and devotion.
          </p>
        </div>

        {/* Categories */}
        <SectionHeader title="Sketch Art Categories" />
        <div style={{ padding: "0 24px 8px" }}>
          <div style={{ ...dynamicGrid, marginBottom: "12px" }}>
            {categories.slice(0, 4).map(cat => {
              const name = typeof cat === "string" ? cat : cat.name
              const img = typeof cat === "object" ? cat.image : null
              return (
                <div
                  key={name}
                  onClick={() => navigate("/shop?category=" + encodeURIComponent(name))}
                  style={{
                    border: "1px solid #E8E2D9", borderRadius: "8px",
                    overflow: "hidden", cursor: "pointer", position: "relative"
                  }}
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
          {categories.length > 4 && (
            <div style={{ textAlign: "right", marginBottom: "8px" }}>
              <a href="/shop" style={{
                fontSize: "12px", color: "#1A1714", textDecoration: "underline"
              }}>View All Categories</a>
            </div>
          )}
        </div>

        {/* Best Seller */}
        {hotSelling.length > 0 && (
          <div style={{ marginTop: "32px" }}>
            <SectionHeader title="Best Seller" />
            <div style={{ padding: "0 24px" }}>
              <div style={dynamicGrid}>
                {hotSelling.map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* New Collection */}
        {newArrivals.length > 0 && (
          <div style={{ marginTop: "32px" }}>
            <SectionHeader title="New Collection" />
            <div style={{ padding: "0 24px" }}>
              <div style={dynamicGrid}>
                {newArrivals.map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}



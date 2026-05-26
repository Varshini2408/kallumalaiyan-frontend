import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

const API = "https://kallumalaiyan-backend.onrender.com"

function SectionHeader({ title }) {
  return (
    <div style={{
      background: "#F0F0F0", padding: "12px 20px",
      marginBottom: "16px"
    }}>
      <h2 style={{
        fontSize: "16px", fontWeight: "700",
        color: "#1A1714", margin: 0, textAlign: "center"
      }}>{title}</h2>
    </div>
  )
}

function ProductCard({ product, onClick }) {
  const img = product.images && product.images.length > 0
    ? product.images[0] : product.image
  return (
    <div
      onClick={() => onClick(product._id)}
      style={{
        border: "1px solid #E8E2D9", borderRadius: "8px",
        overflow: "hidden", background: "white",
        cursor: "pointer"
      }}
    >
      <div style={{
        aspectRatio: "3/4", overflow: "hidden",
        background: "#F5F5F5"
      }}>
        {img ? (
          <img src={img} alt={product.name} style={{
            width: "100%", height: "100%", objectFit: "contain"
          }} />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "48px"
          }}>??</div>
        )}
      </div>
      <div style={{ padding: "10px 12px", textAlign: "center" }}>
        <p style={{
          fontSize: "14px", fontWeight: "700",
          color: "#1A1714", marginBottom: "2px"
        }}>{product.name}</p>
        <p style={{ fontSize: "12px", color: "#666" }}>
          From RM {product.price}
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  const [categories, setCategories] = useState([])
  const [allProducts, setAllProducts] = useState([])
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
  }, [])

  const hotSelling  = allProducts.filter(p => p.isHotSelling)
  const newArrivals = allProducts.filter(p => p.isNewArrival)

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* Intro */}
      <div style={{ padding: "20px 20px 8px" }}>
        <h1 style={{
          fontSize: "18px", fontWeight: "700",
          color: "#1A1714", marginBottom: "10px"
        }}>
          Sketch Art
        </h1>
        <p style={{
          fontSize: "13px", color: "#555",
          lineHeight: "1.7", marginBottom: "20px"
        }}>
          Sacred devotional artwork - digitally sketched portraits of Hindu deities
          and lord names in artistic calligraphy, crafted with soul and devotion.
        </p>
      </div>

      {/* Categories Section */}
      <SectionHeader title="Sketch Art Categories" />
      <div style={{ padding: "0 20px 8px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "12px", marginBottom: "12px"
        }}>
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
                      width: "100%", height: "100%",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "48px"
                    }}>???</div>
                  )}
                </div>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "rgba(255,255,255,0.92)",
                  padding: "10px 12px", textAlign: "center"
                }}>
                  <p style={{ fontSize: "13px", fontWeight: "700", marginBottom: "2px" }}>{name}</p>
                  <p style={{ fontSize: "11px", color: "#888" }}>Click to explore</p>
                </div>
              </div>
            )
          })}
        </div>
        {categories.length > 4 && (
          <div style={{ textAlign: "right", marginBottom: "8px" }}>
            <a href="/shop" style={{
              fontSize: "12px", color: "#1A1714",
              textDecoration: "underline"
            }}>View All Categories</a>
          </div>
        )}
      </div>

      {/* Best Seller */}
      {hotSelling.length > 0 && (
        <>
          <SectionHeader title="Best Seller" />
          <div style={{ padding: "0 20px 8px" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px"
            }}>
              {hotSelling.map(p => (
                <ProductCard key={p._id} product={p}
                  onClick={(id) => navigate("/product/" + id)} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* New Collection */}
      {newArrivals.length > 0 && (
        <>
          <SectionHeader title="New Collection" />
          <div style={{ padding: "0 20px 8px" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px"
            }}>
              {newArrivals.map(p => (
                <ProductCard key={p._id} product={p}
                  onClick={(id) => navigate("/product/" + id)} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer style={{
        background: "white", borderTop: "1px solid #E8E2D9",
        padding: "32px 20px 20px", marginTop: "32px"
      }}>
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "12px" }}>Quick Link</p>
          {[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: "About", href: "/about" },
            { label: "Enquiry", href: "/enquiry" },
          ].map(l => (
            <a key={l.label} href={l.href} style={{
              display: "block", fontSize: "13px", color: "#555",
              textDecoration: "none", marginBottom: "6px"
            }}>{l.label}</a>
          ))}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "12px" }}>Contacts</p>
          <p style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}>your@email.com</p>
          <p style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}>+60 XX-XXXX XXXX</p>
          <p style={{ fontSize: "13px", color: "#555" }}>Malaysia</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "12px" }}>Follow Us</p>
          {["Instagram", "Facebook", "WhatsApp", "TikTok"].map(s => (
            <a key={s} href="#" style={{
              display: "block", fontSize: "13px", color: "#555",
              textDecoration: "none", marginBottom: "6px"
            }}>{s}</a>
          ))}
        </div>
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

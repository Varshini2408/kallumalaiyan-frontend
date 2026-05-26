import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

const API = "https://kallumalaiyan-backend.onrender.com"

export default function Shop() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [showSort, setShowSort] = useState(false)
  const [page, setPage] = useState(1)
  const perPage = 6
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get("category")
    const search = params.get("search")
    if (cat) setSelected(cat)
    fetchProducts(search || "")
    fetchCategories()
  }, [])

  const fetchProducts = async (search) => {
    try {
      const res = await fetch(API + "/api/products")
      const data = await res.json()
      let list = Array.isArray(data) ? data : []
      if (search) {
        list = list.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
        )
      }
      setProducts(list)
    } catch (err) {
      console.error(err)
      setProducts([])
    }
    setLoading(false)
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(API + "/api/categories")
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    }
  }

  const sortProducts = (list) => {
    const sorted = [...list]
    switch (sortBy) {
      case "az":     return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case "za":     return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case "newest": return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case "oldest": return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      default: return sorted
    }
  }

  const filtered = selected === "All"
    ? products
    : products.filter(p => p.category === selected)

  const sorted = sortProducts(filtered)
  const totalPages = Math.ceil(sorted.length / perPage)
  const paginated = sorted.slice((page - 1) * perPage, page * perPage)

  const getCatName = (cat) => typeof cat === "string" ? cat : cat.name

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "20px 20px 8px" }}>
        <h1 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>
          {selected === "All" ? "Sketch Art" : selected}
        </h1>
        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "12px" }}>
          Sacred devotional artwork - digitally sketched portraits of Hindu deities
          and lord names in artistic calligraphy.
        </p>

        {/* Sort button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <button
            onClick={() => setShowSort(true)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "none", border: "none", cursor: "pointer",
              fontSize: "14px", fontWeight: "500", color: "#1A1714"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#1A1714" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="20" y2="12"/>
              <line x1="12" y1="18" x2="20" y2="18"/>
            </svg>
            Sort
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p>
      ) : paginated.length === 0 ? (
        <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>No products found</p>
      ) : (
        <div style={{ padding: "0 20px" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px"
          }}>
            {paginated.map(product => {
              const img = product.images && product.images.length > 0
                ? product.images[0] : product.image
              return (
                <div
                  key={product._id}
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
                        alignItems: "center", justifyContent: "center", fontSize: "48px"
                      }}>🎨</div>
                    )}
                  </div>
                  <div style={{ padding: "10px 12px", textAlign: "center" }}>
                    <p style={{ fontSize: "14px", fontWeight: "700", marginBottom: "2px" }}>
                      {product.name}
                    </p>
                    <p style={{ fontSize: "12px", color: "#666" }}>
                      From RM {product.price}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: "flex", justifyContent: "center",
              gap: "16px", padding: "24px 0", alignItems: "center"
            }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    background: "none", border: "none",
                    cursor: "pointer", fontSize: "14px",
                    fontWeight: page === p ? "700" : "400",
                    color: "#1A1714",
                    borderBottom: page === p ? "2px solid #1A1714" : "none",
                    paddingBottom: "2px"
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Other Collections */}
      {selected !== "All" && categories.length > 0 && (
        <>
          <div style={{
            background: "#F0F0F0", padding: "12px 20px", margin: "20px 0 16px"
          }}>
            <h2 style={{
              fontSize: "16px", fontWeight: "700",
              color: "#1A1714", margin: 0, textAlign: "center"
            }}>Other Collections</h2>
          </div>
          <div style={{ padding: "0 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {categories
                .filter(c => getCatName(c) !== selected)
                .slice(0, 4)
                .map(cat => {
                  const name = getCatName(cat)
                  const img = typeof cat === "object" ? cat.image : null
                  const catProducts = products.filter(p => p.category === name)
                  const firstProduct = catProducts[0]
                  const displayImg = img || (firstProduct && (firstProduct.images?.[0] || firstProduct.image))
                  return (
                    <div
                      key={name}
                      onClick={() => {
                        setSelected(name)
                        setPage(1)
                        window.scrollTo(0, 0)
                      }}
                      style={{
                        border: "1px solid #E8E2D9", borderRadius: "8px",
                        overflow: "hidden", cursor: "pointer"
                      }}
                    >
                      <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#F5F5F5" }}>
                        {displayImg ? (
                          <img src={displayImg} alt={name} style={{
                            width: "100%", height: "100%", objectFit: "contain"
                          }} />
                        ) : (
                          <div style={{
                            width: "100%", height: "100%", display: "flex",
                            alignItems: "center", justifyContent: "center", fontSize: "40px"
                          }}>🕉️</div>
                        )}
                      </div>
                      <div style={{ padding: "10px 12px", textAlign: "center" }}>
                        <p style={{ fontSize: "13px", fontWeight: "700" }}>{name}</p>
                        <p style={{ fontSize: "11px", color: "#666" }}>
                          From RM {catProducts[0]?.price || 60}
                        </p>
                      </div>
                    </div>
                  )
                })}
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

      {/* Sort Modal */}
      {showSort && (
        <>
          <div
            onClick={() => setShowSort(false)}
            style={{
              position: "fixed", top: 0, left: 0,
              width: "100vw", height: "100vh",
              background: "rgba(0,0,0,0.3)", zIndex: 200
            }}
          />
          <div style={{
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white", borderRadius: "12px",
            padding: "24px", width: "300px", zIndex: 201,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "20px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", margin: 0 }}>Sort by</h3>
              <button onClick={() => setShowSort(false)} style={{
                background: "none", border: "none",
                cursor: "pointer", fontSize: "18px"
              }}>X</button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", color: "#888", marginBottom: "6px", display: "block" }}>
                Order
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  width: "100%", padding: "10px 12px",
                  border: "1px solid #E8E2D9", borderRadius: "6px",
                  fontSize: "14px", fontFamily: "inherit", outline: "none"
                }}
              >
                <option value="newest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="az">A to Z</option>
                <option value="za">Z to A</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "13px", color: "#888", marginBottom: "6px", display: "block" }}>
                Sketch Art Category
              </label>
              <select
                value={selected}
                onChange={e => { setSelected(e.target.value); setPage(1) }}
                style={{
                  width: "100%", padding: "10px 12px",
                  border: "1px solid #E8E2D9", borderRadius: "6px",
                  fontSize: "14px", fontFamily: "inherit", outline: "none"
                }}
              >
                <option value="All">All Categories</option>
                {categories.map(cat => {
                  const name = getCatName(cat)
                  return <option key={name} value={name}>{name}</option>
                })}
              </select>
            </div>

            <button
              onClick={() => setShowSort(false)}
              style={{
                width: "100%", padding: "12px",
                background: "#1A1714", color: "white",
                border: "none", borderRadius: "6px",
                fontSize: "14px", cursor: "pointer", fontFamily: "inherit"
              }}
            >
              Done
            </button>
          </div>
        </>
      )}
    </div>
  )
}
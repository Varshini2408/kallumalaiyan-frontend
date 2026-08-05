import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const API = "https://kallumalaiyan-backend.onrender.com"


export default function Shop() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [showSort, setShowSort] = useState(false)
  const [page, setPage] = useState(1)
  const [cols, setCols] = useState(2)
  const perPage = 8
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get("category")
    const search = params.get("search")
    if (cat) setSelected(cat)
    fetchProducts(search || "")
    fetchCategories()

    const handleResize = () => {
      if (window.innerWidth >= 1024) setCols(4)
      else if (window.innerWidth >= 640) setCols(3)
      else setCols(2)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
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
    } catch (err) { console.error(err) }
  }

  const getCatName = (cat) => typeof cat === "string" ? cat : cat.name

  const getProductImg = (product) =>
    (product.imagesBW && product.imagesBW.length > 0 ? product.imagesBW[0] : null) ||
    product.imageBW ||
    (product.images && product.images.length > 0 ? product.images[0] : null) ||
    product.image || null

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

  const dynamicGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(" + cols + ", 1fr)",
    gap: cols === 2 ? "12px" : "16px"
  }

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 24px 0" }}>

        <div style={{ marginBottom: "16px" }}>
          <h1 style={{
            fontSize: "clamp(18px, 3vw, 28px)", fontWeight: "700",
            color: "#1A1714", marginBottom: "8px"
          }}>
            {selected === "All" ? "Sketchart" : selected}
          </h1>
          <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7" }}>
  {selected !== "All"
    ? categories.find(c => (typeof c === "string" ? c : c.name) === selected)?.description ||
      "Sacred devotional artwork - digitally sketched portraits of Hindu deities."
    : "Sacred devotional artwork - digitally sketched portraits of Hindu deities."
  }
</p>
        </div>

        {/* Sort button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <button
            onClick={() => setShowSort(true)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "none", border: "1px solid #E8E2D9",
              borderRadius: "6px", cursor: "pointer",
              fontSize: "13px", color: "#1A1714", padding: "8px 14px"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#1A1714" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="20" y2="12"/>
              <line x1="12" y1="18" x2="20" y2="18"/>
            </svg>
            Sort
          </button>
        </div>

        {/* Products */}
        {loading ? (
          <p style={{ textAlign: "center", padding: "60px", color: "#888" }}>Loading...</p>
        ) : paginated.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <p style={{ color: "#888", marginBottom: "16px" }}>No products found</p>
            <button onClick={() => { setSelected("All"); setPage(1) }} style={{
              background: "#1A1714", color: "white", border: "none",
              padding: "10px 24px", borderRadius: "6px", cursor: "pointer"
            }}>View All</button>
          </div>
        ) : (
          <>
            <div style={dynamicGrid}>
              {paginated.map(product => {
                const img = getProductImg(product)
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
                          alignItems: "center", justifyContent: "center",
                          fontSize: "13px", color: "#ccc"
                        }}>No Image</div>
                      )}
                    </div>
                    <div style={{ padding: "10px 12px", textAlign: "center" }}>
  <div style={{ minHeight: "24px", marginBottom: "4px" }}>
    {product.isHotSelling && (
      <span style={{
        background: "#FEE2E2", color: "#DC2626", fontSize: "9px",
        padding: "2px 8px", borderRadius: "10px", fontWeight: "600",
        display: "inline-block", marginRight: "4px"
      }}>HOT</span>
    )}
    {product.isNewArrival && (
      <span style={{
        background: "#DCFCE7", color: "#16A34A", fontSize: "9px",
        padding: "2px 8px", borderRadius: "10px", fontWeight: "600",
        display: "inline-block"
      }}>NEW</span>
    )}
  </div>
  <p style={{ fontSize: "15px", fontWeight: "700", marginBottom: "6px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}>
    {product.name}
  </p>
  {product.promoDiscount ? (
    <div style={{ textAlign: "center" }}>
      <span style={{
        background: "#DC2626", color: "white", fontSize: "10px",
        padding: "3px 8px", borderRadius: "10px", fontWeight: "700",
        display: "inline-block", marginBottom: "4px"
      }}>{product.promoDiscount}% OFF</span>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
        <p style={{ fontSize: "12px", color: "#999", textDecoration: "line-through", margin: 0 }}>
          From RM {product.price}
        </p>
        <p style={{ fontSize: "15px", color: "#DC2626", fontWeight: "700", margin: 0 }}>
          RM {Math.round(product.price * (1 - product.promoDiscount / 100))}
        </p>
      </div>
    </div>
  ) : (
    <p style={{ fontSize: "13px", color: "#666" }}>From RM {product.price}</p>
  )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: "flex", justifyContent: "center",
                gap: "16px", padding: "32px 0", alignItems: "center"
              }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo(0, 0) }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: "14px", fontWeight: page === p ? "700" : "400",
                      color: "#1A1714",
                      borderBottom: page === p ? "2px solid #1A1714" : "none",
                      paddingBottom: "2px"
                    }}
                  >{p}</button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Other Collections */}
        {selected !== "All" && categories.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            <div style={{ background: "#F0F0F0", padding: "14px 0", marginBottom: "20px" }}>
              <h2 style={{
                fontSize: "16px", fontWeight: "700",
                color: "#1A1714", margin: 0, textAlign: "center"
              }}>Other Collections</h2>
            </div>
            <div style={dynamicGrid}>
              {categories
                .filter(c => getCatName(c) !== selected)
                .slice(0, 4)
                .map(cat => {
                  const name = getCatName(cat)
                  const img = typeof cat === "object" ? cat.image : null
                  const catProducts = products.filter(p => p.category === name)
                  const firstImg = img || (catProducts[0] && getProductImg(catProducts[0]))
                  return (
                    <div
                      key={name}
                      onClick={() => { setSelected(name); setPage(1); window.scrollTo(0, 0) }}
                      style={{
                        border: "1px solid #E8E2D9", borderRadius: "8px",
                        overflow: "hidden", cursor: "pointer"
                      }}
                    >
                      <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#F5F5F5" }}>
                        {firstImg ? (
                          <img src={firstImg} alt={name} style={{
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
                        <p style={{ fontSize: "15px", fontWeight: "700", marginBottom: "2px" }}>{name}</p>
<p style={{ fontSize: "13px", color: "#666" }}>From RM 80</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}
      </div>

      <Footer />

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
            padding: "24px", width: "90%", maxWidth: "360px",
            zIndex: 201, boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "20px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", margin: 0 }}>Sort by</h3>
              <button onClick={() => setShowSort(false)} style={{
                background: "none", border: "none",
                cursor: "pointer", fontSize: "18px", color: "#888"
              }}>X</button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{
                fontSize: "12px", color: "#888", marginBottom: "6px",
                display: "block", textTransform: "uppercase", letterSpacing: "0.08em"
              }}>Order</label>
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
              <label style={{
                fontSize: "12px", color: "#888", marginBottom: "6px",
                display: "block", textTransform: "uppercase", letterSpacing: "0.08em"
              }}>Sketchart Category</label>
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


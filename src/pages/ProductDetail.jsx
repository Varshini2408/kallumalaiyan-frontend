import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useCart } from "../context/CartContext"
import Footer from "../components/Footer"

const API = "https://kallumalaiyan-backend.onrender.com"

const colors = ["Black and White", "Color"]
const sizes = [
  { label: "6R (6 x 8 Inc)", value: "6R", price: 80 },
  { label: "A4 (8.3 x 11.1 Inc)", value: "A4", price: 150 },
  { label: "A3 (11.7 x 16.5 Inc)", value: "A3", price: 250 },
]


export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [selectedColor, setSelectedColor] = useState("Black and White")
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [showCartPopup, setShowCartPopup] = useState(false)

  useEffect(() => {
    fetchProduct()
    fetchAllProducts()
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (product && allProducts.length > 0) {
      const related = allProducts
        .filter(p => p.category === product.category && p._id !== product._id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [product, allProducts])

  const fetchProduct = async () => {
    try {
      const res = await fetch(API + "/api/products/" + id)
      const data = await res.json()
      setProduct(data)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchAllProducts = async () => {
    try {
      const res = await fetch(API + "/api/products")
      const data = await res.json()
      setAllProducts(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
  }

const getDisplayImage = () => {
  if (selectedColor === "Black and White") {
    if (product.imagesBW && product.imagesBW.length > 0) return product.imagesBW[activeImg] || product.imagesBW[0]
    if (product.imageBW) return product.imageBW
  }
  if (selectedColor === "Color") {
    if (product.imagesColor && product.imagesColor.length > 0) return product.imagesColor[activeImg] || product.imagesColor[0]
    if (product.imageColor) return product.imageColor
  }
  if (product.images && product.images.length > 0) return product.images[activeImg] || product.images[0]
  return product.image || null
}

const getAllImages = () => {
  if (selectedColor === "Black and White") {
    if (product.imagesBW && product.imagesBW.length > 0) return product.imagesBW
    if (product.imageBW) return [product.imageBW]
  }
  if (selectedColor === "Color") {
    if (product.imagesColor && product.imagesColor.length > 0) return product.imagesColor
    if (product.imageColor) return [product.imageColor]
  }
  if (product.images && product.images.length > 0) return product.images
  return product.image ? [product.image] : []
}

const handleAddToCart = () => {
  const finalPrice = product.promoDiscount
    ? Math.round(selectedSize.price * (1 - product.promoDiscount / 100))
    : selectedSize.price
  addToCart(
    { ...product, price: finalPrice },
    { color: selectedColor, size: selectedSize.label },
    qty
  )
  setShowCartPopup(true)
}

  if (loading) return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />
      <p style={{ textAlign: "center", padding: "60px", color: "#888" }}>Loading...</p>
    </div>
  )

  if (!product) return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p style={{ marginBottom: "16px" }}>Product not found</p>
        <button onClick={() => navigate("/shop")} style={{
          background: "#1A1714", color: "white", border: "none",
          padding: "10px 24px", borderRadius: "6px", cursor: "pointer"
        }}>Back to Shop</button>
      </div>
    </div>
  )

  const displayImage = getDisplayImage()
  const allImages = getAllImages()

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Main Product Layout - responsive */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "0",
          alignItems: "start"
        }}>

          {/* Left - Image */}
          <div style={{ background: "#F5F5F5" }}>
            <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              {displayImage ? (
                <img src={displayImage} alt={product.name} style={{
                  width: "100%", height: "100%", objectFit: "contain"
                }} />
              ) : (
                <div style={{
                  width: "100%", height: "100%", display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: "80px"
                }}>ðŸŽ¨</div>
              )}
            </div>

            {/* Image navigation */}
            {allImages.length > 1 && (
              <div style={{
                display: "flex", justifyContent: "center",
                alignItems: "center", gap: "8px",
                padding: "10px 0", background: "white",
                borderBottom: "1px solid #E8E2D9"
              }}>
                <button onClick={() => { setSelectedColor(color); setActiveImg(0) }} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "16px", color: "#1A1714"
                }}>{"<"}</button>
                {allImages.map((_, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "14px", fontWeight: activeImg === i ? "700" : "400",
                    color: "#1A1714",
                    borderBottom: activeImg === i ? "2px solid #1A1714" : "none",
                    paddingBottom: "2px"
                  }}>{i + 1}</button>
                ))}
                <button onClick={() => setActiveImg(i => Math.min(allImages.length - 1, i + 1))} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "16px", color: "#1A1714"
                }}>{">"}</button>
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div style={{ padding: "24px 20px" }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-start", marginBottom: "20px"
            }}>
              <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#1A1714", margin: 0 }}>
                {product.name}
              </h1>
              <div style={{ marginLeft: "12px", textAlign: "right" }}>
  {product.promoDiscount ? (
    <>
      <span style={{
        background: "#FEE2E2", color: "#DC2626",
        fontSize: "11px", padding: "2px 8px",
        borderRadius: "10px", fontWeight: "600",
        display: "inline-block", marginBottom: "4px"
      }}>
        {product.promoDiscount}% OFF
      </span>
      <p style={{
        fontSize: "14px", color: "#999",
        textDecoration: "line-through", margin: 0
      }}>
        RM {selectedSize.price}.00
      </p>
      <p style={{
        fontSize: "22px", fontWeight: "700",
        color: "#E8572A", margin: 0
      }}>
        RM {Math.round(selectedSize.price * (1 - product.promoDiscount / 100))}.00
      </p>
    </>
  ) : (
    <p style={{
      fontSize: "22px", fontWeight: "700",
      margin: 0, whiteSpace: "nowrap"
    }}>
      RM {selectedSize.price}.00
    </p>
  )}
</div>
            </div>

            {/* Size */}
            <p style={{ fontSize: "14px", fontWeight: "700", marginBottom: "10px" }}>Size</p>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "10px", marginBottom: "20px"
            }}>
              {sizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: "10px 8px",
                    border: "1px solid #1A1714", borderRadius: "6px",
                    background: selectedSize.value === size.value ? "#1A1714" : "white",
                    color: selectedSize.value === size.value ? "white" : "#1A1714",
                    cursor: "pointer", fontSize: "12px", fontFamily: "inherit"
                  }}
                >
                  {size.label}
                  <span style={{ display: "block", fontSize: "11px", marginTop: "2px" }}>
                    RM {size.price}
                  </span>
                </button>
              ))}
            </div>

            {/* Quantity */}
            <p style={{ fontSize: "14px", fontWeight: "700", marginBottom: "10px" }}>Quantity</p>
            <div style={{
              display: "flex", alignItems: "center",
              border: "1px solid #E8E2D9", borderRadius: "6px",
              width: "fit-content", marginBottom: "20px"
            }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px 16px", fontSize: "18px", color: "#1A1714"
              }}>-</button>
              <span style={{
                padding: "8px 16px", fontSize: "14px",
                borderLeft: "1px solid #E8E2D9",
                borderRight: "1px solid #E8E2D9"
              }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px 16px", fontSize: "18px", color: "#1A1714"
              }}>+</button>
            </div>

            {/* Add to Cart */}
            <button onClick={handleAddToCart} style={{
              width: "100%", padding: "14px",
              border: "1px solid #1A1714", borderRadius: "6px",
              background: "white", color: "#1A1714",
              cursor: "pointer", fontSize: "14px",
              fontFamily: "inherit", fontWeight: "500",
              marginBottom: "20px"
            }}>
              Add to Cart
            </button>

            {/* Description */}
            <div style={{ marginTop: "8px" }}>
  <p style={{ fontSize: "14px", fontWeight: "700", marginBottom: "10px" }}>
    Order comes with:
  </p>
  <ul style={{ paddingLeft: "16px", margin: 0 }}>
    {[
      "Custom Digital Sketchart (High-resolution, meticulous shading)",
      "Premium Frame INCLUDED (Ready to hang, completely free)",
      "100% FREE Postage (No hidden fees, delivered straight to your doorstep)",
    ].map((item, i) => (
      <li key={i} style={{
        fontSize: "13px", color: "#333",
        lineHeight: "1.8", marginBottom: "4px"
      }}>
        {item}
      </li>
    ))}
  </ul>
</div>
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{
              background: "#F0F0F0", padding: "12px 20px", margin: "32px 0 16px"
            }}>
              <h2 style={{
                fontSize: "16px", fontWeight: "700",
                color: "#1A1714", margin: 0, textAlign: "center"
              }}>You May Also Like</h2>
            </div>
            <div style={{ padding: "0 20px 32px" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "16px"
              }}>
                {relatedProducts.map(p => {
                  const img = p.imageBW || (p.images && p.images.length > 0 ? p.images[0] : p.image)
                  return (
                    <div
                      key={p._id}
                      onClick={() => navigate("/product/" + p._id)}
                      style={{
                        border: "1px solid #E8E2D9", borderRadius: "8px",
                        overflow: "hidden", cursor: "pointer"
                      }}
                    >
                      <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#F5F5F5" }}>
                        {img ? (
                          <img src={img} alt={p.name} style={{
                            width: "100%", height: "100%", objectFit: "contain"
                          }} />
                        ) : (
                          <div style={{
                            width: "100%", height: "100%", display: "flex",
                            alignItems: "center", justifyContent: "center", fontSize: "40px"
                          }}>ðŸŽ¨</div>
                        )}
                      </div>
                      <div style={{ padding: "10px 12px", textAlign: "center" }}>
                        <p style={{ fontSize: "15px", fontWeight: "700", marginBottom: "2px" }}>
                          {p.name}
                        </p>
                        <p style={{ fontSize: "14px", color: "#666" }}>From RM 80</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Add to Cart Popup */}
      {showCartPopup && (
        <>
          <div
            onClick={() => setShowCartPopup(false)}
            style={{
              position: "fixed", top: 0, left: 0,
              width: "100vw", height: "100vh",
              background: "rgba(0,0,0,0.3)", zIndex: 200
            }}
          />
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: "white", zIndex: 201,
            borderRadius: "16px 16px 0 0",
            padding: "24px 20px",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
            maxWidth: "600px", margin: "0 auto"
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "16px"
            }}>
              <p style={{ fontSize: "14px", fontWeight: "600" }}>
                (1) Item added to your cart
              </p>
              <button onClick={() => setShowCartPopup(false)} style={{
                background: "none", border: "none",
                cursor: "pointer", fontSize: "18px"
              }}>X</button>
            </div>

            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              {displayImage && (
                <img src={displayImage} alt={product.name} style={{
                  width: "70px", height: "90px", objectFit: "contain",
                  borderRadius: "6px", border: "1px solid #E8E2D9", background: "#F5F5F5"
                }} />
              )}
              <div>
                <p style={{ fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>
                  {product.name}
                </p>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "2px" }}>
                  Sketch Style: {selectedColor}
                </p>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Size: {selectedSize.label}
                </p>
              </div>
            </div>

            <button
              onClick={() => { setShowCartPopup(false); navigate("/cart") }}
              style={{
                width: "100%", padding: "12px",
                border: "1px solid #1A1714", borderRadius: "6px",
                background: "white", color: "#1A1714",
                cursor: "pointer", fontSize: "14px",
                fontFamily: "inherit", marginBottom: "10px"
              }}
            >
              View Cart
            </button>
            <button
              onClick={() => { setShowCartPopup(false); navigate("/checkout") }}
              style={{
                width: "100%", padding: "12px",
                border: "none", borderRadius: "6px",
                background: "#1A1714", color: "white",
                cursor: "pointer", fontSize: "14px",
                fontFamily: "inherit", marginBottom: "10px"
              }}
            >
              Checkout
            </button>
            <button
              onClick={() => setShowCartPopup(false)}
              style={{
                width: "100%", padding: "8px", border: "none",
                background: "none", cursor: "pointer",
                fontSize: "13px", color: "#888", textDecoration: "underline"
              }}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  )
}

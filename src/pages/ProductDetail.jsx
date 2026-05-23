import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'

const API = ' https://setback-product-cubical.ngrok-free.dev'
const colors = ['Black and White', 'Color']
const sizes = ['A4', 'A3']
const sizePrices = { 'A4': 60, 'A3': 80 }

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState('Black and White')
  const [selectedSize, setSelectedSize] = useState('A4')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const res = await fetch(API + '/api/products/' + id)
      const data = await res.json()
      setProduct(data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleAddToCart = () => {
    addToCart(
  { ...product, price: sizePrices[selectedSize] },
  { color: selectedColor, size: selectedSize },
  qty
)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div><Navbar />
      <p style={{ padding: '60px', textAlign: 'center', color: '#8B7355' }}>
        Loading...
      </p>
    </div>
  )

  if (!product) return (
    <div><Navbar />
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h2>Product not found!</h2>
        <a href="/shop">Back to Shop</a>
      </div>
    </div>
  )

  const allImages = product.images && product.images.length > 0
    ? product.images
    : product.image ? [product.image] : []

  return (
    <div>
      <Navbar />

      <div style={{ padding: '12px 24px', fontSize: '12px', color: '#8B7355',
        borderBottom: '1px solid #E8E2D9' }}>
        <a href="/" style={{ color: '#8B7355' }}>Home</a> &nbsp;/&nbsp;
        <a href="/shop" style={{ color: '#8B7355' }}>Shop</a> &nbsp;/&nbsp;
        {product.name}
      </div>

      <div
        className="detail-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          padding: '40px 24px',
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        {/* Left - Image Gallery */}
        <div>
          <div
            onClick={() => allImages.length > 0 && setLightbox(true)}
            style={{
              background: 'linear-gradient(135deg, #EDE8E0, #D4C8B8)',
              borderRadius: '8px',
              aspectRatio: '1',
              maxHeight: '400px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '100px',
              overflow: 'hidden', marginBottom: '12px',
              cursor: allImages.length > 0 ? 'zoom-in' : 'default'
            }}
          >
            {allImages.length > 0 ? (
              <img src={allImages[activeImg]} alt={product.name}
                style={{ width: '100%', height: '100%',
                  objectFit: 'cover', borderRadius: '8px' }} />
            ) : (
              product.emoji || '🎨'
            )}
          </div>

          {allImages.length > 0 && (
            <p style={{ fontSize: '11px', color: '#8B7355',
              textAlign: 'center', marginBottom: '10px' }}>
              Click image to zoom
            </p>
          )}

          {allImages.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {allImages.map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i)} style={{
                  width: '64px', height: '64px', borderRadius: '6px',
                  overflow: 'hidden', cursor: 'pointer',
                  border: activeImg === i ? '2px solid #1A1714' : '1px solid #E8E2D9',
                  opacity: activeImg === i ? 1 : 0.7,
                  transition: 'opacity 0.2s'
                }}>
                  <img src={img} alt={'thumb ' + i}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Product Info */}
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '0.12em',
            color: '#8B7355', marginBottom: '8px' }}>
            {product.category}
          </p>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '400',
            marginBottom: '8px', color: '#1A1714' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: '22px', fontWeight: '500',
  marginBottom: '20px', color: '#3D3830' }}>
  RM {sizePrices[selectedSize]}.00
</p>
          <p style={{ fontSize: '14px', lineHeight: '1.8',
            color: '#3D3830', marginBottom: '28px' }}>
            {product.description}
          </p>

          <p style={{ fontSize: '11px', letterSpacing: '0.1em',
            marginBottom: '10px', fontWeight: '500' }}>COLOR</p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {colors.map(color => (
              <button key={color} onClick={() => setSelectedColor(color)} style={{
                padding: '8px 18px',
                border: '1px solid ' + (selectedColor === color ? '#1A1714' : '#E8E2D9'),
                borderRadius: '4px',
                background: selectedColor === color ? '#1A1714' : 'white',
                color: selectedColor === color ? 'white' : '#1A1714',
                cursor: 'pointer', fontSize: '13px'
              }}>{color}</button>
            ))}
          </div>

          <p style={{ fontSize: '11px', letterSpacing: '0.1em',
            marginBottom: '10px', fontWeight: '500' }}>SIZE</p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {sizes.map(size => (
              <button key={size} onClick={() => setSelectedSize(size)} style={{
                padding: '8px 18px',
                border: '1px solid ' + (selectedSize === size ? '#1A1714' : '#E8E2D9'),
                borderRadius: '4px',
                background: selectedSize === size ? '#1A1714' : 'white',
                color: selectedSize === size ? 'white' : '#1A1714',
                cursor: 'pointer', fontSize: '13px'
              }}>{size}</button>
            ))}
          </div>

          <p style={{ fontSize: '11px', letterSpacing: '0.1em',
            marginBottom: '10px', fontWeight: '500' }}>QUANTITY</p>
          <div style={{ display: 'flex', alignItems: 'center',
            gap: '16px', marginBottom: '24px' }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
              width: '36px', height: '36px', border: '1px solid #E8E2D9',
              background: 'white', borderRadius: '4px',
              fontSize: '18px', cursor: 'pointer'
            }}>−</button>
            <span style={{ fontSize: '16px', fontWeight: '500',
              minWidth: '24px', textAlign: 'center' }}>
              {qty}
            </span>
            <button onClick={() => setQty(q => q + 1)} style={{
              width: '36px', height: '36px', border: '1px solid #E8E2D9',
              background: 'white', borderRadius: '4px',
              fontSize: '18px', cursor: 'pointer'
            }}>+</button>
          </div>

          <button onClick={handleAddToCart} style={{
            width: '100%', padding: '14px',
            background: added ? '#3B6D11' : '#1A1714',
            color: 'white', border: 'none', borderRadius: '4px',
            fontSize: '14px', letterSpacing: '0.1em', cursor: 'pointer',
            transition: 'background 0.3s'
          }}>
            {added ? '✓ Added to Cart!' : 'Add to Cart — RM ' + (sizePrices[selectedSize] * qty) + '.00'}
          </button>

          <p style={{ fontSize: '12px', color: '#8B7355',
            marginTop: '16px', lineHeight: '1.8' }}>
            ✦ Hand-drawn original &nbsp;·&nbsp;
            ✦ Ships in 7 days &nbsp;·&nbsp;
            ✦ Framing available
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed', top: 0, left: 0,
            width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 1000, cursor: 'zoom-out'
          }}
        >
          <img
            src={allImages[activeImg]}
            alt="fullscreen"
            style={{
              maxWidth: '90%', maxHeight: '88vh',
              objectFit: 'contain', borderRadius: '4px'
            }}
          />

          {allImages.length > 1 && activeImg > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImg(i => i - 1) }}
              style={{
                position: 'absolute', left: '16px',
                background: 'rgba(255,255,255,0.15)', color: 'white',
                border: 'none', borderRadius: '50%',
                width: '48px', height: '48px', fontSize: '22px', cursor: 'pointer'
              }}
            >‹</button>
          )}

          {allImages.length > 1 && activeImg < allImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImg(i => i + 1) }}
              style={{
                position: 'absolute', right: '16px',
                background: 'rgba(255,255,255,0.15)', color: 'white',
                border: 'none', borderRadius: '50%',
                width: '48px', height: '48px', fontSize: '22px', cursor: 'pointer'
              }}
            >›</button>
          )}

          {allImages.length > 1 && (
            <div style={{
              position: 'absolute', bottom: '20px',
              background: 'rgba(0,0,0,0.5)', color: 'white',
              padding: '6px 14px', borderRadius: '20px', fontSize: '13px'
            }}>
              {activeImg + 1} / {allImages.length}
            </div>
          )}

          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(255,255,255,0.15)', color: 'white',
              border: 'none', borderRadius: '50%',
              width: '44px', height: '44px', fontSize: '18px', cursor: 'pointer'
            }}
          >×</button>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const API = ' https://setback-product-cubical.ngrok-free.dev'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const params = new URLSearchParams(window.location.search)
  const [selected, setSelected] = useState(params.get('category') || 'All')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch(API + '/api/products')
      setProducts(await res.json())
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(API + '/api/categories')
      setCategories(await res.json())
    } catch (err) { console.error(err) }
  }

  const sortProducts = (list) => {
    const sorted = [...list]
    switch (sortBy) {
      case 'az':     return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'za':     return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'newest': return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case 'oldest': return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      default: return sorted
    }
  }

  const filtered = selected === 'All'
    ? products
    : products.filter(p => p.category === selected)

  const sorted = sortProducts(filtered)

  return (
    <div>
      <Navbar />
      <div style={{ padding: '32px 24px', maxWidth: '1000px', margin: '0 auto' }}>

        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '300', marginBottom: '8px' }}>Shop</h1>
          <p style={{ color: '#8B7355', fontSize: '14px' }}>Hand-drawn devotional art</p>
        </div>

        {/* Filter + Sort Bar */}
        <div style={{
          display: 'flex', gap: '12px', marginBottom: '32px',
          flexWrap: 'wrap', alignItems: 'center',
          padding: '16px', background: 'white',
          border: '1px solid #E8E2D9', borderRadius: '8px'
        }}>
          {/* Category Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: '#8B7355',
              letterSpacing: '0.08em', textTransform: 'uppercase' }}>Category:</span>
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              style={{
                padding: '8px 12px', border: '1px solid #E8E2D9',
                borderRadius: '4px', background: 'white', color: '#1A1714',
                cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', outline: 'none'
              }}
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div style={{ width: '1px', height: '24px', background: '#E8E2D9' }} />

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#8B7355',
              letterSpacing: '0.08em', textTransform: 'uppercase' }}>Sort:</span>
            {[
              { value: 'newest', label: 'Newest' },
              { value: 'oldest', label: 'Oldest' },
              { value: 'az',     label: 'A → Z' },
              { value: 'za',     label: 'Z → A' },
            ].map(opt => (
              <button key={opt.value} onClick={() => setSortBy(opt.value)} style={{
                padding: '6px 12px', fontSize: '12px', borderRadius: '4px',
                cursor: 'pointer', border: '1px solid #E8E2D9',
                background: sortBy === opt.value ? '#1A1714' : 'white',
                color: sortBy === opt.value ? 'white' : '#1A1714',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p style={{ fontSize: '12px', color: '#8B7355', marginBottom: '16px' }}>
            Showing {sorted.length} product{sorted.length !== 1 ? 's' : ''}
            {selected !== 'All' ? ' in ' + selected : ''}
          </p>
        )}

        {loading && (
          <p style={{ color: '#8B7355', textAlign: 'center', padding: '60px' }}>
            Loading products...
          </p>
        )}

        {!loading && sorted.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#8B7355' }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>No products found!</p>
            <p style={{ fontSize: '13px' }}>Try a different category or sort option.</p>
          </div>
        )}

        {!loading && sorted.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px'
          }}>
            {sorted.map(product => {
              const img = product.images?.[0] || product.image
              return (
                <a key={product._id} href={'/product/' + product._id}
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div
                    style={{
                      border: '1px solid #E8E2D9', borderRadius: '8px',
                      overflow: 'hidden', background: 'white', cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{
                      height: '200px',
                      background: 'linear-gradient(135deg, #EDE8E0, #D4C8B8)',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', overflow: 'hidden'
                    }}>
                      {img ? (
                        <img src={img} alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : <span style={{ fontSize: '52px' }}>{product.emoji || '🎨'}</span>}
                    </div>
                    <div style={{ padding: '14px' }}>
                      <div style={{ marginBottom: '4px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {product.isHotSelling && (
                          <span style={{
                            background: '#FEE2E2', color: '#DC2626', fontSize: '9px',
                            padding: '2px 8px', borderRadius: '10px', fontWeight: '600'
                          }}>🔥 HOT</span>
                        )}
                        {product.isNewArrival && (
                          <span style={{
                            background: '#DCFCE7', color: '#16A34A', fontSize: '9px',
                            padding: '2px 8px', borderRadius: '10px', fontWeight: '600'
                          }}>✨ NEW</span>
                        )}
                      </div>
                      <p style={{ fontSize: '11px', color: '#8B7355',
                        letterSpacing: '0.1em', marginBottom: '4px' }}>
                        {product.category}
                      </p>
                      <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '6px' }}>
                        {product.name}
                      </h3>
                      <p style={{ fontSize: '15px', fontWeight: '500', color: '#3D3830' }}>
                        RM {product.price}
                      </p>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{
        background: '#1A1714', color: '#FAF8F4',
        padding: '48px 24px 24px', marginTop: '60px'
      }}>
        <div style={{
          maxWidth: '1000px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px', marginBottom: '40px'
        }}>
          <div>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#C4A882' }}>
              Kallumalaiyan SketchArt
            </p>
            <p style={{ fontSize: '13px', color: '#8B7355', lineHeight: '1.8' }}>
              Sacred hand-drawn devotional art crafted with soul and dedication.
            </p>
          </div>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#8B7355',
              textTransform: 'uppercase', marginBottom: '16px' }}>Quick Links</p>
            {[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: 'About Us', href: '/about' },
              { label: 'Cart', href: '/cart' },
            ].map(link => (
              <a key={link.label} href={link.href} style={{
                display: 'block', color: '#E8E2D9', fontSize: '13px',
                textDecoration: 'none', marginBottom: '8px'
              }}>{link.label}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#8B7355',
              textTransform: 'uppercase', marginBottom: '16px' }}>Contact</p>
            <p style={{ fontSize: '13px', color: '#E8E2D9', marginBottom: '8px' }}>📧 your@email.com</p>
            <p style={{ fontSize: '13px', color: '#E8E2D9', marginBottom: '8px' }}>📱 +60 XX-XXXX XXXX</p>
            <p style={{ fontSize: '13px', color: '#E8E2D9', marginBottom: '8px' }}>📍 Malaysia</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#8B7355',
              textTransform: 'uppercase', marginBottom: '16px' }}>Follow Us</p>
            {[
              { label: '📸 Instagram', href: '#' },
              { label: '👍 Facebook', href: '#' },
              { label: '💬 WhatsApp', href: '#' },
              { label: '🎵 TikTok', href: '#' },
            ].map(s => (
              <a key={s.label} href={s.href} style={{
                display: 'block', color: '#E8E2D9', fontSize: '13px',
                textDecoration: 'none', marginBottom: '8px'
              }}>{s.label}</a>
            ))}
          </div>
        </div>
        <div style={{
          borderTop: '1px solid #3D3830', paddingTop: '20px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '8px'
        }}>
          <p style={{ fontSize: '12px', color: '#8B7355' }}>
            © 2024 Kallumalaiyan SketchArt. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: '#8B7355' }}>
            Powered by <span style={{ color: '#C4A882', fontWeight: '500' }}>TechMentor Solutions</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
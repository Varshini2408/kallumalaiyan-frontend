import Navbar from '../components/Navbar'
import lordMuruga from '../assets/Muruga12.png'
import lordShiva from '../assets/lordShiv.jpg'
import lordSaibaba from '../assets/lordSaibaba.jpg'
import slide1 from '../assets/Muruga72.png'
import slide2 from '../assets/Muruga8clr.WebP'
import slide3 from '../assets/Muruga61.png'
import slide4 from '../assets/Muruga15.png'
import slide5 from '../assets/Muruga60.png'
import bannerTop from '../assets/banner-top.jpg'
import bannerPromo from '../assets/banner-promo.jpg'
import { useState, useEffect, useRef } from 'react'

const API = ' https://setback-product-cubical.ngrok-free.dev'
const slides = [slide1, slide2, slide3, slide4, slide5]
const staticImages = {
  'Lord Murugan': lordMuruga,
  'Lord Shiva': lordShiva,
  'Lord Sai Baba': lordSaibaba,
}

function ProductCard({ product }) {
  const img = product.images?.[0] || product.image
  return (
    <a href={'/product/' + product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          border: '1px solid #E8E2D9', borderRadius: '8px',
          overflow: 'hidden', background: 'white',
          transition: 'box-shadow 0.2s', cursor: 'pointer'
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        <div style={{
          height: '200px', overflow: 'hidden',
          background: 'linear-gradient(135deg, #EDE8E0, #D4C8B8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {img ? (
            <img src={img} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : <span style={{ fontSize: '40px' }}>🎨</span>}
        </div>
        <div style={{ padding: '12px' }}>
          {product.isHotSelling && (
            <span style={{
              background: '#FEE2E2', color: '#DC2626', fontSize: '9px',
              padding: '2px 8px', borderRadius: '10px', fontWeight: '600',
              letterSpacing: '0.06em', marginRight: '4px'
            }}>🔥 HOT</span>
          )}
          {product.isNewArrival && (
            <span style={{
              background: '#DCFCE7', color: '#16A34A', fontSize: '9px',
              padding: '2px 8px', borderRadius: '10px', fontWeight: '600',
              letterSpacing: '0.06em'
            }}>✨ NEW</span>
          )}
          <p style={{ fontSize: '13px', color: '#8B7355', marginTop: '4px', marginBottom: '2px' }}>
            {product.category}
          </p>
          <p style={{ fontWeight: '500', fontSize: '15px', marginBottom: '4px' }}>
            {product.name}
          </p>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#3D3830' }}>
            RM {product.price}
          </p>
        </div>
      </div>
    </a>
  )
}

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [categories, setCategories] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [catIndex, setCatIndex] = useState(0)
  const [sortBy, setSortBy] = useState('newest')
  const recommendedRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch(API + '/api/categories')
      setCategories(await res.json())
    } catch (err) { console.error(err) }
  }

const fetchProducts = async () => {
  try {
    const res = await fetch(API + '/api/products')
    const data = await res.json()
    setAllProducts(Array.isArray(data) ? data : [])
  } catch (err) {
    console.error(err)
    setAllProducts([])
  }
}

  const sortProducts = (products) => {
    const sorted = [...products]
    switch (sortBy) {
      case 'az': return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'za': return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'newest': return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case 'oldest': return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      default: return sorted
    }
  }

  const recommended = sortProducts(allProducts.filter(p => p.isRecommended))
  const hotSelling  = allProducts.filter(p => p.isHotSelling)
  const newArrivals = allProducts.filter(p => p.isNewArrival)

  const currentCat = categories[catIndex]
  const catProducts = currentCat
    ? allProducts.filter(p => p.category === currentCat.name).slice(0, 2)
    : []

  const scrollRecommended = (dir) => {
    if (recommendedRef.current) {
      recommendedRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' })
    }
  }

  const sectionTitle = (title, subtitle) => (
    <div style={{ marginBottom: '24px' }}>
      <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#8B7355',
        textTransform: 'uppercase', marginBottom: '6px' }}>{subtitle}</p>
      <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: '400' }}>{title}</h2>
    </div>
  )

  return (
    <div>
      <Navbar />

      {/* TOP BANNER */}
      <div style={{ width: '100%', overflow: 'hidden', maxHeight: '120px' }}>
        <img src={bannerTop} alt="Banner"
          style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
      </div>

      <div style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto' }}>

        {/* HERO */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px', alignItems: 'center', marginBottom: '60px'
        }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#8B7355',
              textTransform: 'uppercase', marginBottom: '12px' }}>Digital Art</p>
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '300',
              lineHeight: '1.15', marginBottom: '16px', color: '#1A1714' }}>
              Sacred Sketches<br />Crafted With Soul
            </h1>
            <p style={{ color: '#3D3830', lineHeight: '1.8', marginBottom: '24px',
              fontSize: '14px', maxWidth: '420px' }}>
              Each piece is a devotional artwork — digitally sketched portraits of Hindu
              deities and lord names in artistic calligraphy.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/shop" style={{
                background: '#1A1714', color: 'white', padding: '12px 28px',
                textDecoration: 'none', borderRadius: '4px', fontSize: '13px'
              }}>Shop Collection</a>
              <a href="/about" style={{
                background: 'transparent', color: '#1A1714',
                border: '1px solid #1A1714', padding: '12px 28px',
                textDecoration: 'none', borderRadius: '4px', fontSize: '13px'
              }}>Our Story</a>
            </div>
          </div>

          {/* SLIDESHOW */}
          <div style={{
            borderRadius: '12px', overflow: 'hidden', position: 'relative',
            aspectRatio: '1', maxHeight: '480px', background: '#EDE8E0',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
          }}>
            {slides.map((slide, i) => (
              <img key={i} src={slide} alt={'Slide ' + (i + 1)} style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%', objectFit: 'contain',
                opacity: current === i ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out'
              }} />
            ))}
            <button onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)}
              style={arrowBtn('left')}>‹</button>
            <button onClick={() => setCurrent(p => (p + 1) % slides.length)}
              style={arrowBtn('right')}>›</button>
            <div style={{
              position: 'absolute', bottom: '12px', left: 0, right: 0,
              display: 'flex', justifyContent: 'center', gap: '6px', zIndex: 2
            }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{
                  width: current === i ? '20px' : '8px', height: '8px',
                  borderRadius: '4px',
                  background: current === i ? '#1A1714' : 'rgba(255,255,255,0.7)',
                  border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s'
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* SORT BAR */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '32px', flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '12px', color: '#8B7355',
            letterSpacing: '0.08em', textTransform: 'uppercase' }}>Sort by:</span>
          {[
            { value: 'newest', label: 'Newest' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'az',     label: 'A → Z' },
            { value: 'za',     label: 'Z → A' },
          ].map(opt => (
            <button key={opt.value} onClick={() => setSortBy(opt.value)} style={{
              padding: '6px 14px', fontSize: '12px', borderRadius: '4px', cursor: 'pointer',
              border: '1px solid #1A1714',
              background: sortBy === opt.value ? '#1A1714' : 'white',
              color: sortBy === opt.value ? 'white' : '#1A1714',
            }}>{opt.label}</button>
          ))}
        </div>

        {/* RECOMMENDED FOR YOU */}
        {recommended.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            {sectionTitle('Recommended For You', 'Handpicked')}
            <div style={{ position: 'relative' }}>
              <button onClick={() => scrollRecommended(-1)} style={navArrow('left')}>‹</button>
              <div ref={recommendedRef} style={{
                display: 'flex', gap: '16px', overflowX: 'auto',
                scrollSnapType: 'x mandatory', paddingBottom: '8px',
                msOverflowStyle: 'none', scrollbarWidth: 'none'
              }}>
                {recommended.map(p => (
                  <div key={p._id} style={{ minWidth: '240px', scrollSnapAlign: 'start' }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
              <button onClick={() => scrollRecommended(1)} style={navArrow('right')}>›</button>
            </div>
          </div>
        )}

        {/* TOP CATEGORIES SLIDESHOW */}
        {categories.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            {sectionTitle('Top Categories', 'Browse')}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px', alignItems: 'center'
            }}>
              {/* Category Slideshow */}
              <div style={{ position: 'relative' }}>
                <a href={'/shop?category=' + encodeURIComponent(currentCat?.name || '')}
                  style={{ textDecoration: 'none' }}>
                  <div style={{
                    height: '320px', borderRadius: '12px', overflow: 'hidden',
                    background: 'linear-gradient(135deg, #EDE8E0, #D4C8B8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', position: 'relative'
                  }}>
                    {currentCat && (currentCat.image || staticImages[currentCat.name]) ? (
                      <img
                        src={currentCat.image || staticImages[currentCat.name]}
                        alt={currentCat?.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    ) : <span style={{ fontSize: '60px' }}>🕉️</span>}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                      padding: '20px', color: 'white'
                    }}>
                      <p style={{ fontWeight: '500', fontSize: '18px' }}>{currentCat?.name}</p>
                      <p style={{ fontSize: '12px', opacity: 0.8 }}>Click to explore</p>
                    </div>
                  </div>
                </a>
                <button onClick={() => setCatIndex(p => (p - 1 + categories.length) % categories.length)}
                  style={arrowBtn('left')}>‹</button>
                <button onClick={() => setCatIndex(p => (p + 1) % categories.length)}
                  style={arrowBtn('right')}>›</button>
                <div style={{
                  display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '10px'
                }}>
                  {categories.map((_, i) => (
                    <button key={i} onClick={() => setCatIndex(i)} style={{
                      width: catIndex === i ? '20px' : '8px', height: '8px',
                      borderRadius: '4px', border: 'none', cursor: 'pointer', padding: 0,
                      background: catIndex === i ? '#1A1714' : '#E8E2D9',
                      transition: 'all 0.3s'
                    }} />
                  ))}
                </div>
              </div>

              {/* Related Products */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {catProducts.length > 0 ? catProducts.map(p => (
                  <ProductCard key={p._id} product={p} />
                )) : (
                  <div style={{
                    padding: '40px', textAlign: 'center',
                    border: '1px dashed #E8E2D9', borderRadius: '8px', color: '#8B7355'
                  }}>
                    <p>No products yet in this category</p>
                    <a href="/shop" style={{ color: '#1A1714', fontSize: '13px' }}>
                      Browse all products →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PROMO BANNER */}
        <div style={{ marginBottom: '60px', borderRadius: '12px', overflow: 'hidden' }}>
          <img src={bannerPromo} alt="Promotion"
            style={{ width: '100%', objectFit: 'cover', display: 'block', maxHeight: '300px' }} />
        </div>

        {/* HOT SELLING */}
        {hotSelling.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            {sectionTitle('Hot Selling', '🔥 Trending')}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '20px'
            }}>
              {sortProducts(hotSelling).map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}

        {/* NEW ARRIVALS */}
        {newArrivals.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            {sectionTitle('New Arrivals', '✨ Just In')}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '20px'
            }}>
              {sortProducts(newArrivals).map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}

        {/* SHOP BY CATEGORY */}
        <div style={{ marginBottom: '60px' }}>
          {sectionTitle('Shop by Category', 'Collections')}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}>
            {categories.map(cat => {
              const img = cat.image || staticImages[cat.name]
              return (
                <a key={cat.name}
                  href={'/shop?category=' + encodeURIComponent(cat.name)}
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    background: '#F5F3EF', borderRadius: '8px', overflow: 'hidden',
                    cursor: 'pointer', border: '1px solid #E8E2D9', transition: 'transform 0.2s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{
                      height: '220px', overflow: 'hidden',
                      background: 'linear-gradient(135deg, #EDE8E0, #D4C8B8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {img ? (
                        <img src={img} alt={cat.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : <span style={{ fontSize: '48px' }}>🕉️</span>}
                    </div>
                    <div style={{ padding: '12px 14px', background: 'white' }}>
                      <p style={{ fontWeight: '500', fontSize: '15px' }}>{cat.name}</p>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{
        background: '#1A1714', color: '#FAF8F4',
        padding: '48px 24px 24px'
      }}>
        <div style={{
          maxWidth: '1000px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px', marginBottom: '40px'
        }}>
          {/* Brand */}
          <div>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#C4A882' }}>
              Kallumalaiyan SketchArt
            </p>
            <p style={{ fontSize: '13px', color: '#8B7355', lineHeight: '1.8', marginBottom: '16px' }}>
              Sacred hand-drawn devotional art crafted with soul and dedication.
            </p>
          </div>

          {/* Quick Links */}
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
                textDecoration: 'none', marginBottom: '8px', lineHeight: '1.6'
              }}>{link.label}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#8B7355',
              textTransform: 'uppercase', marginBottom: '16px' }}>Contact</p>
            <p style={{ fontSize: '13px', color: '#E8E2D9', marginBottom: '8px' }}>
              📧 your@email.com
            </p>
            <p style={{ fontSize: '13px', color: '#E8E2D9', marginBottom: '8px' }}>
              📱 +60 XX-XXXX XXXX
            </p>
            <p style={{ fontSize: '13px', color: '#E8E2D9', marginBottom: '8px' }}>
              📍 Malaysia
            </p>
          </div>

          {/* Social */}
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

const arrowBtn = (side) => ({
  position: 'absolute', [side]: '10px', top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.7)', border: 'none',
  borderRadius: '50%', width: '36px', height: '36px',
  fontSize: '18px', cursor: 'pointer', zIndex: 2,
  display: 'flex', alignItems: 'center', justifyContent: 'center'
})

const navArrow = (side) => ({
  position: 'absolute', [side]: '-16px', top: '50%',
  transform: 'translateY(-50%)',
  background: '#1A1714', color: 'white', border: 'none',
  borderRadius: '50%', width: '32px', height: '32px',
  fontSize: '16px', cursor: 'pointer', zIndex: 2,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
})

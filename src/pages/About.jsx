import Navbar from '../components/Navbar'

export default function About() {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #EDE8E0, #D4C8B8)',
        padding: '60px 24px', textAlign: 'center'
      }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#8B7355',
          textTransform: 'uppercase', marginBottom: '12px' }}>Our Story</p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '300',
          color: '#1A1714', marginBottom: '16px' }}>
          About Kallumalaiyan SketchArt
        </h1>
        <p style={{ color: '#3D3830', maxWidth: '600px', margin: '0 auto',
          lineHeight: '1.8', fontSize: '15px' }}>
          Sacred art born from devotion, crafted with love.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>

        {/* Founder Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '48px', alignItems: 'center', marginBottom: '60px'
        }}>
          {/* Founder Photo */}
          <div style={{
            aspectRatio: '1', borderRadius: '12px', overflow: 'hidden',
            background: 'linear-gradient(135deg, #EDE8E0, #D4C8B8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '80px', maxHeight: '300px'
          }}>
            {/* Replace with: <img src={founderPhoto} style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
            🎨
          </div>

          {/* Founder Info */}
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#8B7355',
              textTransform: 'uppercase', marginBottom: '8px' }}>Meet the Founder</p>
            <h2 style={{ fontSize: '28px', fontWeight: '400', marginBottom: '8px', color: '#1A1714' }}>
              Founder Name Here
            </h2>
            <p style={{ fontSize: '13px', color: '#8B7355', marginBottom: '16px' }}>
              Artist & Founder, Kallumalaiyan SketchArt
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#3D3830', marginBottom: '16px' }}>
              Replace this with the founder's story. Tell us how it all started,
              what inspired the creation of this art form, and what makes each
              piece special.
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#3D3830' }}>
              Every sketch is drawn with devotion and care, carrying the blessings
              of the divine into each home it enters.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #E8E2D9', marginBottom: '60px' }} />

        {/* Our Mission */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#8B7355',
            textTransform: 'uppercase', marginBottom: '12px' }}>Our Mission</p>
          <h2 style={{ fontSize: '28px', fontWeight: '400', marginBottom: '20px', color: '#1A1714' }}>
            Art That Connects Souls
          </h2>
          <p style={{ fontSize: '15px', lineHeight: '1.9', color: '#3D3830',
            maxWidth: '600px', margin: '0 auto' }}>
            Replace this with your mission statement. What do you stand for?
            What do you want your customers to feel when they receive your art?
          </p>
        </div>

        {/* Values */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px', marginBottom: '60px'
        }}>
          {[
            { icon: '🎨', title: 'Handcrafted', desc: 'Every piece is digitally hand-drawn with care and precision.' },
            { icon: '🙏', title: 'Devotional', desc: 'Each artwork carries spiritual energy and divine blessings.' },
            { icon: '💝', title: 'Made with Love', desc: 'Created with deep respect for our culture and traditions.' },
          ].map(val => (
            <div key={val.title} style={{
              padding: '28px 20px', textAlign: 'center',
              background: '#FAF8F4', borderRadius: '8px',
              border: '1px solid #E8E2D9'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{val.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>{val.title}</h3>
              <p style={{ fontSize: '13px', color: '#8B7355', lineHeight: '1.7' }}>{val.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center', padding: '48px',
          background: 'linear-gradient(135deg, #EDE8E0, #D4C8B8)',
          borderRadius: '12px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '400', marginBottom: '12px' }}>
            Ready to Own a Piece?
          </h2>
          <p style={{ color: '#3D3830', marginBottom: '24px', fontSize: '14px' }}>
            Browse our collection of sacred devotional art.
          </p>
          <a href="/shop" style={{
            background: '#1A1714', color: 'white', padding: '12px 32px',
            textDecoration: 'none', borderRadius: '4px', fontSize: '14px'
          }}>
            Shop Now
          </a>
        </div>
      </div>

      {/* Footer */}
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
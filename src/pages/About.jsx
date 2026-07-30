import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import founderPhoto from "../assets/KS_Founder.jpg"

export default function About() {
  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{
        background: "#F5F5F5", padding: "48px 24px",
        textAlign: "center", borderBottom: "1px solid #E8E2D9"
      }}>
        <h1 style={{
          fontSize: "clamp(22px, 3vw, 36px)", fontWeight: "700",
          color: "#1A1714", marginBottom: "12px"
        }}>
          Biography
        </h1>
        <p style={{
          fontSize: "14px", color: "#555", lineHeight: "1.8",
          maxWidth: "500px", margin: "0 auto"
        }}>
          Sacred art born from devotion, crafted with love.
        </p>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Meet the Artist */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "40px", alignItems: "center", marginBottom: "48px"
        }}>
          <div style={{
  borderRadius: "12px", overflow: "hidden",
  border: "1px solid #E8E2D9"
}}>
  <img
    src={founderPhoto}
    alt="Sharrmanraj - Founder"
    style={{
      width: "100%", height: "auto",
      display: "block"
    }}
  />
</div>

          <div>
            <p style={{
              fontSize: "11px", letterSpacing: "0.12em", color: "#888",
              textTransform: "uppercase", marginBottom: "8px"
            }}>Meet the Artist</p>
            <h2 style={{
              fontSize: "24px", fontWeight: "700",
              color: "#1A1714", marginBottom: "8px"
            }}>
              Sharrmanraj
            </h2>
            <p style={{
              fontSize: "13px", color: "#888", marginBottom: "16px"
            }}>
              Artist and Founder, Kallumalaiyan Sketchart
            </p>
            <p style={{
              fontSize: "16px", color: "#333",
              lineHeight: "1.9", marginBottom: "16px", textAlign: "justify"
            }}>
              Sharrmanraj, the artist behind Kallumalaiyan Sketchart, is a passionate coloured sketch artist dedicated to creating premium portraits of Hindu deities that celebrate faith, culture, and spirituality. With a keen eye for detail and a deep appreciation for Hindu traditions, he transforms every sketch into a meaningful work of art that reflects both artistic excellence and divine beauty.

Inspired by the rich heritage of Hinduism, Sharrmanraj specializes in hand-crafted coloured sketches that capture the grace, power, and symbolism of revered deities. Every piece is carefully created using premium-quality materials and meticulous techniques, ensuring vibrant colours, lifelike expressions, and intricate details that resonate with devotees and art collectors alike.
            </p>
            <p style={{
              fontSize: "16px", color: "#333",
              lineHeight: "1.9", textAlign: "justify"
            }}>
              Guided by patience and an eye for microscopic detail, they mastered
              the delicate balance of graphite and charcoal - mediums where a single
              millimeter of shading can completely change an expression.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #E8E2D9", marginBottom: "48px" }} />

        
        {/* CTA */}
        <div style={{
          textAlign: "center", padding: "48px 24px",
          background: "#F5F5F5", borderRadius: "12px",
          border: "1px solid #E8E2D9"
        }}>
          <h2 style={{
            fontSize: "22px", fontWeight: "700",
            marginBottom: "12px", color: "#1A1714"
          }}>
            Ready to Own a Piece?
          </h2>
          <p style={{
            color: "#555", marginBottom: "24px",
            fontSize: "14px", lineHeight: "1.7"
          }}>
            Browse our collection of sacred devotional art.
          </p>
          <a href="/shop" style={{
            background: "#1A1714", color: "white",
            padding: "14px 36px", textDecoration: "none",
            borderRadius: "6px", fontSize: "14px",
            display: "inline-block", fontWeight: "500"
          }}>
            Shop Now
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
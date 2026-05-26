import Navbar from "../components/Navbar"

function Footer() {
  return (
    <footer style={{
      background: "white", borderTop: "1px solid #E8E2D9",
      padding: "48px 24px 24px", marginTop: "48px"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "32px", marginBottom: "32px"
        }}>
          <div>
            <p style={{ fontWeight: "700", fontSize: "15px", marginBottom: "16px" }}>
              Kallumalaiyan SketchArt
            </p>
            <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.8" }}>
              Sacred devotional artwork crafted with soul and devotion.
            </p>
          </div>
          <div>
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
          <div>
            <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "12px" }}>Contacts</p>
            <p style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}>your@email.com</p>
            <p style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}>+60 XX-XXXX XXXX</p>
            <p style={{ fontSize: "13px", color: "#555" }}>Malaysia</p>
          </div>
          <div>
            <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "12px" }}>Follow Us</p>
            {["Instagram", "Facebook", "WhatsApp", "TikTok"].map(s => (
              <a key={s} href="#" style={{
                display: "block", fontSize: "13px", color: "#555",
                textDecoration: "none", marginBottom: "6px"
              }}>{s}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #E8E2D9", paddingTop: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>
            @Kallumalaiyan Sketch Art. All right reserved.
          </p>
          <p style={{ fontSize: "11px", color: "#aaa" }}>
            Powered by TechMentor Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function About() {
  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>

        <h1 style={{
          fontSize: "clamp(20px, 3vw, 28px)", fontWeight: "700",
          color: "#1A1714", marginBottom: "24px"
        }}>
          Biography
        </h1>

        <p style={{
          fontSize: "14px", color: "#333",
          lineHeight: "1.9", marginBottom: "20px",
          textAlign: "justify"
        }}>
          Every portrait tells a story, but for the artist behind Kallumalaiyan
          Sketchart, it is about capturing the precise emotion, depth, and soul
          of a single moment.
        </p>

        <p style={{
          fontSize: "14px", color: "#333",
          lineHeight: "1.9", marginBottom: "40px",
          textAlign: "justify"
        }}>
          Specializing in hyper-realistic graphite, charcoal, and custom medium
          sketches, Kallumalaiyan Sketchart has transformed from a personal
          passion into a highly sought-after name for custom, hand-drawn
          commissions.
        </p>

        <h2 style={{
          fontSize: "18px", fontWeight: "700",
          color: "#1A1714", marginBottom: "16px"
        }}>
          Meet the Artist
        </h2>

        <p style={{
          fontSize: "14px", color: "#333",
          lineHeight: "1.9", marginBottom: "20px",
          textAlign: "justify"
        }}>
          While many artists gravitate toward vibrant colors, Sharrmanraj found
          their true calling in the raw power of black and white.
        </p>

        <p style={{
          fontSize: "14px", color: "#333",
          lineHeight: "1.9", marginBottom: "40px",
          textAlign: "justify"
        }}>
          Guided by patience and an eye for microscopic detail, they mastered
          the delicate balance of graphite and charcoal - mediums where a single
          millimeter of shading can completely change an expression.
        </p>

        {/* Values */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px", marginBottom: "40px"
        }}>
          {[
            { icon: "🎨", title: "Handcrafted", desc: "Every piece is digitally hand-drawn with care and precision." },
            { icon: "🙏", title: "Devotional", desc: "Each artwork carries spiritual energy and divine blessings." },
            { icon: "💝", title: "Made with Love", desc: "Created with deep respect for our culture and traditions." },
          ].map(val => (
            <div key={val.title} style={{
              padding: "24px 20px", textAlign: "center",
              background: "#FAFAFA", borderRadius: "8px",
              border: "1px solid #E8E2D9"
            }}>
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{val.icon}</div>
              <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                {val.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.7" }}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: "center", padding: "40px 24px",
          background: "#F5F5F5", borderRadius: "8px"
        }}>
          <h2 style={{
            fontSize: "20px", fontWeight: "700",
            marginBottom: "12px", color: "#1A1714"
          }}>
            Ready to Own a Piece?
          </h2>
          <p style={{
            color: "#555", marginBottom: "20px",
            fontSize: "14px", lineHeight: "1.7"
          }}>
            Browse our collection of sacred devotional art.
          </p>
          <a href="/shop" style={{
            background: "#1A1714", color: "white",
            padding: "12px 32px", textDecoration: "none",
            borderRadius: "6px", fontSize: "14px",
            display: "inline-block"
          }}>
            Shop Now
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
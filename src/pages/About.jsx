import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

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

        {/* Story */}
        <div style={{ marginBottom: "48px" }}>
          <p style={{
            fontSize: "14px", color: "#333",
            lineHeight: "1.9", marginBottom: "20px", textAlign: "justify"
          }}>
            Every portrait tells a story, but for the artist behind Kallumalaiyan
            Sketchart, it is about capturing the precise emotion, depth, and soul
            of a single moment.
          </p>
          <p style={{
            fontSize: "14px", color: "#333",
            lineHeight: "1.9", marginBottom: "20px", textAlign: "justify"
          }}>
            Specializing in hyper-realistic graphite, charcoal, and custom medium
            sketches, Kallumalaiyan Sketchart has transformed from a personal
            passion into a highly sought-after name for custom, hand-drawn
            commissions.
          </p>
        </div>

        {/* Meet the Artist */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "40px", alignItems: "center", marginBottom: "48px"
        }}>
          <div style={{
            aspectRatio: "1", borderRadius: "12px", overflow: "hidden",
            background: "#F5F5F5", border: "1px solid #E8E2D9",
            display: "flex", alignItems: "center",
            justifyContent: "center", maxHeight: "300px"
          }}>
            <p style={{ fontSize: "13px", color: "#ccc" }}>Founder Photo</p>
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
              Artist and Founder, Kallumalaiyan SketchArt
            </p>
            <p style={{
              fontSize: "14px", color: "#333",
              lineHeight: "1.9", marginBottom: "16px", textAlign: "justify"
            }}>
              While many artists gravitate toward vibrant colors, Sharrmanraj found
              their true calling in the raw power of black and white.
            </p>
            <p style={{
              fontSize: "14px", color: "#333",
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

        {/* Values */}
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{
            fontSize: "22px", fontWeight: "700",
            color: "#1A1714", marginBottom: "24px", textAlign: "center"
          }}>
            What We Stand For
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px"
          }}>
            {[
              { icon: "🎨", title: "Handcrafted", desc: "Every piece is digitally hand-drawn with care and precision." },
              { icon: "🙏", title: "Devotional", desc: "Each artwork carries spiritual energy and divine blessings." },
              { icon: "💝", title: "Made with Love", desc: "Created with deep respect for our culture and traditions." },
            ].map(val => (
              <div key={val.title} style={{
                padding: "28px 20px", textAlign: "center",
                background: "#FAFAFA", borderRadius: "8px",
                border: "1px solid #E8E2D9"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{val.icon}</div>
                <h3 style={{
                  fontSize: "15px", fontWeight: "700",
                  marginBottom: "8px", color: "#1A1714"
                }}>
                  {val.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.7" }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

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
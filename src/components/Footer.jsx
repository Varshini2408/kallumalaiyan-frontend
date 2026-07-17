export default function Footer() {
  const socials = [
    { label: "Instagram", url: "https://www.instagram.com/kallumalaiyan_sketchart?igsh=MXJnOXR2dGlqNTJqaQ==" },
    { label: "WhatsApp", url: "https://wa.me/600194079787" },
    { label: "TikTok", url: "https://www.tiktok.com/@kallumalaiyan_sketchart" },
  ]

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
            <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "16px" }}>
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
            <a href="mailto:kallumalaiyansketchart@gmail.com" style={{
  display: "block", fontSize: "13px", color: "#555",
  textDecoration: "none", marginBottom: "4px",
  wordBreak: "break-all"
}}>
  kallumalaiyansketchart@gmail.com
</a>
            <a href="https://wa.me/600194079787" style={{
              display: "block", fontSize: "13px", color: "#555",
              textDecoration: "none", marginBottom: "4px"
            }}>
              +60 19-407 9787
            </a>
            <p style={{ fontSize: "13px", color: "#555" }}>Malaysia</p>
          </div>
          <div>
            <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "12px" }}>Follow Us</p>
            {socials.map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{
                display: "block", fontSize: "13px", color: "#555",
                textDecoration: "none", marginBottom: "6px"
              }}>{s.label}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #E8E2D9", paddingTop: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>
            @Kallumalaiyan Sketchart. All right reserved.
          </p>
          <p style={{ fontSize: "11px", color: "#aaa" }}>
            Powered by TechMentor Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}
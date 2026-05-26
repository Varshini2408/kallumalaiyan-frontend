import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Enquiry() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", comment: "" })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState("")

  const inputStyle = (field) => ({
    width: "100%", padding: "14px 16px",
    border: "1px solid " + (focused === field ? "#1A1714" : "#E8E2D9"),
    borderRadius: "8px", fontSize: "14px",
    fontFamily: "inherit", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
    background: "white"
  })

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
          Get in Touch
        </h1>
        <p style={{
          fontSize: "14px", color: "#555", lineHeight: "1.8",
          maxWidth: "500px", margin: "0 auto"
        }}>
          Thank you for your interest in Kallumalaiyan Sketchart! Whether you want
          to preserve a precious memory or gift something special, we are excited
          to work with you.
        </p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "48px", alignItems: "start"
        }}>

          {/* Left - Contact Info */}
          <div>
            <h2 style={{
              fontSize: "20px", fontWeight: "700",
              color: "#1A1714", marginBottom: "24px"
            }}>
              Contact Information
            </h2>

            {[
              { icon: "📧", label: "Email", value: "your@email.com" },
              { icon: "📱", label: "Phone", value: "+60 XX-XXXX XXXX" },
              { icon: "📍", label: "Location", value: "Malaysia" },
              { icon: "🕐", label: "Response Time", value: "Within 24 hours" },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex", gap: "16px", alignItems: "flex-start",
                marginBottom: "24px"
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "8px",
                  background: "#F5F5F5", border: "1px solid #E8E2D9",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "18px", flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: "12px", color: "#888", marginBottom: "2px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "14px", color: "#1A1714", fontWeight: "500" }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            <div style={{
              background: "#F5F5F5", borderRadius: "8px",
              padding: "20px", border: "1px solid #E8E2D9", marginTop: "8px"
            }}>
              <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.8" }}>
                Please fill out the form with as much detail as possible and we
                will get back to you as soon as possible.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div style={{
            background: "white", borderRadius: "12px",
            border: "1px solid #E8E2D9", padding: "32px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)"
          }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "#EAF3DE", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", fontSize: "24px"
                }}>
                  V
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
                  Message Sent!
                </h3>
                <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.8" }}>
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    marginTop: "20px", background: "none",
                    border: "1px solid #1A1714", padding: "10px 24px",
                    borderRadius: "6px", cursor: "pointer",
                    fontSize: "13px", color: "#1A1714"
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 style={{
                  fontSize: "18px", fontWeight: "700",
                  color: "#1A1714", marginBottom: "24px"
                }}>
                  Send us a Message
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{
                      display: "block", fontSize: "12px", color: "#888",
                      marginBottom: "6px", letterSpacing: "0.04em"
                    }}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused("")}
                      style={inputStyle("name")}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: "block", fontSize: "12px", color: "#888",
                      marginBottom: "6px", letterSpacing: "0.04em"
                    }}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+60 XX-XXXX XXXX"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused("")}
                      style={inputStyle("phone")}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: "block", fontSize: "12px", color: "#888",
                      marginBottom: "6px", letterSpacing: "0.04em"
                    }}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused("")}
                      style={inputStyle("email")}
                    />
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{
                      display: "block", fontSize: "12px", color: "#888",
                      marginBottom: "6px", letterSpacing: "0.04em"
                    }}>Your Message *</label>
                    <textarea
                      placeholder="Tell us about what you are looking for, any specific requirements, size preferences, etc."
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                      onFocus={() => setFocused("comment")}
                      onBlur={() => setFocused("")}
                      rows={5}
                      style={{
                        ...inputStyle("comment"),
                        resize: "vertical", minHeight: "120px"
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!form.name || !form.email || !form.comment) return
                    setSent(true)
                  }}
                  style={{
                    width: "100%", padding: "14px",
                    background: "#1A1714", color: "white",
                    border: "none", borderRadius: "8px",
                    cursor: "pointer", fontSize: "14px",
                    fontFamily: "inherit", fontWeight: "500",
                    marginTop: "20px", letterSpacing: "0.04em"
                  }}
                >
                  Send Message
                </button>
                <p style={{
                  fontSize: "11px", color: "#888",
                  textAlign: "center", marginTop: "12px"
                }}>
                  * Required fields
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
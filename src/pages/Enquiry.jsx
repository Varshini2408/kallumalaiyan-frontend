import { useState } from "react"
import Navbar from "../components/Navbar"

export default function Enquiry() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", comment: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>Enquiry</h1>
        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "24px" }}>
          Thank you for your interest in Kallumalaiyan Sketchart! Whether you want to
          preserve a precious memory, gift something special to a loved one, or bring
          a unique vision to life, we are excited to work with you.
          Please fill out the form below with as much detail as possible, and we will
          get back to you soon.
        </p>

        {sent ? (
          <div style={{
            background: "#EAF3DE", color: "#3B6D11",
            padding: "20px", borderRadius: "8px", textAlign: "center"
          }}>
            <p style={{ fontWeight: "600", marginBottom: "4px" }}>Message sent!</p>
            <p style={{ fontSize: "13px" }}>We will get back to you soon.</p>
          </div>
        ) : (
          <div>
            {["name", "phone", "email"].map(field => (
              <input
                key={field}
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                style={{
                  display: "block", width: "100%", padding: "14px 16px",
                  border: "1px solid #E8E2D9", borderRadius: "8px",
                  fontSize: "14px", fontFamily: "inherit", outline: "none",
                  marginBottom: "12px", boxSizing: "border-box"
                }}
              />
            ))}
            <textarea
              placeholder="Comment"
              value={form.comment}
              onChange={e => setForm({ ...form, comment: e.target.value })}
              rows={5}
              style={{
                display: "block", width: "100%", padding: "14px 16px",
                border: "1px solid #E8E2D9", borderRadius: "8px",
                fontSize: "14px", fontFamily: "inherit", outline: "none",
                marginBottom: "20px", boxSizing: "border-box", resize: "vertical"
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                background: "#1A1714", color: "white", border: "none",
                padding: "12px 28px", borderRadius: "6px",
                fontSize: "14px", cursor: "pointer", fontFamily: "inherit"
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

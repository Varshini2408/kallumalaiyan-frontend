import Navbar from "../components/Navbar"

export default function About() {
  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>
          Biography
        </h1>
        <p style={{ fontSize: "13px", color: "#333", lineHeight: "1.9", marginBottom: "16px" }}>
          Every portrait tells a story, but for the artist behind Kallumalaiyan Sketchart,
          it is about capturing the precise emotion, depth, and soul of a single moment.
        </p>
        <p style={{ fontSize: "13px", color: "#333", lineHeight: "1.9", marginBottom: "24px" }}>
          Specializing in hyper-realistic graphite, charcoal, and custom medium sketches,
          Kallumalaiyan Sketchart has transformed from a personal passion into a highly
          sought-after name for custom, hand-drawn commissions.
        </p>

        <h2 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "12px" }}>
          Meet the Artist
        </h2>
        <p style={{ fontSize: "13px", color: "#333", lineHeight: "1.9", marginBottom: "16px" }}>
          While many artists gravitate toward vibrant colors, Sharrmanraj found their
          true calling in the raw power of black and white.
        </p>
        <p style={{ fontSize: "13px", color: "#333", lineHeight: "1.9" }}>
          Guided by patience and an eye for microscopic detail, they mastered the
          delicate balance of graphite and charcoal - mediums where a single millimeter
          of shading can completely change an expression.
        </p>
      </div>
    </div>
  )
}
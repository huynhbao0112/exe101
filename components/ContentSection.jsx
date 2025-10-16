// components/ContentSection.jsx
import React from "react";

export default function ContentSection({ images = [], description }) {
  return (
    <main style={styles.container}>
      <div style={styles.content}>
        <div style={styles.description}>
          <h2>About this scene</h2>
          <p>{description}</p>
        </div>

        <div style={styles.gallery}>
          {images.map((src, idx) => (
            <figure key={idx} style={styles.figure}>
              <img src={src} alt={`image-${idx}`} style={styles.img} />
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}

const styles = {
  container: { padding: "48px 8%", background: "#fff", color: "#111" },
  content: { maxWidth: 1100, margin: "0 auto" },
  description: { marginBottom: 24, lineHeight: 1.6 },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16
  },
  figure: { margin: 0, overflow: "hidden", borderRadius: 8 },
  img: { width: "100%", height: 200, objectFit: "cover", display: "block" }
};

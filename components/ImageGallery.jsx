import React from "react";

export default function ImageGallery({ items }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 24,
      }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <img src={item.src} alt={item.title} style={{ width: "100%" }} />
          <div style={{ padding: 16 }}>
            <h4 style={{ margin: "8px 0" }}>{item.title}</h4>
            <p style={{ color: "#555", fontSize: 14 }}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

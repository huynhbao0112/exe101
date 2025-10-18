import React from "react";
import scenes from "../data/scenes.json";
import VideoHero from "../components/VideoHero";
import ImageGallery from "../components/ImageGallery";

export default function ScenePage({ slug = "nen-lavender" }) {
  const scene = scenes.find((s) => s.slug === slug);
  if (!scene) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "#f7f8fa", color: "#222" }}>
      {/* Video Hero */}
      <div style={{ position: "relative" }}>
        <VideoHero video={scene.video} videoType={scene.videoType} title={scene.title} />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "40px 20px",
            background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: 36, margin: 0 }}>{scene.title}</h1>
          <p style={{ marginTop: 8, fontSize: 16 }}>{scene.subtitle || "Hương thơm mang cảm hứng thiên nhiên"}</p>
        </div>
      </div>

      {/* Giới thiệu */}
      <section style={{ maxWidth: 1100, margin: "60px auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: 28, marginBottom: 10 }}>
          🕯️ Giới thiệu sản phẩm
        </h2>
        <p style={{ lineHeight: 1.7, color: "#555", fontSize: 18 }}>
          {scene.description}
        </p>

        {/* Nút mua */}
        {scene.buyLink && (
          <a
            href={scene.buyLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "linear-gradient(90deg, #ff8a00, #e52e71)",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 50,
              textDecoration: "none",
              fontWeight: "600",
              marginTop: 20,
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            🛒 Mua ngay trên Shopee
          </a>
        )}
      </section>

      {/* Bộ sưu tập ảnh */}
      <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 20px" }}>
        <h2 style={{ fontSize: 26, marginBottom: 24 }}>📸 Hình ảnh sản phẩm</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {scene.items.map((item, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "#fff",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img src={item.src} alt={item.title} style={{ width: "100%", height: 220, objectFit: "cover" }} />
              <div style={{ padding: "16px 20px" }}>
                <h4 style={{ margin: "0 0 8px", color: "#222" }}>{item.title}</h4>
                <p style={{ margin: 0, color: "#666", fontSize: 15 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

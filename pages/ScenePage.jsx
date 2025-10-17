import React from "react";
import scenes from "../data/scenes.json";
import VideoHero from "../components/VideoHero";
import ImageGallery from "../components/ImageGallery";

export default function ScenePage({ slug = "ha-noi-lake" }) {
  const scene = scenes.find(s => s.slug === slug);
  if (!scene) return <div>Không tìm thấy scene</div>;

  return (
    <div style={{ background: "#0f0f10", color: "#fff", minHeight: "100vh" }}>
      <VideoHero video={scene.video} videoType={scene.videoType} title={scene.title} />
      <main style={{ background: "#f6f7f9", color: "#222" }}>
        <section style={{ background: "transparent", padding: "48px 0 16px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ color: "#111", marginBottom: 8 }}>About this scene</h2>
            {scene.description && <p style={{ color: "#444" }}>{scene.description}</p>}
          </div>
        </section>

        <ImageGallery items={scene.items || (scene.images || []).map(src => ({ src, title: "", desc: "" }))} />
      </main>
    </div>
  );
}
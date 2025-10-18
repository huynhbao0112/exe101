import { useRouter } from "next/router";
import scenes from "../../data/scenes.json";
import VideoHero from "../../components/VideoHero";
import ImageGallery from "../../components/ImageGallery";

export default function ScenePage() {
  const router = useRouter();
  const { slug } = router.query;
  const scene = scenes.find((s) => s.slug === slug);

  if (!scene) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div style={{ background: "#fdfcf8", color: "#222", minHeight: "100vh" }}>
      <VideoHero
        video={scene.video}
        videoType={scene.videoType}
        title={scene.title}
      />
      <main style={{ padding: "40px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ color: "#111" }}>🕯️ Giới thiệu sản phẩm</h2>
        <p style={{ color: "#555", marginBottom: 40 }}>{scene.description}</p>

        <ImageGallery items={scene.items} />

        {scene.buyLink && (
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <a
              href={scene.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#ff6b6b",
                color: "white",
                padding: "14px 28px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              🛒 Mua ngay tại shop
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

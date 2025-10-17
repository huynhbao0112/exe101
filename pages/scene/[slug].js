// pages/scene/[slug].js
import fs from "fs";
import path from "path";
import VideoHero from "../../components/VideoHero";
import ImageGallery from "../../components/ImageGallery";

export default function ScenePage({ scene }) {
  if (!scene) return <div>Not found</div>;

  // hỗ trợ cả "items" (mới) hoặc "images" (cũ)
  const galleryItems =
    scene.items ||
    (scene.images || []).map((src) => ({ src, title: "", desc: "" }));

  return (
    <>
      <VideoHero video={scene.video} videoType={scene.videoType} title={scene.title} />
      <main>
        <section style={{ background: "#fff" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
            <h2>About this scene</h2>
            {scene.description && <p>{scene.description}</p>}
          </div>
        </section>

        <ImageGallery items={galleryItems} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const file = path.join(process.cwd(), "data", "scenes.json");
  const raw = fs.readFileSync(file, "utf8");
  const scenes = JSON.parse(raw);
  const paths = scenes.map((s) => ({ params: { slug: s.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const file = path.join(process.cwd(), "data", "scenes.json");
  const raw = fs.readFileSync(file, "utf8");
  const scenes = JSON.parse(raw);
  const scene = scenes.find((s) => s.slug === params.slug) || null;
  return { props: { scene } };
}

// pages/scene/[slug].js
import fs from "fs";
import path from "path";
import VideoHero from "../../components/VideoHero";
import ContentSection from "../../components/ContentSection";

export default function ScenePage({ scene }) {
  if (!scene) return <div>Not found</div>;

  return (
    <>
      <VideoHero video={scene.video} videoType={scene.videoType} title={scene.title} />
      <ContentSection images={scene.images} description={scene.description} />
    </>
  );
}

export async function getStaticPaths() {
  const file = path.join(process.cwd(), "data", "scenes.json");
  const raw = fs.readFileSync(file, "utf8");
  const scenes = JSON.parse(raw);
  const paths = scenes.map(s => ({ params: { slug: s.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const file = path.join(process.cwd(), "data", "scenes.json");
  const raw = fs.readFileSync(file, "utf8");
  const scenes = JSON.parse(raw);
  const scene = scenes.find(s => s.slug === params.slug) || null;
  return { props: { scene } };
}

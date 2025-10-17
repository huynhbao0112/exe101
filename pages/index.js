import fs from "fs";
import path from "path";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";

export default function Home({ scenes, origin }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Scenes (QR Demo)</h1>
      <div style={{ display: "grid", gap: 20 }}>
        {scenes.map((s) => {
          const url = `${origin}/scene/${s.slug}`;
          return (
            <div
              key={s.slug}
              style={{ display: "flex", gap: 20, alignItems: "center" }}
            >
              <QRCodeCanvas value={url} size={96} />
              <div>
                <h3 style={{ margin: 0 }}>{s.title}</h3>
                <Link href={`/scene/${s.slug}`}>Open page</Link>
                <div style={{ fontSize: 12, color: "#666" }}>{url}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const file = path.join(process.cwd(), "data", "scenes.json");
  const raw = fs.readFileSync(file, "utf8");
  const scenes = JSON.parse(raw);
  const origin = process.env.SITE_URL || "http://localhost:3000";
  return { props: { scenes, origin } };
}

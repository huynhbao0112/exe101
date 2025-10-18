import fs from "fs";
import path from "path";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";

export default function Home({ scenes, origin }) {
  return (
    <div style={{ padding: 40, background: "#fefcf9", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>🕯️ Bộ Sưu Tập Nến Thơm</h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Quét mã QR trên mỗi hũ nến để xem video, hình ảnh và chi tiết sản phẩm.
      </p>
      <div
        style={{
          display: "grid",
          gap: 30,
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        {scenes.map((s) => {
          const url = `${origin}/scene/${s.slug}`;
          return (
            <div
              key={s.slug}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                background: "#fff",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <QRCodeCanvas value={url} size={100} />
              <div>
                <h3 style={{ margin: 0, color: "#222" }}>{s.title}</h3>
                <Link href={`/scene/${s.slug}`} style={{ color: "#0070f3" }}>
                  Mở trang chi tiết
                </Link>
                <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                  {url}
                </div>
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

import React, { useEffect, useRef, useState } from "react";

export default function ImageGallery({ items = [] }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    console.log("ImageGallery items:", items);
    itemRefs.current = itemRefs.current.slice(0, items.length);
    if (!items.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            const idx = Number(ent.target.getAttribute("data-idx"));
            setActive(idx);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  if (!items || items.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <h3>Không có ảnh để hiển thị</h3>
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        {items.map((it, i) => (
          <div
            key={i}
            data-idx={i}
            ref={(el) => (itemRefs.current[i] = el)}
            style={styles.imageCard}
          >
            <img
              src={it.src}
              alt={it.title || `image-${i}`}
              style={styles.img}
              onError={(e) => {
                e.currentTarget.style.opacity = 0.4;
                console.error("Image load error:", it.src);
              }}
            />
          </div>
        ))}
      </div>

      <aside style={styles.right}>
        <h3 style={styles.itemTitle}>{items[active]?.title || "Ảnh"}</h3>
        <p style={styles.itemDesc}>{items[active]?.desc || "Kéo xem ảnh để thấy mô tả."}</p>
      </aside>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
    padding: "48px 6vw",
    maxWidth: 1200,
    margin: "0 auto",
    background: "#fafafa", // nhẹ nhàng hơn so với trắng đục
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
    flexWrap: "wrap",
  },
  left: {
    flex: "1 1 65%",
    minWidth: 280,
    order: 1,
  },
  right: {
    position: "sticky",
    top: 120,
    flex: "0 0 32%",
    alignSelf: "flex-start",
    background: "rgba(255,255,255,0.95)",
    padding: 22,
    borderRadius: 10,
    boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
    minHeight: 220,
    marginLeft: 8,
    order: 2,
    border: "1px solid rgba(0,0,0,0.03)",
  },
  imageCard: {
    width: "100%",
    minHeight: "50vh",
    marginBottom: 22,
    borderRadius: 12,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    border: "1px solid rgba(0,0,0,0.03)",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  itemTitle: { margin: "0 0 8px 0", color: "#111" },
  itemDesc: { margin: 0, lineHeight: 1.6, color: "#444" },
};
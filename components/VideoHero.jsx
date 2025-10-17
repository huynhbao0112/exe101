// components/VideoHero.jsx
import React, { useMemo, useState } from "react";

// rút ID từ mọi dạng link YouTube (watch?v, youtu.be, shorts, embed)
// - hỗ trợ raw ID (11+ chars) và URL thiếu protocol (www...)
function getYoutubeId(input) {
  if (!input) return null;
  const s = String(input).trim();
  const plainId = s.match(/^([a-zA-Z0-9_-]{11,})$/);
  if (plainId) return plainId[1];

  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.split("/")[1] || null;
    }
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const ix = parts.findIndex((p) => ["shorts", "embed"].includes(p));
    if (ix !== -1 && parts[ix + 1]) return parts[ix + 1];
    return null;
  } catch {
    return null;
  }
}

export default function VideoHero({ video, videoType, title }) {
  const [muted, setMuted] = useState(true);

  const iframeSrc = useMemo(() => {
    if (videoType !== "youtube") return null;
    const id = getYoutubeId(video);
    if (!id) return null;
    const base = `https://www.youtube-nocookie.com/embed/${id}`;
    const params = new URLSearchParams({
      autoplay: "1",
      mute: muted ? "1" : "0",
      loop: "1",
      playlist: id,
      controls: "0",
      modestbranding: "1",
      rel: "0",
      playsinline: "1",
    });
    return `${base}?${params.toString()}`;
  }, [video, videoType, muted]);

  if (!video) {
    return (
      <section style={styles.hero}>
        <div style={styles.centerOverlay}>
          <h1 style={styles.title}>{title}</h1>
          <p>Không tìm thấy URL video.</p>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.hero}>
      {videoType === "youtube" ? (
        iframeSrc ? (
          <iframe
            key={`${iframeSrc}:${muted ? 1 : 0}`} // reload khi toggle mute
            src={iframeSrc}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={styles.iframe}
            frameBorder="0"
          />
        ) : (
          <div style={{ ...styles.iframe, ...styles.centerFallback }}>
            <p style={{ color: "#fff" }}>Không thể lấy ID YouTube: {String(video)}</p>
          </div>
        )
      ) : (
        <video
          src={video}
          autoPlay
          loop
          muted={muted}
          playsInline
          style={styles.htmlVideo}
          onCanPlay={() => console.log("HTML5 video ready")}
          onError={(e) => console.error("HTML5 video error", e)}
        />
      )}

      {/* soft fade để chữ và btn rõ hơn */}
      <div style={styles.bottomFade} />

      {/* tiêu đề bottom-left */}
      <div style={styles.titleBox}>
        <h1 style={styles.title}>{title}</h1>
      </div>

      {/* nút mute góc trên phải với icon */}
      <button
        aria-label={muted ? "Unmute video" : "Mute video"}
        onClick={() => setMuted((m) => !m)}
        style={styles.muteBtn}
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          // speaker muted icon
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M16 7.41V6a1 1 0 0 0-1-1h-3L9 6H6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3l3 2h3a1 1 0 0 0 1-1v-1.41" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 9l-5 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 15l-5-6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          // speaker on icon
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="#000" strokeWidth="1.2" fill="#fff" strokeLinejoin="round"/>
            <path d="M16.5 8.5a4.5 4.5 0 010 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 5a7 7 0 010 14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </section>
  );
}

const styles = {
  hero: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    background: "linear-gradient(180deg,#000 0%, rgba(0,0,0,0.6) 60%)",
  },
  iframe: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: "0",
  },
  htmlVideo: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  /* fade gradient ở đáy video để chữ dễ đọc hơn */
  bottomFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 220,
    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)",
    pointerEvents: "none",
    zIndex: 4,
  },

  centerOverlay: {
    position: "relative",
    zIndex: 6,
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textShadow: "0 4px 20px rgba(0,0,0,0.7)",
  },

  titleBox: {
    position: "absolute",
    left: 20,
    bottom: 28,
    zIndex: 6,
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 10,
    background: "linear-gradient(90deg, rgba(0,0,0,0.55), rgba(0,0,0,0.3))",
    backdropFilter: "blur(6px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
  },
  title: {
    fontSize: "clamp(20px, 3.6vw, 40px)",
    margin: 0,
    fontWeight: 700,
    letterSpacing: 0.2,
  },

  muteBtn: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 7,
    width: 44,
    height: 44,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 8,
    color: "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
    transition: "transform .15s ease",
  },

  centerFallback: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#000",
  },
};

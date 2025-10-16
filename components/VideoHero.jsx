// components/VideoHero.jsx
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function VideoHero({ video, videoType, title }) {
  const [muted, setMuted] = useState(true);
  const playerRef = useRef();

  return (
    <section style={styles.hero}>
      {videoType === "youtube" ? (
        <ReactPlayer
          ref={playerRef}
          url={video}
          playing
          loop
          muted={muted}
          width="100%"
          height="100%"
          playsinline
          config={{
            youtube: { playerVars: { controls: 0, modestbranding: 1, rel: 0 } }
          }}
          style={styles.player}
        />
      ) : (
        <video
          autoPlay
          loop
          muted={muted}
          playsInline
          style={styles.htmlVideo}
          src={video}
        />
      )}

      <div style={styles.overlay}>
        <h1 style={styles.title}>{title}</h1>
        <div>
          <button style={styles.btn} onClick={() => setMuted(!muted)}>
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    background: "#000"
  },
  player: {
    position: "absolute",
    top: 0, left: 0
  },
  htmlVideo: {
    position: "absolute",
    top: 0, left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  overlay: {
    position: "relative",
    zIndex: 2,
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textShadow: "0 4px 20px rgba(0,0,0,0.7)"
  },
  title: { fontSize: "clamp(20px, 4vw, 40px)", margin: 0 },
  btn: {
    padding: "8px 14px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontSize: 14
  }
};

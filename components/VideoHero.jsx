import React from "react";

export default function VideoHero({ video, videoType, title }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "60vh",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <iframe
        src={video}
        title={title}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <h1
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "1.8rem",
        }}
      >
        {title}
      </h1>
    </div>
  );
}

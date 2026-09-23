import { ImageResponse } from "next/og";

export const alt = "Pujo Obhijaan — Kolkata Durga Puja Pandal Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #931017 0%, #c1272d 55%, #a97c0f 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          Pujo Obhijaan
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 34,
            color: "#f2c94c",
          }}
        >
          Kolkata's Durga Puja Pandal Guide · 2026
        </div>
      </div>
    ),
    { ...size }
  );
}

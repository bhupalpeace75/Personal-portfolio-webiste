import { ImageResponse } from "next/og";
export const alt = "Digital Bhupendra — Practical marketing powered by AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#102c36",
        padding: 80,
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#a5d7bd",
          letterSpacing: 4,
        }}
      >
        DIGITAL BHUPENDRA
      </div>
      <div style={{ display: "flex", fontSize: 70, marginTop: 95 }}>
        Practical marketing.
      </div>
      <div style={{ display: "flex", fontSize: 70, color: "#a5d7bd" }}>
        Powered by AI.
      </div>
      <div style={{ display: "flex", fontSize: 23, marginTop: 90 }}>
        BHUPENDRA SHRESTHA · AI Marketing Expert
      </div>
    </div>,
    size,
  );
}

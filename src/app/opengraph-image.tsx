import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          padding: 80,
          background: "linear-gradient(135deg,#132419,#1f3b2c,#2f5741)",
          color: "#f3efe4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "#c9a24b",
              color: "#1f3b2c",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 2, textTransform: "uppercase", color: "#c9a24b" }}>
            {site.name}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, marginTop: 40, maxWidth: 900 }}>
          {site.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 20, color: "#f3efe4cc", maxWidth: 800 }}>
          {site.subheadline}
        </div>
      </div>
    ),
    { ...size }
  );
}

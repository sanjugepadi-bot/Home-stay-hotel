import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f3b2c",
          borderRadius: 8,
          color: "#c9a24b",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}

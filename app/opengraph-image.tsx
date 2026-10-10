import { ImageResponse } from "next/og";

export const alt = "Pawth - A small daily journaling app";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        padding: "84px",
        background:
          "linear-gradient(135deg, #f8f5ff 0%, #ffffff 55%, #fff5f8 100%)",
        color: "#191b24",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#f472b6",
            marginRight: 16,
          }}
        />

        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#6d28d9",
          }}
        >
          DAILY JOURNAL
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 126,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        Pawth
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 12,
          fontSize: 43,
          fontWeight: 500,
          color: "#5630a3",
        }}
      >
        Capture today. Remember your journey.
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 42,
          fontSize: 24,
          color: "#5a5f7d",
        }}
      >
        A small daily journaling app
      </div>
    </div>,
    size,
  );
}

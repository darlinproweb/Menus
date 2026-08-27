// app/apple-icon.js — Ícono para iOS "Agregar a pantalla de inicio".
// Next.js App Router lo enlaza automáticamente como <link rel="apple-touch-icon">.
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #6B2737 0%, #2F4F3E 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="105"
          height="105"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FBF8F3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Tenedor */}
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          {/* Cuchillo */}
          <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

// Generated once at build time (required for the static GitHub Pages build).
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS. Matches app/icon.svg. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18191c",
          color: "#ecedef",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: -4,
          position: "relative",
        }}
      >
        JM
        <div
          style={{
            position: "absolute",
            top: 26,
            right: 26,
            width: 22,
            height: 22,
            borderRadius: 11,
            background: "#8193f2",
          }}
        />
      </div>
    ),
    size,
  );
}

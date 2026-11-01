import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Generated once at build time (required for the static GitHub Pages build).
export const dynamic = "force-static";

export const alt = "Jude Mendez — IT professional by day, building things by curiosity";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Jude Mendez.",
    subtitle: "IT professional by day. Building things by curiosity.",
  });
}

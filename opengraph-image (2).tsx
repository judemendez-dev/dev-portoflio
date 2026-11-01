import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Generated once at build time (required for the static GitHub Pages build).
export const dynamic = "force-static";

export const alt = "About Jude Mendez";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "About",
    subtitle: "Enterprise IT by day. Building apps and experimenting with AI after hours.",
  });
}

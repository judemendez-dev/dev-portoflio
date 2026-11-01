import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Generated once at build time (required for the static GitHub Pages build).
export const dynamic = "force-static";

export const alt = "Projects by Jude Mendez";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Projects",
    subtitle: "Apps and tools I've built after hours, many with AI-assisted development.",
  });
}

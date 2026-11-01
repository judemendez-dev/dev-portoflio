import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Generated once at build time (required for the static GitHub Pages build).
export const dynamic = "force-static";

export const alt = "Jude Mendez's professional experience";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Experience",
    subtitle: "Endpoint management, identity and security with Microsoft Intune and Entra ID.",
  });
}

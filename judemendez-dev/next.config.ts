import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build the whole site as plain HTML/CSS/JS files in the `out/` folder,
  // so it can be hosted on GitHub Pages (no server needed).
  output: "export",

  images: {
    // GitHub Pages can't resize images on the fly, so images are served as-is.
    // Export screenshots at a sensible size (e.g. 1600px wide) before adding them.
    unoptimized: true,
  },

  poweredByHeader: false,

  // Note: GitHub Pages doesn't support custom HTTP headers. If you turn on
  // Cloudflare's proxy (orange cloud), you can add security headers there:
  // Cloudflare dashboard → Rules → Transform Rules → Modify Response Header.
};

export default nextConfig;

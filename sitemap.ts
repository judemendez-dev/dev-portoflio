import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

// Generated once at build time (required for the static GitHub Pages build).
export const dynamic = "force-static";

/** Generated at build time: every page plus one entry per project. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/projects", "/about", "/experience", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const projectPages = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...projectPages];
}

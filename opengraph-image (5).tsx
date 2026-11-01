import { getProject, projects } from "@/content/projects";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Generated once at build time (required for the static GitHub Pages build).
export const dynamic = "force-static";

export const alt = "Project by Jude Mendez";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    kicker: project ? `${project.categoryLabel} — ${project.status}` : "Project",
    title: project?.name ?? "Project",
    subtitle: project?.description ?? "",
  });
}

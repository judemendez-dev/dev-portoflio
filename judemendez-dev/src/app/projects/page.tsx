import { JsonLd } from "@/components/json-ld";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { Container, PageHeader } from "@/components/ui";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { createMetadata, socialImages } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Projects",
  path: "/projects",
  image: socialImages.projects,
  description:
    "Apps and tools Jude Mendez has built outside work — navigation, enterprise IT and productivity projects, many built with AI-assisted development.",
});

export default function ProjectsPage() {
  return (
    <Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Projects by ${site.name}`,
          url: `${site.url}/projects`,
          hasPart: projects.map((p) => ({
            "@type": "CreativeWork",
            name: p.name,
            url: `${site.url}/projects/${p.slug}`,
            description: p.description,
          })),
        }}
      />
      <PageHeader
        title="Projects"
        lede="Things I've built after hours. Some are live, some are still taking shape, and most were built with an AI pair programmer alongside me."
      />
      <ProjectsExplorer />
    </Container>
  );
}

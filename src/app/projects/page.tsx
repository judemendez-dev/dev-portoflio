import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Container, PageHeader } from "@/components/ui";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { createMetadata, socialImages } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Projects",
  path: "/projects",
  image: socialImages.projects,
  description:
    "Apps and tools Jude Mendez has built outside work — navigation, enterprise IT and productivity projects, many built with AI-assisted development.",
});

export default function ProjectsPage() {
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

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
        lede="A collection of projects built around curiosity, practical problems and ideas worth exploring. Some are live, others are still evolving, and each represents something I've wanted to create, improve or learn."
      />

      {/* One curated grid, featured projects first. Categories stay in
          src/content/projects.ts in case filters are wanted again later. */}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((project, i) => {
          // With an odd number of projects on two-column screens, centre the last card
          // instead of leaving it hanging on the left.
          const lonely = ordered.length % 2 === 1 && i === ordered.length - 1;
          return (
            <Reveal
              as="li"
              key={project.slug}
              delay={i}
              className={cn(lonely && "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-10px)] lg:col-span-1 lg:mx-0 lg:w-auto")}
            >
              <ProjectCard project={project} headingLevel="h2" />
            </Reveal>
          );
        })}
      </ul>
    </Container>
  );
}

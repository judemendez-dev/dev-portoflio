import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { ProjectPreview } from "@/components/project-preview";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, NeedsInput, StatusBadge, Tag } from "@/components/ui";
import { getProject, projects, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { createMetadata, socialImages } from "@/lib/seo";
import { cssVars } from "@/lib/cn";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

// Only the projects in src/content/projects.ts exist; anything else is a 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return createMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${project.slug}`,
    // Shares use the project's cover image when it has one.
    ...(project.cover
      ? { image: { url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt } }
      : { image: socialImages.projects }),
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const sections: { id: string; title: string; content?: string[]; list?: boolean }[] = [
    { id: "overview", title: "Overview", content: project.overview },
    { id: "why", title: "Why I built it", content: project.why },
    { id: "problem", title: "The problem it solves", content: project.problem },
    { id: "features", title: "Key features", content: project.features, list: true },
    { id: "challenges", title: "Challenges", content: project.challenges },
    { id: "lessons", title: "What I learned", content: project.lessons },
  ];
  const filled = sections.filter((s) => s.content && s.content.length > 0);
  const empty = sections.filter((s) => !s.content || s.content.length === 0);

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <Container>
        <div className="pt-10 sm:pt-14">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <Icon name="arrow-left" size={14} className="transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>
        </div>

        <header className="pb-10 pt-10 sm:pb-14">
          <div className="rise flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="text-sm text-ink-faint">{project.categoryLabel}</span>
          </div>
          <h1 className="rise mt-6 text-display font-semibold" style={cssVars({ "--i": 1 })}>
            {project.name}
          </h1>
          <p className="rise mt-6 max-w-2xl text-lede text-ink-muted text-pretty" style={cssVars({ "--i": 2 })}>
            {project.description}
          </p>
          {(project.url || project.github) && (
            <div className="rise mt-8 flex flex-wrap gap-3" style={cssVars({ "--i": 3 })}>
              {project.url && (
                <ButtonLink href={project.url} external icon="arrow-up-right">
                  Visit website
                </ButtonLink>
              )}
              {project.github && (
                <ButtonLink href={project.github} external variant="secondary" icon="arrow-up-right">
                  View on GitHub
                </ButtonLink>
              )}
            </div>
          )}
        </header>

        <div className="rise" style={cssVars({ "--i": 3 })}>
          <ProjectPreview project={project} priority wide={!project.cover} className="rounded-[20px]" sizes="(min-width: 1152px) 1088px, 100vw" />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">
          {/* At a glance */}
          <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Project details">
            <dl className="divide-y divide-line rounded-[20px] border border-line bg-surface text-sm">
              <Fact label="Status">
                <StatusBadge status={project.status} />
              </Fact>
              <Fact label="Category">{project.categoryLabel}</Fact>
              <Fact label="Built with">
                {project.stack.length > 0 ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {project.stack.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-ink-faint">To be added</span>
                )}
              </Fact>
              {(project.url || project.github) && (
                <Fact label="Links">
                  <ul className="space-y-1.5">
                    {project.url && (
                      <li>
                        <ExternalText href={project.url}>{new URL(project.url).hostname}</ExternalText>
                      </li>
                    )}
                    {project.github && (
                      <li>
                        <ExternalText href={project.github}>GitHub repository</ExternalText>
                      </li>
                    )}
                  </ul>
                </Fact>
              )}
            </dl>
          </aside>

          {/* Story */}
          <article className="min-w-0 max-w-[68ch]">
            {empty.length > 0 && (
              <NeedsInput file="src/content/projects.ts" className="mb-10">
                {project.name} doesn&apos;t have {empty.map((s) => `“${s.title}”`).join(", ")} yet. Empty sections stay hidden
                on the live site.
              </NeedsInput>
            )}

            <div className="space-y-14">
              {filled.map((s) => (
                <Reveal as="section" key={s.id} aria-labelledby={`section-${s.id}`}>
                  <h2 id={`section-${s.id}`} className="text-xl font-semibold tracking-tight">
                    {s.title}
                  </h2>
                  {s.list ? (
                    <ul className="mt-5 space-y-3">
                      {s.content!.map((item) => (
                        <li key={item} className="flex gap-3 leading-relaxed text-ink-muted">
                          <Icon name="check" size={16} className="mt-1 shrink-0 text-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="prose-body mt-4 text-[16.5px] leading-[1.75] text-ink-muted">
                      {s.content!.map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                    </div>
                  )}
                </Reveal>
              ))}

              <Reveal as="section" aria-labelledby="section-screenshots">
                <h2 id="section-screenshots" className="text-xl font-semibold tracking-tight">
                  Screenshots
                </h2>
                {project.screenshots && project.screenshots.length > 0 ? (
                  <div className="mt-6 grid gap-6">
                    {project.screenshots.map((shot) => (
                      <figure key={shot.src}>
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          sizes="(min-width: 1024px) 680px, 100vw"
                          className="w-full rounded-xl border border-line"
                        />
                        {shot.caption && <figcaption className="mt-2 text-sm text-ink-faint">{shot.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-line-strong px-5 py-6 text-sm text-ink-muted">
                    <Icon name="image" size={18} className="shrink-0 text-ink-faint" />
                    Screenshots are coming once this project is ready to show.
                  </div>
                )}
              </Reveal>
            </div>
          </article>
        </div>

        {/* Next project */}
        {next && next.slug !== project.slug && (
          <nav aria-label="Next project" className="mt-24 border-t border-line pt-10">
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col gap-2 rounded-[20px] p-2 sm:flex-row sm:items-end sm:justify-between"
            >
              <span>
                <span className="text-sm text-ink-faint">Next project</span>
                <span className="mt-2 block text-title font-semibold transition-colors group-hover:text-accent">{next.name}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-ink-muted">
                {next.categoryLabel}
                <Icon name="arrow-right" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </nav>
        )}
      </Container>
    </>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 px-5 py-4">
      <dt className="text-ink-faint">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

function ExternalText({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 hover:text-accent">
      {children}
      <Icon name="arrow-up-right" size={13} className="text-ink-faint group-hover:text-accent" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: project.categoryLabel,
    url: project.url ?? `${site.url}/projects/${project.slug}`,
    ...(project.github ? { codeRepository: project.github } : {}),
    author: { "@type": "Person", name: site.name, url: site.url },
  };
}

import Link from "next/link";
import type { CSSProperties } from "react";
import { DayPanel } from "@/components/day-panel";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { LocalTime } from "@/components/local-time";
import { ProjectPreview } from "@/components/project-preview";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, SectionHeading, StatusBadge, Tag } from "@/components/ui";
import { experience } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { createMetadata, personJsonLd } from "@/lib/seo";

export const metadata = createMetadata({ path: "/" });

export default function HomePage() {
  const current = experience[0];
  const currentRole = current.roles[0];

  return (
    <>
      <JsonLd data={{ ...personJsonLd(), "@id": `${site.url}/#person` }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url }} />

      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
        <HeroBackdrop />
        <Container className="grid items-center gap-14 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:pb-24 lg:pt-28">
          <div>
            <p className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1 pl-2 pr-3 text-[13px] text-ink-muted backdrop-blur">
              <span className="grid size-5 place-items-center rounded-full bg-raised text-ink-faint">
                <Icon name="map-pin" size={11} />
              </span>
              Based in {site.location}
            </p>

            <h1 id="hero-title" className="rise mt-7 text-display font-semibold" style={{ "--i": 1 } as CSSProperties}>
              Jude Mendez.
            </h1>

            <p className="rise mt-5 text-tagline font-medium text-ink-muted" style={{ "--i": 2 } as CSSProperties}>
              Working in IT.
              <br />
              Building beyond it.
            </p>

            <p className="rise mt-6 max-w-[34rem] text-lede text-ink-muted text-pretty" style={{ "--i": 3 } as CSSProperties}>
              I specialise in modern enterprise IT, with a focus on Microsoft Intune, Entra ID and endpoint security. Based in
              Sydney, I work with technologies that help organisations manage and secure their devices at scale. Outside of
              that, I build my own applications, explore AI and experiment with new ideas.
            </p>

            <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--i": 4 } as CSSProperties}>
              <ButtonLink href="/projects" icon="arrow-right">
                Explore my projects
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                About me
              </ButtonLink>
            </div>
          </div>

          <div className="rise lg:pl-4" style={{ "--i": 3 } as CSSProperties}>
            <DayPanel />
          </div>
        </Container>
      </section>

      {/* ---------------- Selected projects ---------------- */}
      <section aria-labelledby="projects-title" className="pb-20 pt-8 sm:pb-28 sm:pt-12">
        <Container>
          <Reveal>
            <SectionHeading
              id="projects-title"
              title="Selected projects"
              description="Things I've built or am building outside work, most of them with an AI pair programmer alongside me."
              action={
                <ButtonLink href="/projects" variant="ghost" size="sm" icon="arrow-right" className="-ml-4 self-start sm:ml-0">
                  All projects
                </ButtonLink>
              }
            />
          </Reveal>

          <ol className="space-y-6">
            {featuredProjects.map((project, i) => (
              <Reveal as="li" key={project.slug} delay={0}>
                <article className="group grid items-center gap-8 rounded-[24px] border border-line bg-surface p-3 transition-colors duration-500 hover:border-line-strong md:grid-cols-2 md:gap-10 md:p-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className={`block overflow-hidden rounded-[16px] ${i % 2 === 1 ? "md:order-2" : ""}`}
                  >
                    <div className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.012]">
                      <ProjectPreview project={project} sizes="(min-width: 768px) 560px, 100vw" />
                    </div>
                  </Link>
                  <div className="px-3 pb-4 md:px-4 md:py-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={project.status} />
                      <span className="text-[13px] text-ink-faint">{project.categoryLabel}</span>
                    </div>
                    <h3 className="mt-5 text-heading font-semibold">
                      <Link href={`/projects/${project.slug}`} className="hover:text-accent">
                        {project.name}
                      </Link>
                    </h3>
                    <p className="mt-3 max-w-md leading-relaxed text-ink-muted text-pretty">{project.description}</p>
                    {project.stack.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                        {project.stack.map((t) => (
                          <li key={t}>
                            <Tag>{t}</Tag>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-7 flex flex-wrap gap-2">
                      <ButtonLink href={`/projects/${project.slug}`} size="sm" variant="secondary" icon="arrow-right" aria-label={`View details about ${project.name}`}>
                        View details
                      </ButtonLink>
                      {project.url && (
                        <ButtonLink href={project.url} external size="sm" variant="ghost" icon="arrow-up-right" aria-label={`Visit the ${project.name} website (opens in a new tab)`}>
                          Visit website
                        </ButtonLink>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------------- The two halves ---------------- */}
      <section aria-labelledby="work-title" className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <h2 id="work-title" className="text-heading font-semibold text-balance">
              The day job keeps the ideas grounded. Building keeps me learning.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-ink-muted text-pretty">
              Working in enterprise IT has given me firsthand experience with the frustrations and inefficiencies that IT
              professionals face every day. Even the most established technologies have their limitations, and sometimes the
              simplest tasks are harder than they need to be. I enjoy identifying those gaps and building practical tools that
              simplify workflows, solve real problems and make life easier for the people using them.
            </p>
            <ButtonLink href="/experience" variant="secondary" icon="arrow-right" className="mt-8">
              My experience
            </ButtonLink>
          </Reveal>

          <Reveal delay={1}>
            <Link
              href="/experience"
              className="group block rounded-[24px] border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-sm text-ink-muted">
                  <span className="size-2 rounded-full bg-live" aria-hidden="true" />
                  Currently
                </span>
                <span className="text-sm text-ink-faint">
                  {currentRole.start} – {currentRole.end}
                </span>
              </div>
              <p className="mt-6 text-2xl font-semibold tracking-tight">{currentRole.title}</p>
              <p className="mt-1 text-ink-muted">{current.company}</p>
              <p className="mt-5 leading-relaxed text-ink-muted text-pretty">{currentRole.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {currentRole.focus.slice(0, 3).map((f) => (
                  <li key={f}>
                    <Tag>{f}</Tag>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-5 text-sm text-ink-muted">
                Before that: {experience[1].roles.length} roles at {experience[1].company}, from trainee to End User Technologies Engineer.
              </p>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section aria-labelledby="contact-title" className="pt-12">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[28px] border border-line bg-surface px-6 py-14 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <h2 id="contact-title" className="text-title font-semibold text-balance">
                  Say hello.
                </h2>
                <p className="mt-4 text-lede text-ink-muted text-pretty">
                  Whether it&apos;s about Intune, something I&apos;ve built, or something you&apos;re building, I&apos;m happy to
                  chat.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 md:items-end">
                <ButtonLink href="/contact" icon="arrow-right">
                  Get in touch
                </ButtonLink>
                <p className="text-sm text-ink-faint">
                  It&apos;s <LocalTime /> in Sydney.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

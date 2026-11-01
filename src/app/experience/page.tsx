import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, PageHeader, Tag } from "@/components/ui";
import { experience, skillGroups } from "@/content/experience";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { createMetadata, socialImages } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Experience",
  path: "/experience",
  image: socialImages.experience,
  description:
    "Jude Mendez's career in enterprise IT: Intune Administrator at Deloitte, and previously Systems Engineer at The Star Entertainment Group. Endpoint management, identity and security.",
});

export default function ExperiencePage() {
  return (
    <Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: site.name,
            url: site.url,
            jobTitle: site.role,
            worksFor: { "@type": "Organization", name: site.employer },
            alumniOf: experience.slice(1).map((c) => ({ "@type": "Organization", name: c.company })),
          },
        }}
      />

      <PageHeader
        title="Experience"
        lede="Five-plus years in enterprise IT, working mostly with Microsoft's endpoint, identity and security stack."
      />

      {/* ---------------- Timeline ---------------- */}
      <section aria-labelledby="timeline-title">
        <h2 id="timeline-title" className="sr-only">
          Career timeline
        </h2>
        <ol className="border-t border-line">
          {experience.map((company, ci) => (
            <Reveal
              as="li"
              key={company.company}
              delay={ci}
              className="grid gap-8 border-b border-line py-12 md:grid-cols-[minmax(0,240px)_1fr] md:gap-12 md:py-16"
            >
              <div className="md:sticky md:top-24 md:self-start">
                <h3 className="text-xl font-semibold tracking-tight">{company.company}</h3>
                {company.location && <p className="mt-1 text-sm text-ink-faint">{company.location}</p>}
                <p className="mt-1 text-sm text-ink-faint">
                  {company.roles[company.roles.length - 1].start} – {company.roles[0].end}
                </p>
              </div>

              {/* Rail */}
              <ol className="relative">
                <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-line-strong via-line to-transparent" />
                {company.roles.map((role, ri) => (
                  <li key={role.title} className={cn("relative pl-10", ri > 0 && "mt-12")}>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-[7px] grid size-[15px] place-items-center rounded-full border bg-canvas",
                        role.current ? "border-live text-live" : "border-line-strong",
                      )}
                    >
                      <span className={cn("size-[5px] rounded-full", role.current ? "pulse-dot bg-live" : "bg-ink-faint")} />
                    </span>

                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h4 className="text-lg font-semibold tracking-tight">
                        {role.title}
                        {role.current && <span className="sr-only"> (current role)</span>}
                      </h4>
                      <p className="shrink-0 text-sm tabular-nums text-ink-faint">
                        <time>{role.start}</time> – <time>{role.end}</time>
                      </p>
                    </div>
                    <p className="mt-3 max-w-[62ch] leading-relaxed text-ink-muted text-pretty">{role.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`Focus areas as ${role.title}`}>
                      {role.focus.map((f) => (
                        <li key={f}>
                          <Tag>{f}</Tag>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------------- Skills ---------------- */}
      <section aria-labelledby="skills-title" className="mt-28">
        <Reveal>
          <h2 id="skills-title" className="text-heading font-semibold">
            Technical skills
          </h2>
          <p className="mt-3 max-w-xl text-ink-muted">
            The tools and areas I work with, grouped the way they show up in practice.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.name} delay={i} className="bg-surface p-6 sm:p-8">
              <h3 className="font-semibold tracking-tight">{group.name}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{group.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-canvas px-3 py-1.5 text-[13.5px] text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mt-16 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-relaxed text-ink-faint">
          This is a personal website. The projects and opinions here are my own and don&apos;t represent Deloitte, The Star
          Entertainment Group or any other employer.
        </p>
        <ButtonLink href="/contact" variant="secondary" size="sm" icon="arrow-right">
          Get in touch
        </ButtonLink>
      </Reveal>
    </Container>
  );
}

import Image from "next/image";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Monogram } from "@/components/monogram";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, NeedsInput } from "@/components/ui";
import { site } from "@/content/site";
import { createMetadata, personJsonLd, socialImages } from "@/lib/seo";
import { cssVars } from "@/lib/cn";

export const metadata = createMetadata({
  title: "About",
  path: "/about",
  image: socialImages.about,
  description:
    "Jude Mendez works in enterprise IT in Sydney and builds apps on the side. A bit about how he got here, what he's into and how he learns.",
});

const techInterests: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "laptop",
    title: "How systems fit together",
    body: "Devices, identity, policies, networks. I like understanding the whole chain, not just the bit in front of me.",
  },
  {
    icon: "code",
    title: "Building software",
    body: "Web apps, browser extensions and small tools that make something slightly less annoying.",
  },
  {
    icon: "flask",
    title: "AI-assisted development",
    body: "Using AI as a collaborator to get from idea to working product faster, and learning a lot along the way.",
  },
  {
    icon: "shield",
    title: "Automation",
    body: "If I've done it three times by hand, I start wondering how to never do it again.",
  },
];


export default function AboutPage() {
  return (
    <Container>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: personJsonLd() }} />

      <div className="grid gap-12 pb-8 pt-14 sm:pt-20 lg:grid-cols-[1fr_340px] lg:gap-20">
        <header>
          <h1 className="rise text-title font-semibold text-balance">
            I work in enterprise IT. I build things because I can&apos;t help it.
          </h1>
          <div className="rise prose-body mt-8 max-w-[62ch] text-lede text-ink-muted" style={cssVars({ "--i": 1 })}>
            <p>
              Hi, I&apos;m Jude. I&apos;m based in Sydney and work as an Intune Administrator at Deloitte, looking after endpoint
              management and security across the Asia-Pacific region.
            </p>
            <p>
              I&apos;ve always been interested in how technology works, and what you can make once you understand it. That
              curiosity is what got me into IT, and it&apos;s the same thing that has me opening a code editor after work.
            </p>
          </div>
        </header>

        <Reveal delay={2} className="lg:pt-2">
          <figure className="relative">
            {site.photo ? (
              <Image
                src={site.photo.src}
                alt={site.photo.alt}
                width={680}
                height={680}
                priority
                sizes="(min-width: 1024px) 340px, 100vw"
                className="aspect-square w-full rounded-[24px] border border-line object-cover"
              />
            ) : (
              <div className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-[24px] border border-line bg-surface">
                <div aria-hidden="true" className="dot-grid absolute inset-0" />
                <Monogram size={84} />
                <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-canvas/80 px-3 py-1 text-xs text-ink-faint">
                  <Icon name="image" size={12} />
                  Photo coming soon
                </span>
              </div>
            )}
            <figcaption className="mt-3 flex items-center gap-2 text-sm text-ink-faint">
              <Icon name="map-pin" size={14} />
              {site.location}
            </figcaption>
          </figure>
          {!site.photo && (
            <NeedsInput file="src/content/site.ts" className="mt-4">
              Add a profile photo to <code className="font-mono text-[12.5px]">/public</code> and set{" "}
              <code className="font-mono text-[12.5px]">photo</code>.
            </NeedsInput>
          )}
        </Reveal>
      </div>

      {/* Story */}
      <section aria-labelledby="story" className="mt-16 grid gap-10 border-t border-line pt-16 lg:grid-cols-[280px_1fr] lg:gap-20">
        <Reveal>
          <h2 id="story" className="text-heading font-semibold">
            Two sides, one habit
          </h2>
        </Reveal>
        <Reveal delay={1} className="prose-body max-w-[64ch] text-[17px] leading-[1.75] text-ink-muted">
          <p>
            My career started in enterprise IT as a trainee systems engineer at The Star Entertainment Group, supporting end-user
            technology and infrastructure. Over four years there I moved into device management, Windows Autopilot and Intune,
            and worked on endpoint projects big enough that &ldquo;a few devices&rdquo; meant thousands.
          </p>
          <p>
            Today I do that work at Deloitte. It&apos;s a job about getting the details right at scale: the right policy, on the
            right device, for the right people, without getting in anyone&apos;s way.
          </p>
          <p>
            The building side grew out of the same curiosity. AI-assisted development has made it possible for someone coming
            from IT operations, rather than software engineering, to take an idea all the way to a working product. I&apos;m
            not presenting myself as a full-time software engineer. I&apos;m someone who likes to understand things by making
            them.
          </p>
        </Reveal>
      </section>

      {/* Tech interests */}
      <section aria-labelledby="tech" className="mt-24">
        <Reveal>
          <h2 id="tech" className="text-heading font-semibold">
            What I&apos;m into, technically
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2">
          {techInterests.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i} className="bg-surface p-6 sm:p-8">
              <Icon name={item.icon} size={20} className="text-accent" />
              <h3 className="mt-5 font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Approach */}
      <section className="mt-24 grid gap-10 border-t border-line pt-16 lg:grid-cols-[280px_1fr] lg:gap-20">
        <Reveal>
          <h2 id="approach" className="text-heading font-semibold">
            How I learn and build
          </h2>
        </Reveal>
        <Reveal as="div" delay={1}>
          <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {[
              ["Start with a real problem", "The best projects begin with something that annoyed me at work or at home."],
              ["Build the smallest working version", "Get something on screen early, then let it tell me what's missing."],
              ["Use AI as a collaborator, not a crutch", "I want to understand what's been built, so I can fix it when it breaks."],
              ["Ship, then keep learning", "Most of what I know came from finishing things and seeing what went wrong."],
            ].map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="pt-0.5 text-sm tabular-nums text-ink-faint">{i + 1}</span>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="mt-1 leading-relaxed text-ink-muted">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <Reveal className="mt-24 flex flex-col items-start gap-6 rounded-[24px] border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">The professional version</h2>
          <p className="mt-2 text-ink-muted">Roles, responsibilities and the Microsoft stack I work with.</p>
        </div>
        <ButtonLink href="/experience" icon="arrow-right">
          View my experience
        </ButtonLink>
      </Reveal>
    </Container>
  );
}

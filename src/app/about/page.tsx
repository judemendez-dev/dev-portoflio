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
    title: "Understanding complex systems",
    body: "I've always been interested in how different technologies work together. From infrastructure and networking to endpoint management, identity and security, I enjoy understanding the bigger picture and how each component contributes to a functioning enterprise environment.",
  },
  {
    icon: "code",
    title: "Building practical solutions",
    body: "I enjoy taking ideas and turning them into functional applications, whether that's a web platform, browser extension or a tool that addresses a real-world problem. I'm particularly interested in creating solutions that improve existing technologies and make everyday tasks easier.",
  },
  {
    icon: "flask",
    title: "Exploring AI-assisted development",
    body: "AI has opened up opportunities to explore software development in ways that weren't previously accessible to me. I enjoy experimenting with emerging AI technologies, learning through the development process and using these tools to bring ideas to life.",
  },
  {
    icon: "shield",
    title: "Automation & efficiency",
    body: "I naturally look for ways to simplify repetitive processes and improve how things are done. Whether through automation, better workflows or purpose-built tools, I'm interested in making technology more efficient, intuitive and accessible.",
  },
];


export default function AboutPage() {
  return (
    <Container>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: personJsonLd() }} />

      <div className="grid gap-12 pb-8 pt-14 sm:pt-20 lg:grid-cols-[1fr_340px] lg:gap-20">
        <header>
          <h1 className="rise text-title font-semibold text-balance">
            Working with technology. Building what&apos;s missing.
          </h1>
          <div className="rise prose-body mt-8 max-w-[62ch] text-lede text-ink-muted" style={cssVars({ "--i": 1 })}>
            <p>
              Hi, I&apos;m Jude. I&apos;m a Sydney-based IT professional specialising in modern endpoint management, identity and
              security. I currently work at Deloitte, managing Microsoft Intune and endpoint security across a global enterprise
              environment, with a primary focus on the Asia-Pacific region.
            </p>
            <p>
              My interest in technology has always extended beyond my professional work. I enjoy understanding how things work,
              identifying where they could be better and exploring what&apos;s possible with new technologies. Whether it&apos;s
              solving challenges in enterprise IT or developing my own applications, I&apos;m driven by the opportunity to turn
              ideas into practical solutions.
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
            From an opportunity to a career
          </h2>
        </Reveal>
        <Reveal delay={1} className="prose-body max-w-[64ch] text-[17px] leading-[1.75] text-ink-muted">
          <p>
            My journey into IT began at just 18 years old, fresh out of high school, when I was given an opportunity to start as
            an End User Technologies Trainee at The Star Entertainment Group. I knew it was an opportunity worth taking, and I
            was determined to make the most of it. What started as an entry-level position quickly became a career I was
            passionate about.
          </p>
          <p>
            Over the next four years, I progressed into an End User Technologies Engineer, developing my expertise in enterprise
            IT, endpoint management and modern workplace technologies. I took on increasingly complex responsibilities, from
            managing enterprise infrastructure to leading large-scale device migrations and modernisation projects across
            multiple properties.
          </p>
          <p>
            Today, at 24, I work at Deloitte, managing Microsoft Intune and endpoint security within a global enterprise
            environment. Looking back, it&apos;s rewarding to see how much I&apos;ve grown from that 18-year-old just starting
            out, and how much there still is to learn.
          </p>
          <p>
            That same drive to learn has also led me beyond my professional career. With AI-assisted development opening up new
            possibilities, I&apos;ve started building my own applications, exploring ideas and creating practical solutions to
            real-world problems.
          </p>
          <p>
            For me, technology has never been just about the work I do, but about continuously learning, improving and seeing
            what I can build next.
          </p>
        </Reveal>
      </section>

      {/* Tech interests */}
      <section aria-labelledby="tech" className="mt-24">
        <Reveal>
          <h2 id="tech" className="text-heading font-semibold">
            What drives my interest in technology
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

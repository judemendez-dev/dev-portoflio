import Link from "next/link";
import { Icon } from "@/components/icons";
import { LocalTime } from "@/components/local-time";
import { Monogram } from "@/components/monogram";
import { Container } from "@/components/ui";
import { navItems } from "@/lib/nav";
import { site } from "@/content/site";

export function SiteFooter() {
  type Social = { label: string; href: string; icon: "linkedin" | "github" | "mail" };
  const elsewhere: Social[] = [];
  if (site.links.linkedin) elsewhere.push({ label: "LinkedIn", href: site.links.linkedin, icon: "linkedin" });
  if (site.links.github) elsewhere.push({ label: "GitHub", href: site.links.github, icon: "github" });
  if (site.links.email) elsewhere.push({ label: "Email", href: `mailto:${site.links.email}`, icon: "mail" });

  return (
    <footer className="mt-32 border-t border-line">
      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Monogram />
              <span className="font-semibold tracking-tight">{site.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Enterprise IT by day, building things after hours. Made in Sydney with Next.js and a fair bit of curiosity.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-faint">
              <span className="relative flex size-2">
                <span className="pulse-dot size-2 rounded-full bg-live text-live" aria-hidden="true" />
              </span>
              <span>
                <LocalTime /> in Sydney
              </span>
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-medium text-ink">Pages</h2>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium text-ink">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    <Icon name={l.icon} size={14} />
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <span className="text-sm text-ink-faint">
                  Press <kbd className="rounded border border-line px-1 font-mono text-[11px]">Ctrl K</kbd> or{" "}
                  <kbd className="rounded border border-line px-1 font-mono text-[11px]">⌘K</kbd> to search
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. This is a personal website. The views and projects here are my own and
            don&apos;t represent my employers.
          </p>
          <a href="#main" className="inline-flex shrink-0 items-center gap-1.5 transition-colors hover:text-ink">
            <Icon name="arrow-up" size={13} />
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}

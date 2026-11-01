import { CopyEmail } from "@/components/copy-email";
import { Icon, type IconName } from "@/components/icons";
import { NeedsInput } from "@/components/ui";
import { isDev, site } from "@/content/site";

type Item = { key: "email" | "linkedin" | "github"; label: string; icon: IconName; href: string | null; display: string | null; note: string };

/** Contact options built from the links in src/content/site.ts. Unset links are hidden in production. */
export function ContactLinks() {
  const { email, linkedin, github } = site.links;
  const items: Item[] = [
    {
      key: "email",
      label: "Email",
      icon: "mail",
      href: email ? `mailto:${email}` : null,
      display: email,
      note: "The most direct way to reach me.",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: "linkedin",
      href: linkedin,
      display: linkedin ? linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : null,
      note: "For anything work related.",
    },
    {
      key: "github",
      label: "GitHub",
      icon: "github",
      href: github,
      display: github ? github.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : null,
      note: "Where my public code lives.",
    },
  ];

  const configured = items.filter((i) => i.href);
  const missing = items.filter((i) => !i.href);

  return (
    <div className="space-y-4">
      {configured.length > 0 && (
        <ul className="divide-y divide-line overflow-hidden rounded-[20px] border border-line bg-surface">
          {configured.map((item) => (
            <li key={item.key} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-canvas text-ink-muted">
                <Icon name={item.icon} size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-ink-muted">{item.note}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={item.href!}
                  {...(item.key === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="group inline-flex h-9 max-w-full items-center gap-2 rounded-full bg-ink px-4 text-[13.5px] font-medium text-canvas transition-opacity hover:opacity-90"
                >
                  <span className="truncate">{item.display}</span>
                  <Icon name="arrow-up-right" size={14} className="shrink-0 transition-transform group-hover:-translate-y-px group-hover:translate-x-0.5" />
                  {item.key !== "email" && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
                {item.key === "email" && email && <CopyEmail email={email} />}
              </div>
            </li>
          ))}
        </ul>
      )}

      {configured.length === 0 && !isDev && (
        <p className="rounded-[20px] border border-line bg-surface p-6 text-ink-muted">Contact details are on their way.</p>
      )}

      {missing.length > 0 && (
        <NeedsInput file="src/content/site.ts">
          Add your {missing.map((m) => m.label).join(", ")} under <code className="font-mono text-[12.5px]">links</code> to show{" "}
          {missing.length === 1 ? "it" : "them"} here.
        </NeedsInput>
      )}
    </div>
  );
}

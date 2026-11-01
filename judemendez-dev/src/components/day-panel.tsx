"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon, type IconName } from "@/components/icons";
import { LocalTime, sydneyClock } from "@/components/local-time";
import { featuredProjects, type ProjectStatus } from "@/content/projects";
import { cn } from "@/lib/cn";

type Mode = "day" | "after";

type Row = { icon: IconName; label: string; detail?: string; status?: ProjectStatus; href?: string };

const dayRows: Row[] = [
  { icon: "laptop", label: "Microsoft Intune and Entra ID", detail: "Endpoint management" },
  { icon: "shield", label: "Endpoint security and Microsoft Defender", detail: "Security" },
  { icon: "user", label: "Conditional Access and device compliance", detail: "Identity" },
  { icon: "map-pin", label: "Supporting teams across Asia-Pacific", detail: "Operations" },
];

const statusDot: Record<ProjectStatus, string> = {
  Live: "bg-live",
  "In Development": "bg-building",
  Archived: "bg-archived",
};

/**
 * The hero's signature element: two sides of the same person.
 * It opens on whichever side is true right now in Sydney
 * (weekdays 8am–6pm is "By day"), and visitors can flip between them.
 */
export function DayPanel() {
  const [mode, setMode] = useState<Mode>("day");
  const [autoMode, setAutoMode] = useState<Mode | null>(null);
  const id = useId();
  const tabs = useRef<Record<Mode, HTMLButtonElement | null>>({ day: null, after: null });

  useEffect(() => {
    const { hour, weekday } = sydneyClock();
    const workHours = weekday >= 1 && weekday <= 5 && hour >= 8 && hour < 18;
    const initial: Mode = workHours ? "day" : "after";
    setMode(initial);
    setAutoMode(initial);
  }, []);

  const afterRows: Row[] = [
    ...featuredProjects.slice(0, 3).map((p) => ({
      icon: "folder" as const,
      label: p.name,
      detail: p.status,
      status: p.status,
      href: `/projects/${p.slug}`,
    })),
  ];

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next: Mode = mode === "day" ? "after" : "day";
      setMode(next);
      tabs.current[next]?.focus();
    }
  };

  const panels: Record<Mode, { title: string; body: string; rows: Row[]; link: { href: string; label: string } }> = {
    day: {
      title: "Enterprise endpoint management",
      body: "Keeping enterprise devices secure, compliant and out of people's way.",
      rows: dayRows,
      link: { href: "/experience", label: "See my experience" },
    },
    after: {
      title: "Apps, experiments and AI-assisted builds",
      body: "Ideas I can't stop thinking about, turned into things that actually work.",
      rows: afterRows,
      link: { href: "/projects", label: "Browse projects" },
    },
  };

  return (
    <div className="relative rounded-[22px] border border-line bg-surface/80 p-1.5 shadow-[var(--shadow-lift)] backdrop-blur-sm">
      {/* faint accent edge across the top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
      />
      <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-2.5">
        <div role="tablist" aria-label="Two sides of my week" className="relative flex rounded-full bg-canvas p-1" onKeyDown={onKey}>
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full border border-line-strong bg-raised transition-transform duration-500 ease-[var(--ease-out-soft)]",
              mode === "after" ? "translate-x-full" : "translate-x-0",
            )}
          />
          {(["day", "after"] as const).map((m) => (
            <button
              key={m}
              ref={(el) => {
                tabs.current[m] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${m}`}
              aria-selected={mode === m}
              aria-controls={`${id}-panel`}
              tabIndex={mode === m ? 0 : -1}
              onClick={() => setMode(m)}
              className={cn(
                "relative z-10 w-[104px] rounded-full py-1.5 text-[13px] font-medium transition-colors",
                mode === m ? "text-ink" : "text-ink-faint hover:text-ink-muted",
              )}
            >
              {m === "day" ? "By day" : "After hours"}
            </button>
          ))}
        </div>
        <span className="hidden items-center gap-1.5 text-xs text-ink-faint sm:flex">
          <Icon name="map-pin" size={12} />
          <LocalTime />
        </span>
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${mode}`}
        className="rounded-2xl border border-line bg-canvas/70 p-5 sm:p-6"
      >
        <div key={mode} className="card-in">
          <h2 className="text-lg font-semibold tracking-tight">{panels[mode].title}</h2>
          <p className="mt-1.5 text-sm text-ink-muted">{panels[mode].body}</p>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {panels[mode].rows.map((row) => {
              const content = (
                <>
                  <Icon name={row.icon} size={15} className="shrink-0 text-ink-faint" />
                  <span className="min-w-0 flex-1 truncate text-[14px] text-ink">{row.label}</span>
                  {row.detail && (
                    <span className="flex shrink-0 items-center gap-1.5 text-xs text-ink-faint">
                      {row.status && <span aria-hidden="true" className={cn("size-1.5 rounded-full", statusDot[row.status])} />}
                      {row.detail}
                    </span>
                  )}
                </>
              );
              return (
                <li key={row.label}>
                  {row.href ? (
                    <Link href={row.href} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-raised">
                      {content}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 py-3">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <Link
              href={panels[mode].link.href}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink hover:text-accent"
            >
              {panels[mode].link.label}
              <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <p className={cn("text-xs text-ink-faint transition-opacity", autoMode === mode ? "opacity-100" : "opacity-0")}>
              {mode === "day" ? "It's a work day in Sydney right now." : "It's my own time in Sydney right now."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

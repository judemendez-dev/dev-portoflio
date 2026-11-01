import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "@/components/icons";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * Shows a project's cover image, or — until you add one — a designed
 * placeholder that is clearly labelled as such (never a fake screenshot).
 */
export function ProjectPreview({
  project,
  priority,
  className,
  sizes = "(min-width: 1024px) 560px, 100vw",
  wide,
}: {
  project: Project;
  /** Use a cinematic ratio on larger screens (project pages). */
  wide?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const host = project.url ? new URL(project.url).hostname : null;

  return (
    <div
      className={cn("relative overflow-hidden rounded-xl border border-line bg-canvas", className)}
      style={{ "--h": project.hue } as CSSProperties}
    >
      {/* Window chrome for the placeholder (your cover images bring their own). */}
      {!project.cover && (
        <div className="flex h-8 items-center gap-1.5 border-b border-line bg-surface px-3">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-canvas px-3 py-0.5 text-[11px] text-ink-faint">
            {host ?? project.name.toLowerCase().replace(/\s+/g, "-")}
          </span>
          <span className="w-[30px]" />
        </div>
      )}

      <div className={cn("@container relative aspect-[16/10]", wide && "md:aspect-[21/9]")}>
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0">
            {/* Tinted field built from the project's hue */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 85% 110%, oklch(0.62 0.13 var(--h) / 0.32), transparent 60%), radial-gradient(80% 60% at 0% 0%, oklch(0.7 0.08 var(--h) / 0.12), transparent 70%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage: "linear-gradient(180deg, #000, transparent 85%)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[12%] left-[7%] right-[7%] select-none truncate font-semibold leading-none tracking-[-0.05em] text-ink/85"
              style={{ fontSize: "min(12cqw, 5rem)" }}
            >
              {project.name}
            </span>
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/80 px-2.5 py-1 text-[11px] text-ink-faint backdrop-blur">
              <Icon name="image" size={12} />
              Screenshot coming soon
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import { ProjectPreview } from "@/components/project-preview";
import { ButtonLink, StatusBadge, Tag } from "@/components/ui";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/** Lets the card's edge light follow the cursor. */
function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
}

export function ProjectCard({
  project,
  index = 0,
  animate,
  headingLevel = "h3",
}: {
  project: Project;
  index?: number;
  animate?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const detailsHref = `/projects/${project.slug}`;

  return (
    <article
      onPointerMove={trackPointer}
      className={cn(
        "spot group flex h-full flex-col rounded-[20px] border border-line bg-surface p-2 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        animate && "card-in",
      )}
      style={{ "--i": index } as CSSProperties}
    >
      <Link href={detailsHref} tabIndex={-1} aria-hidden="true" className="block overflow-hidden rounded-xl">
        <div className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.015]">
          <ProjectPreview project={project} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Heading className="text-[19px] font-semibold tracking-tight">
              <Link href={detailsHref} className="hover:text-accent">
                {project.name}
              </Link>
            </Heading>
            <p className="mt-0.5 text-[13px] text-ink-faint">{project.categoryLabel}</p>
          </div>
          <StatusBadge status={project.status} className="shrink-0" />
        </div>

        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted text-pretty">{project.description}</p>

        {project.stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.stack.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <ButtonLink href={detailsHref} size="sm" variant="secondary" icon="arrow-right" aria-label={`View details about ${project.name}`}>
            View details
          </ButtonLink>
          {project.url && (
            <ButtonLink href={project.url} size="sm" variant="ghost" icon="arrow-up-right" external aria-label={`Visit the ${project.name} website (opens in a new tab)`}>
              Visit website
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
}

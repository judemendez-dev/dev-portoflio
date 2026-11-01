"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { categories, projects, type CategoryId } from "@/content/projects";
import { cn } from "@/lib/cn";

type Filter = "all" | CategoryId;

const filters: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...categories];

function countFor(id: Filter) {
  return id === "all" ? projects.length : projects.filter((p) => p.categories.includes(id)).length;
}

/**
 * The filterable project grid on /projects.
 * The chosen filter is kept in the URL (?category=web-apps) so it can be shared.
 */
export function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("category");
    if (fromUrl && filters.some((f) => f.id === fromUrl)) setFilter(fromUrl as Filter);
  }, []);

  const choose = (id: Filter) => {
    setFilter(id);
    setChanged(true);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", id);
    window.history.replaceState(null, "", url);
  };

  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));
  const activeLabel = filters.find((f) => f.id === filter)?.label ?? "All";

  return (
    <div>
      <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none]">
        <div role="group" aria-label="Filter projects by category" className="inline-flex gap-1 rounded-full border border-line bg-surface p-1">
          {filters.map((f) => {
            const count = countFor(f.id);
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => choose(f.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-[background-color,color] duration-200",
                  active ? "bg-ink text-canvas" : "text-ink-muted hover:bg-raised hover:text-ink",
                )}
              >
                {f.label}
                <span className={cn("tabular-nums text-[12px]", active ? "text-canvas/60" : "text-ink-faint")}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {`Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"} in ${activeLabel}`}
      </p>

      {visible.length > 0 ? (
        <ul key={filter} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <li key={p.slug}>
              <ProjectCard project={p} index={i} animate={changed} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div key={filter} className="card-in mt-8 rounded-[20px] border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="font-medium">No {activeLabel.toLowerCase()} projects yet.</p>
          <p className="mt-1.5 text-sm text-ink-muted">This category is ready for whatever I build next.</p>
          <button
            type="button"
            onClick={() => choose("all")}
            className="mt-5 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}

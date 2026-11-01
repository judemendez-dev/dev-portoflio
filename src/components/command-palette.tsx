"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";
import { navItems } from "@/lib/nav";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { getTheme, setTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";

/** Open the palette from anywhere: `openCommandPalette()` */
export const OPEN_PALETTE_EVENT = "open-command-palette";
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}

type Command = {
  id: string;
  group: "Go to" | "Projects" | "Actions" | "Elsewhere";
  label: string;
  hint?: string;
  icon: IconName;
  keywords?: string;
  run: () => void | Promise<void>;
};

export function CommandPalette() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const listId = useId();

  const close = useCallback(() => dialogRef.current?.close(), []);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => {
      close();
      router.push(href);
    };
    const external = (url: string) => () => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    };
    const list: Command[] = [
      ...navItems.map((n) => ({
        id: `nav-${n.href}`,
        group: "Go to" as const,
        label: n.label,
        icon: n.icon,
        run: go(n.href),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Projects" as const,
        label: p.name,
        hint: p.categoryLabel,
        icon: "folder" as const,
        keywords: `${p.description} ${p.stack.join(" ")}`,
        run: go(`/projects/${p.slug}`),
      })),
      {
        id: "theme",
        group: "Actions",
        label: "Switch theme",
        hint: "Light or dark",
        icon: "sun",
        keywords: "dark light mode appearance",
        run: () => setTheme(getTheme() === "dark" ? "light" : "dark"),
      },
    ];
    if (site.links.email) {
      const email = site.links.email;
      list.push({
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: email,
        icon: "copy",
        keywords: "contact mail",
        run: async () => {
          try {
            await navigator.clipboard.writeText(email);
            setToast("Email copied");
          } catch {
            setToast("Couldn't copy — your browser blocked clipboard access");
          }
        },
      });
    }
    if (site.links.linkedin)
      list.push({ id: "linkedin", group: "Elsewhere", label: "LinkedIn", icon: "linkedin", run: external(site.links.linkedin) });
    if (site.links.github)
      list.push({ id: "github", group: "Elsewhere", label: "GitHub", icon: "github", run: external(site.links.github) });
    for (const p of projects) {
      if (p.url)
        list.push({
          id: `visit-${p.slug}`,
          group: "Elsewhere",
          label: `Visit ${p.name}`,
          hint: new URL(p.url).hostname,
          icon: "arrow-up-right",
          run: external(p.url),
        });
    }
    return list;
  }, [close, router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  // Keyboard shortcut + external open requests
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  // Sync React state with the native <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery("");
      setActive(0);
      setToast(null);
      dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(Math.max(0, results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    }
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      onClose={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="fixed inset-x-0 top-[12vh] mx-auto w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-ink shadow-[var(--shadow-lift)] backdrop:bg-transparent"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Icon name="search" className="shrink-0 text-ink-faint" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search pages, projects and actions"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint focus-visible:outline-none"
        />
        <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[11px] text-ink-faint sm:block">esc</kbd>
      </div>

      <div ref={listRef} id={listId} role="listbox" aria-label="Results" className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
        {results.length === 0 && (
          <p className="px-3 py-10 text-center text-sm text-ink-muted">
            Nothing matches “{query}”. Try a page name like “projects”.
          </p>
        )}
        {results.map((c, i) => {
          const showGroup = c.group !== lastGroup;
          lastGroup = c.group;
          return (
            <div key={c.id} role="presentation">
              {showGroup && (
                <div role="presentation" className="px-3 pb-1.5 pt-3 text-xs font-medium text-ink-faint">
                  {c.group}
                </div>
              )}
              <div
                id={`${listId}-${c.id}`}
                role="option"
                aria-selected={i === active}
                data-index={i}
                onMouseMove={() => setActive(i)}
                onClick={() => c.run()}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  i === active ? "bg-raised text-ink" : "text-ink-muted",
                )}
              >
                <Icon name={c.icon} className={i === active ? "text-accent" : "text-ink-faint"} />
                <span className="font-medium">{c.label}</span>
                {c.hint && <span className="ml-auto truncate pl-4 text-xs text-ink-faint">{c.hint}</span>}
                {i === active && <Icon name="corner-down-left" size={14} className="shrink-0 text-ink-faint" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-xs text-ink-faint">
        <span aria-live="polite">{toast ?? `${results.length} result${results.length === 1 ? "" : "s"}`}</span>
        <span className="hidden items-center gap-3 sm:flex">
          <span>
            <kbd className="font-mono">↑↓</kbd> to move
          </span>
          <span>
            <kbd className="font-mono">↵</kbd> to open
          </span>
        </span>
      </div>
    </dialog>
  );
}

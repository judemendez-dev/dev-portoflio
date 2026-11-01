"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { getTheme, setTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/cn";

export function useTheme() {
  const [theme, setLocal] = useState<Theme>("dark");
  useEffect(() => {
    setLocal(getTheme());
    const onChange = (e: Event) => setLocal((e as CustomEvent<Theme>).detail);
    window.addEventListener("themechange", onChange);
    return () => window.removeEventListener("themechange", onChange);
  }, []);
  return theme;
}

/*
 * Positions and visibility below are driven by the theme on <html>
 * (`in-data-[theme=light]:` = "when the page is in light mode"), not by
 * React state, so the switch is already in the right place before the
 * page finishes loading — no jump for returning light-mode visitors.
 */
const light = {
  knob: "in-data-[theme=light]:translate-x-0",
  hide: "in-data-[theme=light]:scale-50 in-data-[theme=light]:opacity-0 in-data-[theme=light]:-rotate-90",
  show: "in-data-[theme=light]:scale-100 in-data-[theme=light]:opacity-100 in-data-[theme=light]:rotate-0",
};

const stars = [
  { left: 10, top: 8, size: 2, delay: "0ms" },
  { left: 18, top: 17, size: 1.5, delay: "600ms" },
  { left: 26, top: 9, size: 1.5, delay: "1200ms" },
];

/**
 * Sun / moon switch in the header. Clicking it slides the knob across,
 * swaps the icon, and reveals the new theme as a circle spreading out
 * from the switch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const isDark = theme === "dark";

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTheme(isDark ? "light" : "dark", { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={cn(
        "group relative h-8 w-[60px] shrink-0 rounded-full border p-[3px] transition-colors duration-500",
        "border-accent/30 bg-accent-soft hover:border-accent/60",
        "in-data-[theme=light]:border-amber-500/35 in-data-[theme=light]:bg-amber-400/15 in-data-[theme=light]:hover:border-amber-500/70",
        className,
      )}
    >
      {/* Stars on the night side of the track */}
      {stars.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            "absolute rounded-full bg-ink transition-[opacity,transform] duration-500",
            "in-data-[theme=light]:scale-0 in-data-[theme=light]:opacity-0",
          )}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animation: `twinkle 2.4s ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      {/* A little sun glow on the day side of the track */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-[9px] top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-amber-400/60 blur-[3px] transition-[opacity,transform] duration-500",
          "scale-0 opacity-0 in-data-[theme=light]:scale-100 in-data-[theme=light]:opacity-100",
        )}
      />

      {/* Knob */}
      <span
        aria-hidden="true"
        className={cn(
          "relative grid size-6 translate-x-[26px] place-items-center rounded-full bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.3),0_0_0_1px_var(--border-strong)]",
          "transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.5,1)] group-active:scale-90",
          light.knob,
        )}
      >
        {/* Moon */}
        <svg
          viewBox="0 0 24 24"
          className={cn("absolute size-[14px] text-accent transition-all duration-500 ease-[var(--ease-out-soft)]", light.hide)}
          fill="currentColor"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
        {/* Sun: the rays spin in as it appears */}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "absolute size-[15px] rotate-90 scale-50 text-amber-500 opacity-0 transition-all duration-500 ease-[var(--ease-out-soft)]",
            light.show,
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </span>
    </button>
  );
}

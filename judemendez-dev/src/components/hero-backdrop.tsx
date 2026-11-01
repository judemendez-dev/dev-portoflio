"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet dot grid behind the hero. On devices with a mouse, a soft
 * lens follows the cursor and lights up the dots beneath it.
 * Disabled for touch screens and reduced-motion users.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--lit", "1");
      });
    };
    const onLeave = () => el.style.setProperty("--lit", "0");
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="dot-grid absolute inset-0" />
      <div className="dot-grid-lit absolute inset-0" />
      {/* One soft light source, top-left, so the page isn't flat black. */}
      <div className="absolute -left-40 -top-56 h-[520px] w-[720px] rounded-full bg-accent/10 blur-[120px]" />
    </div>
  );
}

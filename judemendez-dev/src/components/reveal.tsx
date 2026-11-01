"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

/**
 * Fades its content up once, the first time it scrolls into view.
 * Content stays visible without JavaScript and for reduced-motion users
 * (see `[data-reveal]` in globals.css).
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  /** Stagger index — each step adds ~70ms. */
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.visible = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal="" className={className} style={{ "--i": delay } as CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}

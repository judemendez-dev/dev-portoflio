import type { CSSProperties } from "react";

/** Join class names, skipping empty values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Typed helper for CSS custom properties in `style`, e.g. style={cssVars({ "--i": 2 })} */
export function cssVars(vars: Record<`--${string}`, string | number>) {
  return vars as CSSProperties;
}

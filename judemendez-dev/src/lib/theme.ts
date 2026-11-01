export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "jm-theme";

/**
 * Runs in <head> before the page paints, so a returning visitor who
 * chose light mode never sees a dark flash. Also marks <html> with
 * `.js` so scroll-reveal animations only hide content when JS works.
 * Dark is the default; a saved choice always wins.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark'){d.dataset.theme=t;}else{d.dataset.theme='dark';}}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

/**
 * Switches the theme and saves the choice.
 * When `origin` (a screen point) is given and the browser supports it, the new
 * theme spreads out from that point in a circle. Otherwise colours cross-fade.
 */
export function setTheme(theme: Theme, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as ViewTransitionDocument;

  const apply = () => {
    root.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage can be unavailable in private windows — the theme still applies */
    }
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  };

  if (reduce) {
    apply();
    return;
  }

  if (origin && doc.startViewTransition) {
    const { x, y } = origin;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = doc.startViewTransition(apply);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 560, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {
        /* the transition was skipped; the theme has still changed */
      });
    return;
  }

  root.classList.add("theme-transition");
  window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  apply();
}

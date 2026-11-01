"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { openCommandPalette } from "@/components/command-palette";
import { Monogram } from "@/components/monogram";
import { navItems, isActive } from "@/lib/nav";
import { site } from "@/content/site";
import { cn, cssVars } from "@/lib/cn";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-line bg-canvas/80 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70"
          : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5 rounded-lg" aria-label={`${site.name}, home`}>
          <Monogram className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-6" />
          <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight">{site.name}</span>
        </Link>

        <DesktopNav pathname={pathname} />

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden h-9 items-center gap-2 rounded-full border border-line pl-3 pr-1.5 text-[13px] text-ink-muted transition-colors hover:border-line-strong hover:text-ink sm:flex"
            aria-label="Open command menu"
          >
            <Icon name="search" size={14} />
            <span className="md:max-lg:sr-only">Search</span>
            <kbd className="whitespace-nowrap rounded-full bg-raised px-2 py-0.5 font-mono text-[11px] text-ink-faint">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>
          <ThemeToggle />
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function DesktopNav({ pathname }: { pathname: string }) {
  const navRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number; visible: boolean }>({ left: 0, width: 0, visible: false });
  const [ready, setReady] = useState(false);

  const moveTo = useCallback((el: HTMLElement | null) => {
    if (!el || !navRef.current) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, []);

  const moveToActive = useCallback(() => {
    moveTo(navRef.current?.querySelector<HTMLElement>('[aria-current="page"]') ?? null);
  }, [moveTo]);

  useIsoLayoutEffect(() => {
    moveToActive();
    // Enable the sliding transition only after the first placement.
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, [pathname, moveToActive]);

  useEffect(() => {
    // Fonts loading can change link widths.
    document.fonts?.ready.then(moveToActive);
    window.addEventListener("resize", moveToActive);
    return () => window.removeEventListener("resize", moveToActive);
  }, [moveToActive]);

  return (
    <nav aria-label="Main" className="ml-auto hidden md:block">
      <div ref={navRef} className="relative flex items-center" onMouseLeave={moveToActive}>
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 h-8 -translate-y-1/2 rounded-full bg-raised",
            ready && "transition-[left,width,opacity] duration-300 ease-[var(--ease-out-soft)]",
          )}
          style={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
        />
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              onMouseEnter={(e) => moveTo(e.currentTarget)}
              onFocus={(e) => moveTo(e.currentTarget)}
              onBlur={moveToActive}
              className={cn(
                "relative z-10 rounded-full px-3.5 py-1.5 text-[14px] transition-colors",
                active ? "text-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              {item.label}
              {active && (
                <span aria-hidden="true" className="absolute -bottom-[13px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // Close when the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="grid size-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-raised hover:text-ink md:hidden"
      >
        <Icon name="menu" size={18} />
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm border-l border-line bg-canvas p-0 text-ink"
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-4">
          <div className="flex h-12 items-center justify-between">
            <span className="text-sm text-ink-faint">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-9 place-items-center rounded-full text-ink-muted hover:bg-raised hover:text-ink"
            >
              <Icon name="x" size={18} />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8">
            <ul className="space-y-1">
              {navItems.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="rise" style={cssVars({ "--i": i })}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-3 text-2xl font-medium tracking-tight transition-colors",
                        active ? "bg-raised text-ink" : "text-ink-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                      {active && <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto space-y-4">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openCommandPalette();
              }}
              className="flex w-full items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm text-ink-muted"
            >
              <Icon name="search" />
              Search the site
            </button>
            <p className="flex items-center gap-2 text-sm text-ink-faint">
              <Icon name="map-pin" size={14} />
              {site.location}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}

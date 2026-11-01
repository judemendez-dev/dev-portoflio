import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { isDev } from "@/content/site";
import type { ProjectStatus } from "@/content/projects";
import { cn, cssVars } from "@/lib/cn";

/* ---------------------------------------------------------------
   Buttons
---------------------------------------------------------------- */

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas hover:bg-ink/90 shadow-[0_1px_0_rgb(255_255_255/0.2)_inset,0_8px_24px_-12px_var(--accent)]",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink-faint hover:bg-raised",
  ghost: "text-ink-muted hover:text-ink hover:bg-raised",
};

const base =
  "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[14.5px] font-medium tracking-tight transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  icon?: IconName;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  size?: "md" | "sm";
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

export function ButtonLink({ href, variant = "primary", icon, external, size = "md", className, children, ...rest }: ButtonLinkProps) {
  const classes = cn(base, variants[variant], size === "sm" && "h-9 px-4 text-[13.5px]", className);
  const trailing = icon && (
    <Icon
      name={icon}
      size={size === "sm" ? 14 : 16}
      className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-px"
    />
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
        {trailing}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      {trailing}
    </Link>
  );
}

/* ---------------------------------------------------------------
   Layout
---------------------------------------------------------------- */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function PageHeader({ title, lede, children }: { title: string; lede?: ReactNode; children?: ReactNode }) {
  return (
    <header className="pb-12 pt-14 sm:pb-16 sm:pt-20">
      <h1 className="rise max-w-3xl text-title font-semibold text-balance">{title}</h1>
      {lede && (
        <p className="rise mt-5 max-w-2xl text-lede text-ink-muted text-pretty" style={cssVars({ "--i": 1 })}>
          {lede}
        </p>
      )}
      {children}
    </header>
  );
}

export function SectionHeading({
  id,
  title,
  description,
  action,
}: {
  id?: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 id={id} className="text-heading font-semibold">
          {title}
        </h2>
        {description && <p className="mt-3 text-ink-muted text-pretty">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------------------------------------------------------------
   Status badge for projects
---------------------------------------------------------------- */

const statusColour: Record<ProjectStatus, string> = {
  Live: "text-live",
  "In Development": "text-building",
  Archived: "text-archived",
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/60 px-2.5 py-1 text-xs font-medium text-ink-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full bg-current", statusColour[status], status === "Live" && "pulse-dot")}
      />
      {status}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line px-2 py-0.5 text-[12.5px] text-ink-muted">
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------
   "Needs your input" placeholder — only visible during `npm run dev`
---------------------------------------------------------------- */

export function NeedsInput({ children, file, className }: { children: ReactNode; file: string; className?: string }) {
  if (!isDev) return null;
  return (
    <div
      role="note"
      className={cn(
        "rounded-xl border border-dashed border-building/60 bg-building/5 px-4 py-3 text-sm text-ink-muted",
        className,
      )}
    >
      <span className="font-medium text-building">Needs your input: </span>
      {children} <span className="text-ink-faint">Edit </span>
      <code className="font-mono text-[12.5px] text-ink">{file}</code>
      <span className="text-ink-faint">. This note only shows in development.</span>
    </div>
  );
}

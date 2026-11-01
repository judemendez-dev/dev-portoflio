import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** The "JM" mark. The same geometry is used for the favicon (app/icon.svg). */
export function Monogram({ className, size = 30 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid shrink-0 place-items-center rounded-[9px] border border-line-strong bg-surface text-ink",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <span className="text-[12px] font-semibold leading-none tracking-[-0.06em]" style={{ fontSize: size * 0.4 }}>
        {site.monogram}
      </span>
      <span className="absolute -right-[3px] -top-[3px] size-[7px] rounded-full border-2 border-canvas bg-accent" />
    </span>
  );
}

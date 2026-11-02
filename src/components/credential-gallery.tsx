"use client";

import { useEffect, useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { formatCredentialDate, type Credential, type CredentialType } from "@/content/certifications";
import { cn } from "@/lib/cn";

/** How far a card leans towards the cursor, in degrees. Kept small so it feels physical, not showy. */
const MAX_TILT = 7;

const typeDot: Record<CredentialType, string> = {
  Certification: "bg-accent",
  "Applied skill": "bg-live",
  "Course completion": "bg-ink-faint",
};

/* ---------------------------------------------------------------
   Badge artwork: serves the local copy, falls back to the issuer's
   official image if the local copy isn't there.
---------------------------------------------------------------- */

function BadgeArt({ credential, className, eager }: { credential: Credential; className?: string; eager?: boolean }) {
  const image = credential.image;
  const [src, setSrc] = useState(image?.src);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Local copy first, then the issuer's official image, then the plain issuer tile.
  const handleError = () => {
    if (!image) return;
    if (image.sourceUrl && src !== image.sourceUrl) setSrc(image.sourceUrl);
    else setFailed(true);
  };

  useEffect(() => {
    // Covers an image that failed before the page became interactive.
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) handleError();
  }, [src]);

  if (!image || failed) {
    // No badge artwork is issued for this credential: show a plain issuer tile, never a stand-in badge.
    return (
      <span className={cn("flex flex-col items-center justify-center gap-3 text-center", className)}>
        <span className="grid size-16 place-items-center rounded-2xl border border-line-strong bg-surface text-ink-muted">
          <Icon name="award" size={28} strokeWidth={1.5} />
        </span>
        <span className="px-2 text-sm font-medium leading-snug text-ink">{credential.issuer}</span>
        <span className="text-xs text-ink-faint">{image ? "Badge unavailable" : "Certificate of completion"}</span>
      </span>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={image.alt}
      width={600}
      height={600}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onError={handleError}
      className={cn("h-full w-full object-contain", className)}
    />
  );
}

/* ---------------------------------------------------------------
   One credential card with the 3D tilt
---------------------------------------------------------------- */

function CredentialCard({ credential, onOpen }: { credential: Credential; onOpen: () => void }) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const canTilt = useRef(false);

  useEffect(() => {
    // Mouse and trackpad only; touch screens get a gentle press instead. Off for reduced motion.
    canTilt.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(frame.current);
  }, []);

  // Pointer events are read on the outer element (which never moves) and written straight to CSS
  // variables on the inner one, so moving the mouse never re-renders React.
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = tiltRef.current;
    if (!el || !canTilt.current || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.dataset.tilting = "true";
      el.style.setProperty("--rx", `${((0.5 - y) * 2 * MAX_TILT).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((x - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
    });
  };

  const onPointerLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    delete el.dataset.tilting;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const headingId = `cred-${credential.id}`;

  return (
    <article aria-labelledby={headingId} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="h-full [perspective:1100px]">
      <div
        ref={tiltRef}
        className={cn(
          "group/tilt relative flex h-full flex-col rounded-[20px] border border-line bg-surface p-5 sm:p-6",
          "[transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateY(var(--lift,0px))]",
          "transition-[transform,box-shadow,border-color] duration-700 ease-[var(--ease-out-soft)]",
          "data-[tilting=true]:border-line-strong data-[tilting=true]:shadow-[var(--shadow-lift)] data-[tilting=true]:duration-200 data-[tilting=true]:[--lift:-6px]",
          "active:scale-[0.985] active:duration-150",
        )}
      >
        {/* Soft light that follows the cursor */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-data-[tilting=true]/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--gx, 50%) var(--gy, 50%), color-mix(in srgb, var(--ink) 7%, transparent), transparent 62%)",
          }}
        />

        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-label={`View details for ${credential.name}`}
          className="relative grid aspect-[4/3] w-full place-items-center rounded-2xl border border-line bg-canvas/70 [transform-style:preserve-3d]"
        >
          <span aria-hidden="true" className="dot-grid absolute inset-0 rounded-[inherit] opacity-60" />
          <span className="relative block size-[62%] [transform:translateZ(34px)]">
            <BadgeArt credential={credential} />
          </span>
        </button>

        <p className="mt-5 flex items-center gap-2 text-xs text-ink-faint">
          <span aria-hidden="true" className={cn("size-1.5 rounded-full", typeDot[credential.type])} />
          {credential.type}
        </p>
        <h2 id={headingId} className="mt-2 text-[15.5px] font-semibold leading-snug tracking-tight text-pretty">
          {credential.name}
        </h2>
        <div className="mt-2 flex items-baseline justify-between gap-3 text-sm">
          <span className="text-ink-muted">{credential.issuer}</span>
          {credential.issued && (
            <span className="shrink-0 tabular-nums text-ink-faint">
              <span className="sr-only">Issued </span>
              {formatCredentialDate(credential.issued, { short: true })}
            </span>
          )}
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
          <a
            href={credential.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            <Icon name="badge-check" size={15} className="text-ink-faint transition-colors group-hover/link:text-accent" />
            Verify credential
            <Icon name="arrow-up-right" size={13} className="transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-0.5" />
            <span className="sr-only"> on {credential.verifiedOn} (opens in a new tab)</span>
          </a>
            <span aria-hidden="true" className="text-xs text-ink-faint">
              {credential.verifiedOn}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------
   Gallery + detail view
---------------------------------------------------------------- */

export function CredentialGallery({ credentials }: { credentials: Credential[] }) {
  const [active, setActive] = useState<Credential | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {credentials.map((credential, i) => (
          <Reveal as="li" key={credential.id} delay={i % 3}>
            <CredentialCard credential={credential} onOpen={() => setActive(credential)} />
          </Reveal>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setActive(null);
        }}
        className="fixed inset-0 m-auto h-fit max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-[24px] border border-line-strong bg-surface p-0 text-ink shadow-[var(--shadow-lift)]"
      >
        {active && (
          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <p className="flex items-center gap-2 pt-1 text-xs text-ink-faint">
                <span aria-hidden="true" className={cn("size-1.5 rounded-full", typeDot[active.type])} />
                {active.type}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="-mr-2 -mt-2 grid size-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-raised hover:text-ink"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="relative mx-auto mt-2 grid aspect-square w-full max-w-[240px] place-items-center rounded-2xl border border-line bg-canvas/70">
              <span aria-hidden="true" className="dot-grid absolute inset-0 rounded-[inherit] opacity-60" />
              <span className="relative block size-[78%]">
                <BadgeArt credential={active} eager />
              </span>
            </div>

            <h2 id={titleId} className="mt-6 text-xl font-semibold leading-snug tracking-tight text-balance">
              {active.name}
            </h2>

            <dl className="mt-5 divide-y divide-line border-y border-line text-sm">
              <Row label="Issued by">{active.issuer}</Row>
              <Row label="Type">{active.type}</Row>
              {active.issued && <Row label="Issued">{formatCredentialDate(active.issued)}</Row>}
              {active.expires && <Row label="Expires">{formatCredentialDate(active.expires)}</Row>}
              <Row label="Verified on">{active.verifiedOn}</Row>
            </dl>

            <a
              href={active.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-[14.5px] font-medium text-canvas transition-opacity hover:opacity-90"
            >
              <Icon name="badge-check" size={16} />
              Verify credential
              <Icon name="arrow-up-right" size={15} className="transition-transform group-hover:-translate-y-px group-hover:translate-x-0.5" />
              <span className="sr-only"> on {active.verifiedOn} (opens in a new tab)</span>
            </a>
          </div>
        )}
      </dialog>
    </>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-2.5">
      <dt className="shrink-0 text-ink-faint">{label}</dt>
      <dd className="text-right text-ink">{children}</dd>
    </div>
  );
}

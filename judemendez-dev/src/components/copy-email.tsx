"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

/** Copies an email address to the clipboard and confirms it. */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  };

  const label = state === "copied" ? "Copied" : state === "error" ? "Copy blocked" : "Copy email";

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13.5px] font-medium transition-[border-color,color,background-color] duration-300",
        state === "copied"
          ? "border-live/50 bg-live/10 text-live"
          : "border-line-strong text-ink-muted hover:border-ink-faint hover:text-ink",
        className,
      )}
    >
      <span className="relative grid size-4 place-items-center">
        <Icon
          name="copy"
          size={14}
          className={cn("absolute transition-all duration-300", state === "copied" ? "scale-50 opacity-0" : "scale-100 opacity-100")}
        />
        <Icon
          name="check"
          size={15}
          className={cn("absolute transition-all duration-300", state === "copied" ? "scale-100 opacity-100" : "scale-50 opacity-0")}
        />
      </span>
      {label}
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? `${email} copied to clipboard` : state === "error" ? "Your browser blocked clipboard access. Select the address to copy it." : ""}
      </span>
    </button>
  );
}

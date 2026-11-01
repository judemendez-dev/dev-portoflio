"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: site.timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(" ", " ")
    .toLowerCase();
}

/** The current time in Sydney, updated every 30 seconds. */
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className={className} dateTime={now?.toISOString()} suppressHydrationWarning>
      {now ? formatTime(now) : " "}
    </time>
  );
}

/** Hour (0–23) and weekday (0 = Sunday) in Sydney right now. */
export function sydneyClock(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: site.timeZone,
    hour: "numeric",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const weekdayName = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekdayName);
  return { hour, weekday };
}

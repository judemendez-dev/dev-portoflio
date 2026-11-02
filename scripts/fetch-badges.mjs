/**
 * Downloads each credential's official badge image into /public so the site
 * serves its own copy instead of loading it from Credly or Microsoft.
 *
 * Runs automatically before `npm run dev` and `npm run build` (see package.json),
 * including on GitHub when the site is published. Files that already exist are
 * left alone, so you can drop in your own image instead.
 *
 * Every downloaded badge is trimmed of empty margins and placed on the same
 * 600×600 canvas as the custom badges, so all badges appear the same size.
 *
 * This script never fails the build: if a download doesn't work, it prints a
 * warning and the page falls back to the official image URL.
 */
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/** Canvas size and badge size, matching the custom badges (560px disc on a 600px canvas). */
const CANVAS = 600;
const BADGE = 560;

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const dataFile = path.join(root, "src", "content", "certifications.ts");

let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[badges] Image tools not installed; badges will be saved without resizing.");
}

const source = await readFile(dataFile, "utf8");
const pairs = [...source.matchAll(/src:\s*"(\/badges\/[^"]+)",\s*sourceUrl:\s*"([^"]+)"/g)].map((m) => ({
  file: path.join(root, "public", ...m[1].split("/").filter(Boolean)),
  url: m[2],
}));

/** Removes empty edges and centres the badge on a square canvas. */
async function normalise(buffer) {
  if (!sharp) return { output: buffer, note: "saved as-is" };
  const original = await sharp(buffer).metadata();
  const { data: trimmed, info } = await sharp(buffer).ensureAlpha().trim({ threshold: 12 }).toBuffer({ resolveWithObject: true });
  const output = await sharp(trimmed)
    .resize(BADGE, BADGE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: (CANVAS - BADGE) / 2,
      bottom: (CANVAS - BADGE) / 2,
      left: (CANVAS - BADGE) / 2,
      right: (CANVAS - BADGE) / 2,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const fill = Math.round((Math.max(info.width, info.height) / Math.max(original.width, original.height)) * 100);
  return { output, note: `${original.width}x${original.height}, artwork filled ${fill}%, now ${CANVAS}x${CANVAS}` };
}

let downloaded = 0;
let skipped = 0;
let failed = 0;

for (const { file, url } of pairs) {
  try {
    await access(file);
    skipped++;
    continue;
  } catch {
    /* not downloaded yet */
  }
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    let result;
    try {
      result = await normalise(buffer);
    } catch (error) {
      result = { output: buffer, note: `saved as-is (${error.message})` };
    }
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, result.output);
    downloaded++;
    console.log(`[badges] ${path.basename(file)}: ${result.note}`);
  } catch (error) {
    failed++;
    console.warn(`[badges] Couldn't download ${url} (${error.message}). The page will load it from the issuer instead.`);
  }
}

console.log(`[badges] ${downloaded} downloaded, ${skipped} already present, ${failed} failed.`);

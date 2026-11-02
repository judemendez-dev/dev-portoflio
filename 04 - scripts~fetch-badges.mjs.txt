/**
 * Downloads each credential's official badge image into /public so the site
 * serves its own copy instead of loading it from Credly or Microsoft.
 *
 * Runs automatically before `npm run dev` and `npm run build` (see package.json),
 * including on GitHub when the site is published. Files that already exist are
 * left alone, so you can drop in your own image instead.
 *
 * This script never fails the build: if a download doesn't work, it prints a
 * warning and the page falls back to the official image URL.
 */
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const dataFile = path.join(root, "src", "content", "certifications.ts");

const source = await readFile(dataFile, "utf8");
const pairs = [...source.matchAll(/src:\s*"(\/certifications\/[^"]+)",\s*sourceUrl:\s*"([^"]+)"/g)].map((m) => ({
  file: path.join(root, "public", ...m[1].split("/").filter(Boolean)),
  url: m[2],
}));

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
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, buffer);
    downloaded++;
  } catch (error) {
    failed++;
    console.warn(`[badges] Couldn't download ${url} (${error.message}). The page will load it from the issuer instead.`);
  }
}

console.log(`[badges] ${downloaded} downloaded, ${skipped} already present, ${failed} failed.`);

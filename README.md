# judemendez.dev

Personal website of Jude Mendez. Built with Next.js (App Router), TypeScript and Tailwind CSS. Hosted on GitHub Pages, with DNS on Cloudflare.

- No database, no CMS: all content lives in three files in `src/content/`.
- Dark theme by default, a designed light theme, remembered per visitor.
- Command menu (`Ctrl K` / `⌘K`), filterable projects, a page per project.
- SEO built in: per-page titles and descriptions, canonical URLs, Open Graph images, sitemap, robots.txt, structured data, icons.
- No animation or icon libraries. Motion is CSS and switches off for people who prefer reduced motion.

---

## 1. Run it on your computer (Windows)

You only need to do the first step once.

1. Install **Node.js LTS** (version 20.9 or newer) from <https://nodejs.org>. Accept the defaults.
2. Unzip this project somewhere easy, e.g. `C:\Users\you\Projects\judemendez-dev`.
3. Open **PowerShell** in that folder (in File Explorer, click the address bar, type `powershell`, press Enter).
4. Install the dependencies:

   ```powershell
   npm install
   ```

5. Start the development server:

   ```powershell
   npm run dev
   ```

6. Open <http://localhost:3000>. Edits to any file show up instantly.

Before deploying, check that the production build works:

```powershell
npm run build
npx serve out
```

`npm run build` type-checks the whole project and writes the finished site to the `out/` folder. If it passes on your computer, it will pass on GitHub too. `npx serve out` lets you click around that finished version at the address it prints.

> **Dashed yellow "Needs your input" boxes** appear only when you run `npm run dev`. They point at the exact file to edit. They never show on the live site — unfinished sections are simply hidden there.

---

## 2. Where everything lives

```
src/
  content/              ← the only folder you normally edit
    site.ts             name, links (LinkedIn, GitHub, email), profile photo
    projects.ts         every project — add, remove, reorder here
    experience.ts       career timeline and skills
  app/                  pages (one folder per URL)
    page.tsx            homepage
    projects/page.tsx   /projects
    projects/[slug]/    /projects/<slug> — generated for every project
    about/ experience/ contact/
    globals.css         colours, type scale and animations (design tokens)
    sitemap.ts robots.ts manifest.ts icon.svg apple-icon.png
public/og/               share images (shown when a page is posted on LinkedIn etc.)
  components/           reusable pieces (header, cards, command menu…)
  lib/                  small helpers (SEO, theme, navigation)
public/                 images you add (screenshots, profile photo)
```

---

## 3. Things that need your input

Search the project for `TODO (your input)` to find them all.

| What | Where |
| --- | --- |
| LinkedIn URL, GitHub URL, email address | `src/content/site.ts` → `links` |
| Profile photo | put it in `public/`, then set `photo` in `src/content/site.ts` |
| Routely: status, tech stack, why/challenges/lessons | `src/content/projects.ts` |
| Optitune: challenges/lessons. **Review the feature list** before publishing — it's based on how you've described the extension, so remove anything you'd rather not share publicly | `src/content/projects.ts` |
| Steady Tracker: status, live URL (if any), why/challenges/lessons | `src/content/projects.ts` |
| Screenshots for each project | `public/projects/<slug>/…`, then `cover` / `screenshots` in `projects.ts` |
| Start month for the Star Systems Engineer role (optional) | `src/content/experience.ts` |
| Any scripting tools you'd like listed under skills | `src/content/experience.ts` |

Nothing on the site was invented: there are no fake screenshots, URLs, repos or stats. Where something is missing, the site shows a clearly labelled placeholder ("Screenshot coming soon", "Photo coming soon") or hides the section.

---

## 4. Adding a project

Open `src/content/projects.ts`, copy one of the project objects, paste it into the list and edit it:

```ts
{
  slug: "my-new-app",                 // becomes /projects/my-new-app
  name: "My New App",
  description: "One or two sentences for the card.",
  categoryLabel: "Automation / CLI Tool",
  categories: ["automation"],         // filters: web-apps, enterprise-it, automation, experiments
  status: "Live",                     // "Live" | "In Development" | "Archived"
  stack: ["PowerShell", "Microsoft Graph"],
  featured: true,                     // also show on the homepage
  hue: 280,                           // 0–360, tints the placeholder preview
  url: "https://example.com",         // optional
  github: "https://github.com/…",     // optional
  overview: ["A paragraph.", "Another paragraph."],
  why: ["…"],
  problem: ["…"],
  features: ["One feature", "Another feature"],
  challenges: ["…"],
  lessons: ["…"],
},
```

That's it. The card, the project page, the filter counts, the sitemap entry, the command-menu entry and the social image are all generated from that object.

- **Reorder:** move objects up or down in the list.
- **Hide without deleting:** add `hidden: true`.
- **Add screenshots:** save images in `public/projects/my-new-app/`, then:

  ```ts
  cover: { src: "/projects/my-new-app/home.png", alt: "The dashboard showing this week's progress", width: 1600, height: 1000 },
  screenshots: [
    { src: "/projects/my-new-app/settings.png", alt: "Settings screen", width: 1600, height: 1000, caption: "Settings" },
  ],
  ```

  GitHub Pages serves images exactly as you save them, so export screenshots at a sensible size (around 1600px wide, PNG or WebP).

- **New filter category:** add it to `categories` at the top of the file.

---

## 5. Publish on GitHub Pages with Cloudflare DNS

How it works: you push code to GitHub → a GitHub Action builds the site (`.github/workflows/deploy.yml`) → GitHub Pages hosts the result → Cloudflare points judemendez.dev at it.

### Step 1 — Put the code on GitHub

1. Create a free account at <https://github.com> if you don't have one.
2. Install **GitHub Desktop** (<https://desktop.github.com>).
3. Run `npm install` once (if you haven't already) so `package-lock.json` exists. It should be committed along with everything else.
4. In GitHub Desktop: *File → Add local repository* → choose the project folder → *create a repository* → *Publish repository*.
   - **Untick "Keep this code private"** if you're on GitHub's free plan. Free accounts can only use GitHub Pages with public repositories. (GitHub Pro allows it from private ones.)

### Step 2 — Turn on GitHub Pages

1. On github.com, open the repository → *Settings → Pages*.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open the *Actions* tab. The "Deploy to GitHub Pages" run should start by itself (if not, open it and click *Run workflow*). After a couple of minutes it turns green and the site is live at `https://<your-username>.github.io/<repo-name>/`.
   - That temporary address will look unstyled, because the site expects to live at the root of a domain. It will look right once judemendez.dev is connected.

### Step 3 — Verify the domain with GitHub (prevents domain takeover)

1. Click your profile picture → *Settings → Pages* (your **account** settings, not the repo's) → *Add a domain* → enter `judemendez.dev`.
2. GitHub shows a **TXT** record. In Cloudflare: *judemendez.dev → DNS → Records → Add record*, and add it exactly as shown.
3. Back in GitHub, click *Verify*.

### Step 4 — Connect the domain

1. In the repository: *Settings → Pages → Custom domain* → enter `judemendez.dev` → *Save*. (You don't need a CNAME file; the Actions workflow handles it.)
2. In Cloudflare *DNS → Records*, delete any old A, AAAA or CNAME records for `judemendez.dev` and `www`, then add these. Set the proxy status to **DNS only (grey cloud)** for now:

   | Type | Name | Content |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `<your-username>.github.io` |

3. Wait until GitHub's Pages settings say the DNS check succeeded, then tick **Enforce HTTPS**. The certificate can take anywhere from a few minutes to 24 hours.
   - `.dev` domains only work over HTTPS, so **the site won't load in browsers until this certificate exists**. That's normal; just wait.
   - GitHub redirects `www.judemendez.dev` to `judemendez.dev` automatically.

### Step 5 (optional) — Turn on Cloudflare's proxy

Only after HTTPS is working on GitHub:

1. Cloudflare → *SSL/TLS → Overview* → set the mode to **Full (strict)**. (Don't use "Flexible", which causes redirect loops.)
2. Switch the A, AAAA and CNAME records to **Proxied (orange cloud)**.

This adds Cloudflare's caching and lets you add security headers under *Rules → Transform Rules → Modify Response Header*. If anything breaks, switch the records back to grey; the site keeps working without the proxy.

### Updating the site

Edit files → commit and *Push origin* in GitHub Desktop → the site rebuilds and goes live in about two minutes. If a build fails, the *Actions* tab shows the error, and the live site stays on the last working version.

### After going live

- Check a social preview with LinkedIn's Post Inspector (<https://www.linkedin.com/post-inspector/>).
- Optionally add the site to Google Search Console and submit `https://judemendez.dev/sitemap.xml`.

---

## 6. Changing the look

- **Colours:** the token block at the top of `src/app/globals.css`. Dark values are under `:root`, light values under `:root[data-theme="light"]`.
- **Type sizes:** `--text-display`, `--text-title`, `--text-heading`, `--text-tagline`, `--text-lede` in the same file.
- **Fonts:** Geist and Geist Mono, loaded and self-hosted by `next/font` in `src/app/layout.tsx`.
- **Navigation:** `src/lib/nav.ts`.
- **Icons:** `src/components/icons.tsx`. They're from Lucide (<https://lucide.dev>); copy a new icon's inner SVG into the map to add it.

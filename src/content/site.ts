/**
 * ============================================================
 *  SITE SETTINGS — your name, links and contact details.
 * ============================================================
 *
 *  Anything set to `null` is a placeholder that needs your input.
 *  While it's null, the site simply hides that link in production,
 *  and shows a dashed "needs your input" note when you run it locally
 *  (`npm run dev`), so you can see what's still missing.
 */

export const site = {
  name: "Jude Mendez",
  shortName: "Jude",
  monogram: "JM",
  domain: "judemendez.dev",
  url: "https://judemendez.dev",
  location: "Sydney, Australia",
  timeZone: "Australia/Sydney",

  /** One-line description used for search engines and social cards. */
  description:
    "Jude Mendez is a Sydney-based IT professional specialising in enterprise endpoint management and security, who builds apps and experiments with AI-assisted development outside the day job.",

  role: "Microsoft Intune Administrator - Asia Pacific",
  employer: "Deloitte",

  /**
   * TODO (your input): add your contact details.
   * Use full URLs for LinkedIn and GitHub, e.g.
   *   linkedin: "https://www.linkedin.com/in/your-handle"
   *   github:   "https://github.com/your-handle"
   *   email:    "you@example.com"
   */
  links: {
    linkedin: null as string | null,
    github: null as string | null,
    email: null as string | null,
  },

  /**
   * TODO (your input): profile photo for the About page.
   * Put a square image in /public (e.g. /public/jude.jpg) and set:
   *   photo: { src: "/jude.jpg", alt: "Jude Mendez" }
   */
  photo: null as { src: string; alt: string } | null,
} as const;

export type SocialKey = keyof typeof site.links;

/** True while running `npm run dev`. Used to show input placeholders. */
export const isDev = process.env.NODE_ENV !== "production";

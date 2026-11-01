/**
 * ============================================================
 *  SITE SETTINGS — your name, links and contact details.
 * ============================================================
 *
 *  Links left as "" (empty quotes) are hidden on the site.
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
   * Your contact details. Type them between the quotes only.
   *   linkedin: full profile URL, e.g. "https://www.linkedin.com/in/your-handle"
   *   email:    just the address, e.g. "you@example.com"
   */
  links: {
    linkedin: "https://www.linkedin.com/in/jude-mendez/" as string | null, // ← your LinkedIn URL goes between the quotes
    github: "https://github.com/judemendez-dev" as string | null,
    email: "jude.mendez@outlook.com" as string | null, // ← your email address goes between the quotes
  },

  /** Profile photo for the About page (file lives in /public). */
  photo: {
    src: "/jude-mendez.jpg",
    alt: "Black-and-white portrait of Jude Mendez in a suit and bow tie, looking to the right in front of a brick wall",
  } as { src: string; alt: string } | null,
} as const;

export type SocialKey = keyof typeof site.links;

/** True while running `npm run dev`. Used to show input placeholders. */
export const isDev = process.env.NODE_ENV !== "production";

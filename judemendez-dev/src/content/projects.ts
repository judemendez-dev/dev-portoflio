/**
 * ============================================================
 *  PROJECTS — the only file you edit to add, remove or reorder
 *  projects. Each project automatically gets:
 *    • a card on /projects (and on the homepage if `featured`)
 *    • its own page at /projects/<slug>
 *    • an entry in the sitemap, command palette and social card
 * ============================================================
 *
 *  To ADD a project: copy one of the objects below, paste it into
 *  the list, give it a unique `slug`, and fill in the fields.
 *  To REORDER: move the objects. The order here is the order shown.
 *  To REMOVE: delete the object (or set `hidden: true` to keep it
 *  in the file but off the site).
 *
 *  Fields marked "optional" can be left out entirely. Sections with
 *  no content are hidden on the project page rather than padded out.
 *
 *  IMPORTANT: everything here is shown publicly. Placeholders are
 *  marked with `TODO (your input)` comments.
 */

/** Filters shown on the Projects page, in this order. */
export const categories = [
  { id: "web-apps", label: "Web Apps" },
  { id: "enterprise-it", label: "Enterprise IT" },
  { id: "automation", label: "Automation" },
  { id: "experiments", label: "Experiments" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type ProjectStatus = "Live" | "In Development" | "Archived";

export type ProjectImage = {
  /** Path to an image in /public, e.g. "/projects/routely/home.png" */
  src: string;
  /** Describe what the screenshot shows, for screen reader users. */
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Project = {
  /** URL-friendly id, used for the page address: /projects/<slug> */
  slug: string;
  name: string;
  /** One or two sentences for cards. */
  description: string;
  /** Human-readable category shown on the card, e.g. "Navigation / Web Application" */
  categoryLabel: string;
  /** Which filters this project appears under. */
  categories: CategoryId[];
  status: ProjectStatus;
  stack: string[];
  /** Shown in the "Selected projects" section on the homepage. */
  featured?: boolean;
  hidden?: boolean;
  /** A hue (0–360) that tints this project's placeholder preview. */
  hue: number;

  /** Live website. Leave out if there isn't one. */
  url?: string;
  /** Public source code. Leave out if it's private or doesn't exist. */
  github?: string;

  /** Card / social preview image. Leave out to use the designed placeholder. */
  cover?: ProjectImage;
  screenshots?: ProjectImage[];

  /** Project page sections. Leave any out to hide that section. */
  overview?: string[];
  why?: string[];
  problem?: string[];
  features?: string[];
  challenges?: string[];
  lessons?: string[];
};

const allProjects: Project[] = [
  {
    slug: "routely",
    name: "Routely",
    description:
      "A navigation app concept built around the needs of heavy vehicle drivers, with route planning, navigation and vehicle-aware travel considerations.",
    categoryLabel: "Navigation / Web Application",
    categories: ["web-apps"],
    // TODO (your input): confirm the status. "Live", "In Development" or "Archived".
    status: "In Development",
    // TODO (your input): add the technologies Routely is built with.
    stack: [],
    featured: true,
    hue: 152,
    cover: { src: "/projects/routely/cover.webp", alt: "Routely preview: a route plotted on a dark map with heavy vehicle compliance, bridge and weight, and route restriction checks marked as passed", width: 1600, height: 1000 },
    url: "https://routely.com.au",
    // github: "TODO (your input): add if the repo is public",
    overview: [
      "Routely is a navigation application concept designed around the needs of heavy vehicle drivers. It brings route planning and navigation together with vehicle-aware travel considerations, so the route makes sense for the vehicle actually being driven.",
    ],
    problem: [
      "Most navigation apps are built for cars. Heavy vehicle drivers have a different set of considerations when planning a trip, and Routely is an exploration of what navigation looks like when it starts from those needs instead.",
    ],
    features: ["Route planning", "Turn-by-turn navigation", "Vehicle-aware travel considerations"],
    // TODO (your input): why you built it, challenges and lessons learned.
    // why: ["..."],
    // challenges: ["..."],
    // lessons: ["..."],
  },
  {
    slug: "optitune",
    name: "Optitune",
    description:
      "Optitune bridges the gap between Microsoft's existing capabilities and the everyday needs of Intune administrators through smarter workflows, automation, and practical quality-of-life improvements.",
    categoryLabel: "Enterprise IT / Browser Extension",
    categories: ["enterprise-it"],
    status: "In Development",
    // TODO (your input): confirm or adjust the stack.
    stack: ["Browser extension", "Microsoft Graph"],
    featured: true,
    hue: 228,
    cover: { src: "/projects/optitune/cover.webp", alt: "Optitune preview: a Microsoft Intune admin view with device, sync and security items marked as healthy", width: 1600, height: 1000 },
    overview: [
      "Optitune is a browser extension that works alongside the Microsoft Intune and Entra admin portals rather than replacing them. The aim is to make the things admins do every day quicker to see and quicker to act on.",
    ],
    why: [
      "A lot of Intune administration is clicking between blades to answer simple questions. Optitune started as a way to answer those questions in one place, from inside the browser I already work in.",
    ],
    // REVIEW before publishing: these come from how you've described the
    // extension. Remove anything you'd rather not share publicly.
    features: [
      "Device-to-policy view: see the configuration, compliance and app protection policies assigned to a device",
      "Group-to-policy view: see which policies are assigned to a group",
      "Support ticket assistance for common admin requests",
      "Read-only Microsoft Graph access using the signed-in admin's own permissions",
      "Runs entirely in the browser with no backend",
    ],
    // TODO (your input): challenges and lessons learned.
  },
  {
    slug: "steady-tracker",
    name: "Steady Tracker",
    description:
      "A personal habit tracker that focuses on identifying repeated behaviours and triggers, and helps set you up for success.",
    categoryLabel: "Productivity / Web Application",
    categories: ["web-apps"],
    // TODO (your input): confirm the status.
    status: "In Development",
    stack: ["Next.js", "Supabase", "Tailwind CSS"],
    featured: true,
    hue: 32,
    cover: { src: "/projects/steady-tracker/cover.webp", alt: "Steady Tracker preview: a 14-day streak, a progress chart and a weekly grid of habits", width: 1600, height: 1000 },
    // url: "TODO (your input): add if it's deployed",
    overview: [
      "Steady Tracker is a personal habit tracker built with Next.js, Supabase and Tailwind CSS. Rather than just ticking off days, it focuses on identifying repeated behaviours and the triggers behind them, so you can set yourself up for success.",
    ],
    features: ["Identifying repeated behaviours", "Spotting the triggers behind them", "Progress tracking and accountability"],
    // TODO (your input): why you built it, challenges and lessons learned.
  },
];

export const projects = allProjects.filter((p) => !p.hidden);

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function categoryLabel(id: CategoryId) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

/**
 * ============================================================
 *  EXPERIENCE & SKILLS
 * ============================================================
 *  Roles are grouped by company, newest first. Within a company,
 *  list roles newest first too. The timeline on /experience is
 *  generated from this file.
 */

export type Role = {
  title: string;
  /** Free text so you control exactly how dates read. */
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  focus: string[];
};

export type Company = {
  company: string;
  location?: string;
  roles: Role[];
};

export const experience: Company[] = [
  {
    company: "Deloitte",
    location: "Sydney",
    roles: [
      {
        title: "Intune Administrator",
        start: "Mar 2025",
        end: "Present",
        current: true,
        summary:
          "Supporting enterprise endpoint management and security across the Asia-Pacific region, with experience contributing to global Microsoft Defender initiatives.",
        focus: [
          "Microsoft Intune administration",
          "Endpoint security and Microsoft Defender",
          "Device compliance and Conditional Access",
          "Supporting technology operations across multiple regions",
        ],
      },
    ],
  },
  {
    company: "The Star Entertainment Group",
    location: "Sydney",
    roles: [
      {
        title: "Systems Engineer",
        // TODO (your input): add the start month if you'd like, e.g. "Jul 2022".
        start: "2022",
        end: "Feb 2025",
        summary:
          "Worked across enterprise device management, Windows Autopilot, Microsoft Intune and infrastructure, contributing to large-scale endpoint projects including migrations involving thousands of devices.",
        focus: [
          "Enterprise device management",
          "Windows Autopilot",
          "Microsoft Intune",
          "Infrastructure",
          "Large-scale endpoint migrations",
        ],
      },
      {
        title: "Trainee Systems Engineer",
        start: "Mar 2021",
        end: "Jun 2022",
        summary:
          "Built a foundation in enterprise IT, supporting end-user technologies and infrastructure.",
        focus: ["End-user technologies", "Infrastructure support"],
      },
    ],
  },
];

export type SkillGroup = { name: string; blurb: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    name: "Endpoint Management",
    blurb: "Getting devices enrolled, configured and kept healthy at scale.",
    skills: [
      "Microsoft Intune",
      "SCCM / MECM",
      "Windows Autopilot",
      "Mobile Device Management (MDM)",
      "Mobile Application Management (MAM)",
    ],
  },
  {
    name: "Identity & Security",
    blurb: "Making sure the right people reach the right things from healthy devices.",
    skills: ["Microsoft Entra ID", "Conditional Access", "Device compliance", "Microsoft Defender"],
  },
  {
    name: "Infrastructure & Automation",
    blurb: "Less clicking, more repeatable work.",
    // TODO (your input): add scripting languages or tools you use day to day.
    skills: ["Microsoft Graph", "Graph-based automation", "Enterprise infrastructure", "IT operations"],
  },
  {
    name: "Development & Tools",
    blurb: "What I reach for when I'm building something of my own.",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Browser extensions",
      "AI-assisted development",
    ],
  },
];

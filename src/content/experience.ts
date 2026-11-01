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
        title: "Microsoft Intune Administrator - Asia Pacific",
        start: "Mar 2025",
        end: "Present",
        current: true,
        summary:
          "Responsible for managing Microsoft Intune and endpoint security across a global enterprise environment, with a primary focus on the Asia-Pacific region. My work includes implementing role-based access controls at a global scale, collaborating with security teams to develop and deploy endpoint security policies, and conducting proof-of-concept testing to evaluate new technologies. I've also led the implementation and rollout of Microsoft Intune Remote Help to member firms worldwide, helping improve remote support capabilities across the organisation.",
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
        title: "End User Technologies Engineer",
        // TODO (your input): add the start month if you'd like, e.g. "Jul 2022".
        start: "2022",
        end: "Feb 2025",
        summary:
          "Served as the Subject Matter Expert (SME) for Mobile Device Management, leading the migration of over 10,000 devices from a legacy MDM platform to Microsoft Intune across Sydney, Brisbane and the Gold Coast. Played a key role in modernising enterprise endpoint infrastructure through SCCM and Intune integration, Windows Autopilot deployments and device management improvements. Provided technical leadership to field services teams across all three properties, delivering scalable solutions that improved endpoint provisioning, management and security.",
        focus: [
          "Enterprise device management",
          "Windows Autopilot",
          "Microsoft Intune",
          "Infrastructure",
          "Large-scale endpoint migrations",
        ],
      },
      {
        title: "End User Technologies Trainee",
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
    blurb: "Deploying, configuring and managing enterprise devices at scale.",
    skills: [
      "Microsoft Intune",
      "Microsoft Configuration Manager (SCCM / MECM)",
      "Windows Autopilot",
      "Mobile Device Management (MDM)",
      "Mobile Application Management (MAM)",
      "Apple Business Manager",
      "Android Enterprise",
      "Endpoint Configuration & Compliance",
    ],
  },
  {
    name: "Identity & Security",
    blurb: "Managing identity, access and endpoint protection across enterprise environments.",
    skills: [
      "Microsoft Entra ID",
      "Microsoft Defender for Endpoint",
      "Conditional Access",
      "Role-Based Access Control (RBAC)",
      "Identity & Access Management (IAM)",
      "Endpoint Security Policies",
      "Device Compliance",
    ],
  },
  {
    name: "Infrastructure & Automation",
    blurb: "Supporting enterprise infrastructure, system integration and operational efficiency.",
    skills: [
      "Microsoft Graph API",
      "Active Directory",
      "Group Policy",
      "PowerShell",
      "Public Key Infrastructure (PKI)",
      "Certificate Management",
      "Enterprise IT Operations",
    ],
  },
  {
    name: "Development & Tools",
    blurb: "Exploring modern development technologies to build practical applications and solutions.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Browser Extension Development",
      "AI-Assisted Development",
    ],
  },
];

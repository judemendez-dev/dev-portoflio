/**
 * ============================================================
 *  CERTIFICATIONS & CREDENTIALS — the only file you edit to add,
 *  remove or reorder credentials on /certifications.
 * ============================================================
 *
 *  Every value below was checked against the credential's own
 *  verification page (Credly, Skilljar, Microsoft Learn) on 2 Nov 2026.
 *  Dates are shown as the month issued. Only add an expiry date if the
 *  issuer actually lists one.
 *
 *  To ADD a credential: copy an entry, give it a unique `id`, fill in the
 *  fields, and set `order` (lower numbers appear first).
 *
 *  BADGE IMAGES
 *  `src` is where the image lives on your site (inside /public).
 *  `sourceUrl` is the official image on the issuer's site.
 *  Before every build, scripts/fetch-badges.mjs downloads each `sourceUrl`
 *  into `src`, so the site serves its own copy. If that download ever
 *  fails, the page falls back to `sourceUrl`, so a badge never goes blank.
 *  Keep `src` and `sourceUrl` next to each other, in that order.
 */

export type CredentialType = "Certification" | "Applied skill" | "Course completion";

export type Credential = {
  /** Unique, URL-friendly id. */
  id: string;
  name: string;
  issuer: string;
  type: CredentialType;
  /** "YYYY-MM" (month issued) or "YYYY-MM-DD". Leave out if not verified. */
  issued?: string;
  /** Only if the issuer lists one. Same format as `issued`. */
  expires?: string;
  /** The original credential page. Always kept. */
  verifyUrl: string;
  /** Where the credential is verified, shown on the link. */
  verifiedOn: string;
  /**
   * Leave out if the credential has no badge artwork.
   * `sourceUrl` is optional: leave it out for an image you've added to /public yourself.
   */
  image?: { src: string; sourceUrl?: string; alt: string };
  /** Lower numbers appear first. */
  order: number;
  /** Hidden from the live site (e.g. while details are still being confirmed). */
  hidden?: boolean;
};

const allCredentials: Credential[] = [
  {
    id: "applied-skills-entra",
    name: "Microsoft Applied Skills: Get started with identities and access using Microsoft Entra",
    issuer: "Microsoft",
    type: "Applied skill",
    issued: "2025-08",
    verifyUrl: "https://learn.microsoft.com/en-au/users/judemendez-9422/credentials/751e71fee3ce8c06",
    verifiedOn: "Microsoft Learn",
    image: {
      src: "/certifications/applied-skills-entra.png",
      sourceUrl: "https://learn.microsoft.com/en-us/media/learn/credential/badges/applied-skill.png",
      alt: "Microsoft Applied Skills badge",
    },
    order: 1,
  },
  {
    id: "azure-fundamentals",
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    type: "Certification",
    issued: "2022-05",
    verifyUrl: "https://www.credly.com/badges/15abf827-9551-4b90-a3d5-9431facab758",
    verifiedOn: "Credly",
    image: {
      src: "/certifications/azure-fundamentals.png",
      sourceUrl: "https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/linkedin_thumb_image.png",
      alt: "Microsoft Certified: Azure Fundamentals badge",
    },
    order: 2,
  },
  {
    id: "mta-security-fundamentals",
    name: "MTA: Security Fundamentals - Certified 2022",
    issuer: "Microsoft",
    type: "Certification",
    issued: "2022-05",
    verifyUrl: "https://www.credly.com/badges/80476aa2-15cf-415f-943a-b9a0119edfea",
    verifiedOn: "Credly",
    image: {
      src: "/certifications/mta-security-fundamentals.png",
      sourceUrl: "https://images.credly.com/images/84dbce61-35f9-4c8b-8305-1c51daaf9155/linkedin_thumb_image.png",
      alt: "MTA: Security Fundamentals badge",
    },
    order: 3,
  },
  {
    id: "mta-windows-server-administration",
    name: "MTA: Windows Server Administration Fundamentals - Certified 2022",
    issuer: "Microsoft",
    type: "Certification",
    issued: "2022-04",
    verifyUrl: "https://www.credly.com/badges/3fd70c97-ec6b-478e-8366-a701a7d5b828",
    verifiedOn: "Credly",
    image: {
      src: "/certifications/mta-windows-server-administration.png",
      sourceUrl: "https://images.credly.com/images/89ec87af-6713-4de0-aa12-81f4037cbf09/linkedin_thumb_image.png",
      alt: "MTA: Windows Server Administration Fundamentals badge",
    },
    order: 4,
  },
  {
    id: "mta-networking-fundamentals",
    name: "MTA: Networking Fundamentals - Certified 2022",
    issuer: "Microsoft",
    type: "Certification",
    issued: "2022-05",
    verifyUrl: "https://www.credly.com/badges/79386572-f084-44f2-a649-5d6ad39403e0",
    verifiedOn: "Credly",
    image: {
      src: "/certifications/mta-networking-fundamentals.png",
      sourceUrl: "https://images.credly.com/images/550245bc-8e3c-4243-90bb-d518764b7f5d/linkedin_thumb_image.png",
      alt: "MTA: Networking Fundamentals badge",
    },
    order: 5,
  },
  {
    id: "mta-windows-os-fundamentals",
    name: "MTA: Windows Operating System Fundamentals - Certified 2021",
    issuer: "Microsoft",
    type: "Certification",
    issued: "2021-10",
    verifyUrl: "https://www.credly.com/badges/e5ddf257-0855-4eeb-87a3-733a4cd0a321",
    verifiedOn: "Credly",
    image: {
      src: "/certifications/mta-windows-os-fundamentals.png",
      sourceUrl:
        "https://images.credly.com/images/e053125b-ff30-4a16-90cc-8804a306c4b6/linkedin_thumb_MTA-Windows_Operating_System_Fundamentals-600x600.png",
      alt: "MTA: Windows Operating System Fundamentals badge",
    },
    order: 6,
  },
  {
    id: "zscaler-data-security",
    name: "Data Security (EDU-220) Test",
    issuer: "Zscaler Cyber Academy",
    type: "Course completion",
    issued: "2024-07-31",
    verifyUrl: "https://verify.skilljar.com/c/8b2vz87yij7d",
    verifiedOn: "Skilljar",
    // Zscaler doesn't issue badge artwork for this course. This image was made from the Zscaler logo
    // (supplied by Jude) and labelled EDU-220, so it has no official sourceUrl.
    image: {
      src: "/certifications/zscaler-data-security.png",
      alt: "Zscaler logo with the label EDU-220 Data Security",
    },
    order: 7,
  },
  {
    id: "mos-associate-2019",
    name: "Microsoft Office Specialist: Associate (Office 2019)",
    issuer: "Microsoft",
    type: "Certification",
    issued: "2021-09",
    verifyUrl: "https://www.credly.com/badges/67de0c7e-ab95-4868-8c38-c35a11c7f1b4",
    verifiedOn: "Credly",
    image: {
      src: "/certifications/mos-associate-2019.png",
      sourceUrl:
        "https://images.credly.com/images/7fab944f-0d46-4cda-afb6-39307e2432a9/linkedin_thumb_MOS_-_Office_Specialist_Associate-600x600.png",
      alt: "Microsoft Office Specialist: Associate badge",
    },
    order: 8,
  },
  {
    id: "mos-excel-2019",
    name: "Microsoft Office Specialist: Excel Associate (Office 2019)",
    issuer: "Microsoft",
    type: "Certification",
    issued: "2021-08",
    verifyUrl: "https://www.credly.com/badges/d2b93869-7e6a-44df-8b71-d27ddb0f161c",
    verifiedOn: "Credly",
    image: {
      src: "/certifications/mos-excel-2019.png",
      sourceUrl: "https://images.credly.com/images/9d2bcbe6-519f-4ed0-ad34-aca077421568/linkedin_thumb_MOS_Excel.png",
      alt: "Microsoft Office Specialist: Excel Associate badge",
    },
    order: 9,
  },
  {
    id: "mos-powerpoint-2019",
    name: "Microsoft Office Specialist: PowerPoint Associate (Office 2019)",
    issuer: "Microsoft",
    type: "Certification",
    issued: "2021-09",
    verifyUrl: "https://www.credly.com/badges/86fa05ad-2030-4985-aade-30b51304f43a",
    verifiedOn: "Credly",
    image: {
      src: "/certifications/mos-powerpoint-2019.png",
      sourceUrl:
        "https://images.credly.com/images/ccfeac51-f472-404a-abf1-97ed89dda03b/linkedin_thumb_MOS_PowerPoint.png",
      alt: "Microsoft Office Specialist: PowerPoint Associate badge",
    },
    order: 10,
  },
  {
    id: "mos-word-2019",
    name: "Microsoft Office Specialist: Word Associate (Office 2019)",
    issuer: "Microsoft",
    type: "Certification",
    issued: "2021-07",
    verifyUrl: "https://www.credly.com/badges/819a3d90-e42a-4341-8db8-5bbcc79e09f3",
    verifiedOn: "Credly",
    image: {
      src: "/certifications/mos-word-2019.png",
      sourceUrl: "https://images.credly.com/images/b9912ce7-7c17-40bc-afbb-ca4251ea1416/linkedin_thumb_MOS_Word.png",
      alt: "Microsoft Office Specialist: Word Associate badge",
    },
    order: 11,
  },
  {
    id: "coursera",
    // TODO (your input): Coursera blocks automated checks, so these details couldn't be verified.
    // Open the link below, then fill in `name`, `issuer` (the university or company that offers the
    // course), `type` and `issued`, and delete the `hidden: true` line to show it on the site.
    name: "Coursera credential",
    issuer: "Coursera",
    type: "Course completion",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/1J7IIGYYYFVT",
    verifiedOn: "Coursera",
    order: 12,
    hidden: true,
  },
];

export const credentials = allCredentials.filter((c) => !c.hidden).sort((a, b) => a.order - b.order);

/** Credentials still waiting on details, listed in a dev-only note on the page. */
export const pendingCredentials = allCredentials.filter((c) => c.hidden || !c.issued);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2022-05" → "May 2022"; "2024-07-31" → "31 Jul 2024". */
export function formatCredentialDate(value: string, { short = false } = {}) {
  const [y, m, d] = value.split("-");
  const month = months[Number(m) - 1] ?? "";
  if (d && !short) return `${Number(d)} ${month} ${y}`;
  return `${month} ${y}`;
}

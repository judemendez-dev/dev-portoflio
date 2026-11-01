import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title?: string;
  description?: string;
  /** Path of the page, e.g. "/about". Used for the canonical URL. */
  path: string;
  /** Social preview image shown when the page is shared. Defaults to the homepage card. */
  image?: SocialImage;
};

export type SocialImage = { url: string; width: number; height: number; alt: string };

/** Ready-made 1200×630 share cards in /public/og (regenerate them if you change page titles). */
export const socialImages = {
  home: { url: "/og/home.png", width: 1200, height: 630, alt: "Jude Mendez — IT professional by day, building things by curiosity" },
  projects: { url: "/og/projects.png", width: 1200, height: 630, alt: "Projects by Jude Mendez" },
  about: { url: "/og/about.png", width: 1200, height: 630, alt: "About Jude Mendez" },
  experience: { url: "/og/experience.png", width: 1200, height: 630, alt: "Jude Mendez's professional experience" },
  contact: { url: "/og/contact.png", width: 1200, height: 630, alt: "Contact Jude Mendez" },
} satisfies Record<string, SocialImage>;

/**
 * Builds consistent metadata for a page: title, description,
 * canonical URL, Open Graph and Twitter card tags.
 * Share images are ready-made PNGs in /public/og; project pages use their cover image.
 */
export function createMetadata({ title, description = site.description, path, image = socialImages.home }: PageMeta): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — IT professional and builder`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_AU",
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}

/** Schema.org data describing Jude, used on the home and about pages. */
export function personJsonLd() {
  const sameAs = [site.links.linkedin, site.links.github].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.role,
    worksFor: { "@type": "Organization", name: site.employer },
    address: { "@type": "PostalAddress", addressLocality: "Sydney", addressCountry: "AU" },
    knowsAbout: [
      "Microsoft Intune",
      "Microsoft Entra ID",
      "Endpoint management",
      "Conditional Access",
      "Microsoft Graph",
      "Web development",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

import { ContactLinks } from "@/components/contact-links";
import { Icon } from "@/components/icons";
import { LocalTime } from "@/components/local-time";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/content/site";
import { createMetadata, socialImages } from "@/lib/seo";
import { cssVars } from "@/lib/cn";

export const metadata = createMetadata({
  title: "Contact",
  path: "/contact",
  image: socialImages.contact,
  description: "How to get in touch with Jude Mendez.",
});

export default function ContactPage() {
  return (
    <Container>
      <div className="grid gap-12 lg:min-h-[70vh] lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
        <PageHeader
          title="Get in touch"
          lede="Questions about Intune, one of my projects, or something you're working on? Any of these will reach me."
        >
          <p className="rise mt-8 flex items-center gap-2 text-sm text-ink-faint" style={cssVars({ "--i": 2 })}>
            <Icon name="map-pin" size={14} />
            {site.location}, where it&apos;s currently <LocalTime />
          </p>
        </PageHeader>
        <div className="rise pb-4 lg:py-14" style={cssVars({ "--i": 2 })}>
          <ContactLinks />
        </div>
      </div>
    </Container>
  );
}

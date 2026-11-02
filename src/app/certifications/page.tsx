import { CredentialGallery } from "@/components/credential-gallery";
import { JsonLd } from "@/components/json-ld";
import { Container, NeedsInput, PageHeader } from "@/components/ui";
import { credentials, pendingCredentials } from "@/content/certifications";
import { site } from "@/content/site";
import { createMetadata, socialImages } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Certifications & Credentials",
  path: "/certifications",
  image: socialImages.certifications,
  description:
    "Professional certifications and credentials held by Jude Mendez across enterprise IT, cloud, security and productivity, each linked to its original verification record.",
});

export default function CertificationsPage() {
  return (
    <Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Certifications & Credentials of ${site.name}`,
          url: `${site.url}/certifications`,
          itemListElement: credentials.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "EducationalOccupationalCredential",
              name: c.name,
              credentialCategory: c.type,
              recognizedBy: { "@type": "Organization", name: c.issuer },
              url: c.verifyUrl,
            },
          })),
        }}
      />

      <PageHeader
        title="Certifications & Credentials"
        lede="A collection of professional certifications and credentials reflecting my ongoing development across enterprise IT, cloud technologies, security and beyond."
      />

      {pendingCredentials.length > 0 && (
        <NeedsInput file="src/content/certifications.ts" className="mb-8">
          {pendingCredentials.map((c) => (c.hidden ? `${c.name} (hidden until confirmed)` : `${c.name} (earned date)`)).join("; ")}{" "}
          still need details.
        </NeedsInput>
      )}

      <CredentialGallery credentials={credentials} />

      <p className="mt-12 max-w-xl text-sm leading-relaxed text-ink-faint">
        Online credentials link to their original record on Credly, Microsoft Learn or Skilljar, so they can be checked
        independently.
      </p>
    </Container>
  );
}

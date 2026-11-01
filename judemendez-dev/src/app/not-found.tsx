import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] content-center py-24">
      <p className="text-sm text-ink-faint">404</p>
      <h1 className="mt-3 text-title font-semibold">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-ink-muted">
        The link might be old, or the address has a typo. Try the projects page, or press Ctrl K / ⌘K to search the site.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" icon="arrow-right">
          Go home
        </ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          See projects
        </ButtonLink>
      </div>
    </Container>
  );
}

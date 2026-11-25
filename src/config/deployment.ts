// Deployment settings, read from environment variables at build time.
// Server only: never import this from a client component.
import "server-only";

function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url =
    explicit ||
    (vercelProduction ? `https://${vercelProduction}` : "") ||
    "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

/** Absolute origin used for canonical URLs, Open Graph, robots and sitemap. */
export const siteUrl = resolveSiteUrl();

/** Search engines may index the site only when SITE_INDEXABLE is exactly "true". */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && new URL(siteUrl).hostname === "localhost") {
  throw new Error(
    "SITE_INDEXABLE is true but the site URL is still localhost. Set SITE_URL to the public domain.",
  );
}

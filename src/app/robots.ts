import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/config/deployment";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Block all crawling until the owner approves launch (SITE_INDEXABLE=true).
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

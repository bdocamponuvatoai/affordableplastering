import type { Metadata } from "next";
import { site } from "@/config/site";
import { heroImage } from "@/content/images";

type PageMetadataInput = {
  /** Full document title (not templated). */
  title: string;
  /** Route path, e.g. "/". Resolved against `metadataBase` for canonical and og:url. */
  path: string;
  description?: string;
  /** Optional social-card copy when it differs from the page title/description. */
  social?: { title?: string; description?: string };
};

export function pageMetadata({
  title,
  path,
  description,
  social,
}: PageMetadataInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: social?.title ?? title,
      description: social?.description ?? description,
      images: [
        {
          url: heroImage.src.src,
          width: heroImage.src.width,
          height: heroImage.src.height,
          alt: heroImage.alt,
        },
      ],
    },
  };
}

"use client";

import type { ReactNode } from "react";
import { useSiteUi } from "@/components/layout/site-ui";

type GalleryCardProps = {
  index: number;
  className: string;
  /** Visible content; it also forms the button's accessible name. */
  children: ReactNode;
};

/** Inspiration card that opens the gallery dialog at its image. */
export function GalleryCard({ index, className, children }: GalleryCardProps) {
  const { openGallery } = useSiteUi();
  return (
    <button
      className={className}
      onClick={(event) => openGallery(event.currentTarget, index)}
      onFocus={(event) => {
        // Firefox leaves a partly visible card where it is on focus, so a tall
        // card can sit half under the floating action bar. Bring the whole
        // card into view (html's scroll-padding keeps it clear of the bar);
        // keyboard focus only, so a click never shifts the page.
        if (event.currentTarget.matches(":focus-visible"))
          event.currentTarget.scrollIntoView({
            block: "nearest",
            inline: "start", // agrees with the carousel's scroll-snap
          });
      }}
    >
      {children}
    </button>
  );
}

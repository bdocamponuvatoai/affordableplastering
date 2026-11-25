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
    >
      {children}
    </button>
  );
}

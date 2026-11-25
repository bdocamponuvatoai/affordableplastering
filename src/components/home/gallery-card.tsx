"use client";

import type { ReactNode } from "react";
import { useSiteUi } from "@/components/layout/site-ui";

type GalleryCardProps = {
  index: number;
  label: string;
  className: string;
  children: ReactNode;
};

/** Inspiration card that opens the gallery dialog at its image. */
export function GalleryCard({
  index,
  label,
  className,
  children,
}: GalleryCardProps) {
  const { openGallery } = useSiteUi();
  return (
    <button
      className={className}
      aria-label={label}
      onClick={(event) => openGallery(event.currentTarget, index)}
    >
      {children}
    </button>
  );
}

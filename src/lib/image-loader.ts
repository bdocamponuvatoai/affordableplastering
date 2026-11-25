"use client";

// Custom next/image loader for the static export. Photos are pre-generated
// at these widths by `npm run images` (scripts/generate-images.mjs) as
// public/images/<name>-<width>.webp. No path aliases here: Node's test runner
// imports this file directly.

export const IMAGE_WIDTHS = [480, 768, 1080, 1536] as const;

const PHOTO = /^\/images\/([\w-]+)\.webp$/;

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const match = PHOTO.exec(src);
  if (!match) return src;
  const size =
    IMAGE_WIDTHS.find((candidate) => candidate >= width) ??
    IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  return `/images/${match[1]}-${size}.webp`;
}

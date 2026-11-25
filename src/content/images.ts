// AI-generated illustrative photographs (see README "Images and fonts"). They
// are not photos of the owner, staff or completed Affordable Plastering
// projects, so keep the alt text describing them as illustrative.
//
// Originals live in assets-src/images/; `npm run images` writes the
// responsive sizes to public/images/, served by src/lib/image-loader.ts.

export type Photo = { src: string; width: number; height: number };
export type SiteImage = Photo & { alt: string };

const photoOf = (name: string): Photo => ({
  src: `/images/${name}.webp`,
  width: 1536,
  height: 1024,
});

export const photo = {
  finishedInterior: photoOf("finished-interior"),
  plasteringDetail: photoOf("plastering-detail"),
  drywallInterior: photoOf("drywall-interior"),
};

export const heroImage: SiteImage = {
  ...photo.finishedInterior,
  alt: "Illustrative interior with smooth plaster walls, oak floors, and natural window light",
};

export const approachImage: SiteImage = {
  ...photo.plasteringDetail,
  alt: "Illustrative craft detail of a finishing trowel and fresh plaster",
};

/** Largest generated size, used for social cards. */
export const socialImage = {
  url: "/images/finished-interior-1536.webp",
  width: 1536,
  height: 1024,
  alt: heroImage.alt,
};

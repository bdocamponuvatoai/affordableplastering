import { photo, type Photo } from "./images";

type GalleryItem = {
  image: Photo;
  /** Alt text of the full-size image in the gallery dialog. */
  dialogAlt: string;
  title: string;
  kicker: string;
  large?: boolean;
};

export const galleryItems: readonly GalleryItem[] = [
  {
    image: photo.finishedInterior,
    dialogAlt:
      "Illustrative living room with smooth plaster walls and natural light",
    title: "The everyday, elevated.",
    kicker: "SMOOTH WALLS & CLEAN LINES",
    large: true,
  },
  {
    image: photo.drywallInterior,
    dialogAlt:
      "Illustrative room renovation showing newly installed drywall and taped seams",
    title: "A fresh foundation.",
    kicker: "DRYWALL & RENOVATION",
  },
];

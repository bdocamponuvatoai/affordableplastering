import { photo, type Photo } from "./images";

type GalleryItem = {
  image: Photo;
  /** Alt text of the full-size image in the gallery dialog. */
  dialogAlt: string;
  title: string;
  kicker: string;
  /**
   * Bento slot on wider screens (see styles/sections/gallery.css): "large"
   * spans the first row on tablets and two thirds of it on desktops; "tall"
   * shares that row on desktops, cropped to the large card's height.
   */
  size?: "large" | "tall";
};

export const galleryItems: readonly GalleryItem[] = [
  {
    image: photo.finishedInterior,
    dialogAlt:
      "Illustrative living room with smooth plaster walls and natural light",
    title: "The everyday, elevated.",
    kicker: "SMOOTH WALLS & CLEAN LINES",
    size: "large",
  },
  {
    image: photo.drywallInterior,
    dialogAlt:
      "Illustrative room renovation showing newly installed drywall and taped seams",
    title: "A fresh foundation.",
    kicker: "DRYWALL & RENOVATION",
    size: "tall",
  },
  {
    image: photo.plasterRepair,
    dialogAlt:
      "Illustrative close view of a craftsperson smoothing a plaster wall repair with a trowel",
    title: "Repairs, made seamless.",
    kicker: "PATCHING & SKIM COATING",
  },
  {
    image: photo.plasterArchway,
    dialogAlt:
      "Illustrative finished plaster archway opening into a softly lit living room",
    title: "Character in every curve.",
    kicker: "ARCHWAYS & DETAIL WORK",
  },
  {
    image: photo.finishedCeiling,
    dialogAlt:
      "Illustrative dining nook with a smooth finished plaster ceiling and clean wall transitions",
    title: "Beautiful, all the way up.",
    kicker: "CEILINGS & SMOOTH FINISHES",
  },
];

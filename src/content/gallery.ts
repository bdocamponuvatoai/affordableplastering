import type { StaticImageData } from "next/image";
import { images } from "./images";

type GalleryItem = {
  image: StaticImageData;
  /** Accessible name of the card button. */
  cardLabel: string;
  cardAlt: string;
  /** Alt text of the full-size image in the gallery dialog. */
  dialogAlt: string;
  title: string;
  kicker: string;
  large?: boolean;
};

export const galleryItems: readonly GalleryItem[] = [
  {
    image: images.finishedInterior,
    cardLabel: "View smooth living space concept",
    cardAlt: "Smooth plaster walls in a light-filled living room concept",
    dialogAlt:
      "Illustrative living room with smooth plaster walls and natural light",
    title: "The everyday, elevated.",
    kicker: "SMOOTH WALLS & CLEAN LINES",
    large: true,
  },
  {
    image: images.drywallInterior,
    cardLabel: "View renovation-ready drywall concept",
    cardAlt: "Clean drywall installation in a bright renovation concept",
    dialogAlt:
      "Illustrative room renovation showing newly installed drywall and taped seams",
    title: "A fresh foundation.",
    kicker: "DRYWALL & RENOVATION",
  },
];

import type { StaticImageData } from "next/image";
import drywallInterior from "@/assets/images/drywall-interior.webp";
import finishedInterior from "@/assets/images/finished-interior.webp";
import plasteringDetail from "@/assets/images/plastering-detail.webp";

// AI-generated illustrative photographs (see README "Images"). They are not
// photos of the owner, staff or completed Affordable Plastering projects, so
// keep the alt text describing them as illustrative.

type SiteImage = { src: StaticImageData; alt: string };

export const heroImage: SiteImage = {
  src: finishedInterior,
  alt: "Illustrative interior with smooth plaster walls, oak floors, and natural window light",
};

export const approachImage: SiteImage = {
  src: plasteringDetail,
  alt: "Illustrative craft detail of a finishing trowel and fresh plaster",
};

export const images = { drywallInterior, finishedInterior, plasteringDetail };

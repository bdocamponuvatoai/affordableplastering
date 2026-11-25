import type { StaticImageData } from "next/image";
import { images } from "./images";

// Service descriptions are proposed marketing copy, written without any
// claims about pricing, guarantees, licences or past projects.

export type ServiceKey = "plaster" | "drywall" | "repairs" | "renovation";

type Service = {
  key: ServiceKey;
  /** Tab label; also the option label in the project planner. */
  label: string;
  /** One-line teaser shown under the active tab. */
  teaser: string;
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  /** Text of the panel button that opens the planner preset to this service. */
  cta: string;
};

export const services: readonly Service[] = [
  {
    key: "plaster",
    label: "Plastering & skim coats",
    teaser: "A smooth, fresh canvas for your room.",
    title: "A finish you can feel good about.",
    description:
      "Explore plastering and skim-coating options for uneven or tired surfaces. The right preparation and finish can give your walls a clean, consistent look.",
    image: images.plasteringDetail,
    alt: "Illustrative close-up of a plastering trowel smoothing a wall",
    cta: "Discuss your plastering project",
  },
  {
    key: "drywall",
    label: "Drywall installation",
    teaser: "The foundation of a well-finished space.",
    title: "Build your room on a good foundation.",
    description:
      "Planning a new space or opening up an existing one? Discuss drywall installation, joint finishing, and the preparation your room needs for its next stage.",
    image: images.drywallInterior,
    alt: "Illustrative newly installed drywall with neat taped joints in a renovation",
    cta: "Discuss your drywall project",
  },
  {
    key: "repairs",
    label: "Wall & ceiling repairs",
    teaser: "Bring tired or damaged surfaces back.",
    title: "Give your walls a fresh start.",
    description:
      "Cracks, holes, and worn surfaces can take attention away from a room. Describe the damage to Dominic and discuss a repair approach suited to the existing wall or ceiling.",
    image: images.plasteringDetail,
    alt: "Illustrative detail of fresh plaster being smoothed across an interior wall",
    cta: "Discuss your repair",
  },
  {
    key: "renovation",
    label: "Renovation finishing",
    teaser: "The finishing touch to your next chapter.",
    title: "Bring the whole room together.",
    description:
      "A renovation deserves a thoughtful finish. Discuss your walls, ceilings, transitions, and the surface preparation needed to move your space toward completion.",
    image: images.finishedInterior,
    alt: "Illustrative completed room with smooth walls and crisp ceiling transitions",
    cta: "Discuss your renovation",
  },
];

/** Planner "What can we help with?" options: every service plus "not sure". */
export const plannerServiceOptions: readonly {
  value: string;
  label: string;
}[] = [
  ...services.map((s) => ({ value: s.key, label: s.label })),
  { value: "unsure", label: "I’m not sure yet" },
];

export const plannerTimingOptions: readonly string[] = [
  "Flexible / just exploring",
  "As soon as possible",
  "Within the next month",
  "In the next 2–3 months",
];

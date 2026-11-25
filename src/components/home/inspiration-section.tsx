import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { Icon } from "@/components/ui/icon";
import { galleryItems } from "@/content/gallery";
import { GalleryCard } from "./gallery-card";

/**
 * Width each card's cover crop needs (styles/sections/gallery.css; the
 * container is at most 1200px). The tall card is cropped from a 3:2 photo
 * to the large card's height, so it needs about 0.84x the large card's width.
 * On phones every card is an 85%-wide 4:5 frame, which needs ~1.6x its width
 * (135vw keeps 2x phones on the 1080 file instead of jumping to 1536).
 */
const CARD_SIZES = {
  large:
    "(min-width: 80em) 792px, (min-width: 64em) 62vw, (min-width: 48em) 92vw, 135vw",
  tall: "(min-width: 80em) 680px, (min-width: 64em) 52vw, (min-width: 48em) 50vw, 135vw",
  default:
    "(min-width: 80em) 432px, (min-width: 64em) 34vw, (min-width: 48em) 50vw, 135vw",
};

/** Inspiration gallery: a swipeable carousel on phones, a bento grid on wider screens. */
export function InspirationSection() {
  return (
    <section className="section inspiration" id="inspiration">
      <div className="container reveal">
        <SectionHeading
          eyebrow="THE POSSIBILITIES, FINISHED"
          title={
            <>
              See your space
              <br />
              in a <em>new light.</em>
            </>
          }
          lead="A little inspiration for what comes next. Explore the surfaces and details that can bring a room together."
        />
        <div className="gallery__track">
          {galleryItems.map((item, index) => (
            <GalleryCard
              key={item.title}
              index={index}
              className={
                item.size
                  ? `gallery-card gallery-card--${item.size}`
                  : "gallery-card"
              }
            >
              <span className="gallery-card__media">
                {/* Decorative here: the button's name is its visible text,
                    and the lightbox image carries the description. */}
                <Image
                  {...item.image}
                  alt=""
                  sizes={CARD_SIZES[item.size ?? "default"]}
                  loading="lazy"
                />
                <span className="gallery-card__expand" aria-hidden="true">
                  <Icon name="expand" />
                </span>
              </span>
              <span className="gallery-card__caption">
                <span className="visually-hidden">View larger image: </span>
                <span className="gallery-card__title">{item.title}</span>{" "}
                <span className="gallery-card__kicker">{item.kicker}</span>
              </span>
            </GalleryCard>
          ))}
        </div>
        <p className="illustration-note">
          Finish inspiration: these images are illustrative concepts, not
          photographs of completed Affordable Plastering projects.
        </p>
      </div>
    </section>
  );
}

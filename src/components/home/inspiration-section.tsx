import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { Icon } from "@/components/ui/icon";
import { galleryItems } from "@/content/gallery";
import { GalleryCard } from "./gallery-card";

/** Inspiration gallery: a swipeable carousel on phones, a grid on wider screens. */
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
                item.large ? "gallery-card gallery-card--large" : "gallery-card"
              }
            >
              <span className="gallery-card__media">
                {/* Decorative here: the button's name is its visible text,
                    and the lightbox image carries the description. */}
                <Image
                  {...item.image}
                  alt=""
                  sizes="(min-width: 48em) 50vw, 85vw"
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

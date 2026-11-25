import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { Icon } from "@/components/ui/icon";
import { galleryItems } from "@/content/gallery";
import { GalleryCard } from "./gallery-card";

export function InspirationSection() {
  return (
    <section className="section inspiration" id="inspiration">
      <div className="container">
        <SectionHeading
          eyebrow="THE POSSIBILITIES, FINISHED"
          title={
            <>
              See your space
              <br />
              in a <em>new light.</em>
            </>
          }
          aside={
            <p>
              A little inspiration for what comes next. Explore the surfaces and
              details that can bring a room together.
            </p>
          }
        />
        <div className="inspiration-grid">
          {galleryItems.map((item, index) => (
            <GalleryCard
              key={item.title}
              index={index}
              label={item.cardLabel}
              className={
                item.large
                  ? "inspiration-card inspiration-large"
                  : "inspiration-card"
              }
            >
              <div className="gallery-image">
                <Image
                  {...item.image}
                  alt={item.cardAlt}
                  sizes="(min-width: 48em) 50vw, 85vw"
                  loading="lazy"
                />
                <span className="gallery-expand">
                  <Icon name="expand" />
                </span>
              </div>
              <div className="gallery-caption">
                <h3>{item.title}</h3>
                <span>{item.kicker}</span>
              </div>
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

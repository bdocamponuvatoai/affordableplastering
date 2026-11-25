import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";
import { approachValues } from "@/content/home";
import { approachImage } from "@/content/images";

/** Dark band: the owner-led approach. Copy first on phones, photo left on desktop. */
export function ApproachSection() {
  return (
    <section className="section section--night approach" id="approach">
      <div className="container approach__inner reveal">
        <div className="approach__copy">
          <p className="approach__kicker">GOOD WORK. DOWN TO THE FINISH.</p>
          <p className="eyebrow">A PERSONAL APPROACH</p>
          <h2>
            Small details.
            <br />A big <em>difference.</em>
          </h2>
          <p>
            Walls are the backdrop to everyday life. The way the light falls.
            The corner you notice. The room that finally feels complete.
          </p>
          <p>
            With Affordable Plastering, your first conversation is with Dominic,
            the owner. Talk through what needs attention, ask questions, and
            understand the next step.
          </p>
          <ul className="approach__values" role="list">
            {approachValues.map((value) => (
              <li key={value}>
                <Icon name="check" />
                {value}
              </li>
            ))}
          </ul>
          <a className="btn btn--light" href={site.phone.href}>
            <Icon name="phone" />
            {`Talk with ${site.owner.name}`}
          </a>
        </div>
        <figure className="approach__media">
          <div className="approach__photo">
            <Image
              {...approachImage}
              alt={approachImage.alt}
              sizes="(min-width: 64em) 560px, 100vw"
              loading="lazy"
            />
          </div>
          <figcaption className="approach__caption">
            CARE. CRAFT. A CLEAN FINISH.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

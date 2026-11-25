import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";
import { approachValues } from "@/content/home";
import { approachImage } from "@/content/images";

export function ApproachSection() {
  return (
    <section className="approach" id="approach">
      <div className="container approach-inner reveal">
        <div className="approach-image">
          <Image
            {...approachImage}
            sizes="(min-width: 64em) 560px, 100vw"
            loading="lazy"
          />
          <span className="vertical-caption">CARE. CRAFT. A CLEAN FINISH.</span>
        </div>
        <div className="approach-copy">
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
          <div className="approach-values">
            {approachValues.map((value) => (
              <span key={value}>
                <Icon name="check" />
                {` ${value}`}
              </span>
            ))}
          </div>
          <a className="button button-light" href={site.phone.href}>
            <Icon name="phone" />
            {` Talk with ${site.owner.name}`}
          </a>
        </div>
      </div>
    </section>
  );
}

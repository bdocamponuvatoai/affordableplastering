import Image from "next/image";
import { PlanButton } from "@/components/dialogs/plan-button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";
import { heroImage } from "@/content/images";
import { HeroStage } from "./hero-stage";

// Layers of a finished wall, top to bottom. Terms already used in the
// service copy; purely illustrative.
const WALL_LAYERS = [
  "Smooth finish",
  "Skim coat",
  "Joint finishing",
  "Drywall",
];

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container container--wide hero__grid">
        <div className="hero__intro">
          <p className="eyebrow">
            Plastering & drywall specialists · Hudson, New Hampshire
          </p>
          <h1 className="hero__title">
            Good walls.
            <br />
            Great <em>spaces.</em>
          </h1>
          <p className="hero__lead">
            A fresh start for your walls. A better feel for your home.
            Plastering and drywall with the finish in mind, right here in
            Hudson, NH.
          </p>
          {/* Call first: calling is the real lead; the planner prepares for it. */}
          <div className="hero__actions">
            <a className="btn btn--primary" href={site.phone.href}>
              <Icon name="phone" />
              {`Call ${site.phone.display}`}
            </a>
            <PlanButton className="btn btn--secondary">
              Let’s talk about your project
            </PlanButton>
            <a className="link-arrow" href="#services">
              Explore our services
            </a>
          </div>
          <div className="hero__owner">
            <span className="hero__owner-mark" aria-hidden="true">
              {`${site.owner.name.charAt(0)}.`}
            </span>
            <span>
              A local business. A direct conversation.
              <br />
              <strong>{`Talk with ${site.owner.name}, owner.`}</strong>
            </span>
          </div>
        </div>

        {/* 3D stage: a tilted photo card with glass cards floating in front
            of it at different depths (CSS 3D; pointer tilt on desktop). */}
        <HeroStage>
          <div className="hero__scene">
            <div className="hero__media">
              {/* LCP candidate: load immediately with high priority. On
                  desktops the card is portrait (about 3:4), so the cover crop
                  needs ~1.5x its height in width: 82vw, not the 50vw column. */}
              <Image
                {...heroImage}
                alt={heroImage.alt}
                sizes="(min-width: 64em) 82vw, 100vw"
                loading="eager"
                fetchPriority="high"
              />
              <p className="hero__caption">
                <span>From the surface up.</span>
                <span>Made to feel like home.</span>
              </p>
              <span className="chip hero__label">
                Illustrative finish concept
              </span>
            </div>
            <p className="hero__float hero__float--kicker">
              THE BEAUTY IS IN THE FINISH
            </p>
            <div className="hero__float hero__float--layers" aria-hidden="true">
              <ol className="hero__layers">
                {WALL_LAYERS.map((layer) => (
                  <li key={layer}>
                    <span className="hero__swatch" />
                    {layer}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </HeroStage>
      </div>
    </section>
  );
}

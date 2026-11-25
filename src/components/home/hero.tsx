import Image from "next/image";
import { PlanButton } from "@/components/dialogs/plan-button";
import { site } from "@/config/site";
import { heroImage } from "@/content/images";

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="short-rule"></span>
          {" PLASTERING & DRYWALL SPECIALISTS"}
        </p>
        <h1>
          Good walls.
          <br />
          Great <em>spaces.</em>
        </h1>
        <p className="hero-description">
          A fresh start for your walls. A better feel for your home. Plastering
          and drywall with the finish in mind, right here in Hudson, NH.
        </p>
        <div className="hero-actions">
          <PlanButton className="button button-copper">
            Let’s talk about your project
          </PlanButton>
          <a className="text-link" href="#services">
            Explore our services
          </a>
        </div>
        <div className="owner-note">
          <span className="owner-mark">{`${site.owner.name.charAt(0)}.`}</span>
          <span>
            A local business. A direct conversation.
            <br />
            <strong>{`Talk with ${site.owner.name}, owner.`}</strong>
          </span>
        </div>
      </div>
      <div className="hero-visual">
        {/* LCP image: load immediately with high priority. */}
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          loading="eager"
          fetchPriority="high"
        />
        <div className="image-kicker">THE BEAUTY IS IN THE FINISH</div>
        <div className="hero-image-caption">
          <span>From the surface up.</span>
          <span>Made to feel like home.</span>
        </div>
        <span className="image-disclosure">Illustrative finish concept</span>
      </div>
    </section>
  );
}

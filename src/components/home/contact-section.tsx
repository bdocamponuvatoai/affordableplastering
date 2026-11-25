import { PlanButton } from "@/components/dialogs/plan-button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";

export function ContactSection() {
  const { address } = site;
  return (
    <section className="contact-section" id="contact">
      <div className="container contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>
            Let’s make room
            <br />
            for <em>something better.</em>
          </h2>
          <p>
            Tell Dominic what you have in mind.
            <br />
            We’ll start with a conversation.
          </p>
          <a className="contact-number" href={site.phone.href}>
            {site.phone.display}
          </a>
          <PlanButton className="button button-light">
            Get your project details ready
          </PlanButton>
        </div>
        <div className="contact-card">
          <div className="contact-card-top">
            <Icon name="pin" />
            <span>YOUR LOCAL CONNECTION</span>
          </div>
          <h3>
            {`${address.locality},`}
            <br />
            {`${address.regionName}.`}
          </h3>
          <dl>
            <div>
              <dt>Business</dt>
              <dd>{site.name}</dd>
            </div>
            <div>
              <dt>Your contact</dt>
              <dd>{`${site.owner.name} · ${site.owner.role}`}</dd>
            </div>
            <div>
              <dt>Based at</dt>
              <dd>
                {address.street}
                <br />
                {`${address.locality}, ${address.region} ${address.postalCode}`}
              </dd>
            </div>
          </dl>
          <a
            className="text-link"
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View location on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

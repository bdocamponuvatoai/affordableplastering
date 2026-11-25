import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${site.name}` },
  description: `The page you were looking for isn’t on the ${site.name} website.`,
};

export default function NotFound() {
  return (
    <main id="main">
      <section className="section not-found">
        <div className="container not-found__inner">
          <p className="eyebrow">PAGE NOT FOUND</p>
          <h1>
            {"Let’s get you"}
            <br />
            {"back "}
            <em>home.</em>
          </h1>
          <p className="not-found__lead">
            The page you were looking for isn’t here. Head back to the home
            page, or call Dominic to talk about your project.
          </p>
          <div className="not-found__actions">
            <a className="btn btn--primary" href={site.phone.href}>
              <Icon name="phone" />
              {`Call ${site.phone.display}`}
            </a>
            <Link className="btn btn--secondary" href="/">
              Back to the home page
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

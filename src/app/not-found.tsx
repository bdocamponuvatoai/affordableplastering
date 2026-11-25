import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${site.name}` },
  description: `The page you were looking for isn’t on the ${site.name} website.`,
};

export default function NotFound() {
  return (
    <main id="main">
      <section className="section not-found">
        <div className="container">
          <p className="eyebrow">PAGE NOT FOUND</p>
          <h1>
            {"Let’s get you"}
            <br />
            {"back "}
            <em>home.</em>
          </h1>
          <p>
            The page you were looking for isn’t here. Head back to the home
            page, or call Dominic to talk about your project.
          </p>
          <div className="not-found-actions">
            <Link className="button button-copper" href="/">
              Back to the home page
            </Link>
            <a className="text-link" href={site.phone.href}>
              {`Call ${site.phone.display}`}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

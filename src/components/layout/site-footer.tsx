import { Brand } from "@/components/ui/brand";
import { site } from "@/config/site";
import { CurrentYear, PrivacyButton } from "./footer-controls";

export function SiteFooter() {
  return (
    <footer>
      <div className="container footer-top">
        <Brand />
        <p>{site.tagline}</p>
        <a href={site.phone.href}>{`Let’s talk: ${site.phone.display}`}</a>
      </div>
      <div className="container footer-bottom">
        <span>
          {"© "}
          <CurrentYear buildYear={new Date().getFullYear()} />
          {` ${site.name}`}
        </span>
        <span>Hudson, NH · Illustrative imagery</span>
        <PrivacyButton />
      </div>
    </footer>
  );
}

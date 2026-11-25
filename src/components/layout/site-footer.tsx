import { Brand } from "@/components/ui/brand";
import { SmartLink } from "@/components/ui/smart-link";
import { mainNav, site } from "@/config/site";
import { CurrentYear, PrivacyButton } from "./footer-controls";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <Brand />
          <p className="site-footer__tagline">{site.tagline}</p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer navigation">
          {mainNav.map((item) => (
            <SmartLink key={item.href} href={item.href}>
              {item.label}
            </SmartLink>
          ))}
        </nav>
        <a className="site-footer__call" href={site.phone.href}>
          {`Let’s talk: ${site.phone.display}`}
        </a>
      </div>
      <div className="container site-footer__bottom">
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

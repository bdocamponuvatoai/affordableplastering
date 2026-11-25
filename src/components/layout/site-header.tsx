import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";
import { mainNav, site } from "@/config/site";
import { MenuToggle, MobileNav } from "./header-menu";

/** Sticky, frosted header. Phones: brand, call icon, menu. Desktop: full nav. */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner container container--wide">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {mainNav.map((item) => (
            <SmartLink key={item.href} href={item.href}>
              {item.label}
            </SmartLink>
          ))}
        </nav>
        <a className="header-call" href={site.phone.href}>
          <Icon name="phone" />
          {/* Visually hidden on phones; the accessible name stays the same. */}
          <span className="header-call__label">{`Call ${site.phone.display}`}</span>
        </a>
        <MenuToggle />
      </div>
      <MobileNav />
    </header>
  );
}

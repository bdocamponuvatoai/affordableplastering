import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";
import { mainNav, site } from "@/config/site";
import { MenuToggle, MobileNav } from "./header-menu";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {mainNav.map((item) => (
            <SmartLink key={item.href} href={item.href}>
              {item.label}
            </SmartLink>
          ))}
        </nav>
        <a
          className="header-call"
          href={site.phone.href}
          aria-label={`Call ${site.owner.name} at ${site.phone.display}`}
        >
          <Icon name="phone" />
          <span>{site.phone.display}</span>
        </a>
        <MenuToggle />
      </div>
      <MobileNav />
    </header>
  );
}

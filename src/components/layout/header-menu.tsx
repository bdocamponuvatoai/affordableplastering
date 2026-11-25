"use client";

import { useEffect, useRef } from "react";
import { SmartLink } from "@/components/ui/smart-link";
import { mainNav, site } from "@/config/site";
import { useSiteUi } from "./site-ui";

const MOBILE_NAV_ID = "mobile-nav";
const DESKTOP_QUERY = "(min-width: 901px)";

export function MenuToggle() {
  const { menuOpen, toggleMenu, closeMenu } = useSiteUi();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const focusInMenu = document
        .getElementById(MOBILE_NAV_ID)
        ?.contains(document.activeElement);
      closeMenu();
      // Don't strand keyboard focus inside the menu once it is hidden.
      if (focusInMenu) buttonRef.current?.focus();
    }
    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) closeMenu();
    }

    const desktop = window.matchMedia(DESKTOP_QUERY);
    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleViewportChange);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleViewportChange);
    };
  }, [menuOpen, closeMenu]);

  return (
    <button
      ref={buttonRef}
      className="menu-toggle"
      type="button"
      aria-label={menuOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={menuOpen}
      aria-controls={MOBILE_NAV_ID}
      onClick={toggleMenu}
    >
      <span></span>
      <span></span>
    </button>
  );
}

export function MobileNav() {
  const { menuOpen, closeMenu } = useSiteUi();
  return (
    <nav
      id={MOBILE_NAV_ID}
      className="mobile-nav"
      aria-label="Mobile navigation"
      hidden={!menuOpen}
    >
      {mainNav.map((item) => (
        <SmartLink key={item.href} href={item.href} onClick={closeMenu}>
          {item.mobileLabel ?? item.label}
        </SmartLink>
      ))}
      <a href={site.phone.href} onClick={closeMenu}>
        {`Call ${site.phone.display}`}
      </a>
    </nav>
  );
}

"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  use,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { ServiceKey } from "@/content/services";

type PlannerHandle = { open(service?: ServiceKey): void };
type GalleryHandle = { open(index: number): void };
type PrivacyHandle = { open(): void };

type SiteUi = {
  menuOpen: boolean;
  toggleMenu(): void;
  closeMenu(): void;
  openPlanner(trigger: HTMLElement, service?: ServiceKey): void;
  openGallery(trigger: HTMLElement, index: number): void;
  openPrivacy(trigger: HTMLElement): void;
  /** Called by every dialog's `close` event. */
  handleDialogClose(): void;
  plannerRef: RefObject<PlannerHandle | null>;
  galleryRef: RefObject<GalleryHandle | null>;
  privacyRef: RefObject<PrivacyHandle | null>;
};

const SiteUiContext = createContext<SiteUi | null>(null);

export function useSiteUi(): SiteUi {
  const value = use(SiteUiContext);
  if (!value) throw new Error("useSiteUi must be used inside <SiteUiProvider>");
  return value;
}

/**
 * Shared interactive state for the page chrome: the mobile menu and the three
 * modal dialogs (project planner, gallery, privacy), which can be opened from
 * many buttons across the page.
 */
export function SiteUiProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // The menu is open only on the path where it was opened, so it closes
  // automatically after a route change.
  const [menuOpenOnPath, setMenuOpenOnPath] = useState<string | null>(null);
  const menuOpen = menuOpenOnPath === pathname;

  const plannerRef = useRef<PlannerHandle | null>(null);
  const galleryRef = useRef<GalleryHandle | null>(null);
  const privacyRef = useRef<PrivacyHandle | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const closeMenu = useCallback(() => setMenuOpenOnPath(null), []);
  const toggleMenu = useCallback(
    () =>
      setMenuOpenOnPath((current) => (current === pathname ? null : pathname)),
    [pathname],
  );

  const openDialog = useCallback((trigger: HTMLElement, show: () => void) => {
    lastTriggerRef.current = trigger;
    setMenuOpenOnPath(null);
    show();
    document.body.classList.add("modal-open");
  }, []);

  const value = useMemo<SiteUi>(
    () => ({
      menuOpen,
      toggleMenu,
      closeMenu,
      openPlanner: (trigger, service) =>
        openDialog(trigger, () => plannerRef.current?.open(service)),
      openGallery: (trigger, index) =>
        openDialog(trigger, () => galleryRef.current?.open(index)),
      openPrivacy: (trigger) =>
        openDialog(trigger, () => privacyRef.current?.open()),
      handleDialogClose: () => {
        document.body.classList.remove("modal-open");
        const trigger = lastTriggerRef.current;
        if (trigger?.isConnected) trigger.focus();
      },
      plannerRef,
      galleryRef,
      privacyRef,
    }),
    [menuOpen, toggleMenu, closeMenu, openDialog],
  );

  return <SiteUiContext value={value}>{children}</SiteUiContext>;
}

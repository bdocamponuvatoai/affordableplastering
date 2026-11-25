"use client";

import { useSyncExternalStore } from "react";
import { useSiteUi } from "./site-ui";

const subscribe = () => () => {};

/**
 * The current year. Pre-rendered with the build year, then updated on the
 * client without a hydration mismatch.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );
  return <span>{year}</span>;
}

export function PrivacyButton() {
  const { openPrivacy } = useSiteUi();
  return (
    <button
      className="site-footer__privacy"
      onClick={(event) => openPrivacy(event.currentTarget)}
    >
      Privacy
    </button>
  );
}

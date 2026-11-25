import Link from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = ComponentProps<"a"> & { href: string };

/**
 * One link component for every href:
 * - "/path" routes use next/link (client navigation + prefetch);
 * - hash links ("#id", "/#id") stay plain anchors so the browser performs a
 *   native fragment navigation (smooth scroll, :target, and moving the keyboard
 *   focus starting point), exactly like the original site. From another route
 *   "/#id" is a normal page load to the home page section;
 * - tel:, mailto: and external URLs are plain anchors with target/rel as given.
 */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  const isRoute =
    href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#");
  if (isRoute) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

import type { Metadata, Viewport } from "next";
import { GalleryDialog } from "@/components/dialogs/gallery-dialog";
import { PlannerDialog } from "@/components/dialogs/planner-dialog";
import { PrivacyDialog } from "@/components/dialogs/privacy-dialog";
import { MobileActions } from "@/components/layout/mobile-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteUiProvider } from "@/components/layout/site-ui";
import { Topline } from "@/components/layout/topline";
import { IconDefinitions } from "@/components/ui/icon-definitions";
import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { openSans } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Keep the site out of search results until the owner approves launch.
  robots: isIndexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: the CSS uses smooth scrolling for in-page links;
    // this lets Next.js jump instantly on route changes.
    <html lang="en" className={openSans.variable} data-scroll-behavior="smooth">
      <body>
        <SiteUiProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Topline />
          <SiteHeader />
          {children}
          <SiteFooter />
          <MobileActions />
          <PlannerDialog />
          <GalleryDialog />
          <PrivacyDialog />
          <IconDefinitions />
        </SiteUiProvider>
      </body>
    </html>
  );
}

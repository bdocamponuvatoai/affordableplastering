import { ApproachSection } from "@/components/home/approach-section";
import { ContactSection } from "@/components/home/contact-section";
import { FaqSection } from "@/components/home/faq-section";
import { Hero } from "@/components/home/hero";
import { InspirationSection } from "@/components/home/inspiration-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServiceStrip } from "@/components/home/service-strip";
import { ServicesSection } from "@/components/home/services-section";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-json-ld";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: `${site.name} | Plastering & Drywall in Hudson, NH`,
  path: "/",
  description: `A better room starts with the finish. Discuss plastering, drywall, and wall or ceiling repairs with ${site.owner.name} at ${site.name} in Hudson, NH. Call ${site.phone.display}.`,
  social: {
    title: `${site.name} — ${site.tagline}`,
    description: `Plastering & drywall in Hudson, New Hampshire. Talk with owner ${site.owner.name} about your next project.`,
  },
});

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <ServiceStrip />
      <ServicesSection />
      <ApproachSection />
      <InspirationSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
      <LocalBusinessJsonLd />
    </main>
  );
}

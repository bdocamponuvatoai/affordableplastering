import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceExplorer } from "./service-explorer";

export function ServicesSection() {
  return (
    <section className="section services" id="services">
      <div className="container reveal">
        <SectionHeading
          eyebrow="WHAT WE CAN HELP WITH"
          title={
            <>
              Every great room
              <br />
              starts with a <em>good surface.</em>
            </>
          }
          lead="From a wall that needs attention to a space ready for a new beginning. Let’s find the right approach for your project."
        />
        <ServiceExplorer />
      </div>
    </section>
  );
}

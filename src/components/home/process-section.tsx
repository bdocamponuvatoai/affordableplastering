import { PlanButton } from "@/components/dialogs/plan-button";
import { SectionHeading } from "@/components/sections/section-heading";
import { Icon } from "@/components/ui/icon";
import { processSteps } from "@/content/home";

export function ProcessSection() {
  return (
    <section className="process-section">
      <div className="container">
        <SectionHeading
          eyebrow="LET’S KEEP IT SIMPLE"
          title={
            <>
              Your project.
              <br />A clear <em>next step.</em>
            </>
          }
          aside={
            <PlanButton className="button button-outline">
              Plan your project
            </PlanButton>
          }
        />
        <div className="process-grid">
          {processSteps.map((step) => (
            <article key={step.title}>
              <Icon name={step.icon} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { PlanButton } from "@/components/dialogs/plan-button";
import { SectionHeading } from "@/components/sections/section-heading";
import { Icon } from "@/components/ui/icon";
import { processSteps } from "@/content/home";

export function ProcessSection() {
  return (
    <section className="section section--alt process">
      <div className="container reveal">
        <SectionHeading
          eyebrow="LET’S KEEP IT SIMPLE"
          title={
            <>
              Your project.
              <br />A clear <em>next step.</em>
            </>
          }
          action={
            <PlanButton className="btn btn--secondary">
              Plan your project
            </PlanButton>
          }
        />
        <ol className="process__steps" role="list">
          {processSteps.map((step, index) => (
            <li key={step.title} className="process__step">
              <span className="process__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="process__icon">
                <Icon name={step.icon} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

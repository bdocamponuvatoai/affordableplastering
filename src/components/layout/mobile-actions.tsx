import { PlanButton } from "@/components/dialogs/plan-button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";

/** Floating call / plan bar on phones and tablets. Calling leads. */
export function MobileActions() {
  return (
    <div className="action-bar">
      <a className="btn btn--primary" href={site.phone.href}>
        <Icon name="phone" />
        {`Call ${site.owner.name}`}
      </a>
      <PlanButton className="btn btn--secondary">Plan your project</PlanButton>
    </div>
  );
}

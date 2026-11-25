import { PlanButton } from "@/components/dialogs/plan-button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";

/** Fixed call / plan bar shown on small screens. */
export function MobileActions() {
  return (
    <div className="mobile-actions">
      <a href={site.phone.href}>
        <Icon name="phone" />
        {` Call ${site.owner.name}`}
      </a>
      <PlanButton>Plan your project</PlanButton>
    </div>
  );
}

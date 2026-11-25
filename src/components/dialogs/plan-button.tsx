"use client";

import type { ReactNode } from "react";
import { useSiteUi } from "@/components/layout/site-ui";
import type { ServiceKey } from "@/content/services";

type PlanButtonProps = {
  className?: string;
  /** Preselect this service in the planner and show the form. */
  service?: ServiceKey;
  children: ReactNode;
};

/** Opens the project planner dialog. */
export function PlanButton({ className, service, children }: PlanButtonProps) {
  const { openPlanner } = useSiteUi();
  return (
    <button
      className={className}
      onClick={(event) => openPlanner(event.currentTarget, service)}
    >
      {children}
    </button>
  );
}

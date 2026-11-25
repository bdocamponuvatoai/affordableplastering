import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  /** Intro paragraph under the title. */
  lead?: ReactNode;
  /** A call to action under the title (and lead). */
  action?: ReactNode;
};

/** Centred section intro: eyebrow, title, optional lead and action. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-heading__title">{title}</h2>
      {lead ? <p className="section-heading__lead">{lead}</p> : null}
      {action}
    </div>
  );
}

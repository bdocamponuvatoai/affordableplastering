// Framework-free helpers for the project planner summary and the
// downloadable call-notes file.

type PlannerValues = {
  serviceLabel: string;
  location: string;
  size: string;
  timing: string;
  notes: string;
};

export type SummaryField = readonly [label: string, value: string];

const TO_DISCUSS = "To discuss";

export function buildSummaryFields(values: PlannerValues): SummaryField[] {
  return [
    ["Service", values.serviceLabel],
    ["Location", values.location.trim()],
    ["Size", values.size.trim() || TO_DISCUSS],
    ["Timing", values.timing],
    ["Details", values.notes.trim() || TO_DISCUSS],
  ];
}

export function buildCallNotes(
  fields: readonly SummaryField[],
  contact: {
    businessName: string;
    ownerName: string;
    ownerRole: string;
    phone: string;
  },
): string {
  const body = fields.map(([key, value]) => `${key}: ${value}`).join("\n\n");
  return (
    `${contact.businessName.toUpperCase()} — PROJECT CALL NOTES\n` +
    `Contact: ${contact.ownerName}, ${contact.ownerRole}\n` +
    `Phone: ${contact.phone}\n\n` +
    `${body}\n\n` +
    "Prepared locally. No service request has been submitted.\n"
  );
}

export const CALL_NOTES_FILENAME = "affordable-plastering-project-notes.txt";

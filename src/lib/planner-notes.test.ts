import assert from "node:assert/strict";
import { test } from "node:test";
import { buildCallNotes, buildSummaryFields } from "./planner-notes.ts";

test("call notes text is unchanged from the original site", () => {
  const fields = buildSummaryFields({
    serviceLabel: "Drywall installation",
    location: "  Hudson  ",
    size: "",
    timing: "Within the next month",
    notes: "Cracked ceiling\nnear the window <b>&</b>",
  });
  const notes = buildCallNotes(fields, {
    businessName: "Affordable Plastering",
    ownerName: "Dominic",
    ownerRole: "Owner",
    phone: "(603) 718-4173",
  });
  assert.equal(
    notes,
    "AFFORDABLE PLASTERING — PROJECT CALL NOTES\nContact: Dominic, Owner\nPhone: (603) 718-4173\n\nService: Drywall installation\n\nLocation: Hudson\n\nSize: To discuss\n\nTiming: Within the next month\n\nDetails: Cracked ceiling\nnear the window <b>&</b>\n\nPrepared locally. No service request has been submitted.\n",
  );
});

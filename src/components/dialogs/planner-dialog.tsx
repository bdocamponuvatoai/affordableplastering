"use client";

import { useImperativeHandle, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { useSiteUi } from "@/components/layout/site-ui";
import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";
import {
  plannerServiceOptions,
  plannerTimingOptions,
} from "@/content/services";
import {
  buildCallNotes,
  buildSummaryFields,
  CALL_NOTES_FILENAME,
  type SummaryField,
} from "@/lib/planner-notes";
import { ModalDialog } from "./modal-dialog";

type Summary = { fields: SummaryField[]; notes: string };

/**
 * Project planner: a local-only form that turns the visitor's answers into
 * call notes. Nothing is submitted anywhere. The form and the summary stay
 * mounted (toggled with `hidden`) so values survive "Edit details".
 */
export function PlannerDialog() {
  const { plannerRef } = useSiteUi();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [view, setView] = useState<"form" | "summary">("form");
  const [summary, setSummary] = useState<Summary | null>(null);

  useImperativeHandle(
    plannerRef,
    () => ({
      open(service) {
        if (service && serviceRef.current) {
          serviceRef.current.value = service;
          setView("form");
        }
        dialogRef.current?.showModal();
      },
    }),
    [],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const serviceValue = String(data.get("service"));
    const fields = buildSummaryFields({
      serviceLabel:
        plannerServiceOptions.find((option) => option.value === serviceValue)
          ?.label ?? serviceValue,
      location: String(data.get("location")),
      size: String(data.get("size")),
      timing: String(data.get("timing")),
      notes: String(data.get("notes")),
    });
    const notes = buildCallNotes(fields, {
      businessName: site.name,
      ownerName: site.owner.name,
      ownerRole: site.owner.role,
      phone: site.phone.display,
    });
    flushSync(() => {
      setSummary({ fields, notes });
      setView("summary");
    });
    if (dialogRef.current) dialogRef.current.scrollTop = 0;
    headingRef.current?.focus();
  }

  function handleEdit() {
    flushSync(() => setView("form"));
    serviceRef.current?.focus();
  }

  function handleDownload() {
    if (!summary) return;
    const url = URL.createObjectURL(
      new Blob([summary.notes], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = CALL_NOTES_FILENAME;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <ModalDialog
      dialogRef={dialogRef}
      className="planner-dialog"
      labelledBy="planner-title"
      closeLabel="Close project planner"
    >
      <div className="planner-heading">
        <p className="eyebrow">A GOOD PLACE TO START</p>
        <h2 id="planner-title">
          Let’s talk <em>details.</em>
        </h2>
        <p>
          Organize your project before you call Dominic. Your notes stay in this
          page; nothing is submitted.
        </p>
      </div>
      <form hidden={view !== "form"} onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            What can we help with?
            <select ref={serviceRef} name="service" required>
              {plannerServiceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Project location
            <input
              name="location"
              placeholder="Town / city"
              autoComplete="address-level2"
              maxLength={100}
              required
            />
          </label>
          <label>
            Approximate size
            <input
              name="size"
              placeholder="e.g. one room, 12 × 14 ft"
              maxLength={100}
            />
          </label>
          <label>
            Preferred timing
            <select name="timing">
              {plannerTimingOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="full-width">
            Tell us about the surface
            <textarea
              name="notes"
              rows={3}
              placeholder="Existing plaster or drywall? Any cracks, damage, or a finish you have in mind?"
              maxLength={1500}
            />
          </label>
        </div>
        <button className="button button-copper full-button" type="submit">
          Prepare my call notes
        </button>
      </form>
      <div hidden={view !== "summary"}>
        <div className="summary-sheet">
          <h3 ref={headingRef} tabIndex={summary ? -1 : undefined}>
            Your project notes
          </h3>
          <dl>
            {summary?.fields.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="summary-help">
          Your notes are ready. Call Dominic to discuss the project and next
          steps. No request has been sent.
        </p>
        <a className="button button-copper full-button" href={site.phone.href}>
          <Icon name="phone" />
          {` Call Dominic · ${site.phone.display}`}
        </a>
        <div className="summary-actions">
          <button className="text-link" type="button" onClick={handleEdit}>
            Edit details
          </button>
          <button className="text-link" type="button" onClick={handleDownload}>
            Download notes
          </button>
        </div>
      </div>
    </ModalDialog>
  );
}

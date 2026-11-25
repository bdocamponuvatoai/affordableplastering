"use client";

import { useImperativeHandle, useRef } from "react";
import { useSiteUi } from "@/components/layout/site-ui";
import { site } from "@/config/site";
import { ModalDialog } from "./modal-dialog";

export function PrivacyDialog() {
  const { privacyRef } = useSiteUi();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    privacyRef,
    () => ({ open: () => dialogRef.current?.showModal() }),
    [],
  );

  return (
    <ModalDialog
      dialogRef={dialogRef}
      className="privacy-dialog"
      labelledBy="privacy-title"
      closeLabel="Close privacy information"
    >
      <p className="eyebrow">YOUR INFORMATION</p>
      <h2 id="privacy-title">Privacy, simply.</h2>
      <p>
        This website does not submit or store your project planner notes on a
        server. Notes remain in the current page until you leave or reload it.
        Downloading notes saves a text file on your device.
      </p>
      <p>
        Call links open your device’s phone application. The location link opens
        Google Maps, which has its own privacy practices. No marketing or
        analytics trackers have been added to this website.
      </p>
      <p>
        {
          "The hosting service may process technical information needed to deliver the website. To discuss the business or your project, contact Dominic at "
        }
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>
    </ModalDialog>
  );
}

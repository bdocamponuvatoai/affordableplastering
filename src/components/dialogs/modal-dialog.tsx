"use client";

import type { MouseEvent, ReactNode, RefObject } from "react";
import { useSiteUi } from "@/components/layout/site-ui";
import { Icon } from "@/components/ui/icon";

type ModalDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  className: string;
  labelledBy: string;
  closeLabel: string;
  children: ReactNode;
};

/**
 * Native modal <dialog> with a close button, light dismiss (click on the
 * backdrop) and focus return to the button that opened it. Escape is handled
 * natively by the browser.
 */
export function ModalDialog({
  dialogRef,
  className,
  labelledBy,
  closeLabel,
  children,
}: ModalDialogProps) {
  const { handleDialogClose } = useSiteUi();

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    const dialog = event.currentTarget;
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (outside) dialog.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className={className}
      aria-labelledby={labelledBy}
      onClick={handleBackdropClick}
      onClose={handleDialogClose}
    >
      <button
        className="dialog-close"
        aria-label={closeLabel}
        onClick={() => dialogRef.current?.close()}
      >
        <Icon name="close" />
      </button>
      {children}
    </dialog>
  );
}

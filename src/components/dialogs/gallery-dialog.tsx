"use client";

import Image from "next/image";
import { useImperativeHandle, useRef, useState } from "react";
import { useSiteUi } from "@/components/layout/site-ui";
import { galleryItems } from "@/content/gallery";
import { ModalDialog } from "./modal-dialog";

/** Full-size view of an inspiration image. */
export function GalleryDialog() {
  const { galleryRef } = useSiteUi();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const item = galleryItems[index];

  useImperativeHandle(
    galleryRef,
    () => ({
      open(nextIndex) {
        setIndex(nextIndex);
        dialogRef.current?.showModal();
      },
    }),
    [],
  );

  return (
    <ModalDialog
      dialogRef={dialogRef}
      className="gallery-dialog"
      labelledBy="gallery-title"
      closeLabel="Close image"
    >
      <Image
        {...item.image}
        alt={item.dialogAlt}
        sizes="100vw"
        loading="eager"
      />
      <div>
        <h2 id="gallery-title">{item.title}</h2>
        <p>
          Illustrative finish concept. Not a completed Affordable Plastering
          project.
        </p>
      </div>
    </ModalDialog>
  );
}

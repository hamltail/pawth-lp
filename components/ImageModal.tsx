"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type ModalImage = {
  src: string;
  alt: string;
};

type ImageModalProps = {
  image: ModalImage | null;
  onClose: () => void;
};

export default function ImageModal({ image, onClose }: ImageModalProps) {
  const t = useTranslations("ImageModal");

  useEffect(() => {
    if (!image) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [image, onClose]);

  if (!image) {
    return null;
  }

  return (
    <div
      className="modal-overlay fixed inset-0 z-9999 flex items-center justify-center p-8 backdrop-blur-[6px]"
      id="image-modal"
    >
      <div
        className="modal-backdrop absolute inset-0 bg-slate-950/70"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        className="modal-panel relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[28px] bg-(--card) shadow-[0_36px_80px_rgba(15,23,42,0.24)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-modal-title"
      >
        <button
          type="button"
          className="modal-close-button absolute top-4 right-4 z-2 grid size-[2.6rem] cursor-pointer place-items-center rounded-full border border-(--border) bg-(--panel) text-[1.4rem] leading-none text-(--text)"
          aria-label={t("close")}
          onClick={onClose}
        >
          ×
        </button>

        <figure className="m-0 grid">
          <div className="relative h-[80vh] max-h-[80vh] w-full bg-(--surface)">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-contain"
            />
          </div>

          <figcaption
            className="m-0 bg-(--card) px-6 pt-4 pb-6 font-bold text-(--text)"
            id="image-modal-title"
          >
            {image.alt}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

type ModalImage = {
  src: string;
  alt: string;
};

type ImageModalProps = {
  image: ModalImage | null;
  onClose: () => void;
};

export default function ImageModal({
  image,
  onClose,
}: ImageModalProps) {
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

  return (
    <div
      className={`modal modal--image ${image ? "is-open" : ""}`}
      id="image-modal"
      aria-hidden={!image}
    >
      <div
        className="modal__overlay"
        data-modal-close
        onClick={onClose}
      />

      <div
        className="modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-modal-title"
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Close image preview"
          onClick={onClose}
        >
          ×
        </button>

        <figure className="modal__figure">
          {image && (
            <img
              className="modal__image"
              src={image.src}
              alt={image.alt}
            />
          )}

          <figcaption
            className="modal__caption"
            id="image-modal-title"
          >
            {image?.alt ?? ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

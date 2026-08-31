"use client";

import { useState } from "react";

import ImageModal from "./ImageModal";
import Screens from "./Screens";

type ModalImage = {
  src: string;
  alt: string;
};

export default function ScreensWithModal() {
  const [selectedImage, setSelectedImage] = useState<ModalImage | null>(null);

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Screens onImageClick={setSelectedImage} />
      <ImageModal image={selectedImage} onClose={closeModal} />
    </>
  );
}

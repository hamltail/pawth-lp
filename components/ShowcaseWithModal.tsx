"use client";

import { useState } from "react";

import ImageModal from "./ImageModal";
import Screens from "./Screens";
import ThemeColors from "./ThemeColors";
import Usability from "./Usability";

type ModalImage = {
  src: string;
  alt: string;
};

export default function ShowcaseWithModal() {
  const [selectedImage, setSelectedImage] = useState<ModalImage | null>(null);

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Screens onImageClick={setSelectedImage} />
      <Usability />
      <ThemeColors onImageClick={setSelectedImage} />
      <ImageModal image={selectedImage} onClose={closeModal} />
    </>
  );
}

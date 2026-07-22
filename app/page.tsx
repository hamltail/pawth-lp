"use client";

import { useState } from "react";

import BackToTop from "../components/BackToTop";
import Concept from "../components/Concept";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import ImageModal from "../components/ImageModal";
import Negative from "../components/Negative";
import Notice from "../components/Notice";
import Screens from "../components/Screens";
import Tech from "../components/Tech";

type ModalImage = {
  src: string;
  alt: string;
};

export default function Home() {
  const [selectedImage, setSelectedImage] =
    useState<ModalImage | null>(null);

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <main className="page">
        <Hero />
        <Screens onImageClick={setSelectedImage} />
        <Concept />
        <Negative />
        <Tech />
        <Highlights />
        <Notice />
      </main>

      <ImageModal
        image={selectedImage}
        onClose={closeModal}
      />

      <Footer />
      <BackToTop />
    </>
  );
}

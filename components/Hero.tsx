"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroImages = [
  {
    src: "/images/hero-01.png",
    alt: "Pawth イメージ画像",
  },
  {
    src: "/images/hero-02.png",
    alt: "Pawth イメージ画像",
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentImageIndex(
        (currentIndex) => (currentIndex + 1) % heroImages.length,
      );
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Portfolio Landing Page</p>

        <h1 className="hero__title">
          Pawth <span className="hero__emoji">🐾</span>
        </h1>

        <p className="hero__subtitle">
          日々の足あとを描く、1日1投稿の小さな日記アプリ
        </p>

        <p className="hero__description">
          Pawthは、日々の歩みを可視化し、その日の記録にコミットするための日記アプリです。
        </p>

        <div className="hero__actions">
          <a
            className="button button--primary"
            href="https://github.com/hamltail/Pawth"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHubを見る
          </a>

          <a className="button button--secondary" href="#concept">
            コンセプトを見る
          </a>
        </div>
      </div>

      <div className="hero__visual">
        <div className="visual-card visual-card--hero">
          {heroImages.map((image, index) => (
            <Image
              key={image.src}
              className={`visual-card__image hero-image ${
                index === currentImageIndex ? "hero-image--active" : ""
              }`}
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

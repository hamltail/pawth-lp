"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const heroImages = ["/images/hero-01.png", "/images/hero-02.png"] as const;

export default function Hero() {
  const t = useTranslations("Hero");
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
    <section className="grid grid-cols-[1.2fr_0.8fr] items-center gap-8 py-16 pb-20 max-[960px]:grid-cols-1 max-[720px]:gap-6 max-[720px]:pt-10">
      <div>
        <p className="mb-4 text-[0.78rem] font-bold tracking-[0.12em] text-(--accent) uppercase">
          {t("label")}
        </p>

        <h1 className="m-0 text-[clamp(2.8rem,4vw,4.5rem)] leading-none font-black">
          {t("title")} <span className="inline-block">🐾</span>
        </h1>

        <p className="mt-6 mb-4 max-w-3xl text-[1.3rem] leading-normal max-[720px]:text-[1.15rem]">
          {t("lead")}
        </p>

        <p className="mb-8 max-w-2xl leading-7 text-(--muted)">
          {t("description")}
        </p>

        <div className="flex flex-wrap gap-4 max-[720px]:flex-col max-[720px]:items-stretch">
          <a
            className="button"
            href="https://github.com/hamltail/Pawth"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("github")}
          </a>

          <a className="button" href="#concept">
            {t("concept")}
          </a>
        </div>
      </div>

      <div className="relative flex justify-center max-[960px]:order-first">
        <div
          className="
            relative aspect-4/3 w-full max-w-md
            origin-bottom cursor-pointer overflow-hidden
            rounded-[28px]
            border border-[rgba(109,40,217,0.08)]
            bg-(--surface)
            shadow-(--shadow)
            transition-transform
            duration-500
            ease-[cubic-bezier(0.22,2.2,0.36,1)]
            hover:-translate-y-1
            active:-translate-y-0.5
            active:scale-x-[1.10]
            active:scale-y-[0.90]
          "
        >
          {heroImages.map((src, index) => (
            <Image
              key={src}
              className={`object-contain opacity-0 transition-opacity duration-3000 ${
                index === currentImageIndex ? "opacity-100" : ""
              }`}
              src={src}
              alt={t("imageAlt")}
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

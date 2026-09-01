"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type ScreenImage = {
  src: string;
  alt: string;
};

type ScreensProps = {
  onImageClick: (image: ScreenImage) => void;
};

const screens = [
  {
    id: "calendar",
    src: "/images/pawth-calendar.png",
  },
  {
    id: "list",
    src: "/images/pawth-list.png",
  },
  {
    id: "modal",
    src: "/images/pawth-modal.png",
  },
] as const;

export default function Screens({ onImageClick }: ScreensProps) {
  const t = useTranslations("Screens");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -15% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="rounded-4xl bg-(--surface-strong) p-12 max-[720px]:p-8"
      id="screens"
    >
      <div className="mb-8">
        <p className="mb-4 text-[0.78rem] font-bold tracking-[0.12em] text-(--accent) uppercase">
          {t("label")}
        </p>

        <h2 className="m-0 text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-extrabold">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6 max-[960px]:grid-cols-2 max-[720px]:grid-cols-1">
        {screens.map((screen, index) => {
          const alt = t(`${screen.id}.alt`);

          return (
            <article
              key={screen.src}
              className={`screen-card overflow-hidden rounded-3xl border border-(--border) bg-(--card) shadow-[0_18px_40px_rgba(15,23,42,0.06)] ${
                isVisible ? "is-visible" : ""
              }`}
              style={{
                animationDelay: `${index * 140}ms`,
              }}
            >
              <button
                type="button"
                className="relative block aspect-4/3 w-full cursor-zoom-in bg-(--surface)"
                onClick={() =>
                  onImageClick({
                    src: screen.src,
                    alt,
                  })
                }
                aria-label={t(`${screen.id}.button`)}
              >
                <Image
                  src={screen.src}
                  alt={alt}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 960px) 50vw, 33vw"
                  className="object-contain p-4"
                />
              </button>

              <div className="p-6">
                <h3 className="mb-3 text-[1.1rem] font-extrabold">
                  {t(`${screen.id}.title`)}
                </h3>

                <p className="m-0 leading-7 text-(--muted)">
                  {t(`${screen.id}.description`)}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

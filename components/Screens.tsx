"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import Container from "./Container";

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
    src: "/images/pawth-calendar.webp",
  },
  {
    id: "timeline",
    src: "/images/pawth-timeline.webp",
  },
  {
    id: "settings",
    src: "/images/pawth-settings.webp",
  },
] as const;

export default function Screens({ onImageClick }: ScreensProps) {
  const t = useTranslations("Screens");

  return (
    <section id="screens" className="py-20 md:py-28">
      <Container>
        <div className="mb-14 md:mb-20">
          <p className="mb-4 text-sm font-bold tracking-[0.14em] text-(--accent) uppercase">
            {t("label")}
          </p>

          <h2 className="title-glow text-[clamp(2rem,5vw,3.5rem)] leading-tight font-black">
            {t("title")}
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-(--muted)">
            {t("description")}
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {screens.map((screen, index) => {
            const alt = t(`${screen.id}.alt`);
            const isReversed = index % 2 === 1;
            const isSettings = screen.id === "settings";

            return (
              <article
                key={screen.id}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
              >
                <div
                  className={`${
                    isReversed ? "md:order-2" : "md:order-1"
                  } ${isSettings ? "flex justify-center" : ""}`}
                >
                  <button
                    type="button"
                    className={`group relative overflow-hidden rounded-3xl border border-(--border) bg-(--surface) shadow-(--shadow) ${
                      isSettings ? "w-full max-w-md" : "w-full"
                    }`}
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
                      width={1600}
                      height={1000}
                      sizes={
                        isSettings
                          ? "(max-width: 768px) 90vw, 448px"
                          : "(max-width: 768px) 100vw, 50vw"
                      }
                      draggable={false}
                      className="h-auto w-full select-none transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </button>
                </div>

                <div className={isReversed ? "md:order-1" : "md:order-2"}>
                  <p className="mb-3 text-sm font-bold tracking-[0.12em] text-(--accent)">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-2xl font-black md:text-3xl">
                    {t(`${screen.id}.title`)}
                  </h3>

                  <p className="mt-4 leading-8 text-(--muted)">
                    {t(`${screen.id}.description`)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

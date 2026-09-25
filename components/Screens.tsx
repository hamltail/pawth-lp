"use client";

import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

import calendarImage from "../public/images/pawth-calendar.webp";
import settingsImage from "../public/images/pawth-settings.webp";
import timelineImage from "../public/images/pawth-timeline.webp";
import Container from "./Container";

type ScreenImage = {
  src: string;
  alt: string;
};

type ScreensProps = {
  onImageClick: (image: ScreenImage) => void;
};

type Screen = {
  id: "calendar" | "timeline" | "settings";
  src: StaticImageData;
  modalSrc: string;
};

const screens: Screen[] = [
  {
    id: "calendar",
    src: calendarImage,
    modalSrc: "/images/pawth-calendar.webp",
  },
  {
    id: "timeline",
    src: timelineImage,
    modalSrc: "/images/pawth-timeline.webp",
  },
  {
    id: "settings",
    src: settingsImage,
    modalSrc: "/images/pawth-settings.webp",
  },
];

export default function Screens({ onImageClick }: ScreensProps) {
  const t = useTranslations("Screens");

  return (
    <section id="screens" className="py-20 md:py-28">
      <Container>
        <div className="mb-14 md:mb-20">
          <p className="mb-4 text-sm font-bold tracking-[0.14em] text-(--accent) uppercase">
            {t("label")}
          </p>

          <h2 className="title-glow title-gradient text-[clamp(2rem,5vw,3.5rem)] leading-tight font-black">
            {t("title")}
          </h2>

          <p className="mt-5 leading-8 text-(--muted)">{t("description")}</p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {screens.map((screen, index) => {
            const alt = t(`${screen.id}.alt`);
            const isReversed = index % 2 === 1;

            return (
              <article
                key={screen.id}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
              >
                <div className={isReversed ? "md:order-2" : "md:order-1"}>
                  <button
                    type="button"
                    className="group relative w-full overflow-hidden rounded-3xl border border-(--border) bg-(--surface) shadow-(--screen-shadow)"
                    onClick={() =>
                      onImageClick({
                        src: screen.modalSrc,
                        alt,
                      })
                    }
                    aria-label={t(`${screen.id}.button`)}
                  >
                    <Image
                      src={screen.src}
                      alt={alt}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={index === 0 ? "eager" : "lazy"}
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

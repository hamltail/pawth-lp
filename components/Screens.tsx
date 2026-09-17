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

          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight font-black">
            {t("title")}
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-(--muted)">
            {t("description")}
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {screens.map((screen, index) => {
            const alt = t(`${screen.id}.alt`);

            return (
              <article
                key={screen.id}
                className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(240px,0.35fr)] md:gap-12"
              >
                <button
                  type="button"
                  className="group relative overflow-hidden rounded-3xl border border-(--border) bg-(--surface) shadow-(--shadow)"
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
                    sizes="(max-width: 768px) 100vw, 70vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </button>

                <div>
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

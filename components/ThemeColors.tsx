import Image from "next/image";
import { useTranslations } from "next-intl";

import Container from "./Container";
import FadeIn from "./FadeIn";

type ThemeImage = {
  src: string;
  alt: string;
};

type ThemeColorsProps = {
  onImageClick: (image: ThemeImage) => void;
};

export default function ThemeColors({ onImageClick }: ThemeColorsProps) {
  const t = useTranslations("ThemeColors");
  const imageSrc = "/images/pawth-dark.webp";
  const imageAlt = t("imageAlt");

  return (
    <section className="py-20 md:py-28">
      <Container>
        <FadeIn>
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            <div>
              <p className="mb-4 text-sm font-bold tracking-[0.14em] text-(--accent) uppercase">
                {t("label")}
              </p>

              <h2 className="title-gradient text-[clamp(2rem,5vw,3.5rem)] leading-tight font-black">
                {t("title")}
              </h2>

              <p className="mt-5 leading-8 text-(--muted)">
                {t("description")}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-bold">
                  Light
                </span>

                <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-bold">
                  Dark
                </span>

                <span className="rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-bold">
                  System
                </span>
              </div>
            </div>

            <button
              type="button"
              className="group w-full overflow-hidden rounded-3xl border border-(--border) bg-(--surface) shadow-(--shadow)"
              onClick={() =>
                onImageClick({
                  src: imageSrc,
                  alt: imageAlt,
                })
              }
              aria-label={t("imageButton")}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 50vw"
                draggable={false}
                className="h-auto w-full select-none transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

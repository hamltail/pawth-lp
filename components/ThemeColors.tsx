import Image from "next/image";
import { useTranslations } from "next-intl";

import Container from "./Container";
import FadeIn from "./FadeIn";

export default function ThemeColors() {
  const t = useTranslations("ThemeColors");

  return (
    <section className="py-20 md:py-28">
      <Container>
        <FadeIn>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="mb-4 text-sm font-bold tracking-[0.14em] text-(--accent) uppercase">
                {t("label")}
              </p>

              <h2 className="title-glow text-[clamp(2rem,5vw,3.5rem)] leading-tight font-black">
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

            <div className="overflow-hidden rounded-3xl border border-(--border) bg-(--surface) shadow-(--shadow)">
              <Image
                src="/images/pawth-dark.webp"
                alt={t("imageAlt")}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 50vw"
                draggable={false}
                className="h-auto w-full select-none"
              />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

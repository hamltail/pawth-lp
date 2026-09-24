import { useTranslations } from "next-intl";

import Container from "./Container";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-bold tracking-[0.14em] text-(--accent) uppercase">
            {t("label")}
          </p>

          <h1 className="hero-title flex items-center justify-center gap-3 text-[clamp(3.5rem,9vw,7rem)] leading-none font-black tracking-tight">
            {t("title")}

            <span
              className="hero-paw-wrapper inline-block h-[0.9em] w-[0.9em] shrink-0"
              aria-hidden="true"
            >
              <span className="hero-paw" />
            </span>
          </h1>

          <p className="mt-8 text-[clamp(1.25rem,2vw,1.6rem)] leading-relaxed font-bold">
            {t("lead")}
          </p>

          <p className="mx-auto mt-5 text-base leading-8 text-(--muted) md:text-lg">
            {t("description")}
          </p>
        </div>
      </Container>
    </section>
  );
}

import { useTranslations } from "next-intl";

import Container from "./Container";
import FadeIn from "./FadeIn";

const items = ["record", "calendar", "timeline"] as const;

export default function Usability() {
  const t = useTranslations("Usability");

  return (
    <section className="py-20 md:py-28">
      <Container>
        <FadeIn>
          <div className="mb-12">
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

          <div className="grid gap-5 md:grid-cols-3">
            {items.map((item, index) => (
              <article
                key={item}
                className="rounded-3xl border border-(--border) bg-(--surface) p-7 shadow-(--shadow)"
              >
                <p className="mb-5 text-sm font-black tracking-[0.12em] text-(--accent)">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="text-xl font-black">{t(`${item}.title`)}</h3>

                <p className="mt-3 leading-7 text-(--muted)">
                  {t(`${item}.description`)}
                </p>
              </article>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

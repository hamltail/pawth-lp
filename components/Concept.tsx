import { useTranslations } from "next-intl";

import FadeIn from "./FadeIn";

const concepts = [
  "onePost",
  "noDeleteToday",
  "editLimit",
  "deleteLater",
] as const;

export default function Concept() {
  const t = useTranslations("Concept");

  return (
    <FadeIn className="py-16 max-[720px]:py-10" id="concept">
      <div className="mb-8">
        <p className="mb-4 text-[0.78rem] font-bold tracking-[0.12em] text-(--accent) uppercase">
          {t("label")}
        </p>

        <h2 className="m-0 text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-extrabold">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 max-[720px]:grid-cols-1">
        {concepts.map((concept) => (
          <article
            key={concept}
            className="rounded-3xl border border-(--border) bg-(--card) p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
          >
            <h3 className="mb-4 text-[1.15rem] font-extrabold">
              {t(`${concept}.title`)}
            </h3>

            <p className="m-0 leading-7 text-(--muted)">
              {t(`${concept}.description`)}
            </p>
          </article>
        ))}
      </div>
    </FadeIn>
  );
}

import { useTranslations } from "next-intl";

import FadeIn from "./FadeIn";

const highlights = ["habit", "constraint", "quality"] as const;

export default function Highlights() {
  const t = useTranslations("Highlights");

  return (
    <FadeIn className="py-16 max-[720px]:py-10">
      <div className="mb-8">
        <p className="mb-4 text-[0.78rem] font-bold tracking-[0.12em] text-(--accent) uppercase">
          {t("label")}
        </p>

        <h2 className="m-0 text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-extrabold">
          {t("title")}
        </h2>
      </div>

      <div className="grid gap-5">
        {highlights.map((highlight) => (
          <div
            key={highlight}
            className="rounded-3xl border border-(--border) bg-(--card) p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
          >
            <p className="m-0 leading-7 font-bold">{t(highlight)}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

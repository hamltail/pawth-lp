import { useTranslations } from "next-intl";

import FadeIn from "./FadeIn";

const technologies = [
  "constraint",
  "ux",
  "ui",
  "accessibility",
  "tailwind",
  "playwright",
  "docker",
  "aws",
] as const;

export default function Tech() {
  const t = useTranslations("Tech");

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

      <div className="grid grid-cols-3 gap-6 max-[960px]:grid-cols-2 max-[720px]:grid-cols-1">
        {technologies.map((technology) => (
          <div
            key={technology}
            className="rounded-[20px] bg-(--surface) p-6 text-center font-bold text-(--text)"
          >
            {t(technology)}
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

import { useTranslations } from "next-intl";

import FadeIn from "./FadeIn";

export default function Notice() {
  const t = useTranslations("Notice");

  return (
    <FadeIn className="py-16 max-[720px]:py-10">
      <div className="rounded-3xl border border-(--notice-border) bg-(--notice-bg) p-8 text-center">
        <p className="m-0 leading-7 font-bold text-(--notice-text)">
          {t("message")}
        </p>
      </div>
    </FadeIn>
  );
}

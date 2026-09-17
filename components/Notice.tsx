import { useTranslations } from "next-intl";

import Container from "./Container";
import FadeIn from "./FadeIn";

export default function Notice() {
  const t = useTranslations("Notice");

  return (
    <section className="py-16 max-[720px]:py-10">
      <Container>
        <FadeIn>
          <div className="rounded-3xl border border-(--notice-border) bg-(--notice-bg) p-8 text-center">
            <p className="m-0 leading-7 font-bold text-(--notice-text)">
              {t("message")}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

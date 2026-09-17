import { useTranslations } from "next-intl";

import Container from "./Container";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 pb-12">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <LanguageSwitcher />

          <p className="m-0 text-[0.9rem] tracking-[0.04em] text-(--muted)">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </Container>
    </footer>
  );
}

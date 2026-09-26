import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa";

import Container from "./Container";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 pb-12">
      <Container>
        <div className="relative flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <LanguageSwitcher />

            <p className="m-0 text-[0.9rem] tracking-[0.04em] text-(--muted)">
              {t("copyright", { year: currentYear })}
              <span aria-hidden="true"> / </span>
              <a
                href="https://animal.hamltail.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                Animal Corporation
              </a>
            </p>
          </div>

          <a
            href="https://github.com/hamltail/Pawth#readme"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-(--muted) transition-opacity hover:opacity-80 md:absolute md:top-1/2 md:left-[90%] md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </Container>
    </footer>
  );
}

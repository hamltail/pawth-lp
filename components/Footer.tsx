import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 pb-12 text-center">
      <p className="m-0 text-[0.9rem] tracking-[0.04em] text-(--muted)">
        {t("copyright", { year: currentYear })}
      </p>
    </footer>
  );
}

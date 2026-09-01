"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { setLocale } from "../lib/locale";

const locales = [
  {
    value: "ja",
    label: "日本語",
  },
  {
    value: "en",
    label: "English",
  },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: "ja" | "en") => {
    if (nextLocale === locale) {
      return;
    }

    startTransition(async () => {
      await setLocale(nextLocale);
      router.refresh();
    });
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center justify-center gap-3 text-xs text-(--muted)"
    >
      {locales.map(({ value, label }) => {
        const isActive = locale === value;

        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            disabled={isPending}
            onClick={() => handleLocaleChange(value)}
            className={`transition-colors ${
              isActive
                ? "font-medium text-(--text)"
                : "cursor-pointer hover:text-(--text)"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

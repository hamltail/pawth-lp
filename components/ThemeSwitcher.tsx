"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { useTheme } from "./ThemeProvider";

const themes = [
  {
    value: "light",
    labelKey: "light",
    icon: (
      <svg
        className="size-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
  },
  {
    value: "dark",
    labelKey: "dark",
    icon: (
      <svg
        className="size-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36A7 7 0 0 1 12 3Z" />
      </svg>
    ),
  },
  {
    value: "system",
    labelKey: "system",
    icon: (
      <svg
        className="size-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </svg>
    ),
  },
] as const;

const subscribe = () => () => {};

export default function ThemeSwitcher() {
  const t = useTranslations("ThemeSwitcher");
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const selectedTheme = mounted
    ? (themes.find((item) => item.value === theme) ?? themes[2])
    : themes[2];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="absolute top-5 right-5 z-9998"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={!mounted}
        aria-label={t("change")}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "theme-options" : undefined}
        title={t("change")}
        onClick={() => setIsOpen((current) => !current)}
        className="grid size-12 cursor-pointer place-items-center rounded-full border border-(--border) bg-(--panel) text-(--text) shadow-(--shadow) backdrop-blur-md transition-colors hover:bg-(--surface)"
      >
        <span aria-hidden="true" className="size-5">
          {selectedTheme.icon}
        </span>
      </button>

      {isOpen && (
        <div
          id="theme-options"
          role="group"
          aria-label={t("change")}
          className="absolute top-full right-0 mt-2 flex gap-1 rounded-full border border-(--border) bg-(--panel) p-1 shadow-(--shadow) backdrop-blur-md"
        >
          {themes.map((item) => {
            const isActive = theme === item.value;
            const label = t(item.labelKey);

            return (
              <button
                key={item.value}
                type="button"
                aria-label={label}
                aria-pressed={isActive}
                title={label}
                onClick={() => {
                  setTheme(item.value);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                className={`grid size-9 cursor-pointer place-items-center rounded-full transition-colors ${
                  isActive
                    ? "bg-(--primary) text-white"
                    : "text-(--muted) hover:bg-(--surface)"
                }`}
              >
                <span className="size-4">{item.icon}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useTheme } from "./ThemeProvider";

const themes = [
  {
    value: "light",
    label: "ライトテーマ",
    icon: (
      <svg
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
    label: "ダークテーマ",
    icon: (
      <svg
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
    label: "システムテーマ",
    icon: (
      <svg
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

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-5 right-5 z-9998 flex gap-1 rounded-full border border-(--border) bg-(--panel) p-1 shadow-(--shadow) backdrop-blur-md">
      {themes.map((item) => {
        const isActive = theme === item.value;

        return (
          <button
            key={item.value}
            type="button"
            className={`grid size-9 cursor-pointer place-items-center rounded-full transition-colors ${
              isActive
                ? "bg-(--primary) text-white"
                : "text-(--muted) hover:bg-(--surface)"
            }`}
            aria-label={item.label}
            aria-pressed={isActive}
            title={item.label}
            onClick={() => setTheme(item.value)}
          >
            <span className="size-4">{item.icon}</span>
          </button>
        );
      })}
    </div>
  );
}

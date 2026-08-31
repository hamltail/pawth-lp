"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 320);
    };

    window.addEventListener("scroll", updateVisibility);
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`fixed right-5 bottom-5 z-9999 inline-flex size-14 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-(--primary) text-white shadow-[0_16px_40px_rgba(109,40,217,0.18)] transition-[opacity,transform,visibility,background-color] duration-240 hover:-translate-y-1 hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--primary) motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[720px]:right-[0.9rem] max-[720px]:bottom-[0.9rem] max-[720px]:size-12 ${
        isVisible
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-3 opacity-0"
      }`}
      aria-label="ページ上部へ戻る"
      onClick={scrollToTop}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-5"
      >
        <path d="m6 15 6-6 6 6" />
      </svg>
    </button>
  );
}

"use client";

import { useEffect } from "react";

export default function FadeInObserver() {
  useEffect(() => {
    const fadeInElements =
      document.querySelectorAll<HTMLElement>(".fade-in");

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    fadeInElements.forEach((element) => {
      observer.observe(element);
    });

    const introSection =
      document.querySelector<HTMLElement>(".section--intro");

    if (!introSection) {
      return () => {
        observer.disconnect();
      };
    }

    const screenCards =
      introSection.querySelectorAll<HTMLElement>(".screen-card");

    if (prefersReduced) {
      screenCards.forEach((card) => {
        card.classList.add("is-visible");
      });
    }

    const introObserver = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          screenCards.forEach((card) => {
            card.classList.add("is-visible");
          });

          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -15% 0px",
      },
    );

    if (!prefersReduced && screenCards.length > 0) {
      introObserver.observe(introSection);
    }

    return () => {
      observer.disconnect();
      introObserver.disconnect();
    };
  }, []);

  return null;
}

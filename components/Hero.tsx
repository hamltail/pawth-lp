"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import Container from "./Container";
import HeroPawTrail from "./HeroPawTrail";
import styles from "./HeroTitle.module.css";

type IntroStage = "idle" | "title" | "copy" | "pause" | "trail";

const TRAIL_START_DELAY = 600;

export default function Hero() {
  const t = useTranslations("Hero");
  const title = t("title");
  const letters = Array.from(title.toLowerCase());
  const [stage, setStage] = useState<IntroStage>("idle");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setStage("title");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (stage !== "pause") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStage("trail");
    }, TRAIL_START_DELAY);

    return () => window.clearTimeout(timer);
  }, [stage]);

  const isTitlePlaying = stage !== "idle";
  const isCopyVisible =
    stage === "copy" || stage === "pause" || stage === "trail";

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-x-clip pt-20 pb-32 md:pt-28 md:pb-36">
      <Container>
        <div className="relative isolate mx-auto max-w-4xl text-center">
          {stage === "trail" && <HeroPawTrail />}

          <div className="relative z-10">
            <p
              className={`mb-5 text-sm font-bold tracking-[0.14em] text-(--accent) uppercase ${styles.copy} ${isCopyVisible ? styles.copyVisible : ""}`}
            >
              {t("label")}
            </p>

            <h1
              className="hero-title flex items-center justify-center gap-3 text-[clamp(3.5rem,9vw,7rem)] leading-none font-black tracking-tight"
              aria-label={title}
            >
              <span className="inline-flex" aria-hidden="true">
                {letters.map((letter, index) => (
                  <span
                    key={index}
                    className={`${styles.letter} ${isTitlePlaying ? styles.letterEntrance : ""}`}
                    style={{ animationDelay: `${index * 180}ms` }}
                  >
                    {index === 0 ? (
                      <span className={styles.firstLetter}>
                        <span
                          className={`${styles.lowercaseP} ${isTitlePlaying ? styles.lowercaseExit : ""}`}
                        >
                          {letter}
                        </span>
                        <span
                          className={`${styles.uppercaseP} ${isTitlePlaying ? styles.uppercaseEntrance : ""}`}
                          onAnimationEnd={(event) => {
                            if (event.target === event.currentTarget) {
                              setStage((current) =>
                                current === "title" ? "copy" : current,
                              );
                            }
                          }}
                        >
                          {letter.toUpperCase()}
                        </span>
                      </span>
                    ) : (
                      letter
                    )}
                  </span>
                ))}
              </span>

              <span
                className={`hero-paw-wrapper inline-block h-[0.96em] w-[0.96em] shrink-0 ${styles.pawHidden} ${isTitlePlaying ? styles.pawEntrance : ""}`}
                aria-hidden="true"
              >
                <span className="hero-paw" />
              </span>
            </h1>

            <p
              className={`mt-8 text-[clamp(1.25rem,2vw,1.6rem)] leading-relaxed font-bold ${styles.copy} ${isCopyVisible ? styles.copyVisible : ""}`}
            >
              {t("lead")}
            </p>

            <p
              className={`mx-auto mt-5 text-base leading-8 text-(--muted) md:text-lg ${styles.copy} ${isCopyVisible ? styles.copyVisible : ""}`}
              onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) {
                  setStage((current) =>
                    current === "copy" ? "pause" : current,
                  );
                }
              }}
            >
              {t("description")}
            </p>
          </div>
        </div>
      </Container>

      <a
        href="#screens"
        aria-hidden={!isCopyVisible}
        tabIndex={isCopyVisible ? 0 : -1}
        className={`absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-(--muted) transition-opacity hover:opacity-70 md:bottom-8 ${styles.copy} ${isCopyVisible ? styles.copyVisible : "pointer-events-none"}`}
      >
        SCROLL
        <span aria-hidden="true" className="h-8 w-px bg-current opacity-60" />
      </a>
    </section>
  );
}

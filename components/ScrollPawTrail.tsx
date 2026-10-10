"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./ScrollPawTrail.module.css";

type PawMark = {
  id: number;
  x: number;
  y: number;
  rotation: number;
};

const STEP_GAP = 92;
const ARC_HEIGHT = 1600;

function createMarks(pageHeight: number, startY: number): PawMark[] {
  if (pageHeight < startY) {
    return [];
  }

  const count = Math.floor((pageHeight - startY) / STEP_GAP) + 1;

  return Array.from({ length: count }, (_, id) => {
    const y = startY + id * STEP_GAP;
    const angle = ((y - startY) / ARC_HEIGHT) * 2 * Math.PI - Math.PI / 2;
    const footOffset = id % 2 === 0 ? -2.2 : 2.2;

    return {
      id,
      x: 50 + 30 * Math.sin(angle) + footOffset,
      y,
      rotation: 180 + 18 * Math.cos(angle) + (id % 2 === 0 ? -12 : 12),
    };
  });
}

export default function ScrollPawTrail() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState<PawMark[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    const page = layer?.parentElement;

    if (!layer || !page) {
      return;
    }

    let scrollFrame: number | null = null;
    let resizeFrame: number | null = null;

    const updateScroll = () => {
      scrollFrame = null;

      const pageTop = window.scrollY + page.getBoundingClientRect().top;

      const scrolled = Math.max(0, window.scrollY - pageTop);

      const front =
        scrolled + Math.min(scrolled * 0.65, window.innerHeight * 0.65);

      layer.style.setProperty("--paw-front", `${front}px`);
      layer.style.opacity = scrolled > 4 ? "1" : "0";
    };

    const onScroll = () => {
      if (scrollFrame === null) {
        scrollFrame = window.requestAnimationFrame(updateScroll);
      }
    };

    const measure = () => {
      resizeFrame = null;

      const scrollCue =
        page.querySelector<HTMLAnchorElement>('a[href="#screens"]');

      const pageRect = page.getBoundingClientRect();

      // Hero下部のSCROLL案内を肉球の出発位置にする
      const startY = scrollCue
        ? Math.max(0, scrollCue.getBoundingClientRect().top - pageRect.top)
        : window.innerHeight;

      setMarks(createMarks(page.offsetHeight, startY));
      onScroll();
    };

    const onResize = () => {
      if (resizeFrame === null) {
        resizeFrame = window.requestAnimationFrame(measure);
      }
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(page);

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onResize);

    onResize();
    onScroll();

    return () => {
      observer.disconnect();

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (scrollFrame !== null) {
        window.cancelAnimationFrame(scrollFrame);
      }

      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className={styles.layer}
      aria-hidden="true"
      data-testid="scroll-paw-trail"
    >
      {marks.map((mark) => (
        <span
          key={mark.id}
          className={styles.paw}
          style={{
            left: `${mark.x}%`,
            top: `${mark.y}px`,
            transform: `translate(-50%, -50%) rotate(${mark.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

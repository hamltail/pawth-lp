"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

import styles from "./ScrollPawTrail.module.css";

type PawMark = {
  id: number;
  x: number;
  y: number;
  rotation: number;
};

type ScrollDirection = "down" | "up";

const STEP_GAP = 92;
const ARC_HEIGHT = 1600;
const TRAIL_LENGTH = 580;
const HEAD_FADE = 80;
const TAIL_FADE = 240;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

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

  // ページの高さと肉球の出発位置を測定
  useEffect(() => {
    const page = layerRef.current?.parentElement;

    if (!page) {
      return;
    }

    let resizeFrame: number | null = null;

    const measure = () => {
      resizeFrame = null;

      const scrollCue =
        page.querySelector<HTMLAnchorElement>('a[href="#screens"]');

      const pageRect = page.getBoundingClientRect();

      const startY = scrollCue
        ? Math.max(0, scrollCue.getBoundingClientRect().top - pageRect.top)
        : window.innerHeight;

      setMarks(createMarks(page.offsetHeight, startY));
    };

    const onResize = () => {
      if (resizeFrame === null) {
        resizeFrame = window.requestAnimationFrame(measure);
      }
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(page);

    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);

      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }
    };
  }, []);

  // スクロール量・方向に応じて肉球の表示を更新
  useEffect(() => {
    const layer = layerRef.current;
    const page = layer?.parentElement;

    if (!layer || !page) {
      return;
    }

    const pawElements = Array.from(layer.querySelectorAll<HTMLElement>("span"));

    let scrollFrame: number | null = null;
    let previousScrollY = window.scrollY;

    let direction: ScrollDirection =
      layer.dataset.direction === "up" ? "up" : "down";

    const updateScroll = () => {
      scrollFrame = null;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - previousScrollY;

      // スクロール方向を判定
      if (delta > 1) {
        direction = "down";
      } else if (delta < -1) {
        direction = "up";
      }

      previousScrollY = currentScrollY;
      layer.dataset.direction = direction;

      const viewportTop = Math.max(0, -page.getBoundingClientRect().top);

      const viewportHeight = window.innerHeight;

      // 下りは画面下側、上りは画面上側から足跡が進む
      const front =
        direction === "down"
          ? viewportTop + Math.min(viewportTop * 0.65, viewportHeight * 0.65)
          : viewportTop + viewportHeight * 0.25;

      // 画面の上下端で徐々に透明にする範囲
      const edgeFade = Math.min(140, viewportHeight * 0.2);

      layer.style.opacity = viewportTop > 4 ? "1" : "0";

      marks.forEach((mark, index) => {
        const element = pawElements[index];

        if (!element) {
          return;
        }

        // 進行方向に合わせて、新しい足跡が現れる位置を反転
        const distance = direction === "down" ? front - mark.y : mark.y - front;

        const trailVisibility =
          clamp01(distance / HEAD_FADE) *
          clamp01((TRAIL_LENGTH - distance) / TAIL_FADE);

        // 肉球が画面の上下端へ近づいたらフェードアウト
        const screenY = mark.y - viewportTop;

        const edgeVisibility =
          clamp01(screenY / edgeFade) *
          clamp01((viewportHeight - screenY) / edgeFade);

        const visibility = trailVisibility * edgeVisibility;

        element.style.setProperty("--paw-visibility", visibility.toFixed(4));
      });
    };

    const onScroll = () => {
      if (scrollFrame === null) {
        scrollFrame = window.requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (scrollFrame !== null) {
        window.cancelAnimationFrame(scrollFrame);
      }
    };
  }, [marks]);

  return (
    <div
      ref={layerRef}
      className={styles.layer}
      aria-hidden="true"
      data-testid="scroll-paw-trail"
      data-direction="down"
    >
      {marks.map((mark) => (
        <span
          key={mark.id}
          className={styles.paw}
          style={
            {
              left: `${mark.x}%`,
              top: `${mark.y}px`,
              "--paw-rotation": `${mark.rotation}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

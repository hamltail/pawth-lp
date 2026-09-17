"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: ReactNode | ((isVisible: boolean) => ReactNode);
  className?: string;
};

export default function FadeIn({ children, className = "" }: FadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${className} transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.2,0.9,0.2,1)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {typeof children === "function" ? children(isVisible) : children}
    </div>
  );
}

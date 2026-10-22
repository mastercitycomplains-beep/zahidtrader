"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type TradingLottieProps = {
  /** Public path, e.g. `/animations/stock-chart.json` */
  src: string;
  className?: string;
  ariaLabel?: string;
  /** Defer loading until the element enters the viewport */
  lazy?: boolean;
  loop?: boolean;
  autoplay?: boolean;
};

export default function TradingLottie({
  src,
  className,
  ariaLabel = "Trading and market chart animation",
  lazy = true,
  loop = true,
  autoplay = true,
}: TradingLottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy, shouldLoad]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center", className)}
      role="img"
      aria-label={ariaLabel}
    >
      {reduceMotion ? (
        <div
          className="w-full h-full min-h-[240px] rounded-2xl border border-white/[0.08] bg-gradient-to-br from-brand-surface to-brand-dark flex items-end justify-center gap-1.5 p-8"
          aria-hidden
        >
          {[32, 48, 28, 56, 40, 64, 36].map((h, i) => (
            <div
              key={i}
              className="w-2 sm:w-2.5 rounded-sm bg-brand-teal/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      ) : shouldLoad ? (
        <DotLottieReact
          src={src}
          loop={loop}
          autoplay={autoplay}
          className="w-full h-full max-w-[520px] mx-auto"
          renderConfig={{ autoResize: true }}
        />
      ) : (
        <div
          className="w-full aspect-square max-w-[520px] mx-auto rounded-2xl border border-white/[0.06] bg-brand-surface/50 animate-pulse"
          aria-hidden
        />
      )}
    </div>
  );
}

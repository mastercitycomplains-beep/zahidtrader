"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MotionFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  inViewOnly?: boolean;
}

export default function MotionFade({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
  inViewOnly = false,
}: MotionFadeProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offsetMap = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initial = {
    opacity: 0,
    ...offsetMap[direction],
  };

  const animateTarget = { opacity: 1, x: 0, y: 0 };
  const transitionConfig = {
    duration,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  if (inViewOnly) {
    return (
      <motion.div
        initial={initial}
        whileInView={animateTarget}
        viewport={{ once: true, amount: 0.1 }}
        transition={transitionConfig}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initial}
      animate={animateTarget}
      transition={transitionConfig}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
}

export default function MotionCard({
  children,
  className = "",
  hoverScale = 1.015,
  hoverY = -4,
}: MotionCardProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{
        y: hoverY,
        scale: hoverScale,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

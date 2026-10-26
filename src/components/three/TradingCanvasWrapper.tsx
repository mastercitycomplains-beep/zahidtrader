"use client";

import React, { Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

interface TradingCanvasWrapperProps {
  children: ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
  gl?: {
    antialias?: boolean;
    alpha?: boolean;
    powerPreference?: "high-performance" | "default" | "low-power";
  };
}

export default function TradingCanvasWrapper({
  children,
  className = "w-full h-full",
  camera = { position: [0, 2, 12], fov: 45, near: 0.1, far: 1000 },
  gl = { antialias: true, alpha: true, powerPreference: "high-performance" },
}: TradingCanvasWrapperProps) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={camera}
        gl={gl}
        dpr={[1, 1.75]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}

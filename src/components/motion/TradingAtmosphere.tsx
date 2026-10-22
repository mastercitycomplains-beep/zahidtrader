"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface ParticleNode {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  type: "bull" | "bear" | "neutral";
  size: number;
  height: number;
}

export default function TradingAtmosphere({
  className = "",
  intensity = "subtle",
}: {
  className?: string;
  intensity?: "subtle" | "prominent";
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mouse coordinates for 3D parallax tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = x * 0.35;
      targetTiltY = y * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Pause when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    // Node count based on screen width
    const nodeCount = Math.min(width < 768 ? 24 : 48, intensity === "prominent" ? 56 : 38);
    const nodes: ParticleNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * 500 + 100, // Depth from camera
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.25,
        vz: (Math.random() - 0.5) * 0.4,
        type: Math.random() > 0.45 ? "bull" : Math.random() > 0.5 ? "bear" : "neutral",
        size: Math.random() * 3 + 2,
        height: Math.random() * 14 + 6,
      });
    }

    const isDark = resolvedTheme === "dark";
    const bullColor = isDark ? "rgba(22, 184, 173, " : "rgba(12, 148, 141, ";
    const bearColor = isDark ? "rgba(239, 68, 68, " : "rgba(220, 38, 38, ";
    const neutralColor = isDark ? "rgba(148, 163, 184, " : "rgba(100, 116, 139, ";
    const lineColor = isDark ? "rgba(22, 184, 173, " : "rgba(15, 23, 42, ";

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth tilt interpolation
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      const fov = 350; // Camera field of view
      const centerX = width / 2;
      const centerY = height / 2;

      // Projected node coordinates
      const projected = nodes.map((n) => {
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          n.z += n.vz;

          // Boundary bounce / wrap
          const halfW = (width * 1.2) / 2;
          const halfH = (height * 1.2) / 2;
          if (n.x < -halfW) n.x = halfW;
          if (n.x > halfW) n.x = -halfW;
          if (n.y < -halfH) n.y = halfH;
          if (n.y > halfH) n.y = -halfH;
          if (n.z < 100) n.z = 600;
          if (n.z > 600) n.z = 100;
        }

        // Apply 3D perspective projection with tilt
        const rotatedX = n.x * Math.cos(currentTiltX) - n.z * Math.sin(currentTiltX);
        const rotatedZ = n.x * Math.sin(currentTiltX) + n.z * Math.cos(currentTiltX);
        const rotatedY = n.y * Math.cos(currentTiltY) - rotatedZ * Math.sin(currentTiltY);

        const scale = fov / (fov + rotatedZ);
        const px = centerX + rotatedX * scale;
        const py = centerY + rotatedY * scale;
        const alpha = Math.max(0.08, Math.min(0.65, (1 - rotatedZ / 650) * 0.8));

        return { px, py, scale, alpha, node: n };
      });

      // Draw subtle connecting vectors between proximate financial nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.12 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `${lineColor}${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw 3D Candlestick & Node symbols
      for (const p of projected) {
        const { px, py, scale, alpha, node } = p;
        if (px < -20 || px > width + 20 || py < -20 || py > height + 20) continue;

        const baseColor =
          node.type === "bull"
            ? bullColor
            : node.type === "bear"
            ? bearColor
            : neutralColor;

        const candleW = Math.max(2, node.size * scale * 1.5);
        const candleH = Math.max(4, node.height * scale * 1.5);
        const wickH = candleH * 1.8;

        ctx.strokeStyle = `${baseColor}${alpha * 0.85})`;
        ctx.fillStyle = `${baseColor}${alpha * 0.65})`;
        ctx.lineWidth = Math.max(0.75, 1 * scale);

        // Candlestick upper & lower wick
        ctx.beginPath();
        ctx.moveTo(px, py - wickH / 2);
        ctx.lineTo(px, py + wickH / 2);
        ctx.stroke();

        // Candlestick real body
        ctx.fillRect(px - candleW / 2, py - candleH / 2, candleW, candleH);
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [mounted, resolvedTheme, intensity]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${
        mounted ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

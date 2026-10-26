"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import TradingCanvasWrapper from "./TradingCanvasWrapper";

// 3D Floating Geometry Nodes that react to scroll
function FloatingSceneNodes({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 3D Candlestick & Node elements
  const elements = useMemo(() => {
    const items = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      const isBull = Math.random() > 0.45;
      items.push({
        pos: [
          (Math.random() - 0.5) * 28,
          (Math.random() - 0.5) * 45,
          (Math.random() - 0.5) * 20 - 5,
        ] as [number, number, number],
        scale: [
          0.3 + Math.random() * 0.35,
          0.8 + Math.random() * 2.5,
          0.3 + Math.random() * 0.35,
        ] as [number, number, number],
        color: isBull ? "#00F5A0" : "#FF3366",
        emissive: isBull ? "#00A86B" : "#A80036",
        speed: 0.2 + Math.random() * 0.5,
        rotationSpeed: (Math.random() - 0.5) * 0.8,
      });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Camera travels through 3D space based on page scroll
    const targetY = scrollProgress * 15;
    const targetZ = 12 - scrollProgress * 8;
    const targetRotX = scrollProgress * 0.4;
    const targetRotY = scrollProgress * 0.6;

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.06
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.06
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.04
    );

    // Subtle drift
    groupRef.current.children.forEach((child, i) => {
      child.rotation.y += delta * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {elements.map((item, idx) => (
        <group key={idx} position={item.pos}>
          {/* 3D Box Body */}
          <mesh scale={item.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={item.color}
              emissive={item.emissive}
              emissiveIntensity={0.6}
              transparent
              opacity={0.35}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          {/* Center Wick */}
          <mesh scale={[0.06, item.scale[1] * 1.6, 0.06]}>
            <cylinderGeometry args={[1, 1, 1, 8]} />
            <meshBasicMaterial
              color={item.color}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      ))}

      {/* Floating 3D Geometric Coordinate Rings */}
      <mesh position={[0, -5, -4]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.25} />
      </mesh>
      <mesh position={[0, 15, -6]} rotation={[-Math.PI / 4, 0, 0]}>
        <torusGeometry args={[12, 0.025, 16, 100]} />
        <meshBasicMaterial color="#00F5A0" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, 35, -8]} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[16, 0.03, 16, 100]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function ScrollAtmosphere3D({
  className = "fixed inset-0 pointer-events-none z-0 overflow-hidden",
}: {
  className?: string;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
          setScrollProgress(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className={className} aria-hidden>
      <TradingCanvasWrapper
        camera={{ position: [0, 0, 16], fov: 50, near: 0.1, far: 200 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.0} color="#00E5FF" />
        <pointLight position={[-10, -10, 5]} intensity={0.8} color="#00F5A0" />
        <FloatingSceneNodes scrollProgress={scrollProgress} />
      </TradingCanvasWrapper>
    </div>
  );
}

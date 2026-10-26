"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import TradingCanvasWrapper from "./TradingCanvasWrapper";
import { Target, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";

function RatioVolumeScene({
  rrRatio,
  direction,
}: {
  rrRatio: number;
  direction: "LONG" | "SHORT";
}) {
  const isLong = direction === "LONG";
  const groupRef = useRef<THREE.Group>(null);

  // Height scaling
  const stopHeight = 1.2;
  const targetHeight = stopHeight * rrRatio;

  const targetCenterY = isLong ? targetHeight / 2 + 0.05 : -(targetHeight / 2 + 0.05);
  const stopCenterY = isLong ? -(stopHeight / 2 + 0.05) : stopHeight / 2 + 0.05;

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle floating tilt
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 8]} intensity={1.8} color="#FFFFFF" />
      <pointLight position={[-5, 5, 5]} intensity={1.5} color="#00E5FF" />
      <pointLight position={[5, -5, -5]} intensity={1.5} color="#00F5A0" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.7}
      />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={groupRef}>
          {/* Entry Level Holographic Plane (Cyan) */}
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 3.2]} />
            <meshStandardMaterial
              color="#00E5FF"
              emissive="#00B4D8"
              emissiveIntensity={1.0}
              transparent
              opacity={0.65}
              roughness={0.1}
              metalness={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Entry Ring Perimeter */}
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.6, 1.65, 32]} />
            <meshBasicMaterial color="#FFFFFF" side={THREE.DoubleSide} />
          </mesh>

          {/* Take Profit Target Volume Box (Emerald) */}
          <mesh position={[0, targetCenterY, 0]}>
            <boxGeometry args={[2.5, targetHeight, 2.5]} />
            <meshPhysicalMaterial
              color="#00F5A0"
              emissive="#00A86B"
              emissiveIntensity={0.8}
              transparent
              opacity={0.45}
              roughness={0.15}
              metalness={0.7}
              transmission={0.4}
              thickness={0.8}
            />
          </mesh>

          {/* Stop Loss Invalidation Volume Box (Crimson) */}
          <mesh position={[0, stopCenterY, 0]}>
            <boxGeometry args={[2.5, stopHeight, 2.5]} />
            <meshPhysicalMaterial
              color="#FF3366"
              emissive="#A80036"
              emissiveIntensity={0.8}
              transparent
              opacity={0.45}
              roughness={0.15}
              metalness={0.7}
              transmission={0.4}
              thickness={0.8}
            />
          </mesh>

          {/* Target 3D Label */}
          <Html position={[1.8, targetCenterY, 0]} center distanceFactor={10} className="pointer-events-none select-none">
            <div className="bg-[#090D11]/90 border border-emerald-500/50 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-mono text-emerald-300 whitespace-nowrap shadow-xl">
              <span className="font-bold">TP: +{rrRatio.toFixed(1)}R</span>
              <span className="text-gray-400 block text-[9px]">+${(rrRatio * 150).toFixed(0)}</span>
            </div>
          </Html>

          {/* Entry 3D Label */}
          <Html position={[1.8, 0, 0]} center distanceFactor={10} className="pointer-events-none select-none">
            <div className="bg-[#090D11]/90 border border-cyan-400/50 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-mono text-cyan-300 whitespace-nowrap shadow-xl font-bold">
              ENTRY LEVEL
            </div>
          </Html>

          {/* Stop Loss 3D Label */}
          <Html position={[1.8, stopCenterY, 0]} center distanceFactor={10} className="pointer-events-none select-none">
            <div className="bg-[#090D11]/90 border border-rose-500/50 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-mono text-rose-300 whitespace-nowrap shadow-xl">
              <span className="font-bold">SL: -1.0R</span>
              <span className="text-gray-400 block text-[9px]">-$150 Risk</span>
            </div>
          </Html>
        </group>
      </Float>
    </>
  );
}

export default function RiskRewardHologram3D({
  className = "w-full h-[400px] sm:h-[480px]",
}: {
  className?: string;
}) {
  const [ratio, setRatio] = useState<number>(3.0);
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");

  const riskAmount = 150;
  const rewardAmount = riskAmount * ratio;

  return (
    <div className={`relative rounded-3xl border border-teal-500/30 bg-[#090D11]/90 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-teal-950/20 ${className}`}>
      {/* Top Header */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 sm:p-5 flex items-center justify-between border-b border-white/[0.06] bg-[#090D11]/60 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-center text-brand-teal">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-white font-black text-sm font-display tracking-tight flex items-center gap-1.5">
              <span>3D Asymmetric Risk-Reward Matrix</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-teal/20 text-brand-teal font-bold border border-brand-teal/30">
                1:{ratio.toFixed(1)}
              </span>
            </h4>
            <p className="text-[11px] text-gray-400 font-mono">
              Visual volumetric profit expectancy vs bounded risk
            </p>
          </div>
        </div>

        {/* Direction Switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setDirection("LONG")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
              direction === "LONG"
                ? "bg-emerald-500 text-[#090D11]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            LONG
          </button>
          <button
            type="button"
            onClick={() => setDirection("SHORT")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
              direction === "SHORT"
                ? "bg-rose-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            SHORT
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <TradingCanvasWrapper camera={{ position: [0, 0, 8.5], fov: 45 }}>
        <RatioVolumeScene rrRatio={ratio} direction={direction} />
      </TradingCanvasWrapper>

      {/* Bottom Ratio Controls */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-3 sm:p-4 border-t border-white/[0.06] bg-[#090D11]/80 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-[11px]">Expectancy Ratio:</span>
            {[1.5, 2.0, 3.0, 4.0, 5.0].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRatio(r)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  ratio === r
                    ? "bg-brand-teal text-[#090D11] shadow-lg shadow-brand-teal/30"
                    : "bg-white/[0.04] text-gray-300 hover:text-white border border-white/10"
                }`}
              >
                1:{r.toFixed(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div>
              <span className="text-gray-500">Risk: </span>
              <span className="text-rose-400 font-bold">-${riskAmount}</span>
            </div>
            <div>
              <span className="text-gray-500">Potential Reward: </span>
              <span className="text-emerald-400 font-bold">+${rewardAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import TradingCanvasWrapper from "./TradingCanvasWrapper";
import {
  TrendingUp,
  Maximize2,
  RotateCw,
  Compass,
  Zap,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Sample institutional data sets for instruments
const DATASETS: Record<string, { name: string; symbol: string; basePrice: number; candles: CandleData[] }> = {
  gold: {
    name: "Gold Spot",
    symbol: "XAU/USD",
    basePrice: 2684.5,
    candles: [
      { time: "09:00", open: 2672.4, high: 2678.8, low: 2671.0, close: 2677.2, volume: 1420 },
      { time: "10:00", open: 2677.2, high: 2682.0, low: 2675.1, close: 2681.4, volume: 1890 },
      { time: "11:00", open: 2681.4, high: 2683.5, low: 2678.9, close: 2680.1, volume: 1120 },
      { time: "12:00", open: 2680.1, high: 2686.2, low: 2679.5, close: 2685.8, volume: 2450 },
      { time: "13:00", open: 2685.8, high: 2689.4, low: 2684.0, close: 2688.1, volume: 2110 },
      { time: "14:00", open: 2688.1, high: 2689.0, low: 2682.2, close: 2683.5, volume: 1780 },
      { time: "15:00", open: 2683.5, high: 2687.0, low: 2682.8, close: 2686.9, volume: 1950 },
      { time: "16:00", open: 2686.9, high: 2692.5, low: 2685.3, close: 2691.8, volume: 3200 },
      { time: "17:00", open: 2691.8, high: 2695.0, low: 2689.4, close: 2694.2, volume: 2890 },
      { time: "18:00", open: 2694.2, high: 2696.8, low: 2691.0, close: 2695.5, volume: 3410 },
    ],
  },
  btc: {
    name: "Bitcoin",
    symbol: "BTC/USD",
    basePrice: 67840,
    candles: [
      { time: "09:00", open: 66400, high: 66900, low: 66200, close: 66850, volume: 4500 },
      { time: "10:00", open: 66850, high: 67300, low: 66700, close: 67210, volume: 6200 },
      { time: "11:00", open: 67210, high: 67450, low: 66950, close: 67020, volume: 3800 },
      { time: "12:00", open: 67020, high: 67600, low: 66900, close: 67550, volume: 7100 },
      { time: "13:00", open: 67550, high: 68100, low: 67400, close: 67980, volume: 8900 },
      { time: "14:00", open: 67980, high: 68250, low: 67700, close: 67810, volume: 5400 },
      { time: "15:00", open: 67810, high: 68400, low: 67750, close: 68320, volume: 9200 },
      { time: "16:00", open: 68320, high: 68900, low: 68150, close: 68850, volume: 11400 },
      { time: "17:00", open: 68850, high: 69150, low: 68600, close: 69020, volume: 9800 },
      { time: "18:00", open: 69020, high: 69500, low: 68900, close: 69420, volume: 12100 },
    ],
  },
  eur: {
    name: "Euro / US Dollar",
    symbol: "EUR/USD",
    basePrice: 1.0845,
    candles: [
      { time: "09:00", open: 1.0812, high: 1.0830, low: 1.0805, close: 1.0825, volume: 2200 },
      { time: "10:00", open: 1.0825, high: 1.0842, low: 1.0820, close: 1.0838, volume: 2900 },
      { time: "11:00", open: 1.0838, high: 1.0845, low: 1.0828, close: 1.0832, volume: 1800 },
      { time: "12:00", open: 1.0832, high: 1.0855, low: 1.0830, close: 1.0851, volume: 3400 },
      { time: "13:00", open: 1.0851, high: 1.0868, low: 1.0845, close: 1.0860, volume: 3100 },
      { time: "14:00", open: 1.0860, high: 1.0865, low: 1.0848, close: 1.0852, volume: 2100 },
      { time: "15:00", open: 1.0852, high: 1.0872, low: 1.0850, close: 1.0870, volume: 2800 },
      { time: "16:00", open: 1.0870, high: 1.0888, low: 1.0865, close: 1.0882, volume: 4100 },
      { time: "17:00", open: 1.0882, high: 1.0895, low: 1.0876, close: 1.0890, volume: 3600 },
      { time: "18:00", open: 1.0890, high: 1.0905, low: 1.0885, close: 1.0901, volume: 4500 },
    ],
  },
};

// 3D Single Candlestick with wick, glowing body, and hover tooltip
function CandleMesh({
  data,
  index,
  total,
  minVal,
  maxVal,
  onHover,
  isHovered,
}: {
  data: CandleData;
  index: number;
  total: number;
  minVal: number;
  maxVal: number;
  onHover: (data: CandleData | null) => void;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const isBull = data.close >= data.open;

  // Normalize price scale to 3D units (-3 to 3 on Y axis)
  const range = maxVal - minVal || 1;
  const normalizeY = (val: number) => ((val - minVal) / range) * 5.5 - 2.5;

  const openY = normalizeY(data.open);
  const closeY = normalizeY(data.close);
  const highY = normalizeY(data.high);
  const lowY = normalizeY(data.low);

  const bodyHeight = Math.max(Math.abs(closeY - openY), 0.12);
  const bodyCenterY = (openY + closeY) / 2;
  const wickHeight = Math.max(highY - lowY, 0.2);
  const wickCenterY = (highY + lowY) / 2;

  // X position spread across chart width
  const spacing = 0.95;
  const posX = (index - total / 2) * spacing;

  // Color scheme: institutional neon emerald for bull, deep ruby for bear
  const bullColor = "#00F5A0";
  const bullEmissive = "#00A86B";
  const bearColor = "#FF3366";
  const bearEmissive = "#A80036";

  const color = isBull ? bullColor : bearColor;
  const emissive = isBull ? bullEmissive : bearEmissive;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Hover pop animation
    const targetScale = isHovered ? 1.18 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 12);
  });

  return (
    <group
      ref={meshRef}
      position={[posX, 0, 0]}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onHover(data);
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* 3D Wick (Cylinder) */}
      <mesh position={[0, wickCenterY, 0]}>
        <cylinderGeometry args={[0.025, 0.025, wickHeight, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={isHovered ? 1.5 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 3D Candle Body (Box with chamfered look) */}
      <mesh position={[0, bodyCenterY, 0]}>
        <boxGeometry args={[0.55, bodyHeight, 0.55]} />
        <meshPhysicalMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={isHovered ? 1.8 : 0.75}
          roughness={0.15}
          metalness={0.85}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          transmission={0.25}
          thickness={0.5}
        />
      </mesh>

      {/* Volume Pillar Base (3D bar at the bottom) */}
      <mesh position={[0, -3.2, 0]}>
        <cylinderGeometry args={[0.16, 0.16, (data.volume / 12000) * 1.5 + 0.1, 16]} />
        <meshStandardMaterial
          color={color}
          opacity={0.4}
          transparent
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>

      {/* Hover Reticle & 3D Tooltip */}
      {isHovered && (
        <group position={[0, highY + 0.6, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.35, 0.45, 32]} />
            <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} />
          </mesh>
          <Html center distanceFactor={12} className="pointer-events-none select-none">
            <div className="bg-[#090D11]/95 border border-cyan-400/60 backdrop-blur-xl p-2.5 rounded-xl shadow-2xl text-[11px] font-mono text-white whitespace-nowrap min-w-[130px]">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10 font-bold">
                <span className="text-cyan-400">{data.time}</span>
                <span className={isBull ? "text-emerald-400" : "text-rose-400"}>
                  {isBull ? "+BULL" : "-BEAR"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px]">
                <span className="text-gray-400">O:</span> <span className="text-right text-gray-200">{data.open}</span>
                <span className="text-gray-400">H:</span> <span className="text-right text-emerald-300 font-bold">{data.high}</span>
                <span className="text-gray-400">L:</span> <span className="text-right text-rose-300 font-bold">{data.low}</span>
                <span className="text-gray-400">C:</span> <span className="text-right text-white font-bold">{data.close}</span>
                <span className="text-gray-400">Vol:</span> <span className="text-right text-brand-teal">{data.volume}</span>
              </div>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}

// 3D Moving Average Neon Ribbon Curve
function MovingAverageRibbon({
  candles,
  minVal,
  maxVal,
}: {
  candles: CandleData[];
  minVal: number;
  maxVal: number;
}) {
  const curveRef = useRef<THREE.Mesh>(null);
  const range = maxVal - minVal || 1;
  const normalizeY = (val: number) => ((val - minVal) / range) * 5.5 - 2.5;

  const curvePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const spacing = 0.95;
    candles.forEach((c, i) => {
      const posX = (i - candles.length / 2) * spacing;
      const posY = normalizeY(c.close);
      points.push(new THREE.Vector3(posX, posY, 0.15));
    });
    return points;
  }, [candles, minVal, maxVal]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints);
  }, [curvePoints]);

  useFrame((state) => {
    if (!curveRef.current) return;
    const mat = curveRef.current.material as THREE.MeshStandardMaterial;
    if (mat && mat.emissiveIntensity !== undefined) {
      mat.emissiveIntensity = 1.0 + Math.sin(state.clock.elapsedTime * 3) * 0.4;
    }
  });

  return (
    <mesh ref={curveRef}>
      <tubeGeometry args={[curve, 64, 0.045, 12, false]} />
      <meshStandardMaterial
        color="#00E5FF"
        emissive="#0099FF"
        emissiveIntensity={1.2}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

// 3D Floor Grid with Cybernetic Depth and Radial Rings
function HolographicGridPlane() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
  });

  return (
    <group ref={gridRef} position={[0, -3.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Polar Grid Rings */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[1.5, 1.53, 64]} />
        <meshBasicMaterial color="#00F5A0" opacity={0.25} transparent />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[3.5, 3.54, 64]} />
        <meshBasicMaterial color="#00E5FF" opacity={0.2} transparent />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[5.5, 5.55, 64]} />
        <meshBasicMaterial color="#00F5A0" opacity={0.12} transparent />
      </mesh>

      {/* Plane Grid Lines */}
      <gridHelper
        args={[16, 24, "#00E5FF", "#002B3D"]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.05]}
      />
    </group>
  );
}

// Floating 3D Financial Particles & Currency Dust
function FinancialParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorTeal = new THREE.Color("#00E5FF");
    const colorGreen = new THREE.Color("#00F5A0");
    const colorGold = new THREE.Color("#FFD700");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const c = Math.random() > 0.6 ? colorTeal : Math.random() > 0.3 ? colorGreen : colorGold;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Camera Mouse Parallax Rig
function CameraParallaxRig() {
  useFrame((state) => {
    const mouseX = state.pointer.x * 0.7;
    const mouseY = state.pointer.y * 0.5;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.8 + mouseY * 1.2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// Complete 3D Holographic Chart Scene
function ChartScene({
  instrumentKey,
  autoRotate,
}: {
  instrumentKey: string;
  autoRotate: boolean;
}) {
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);
  const data = DATASETS[instrumentKey] || DATASETS.gold;

  const minVal = useMemo(
    () => Math.min(...data.candles.map((c) => c.low)),
    [data]
  );
  const maxVal = useMemo(
    () => Math.max(...data.candles.map((c) => c.high)),
    [data]
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[-10, 5, -5]} intensity={1.8} color="#00E5FF" />
      <pointLight position={[10, -5, 5]} intensity={1.2} color="#00F5A0" />

      <CameraParallaxRig />

      {/* Orbit Controls with controlled angles */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 3}
      />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <group position={[0, 0.4, 0]}>
          {/* Render 3D Candlesticks */}
          {data.candles.map((candle, idx) => (
            <CandleMesh
              key={`${candle.time}-${idx}`}
              data={candle}
              index={idx}
              total={data.candles.length}
              minVal={minVal}
              maxVal={maxVal}
              onHover={setHoveredCandle}
              isHovered={hoveredCandle?.time === candle.time}
            />
          ))}

          {/* Render 3D Moving Average Line */}
          <MovingAverageRibbon candles={data.candles} minVal={minVal} maxVal={maxVal} />
        </group>
      </Float>

      {/* Ground Depth Grid */}
      <HolographicGridPlane />

      {/* Floating Particles */}
      <FinancialParticles />
    </>
  );
}

export default function HologramTradingChart3D({
  className = "w-full h-[480px] sm:h-[540px] lg:h-[580px]",
}: {
  className?: string;
}) {
  const [instrument, setInstrument] = useState<"gold" | "btc" | "eur">("gold");
  const [autoRotate, setAutoRotate] = useState(true);

  const currentData = DATASETS[instrument];
  const lastCandle = currentData.candles[currentData.candles.length - 1];
  const prevCandle = currentData.candles[currentData.candles.length - 2];
  const priceChange = lastCandle.close - prevCandle.close;
  const isPositive = priceChange >= 0;

  return (
    <div className={`relative rounded-3xl border border-cyan-500/25 bg-[#090D11]/90 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-cyan-950/30 ${className}`}>
      {/* Cyberpunk Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-teal/80 rounded-tl-2xl pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-teal/80 rounded-tr-2xl pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-teal/80 rounded-bl-2xl pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-teal/80 rounded-br-2xl pointer-events-none z-20" />

      {/* Top Holographic HUD Bar */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] bg-[#090D11]/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-teal/15 border border-brand-teal/40 flex items-center justify-center text-brand-teal shadow-inner">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-sm sm:text-base font-display tracking-tight">
                {currentData.name}
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-teal/15 text-brand-teal border border-brand-teal/30">
                {currentData.symbol}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping hidden sm:inline-block" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-white font-black text-sm tabular-nums">
                {lastCandle.close.toLocaleString()}
              </span>
              <span
                className={`font-bold flex items-center gap-0.5 ${
                  isPositive ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                <TrendingUp className={`w-3 h-3 ${!isPositive ? "rotate-180" : ""}`} />
                {isPositive ? "+" : ""}
                {priceChange.toFixed(2)}
              </span>
              <span className="text-gray-400 text-[10px] hidden md:inline">
                · Institutional 3D Depth Matrix
              </span>
            </div>
          </div>
        </div>

        {/* Instrument Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setInstrument("gold")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              instrument === "gold"
                ? "bg-brand-teal text-[#090D11] shadow-lg shadow-brand-teal/20"
                : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            XAU/USD
          </button>
          <button
            type="button"
            onClick={() => setInstrument("btc")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              instrument === "btc"
                ? "bg-brand-teal text-[#090D11] shadow-lg shadow-brand-teal/20"
                : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            BTC/USD
          </button>
          <button
            type="button"
            onClick={() => setInstrument("eur")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              instrument === "eur"
                ? "bg-brand-teal text-[#090D11] shadow-lg shadow-brand-teal/20"
                : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            EUR/USD
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <TradingCanvasWrapper camera={{ position: [0, 2, 11], fov: 42 }}>
        <ChartScene instrumentKey={instrument} autoRotate={autoRotate} />
      </TradingCanvasWrapper>

      {/* Bottom Holographic Control & Telemetry Bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] bg-[#090D11]/70 backdrop-blur-md text-[11px] font-mono">
        <div className="flex items-center gap-3 text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            <span className="text-gray-200 font-bold">Bullish Order Flow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
            <span className="text-gray-200 font-bold">Bearish Invalidation</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-cyan-400" />
            <span className="text-cyan-300">EMA 21 Ribbon</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all ${
              autoRotate
                ? "bg-brand-teal/20 border-brand-teal/50 text-brand-teal"
                : "bg-white/[0.04] border-white/10 text-gray-400 hover:text-white"
            }`}
            title="Toggle 3D Orbit Auto-Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
            <span>{autoRotate ? "Orbiting" : "Paused"}</span>
          </button>
          <span className="text-[10px] text-gray-500 hidden md:inline">
            Drag to rotate · Hover candles for metrics
          </span>
        </div>
      </div>
    </div>
  );
}

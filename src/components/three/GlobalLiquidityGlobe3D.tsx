"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import TradingCanvasWrapper from "./TradingCanvasWrapper";
import { Globe, Activity, Zap, Compass, RotateCw } from "lucide-react";

interface Hub {
  name: string;
  code: string;
  lat: number;
  lng: number;
  session: string;
  status: "Active" | "Pre-Market" | "Closed";
  volume: string;
  instruments: string[];
}

const TRADING_HUBS: Hub[] = [
  {
    name: "London",
    code: "LSE / FX",
    lat: 51.5,
    lng: -0.12,
    session: "European Session",
    status: "Active",
    volume: "$2.9 Trillion / day",
    instruments: ["GBP/USD", "EUR/USD", "XAU/USD"],
  },
  {
    name: "New York",
    code: "NYSE / CME",
    lat: 40.7,
    lng: -74.0,
    session: "US Session",
    status: "Active",
    volume: "$2.4 Trillion / day",
    instruments: ["DXY", "NAS100", "US30", "XAU/USD"],
  },
  {
    name: "Tokyo",
    code: "TSE",
    lat: 35.6,
    lng: 139.6,
    session: "Asian Session",
    status: "Pre-Market",
    volume: "$1.1 Trillion / day",
    instruments: ["USD/JPY", "Nikkei", "AUD/USD"],
  },
  {
    name: "Dubai",
    code: "DFM / DMCC",
    lat: 25.2,
    lng: 55.2,
    session: "Middle East Desk",
    status: "Active",
    volume: "$680 Billion / day",
    instruments: ["Gold Physical", "Oil WTI", "AED"],
  },
  {
    name: "Singapore",
    code: "SGX",
    lat: 1.35,
    lng: 103.8,
    session: "Asia-Pacific",
    status: "Pre-Market",
    volume: "$920 Billion / day",
    instruments: ["Forex Swaps", "CNY", "Gold"],
  },
  {
    name: "Frankfurt",
    code: "Deutsche Börse",
    lat: 50.1,
    lng: 8.6,
    session: "Euro Core",
    status: "Active",
    volume: "$840 Billion / day",
    instruments: ["EUR/USD", "GER40 (DAX)", "Bunds"],
  },
];

// Helper to convert Lat/Lng to 3D Cartesian coordinates on sphere radius R
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// 3D Animated Liquidity Arc connecting two hubs
function LiquidityArc({
  start,
  end,
  color = "#00F5A0",
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: string;
}) {
  const lineRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    // Elevate the midpoint radially away from sphere center
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const midLength = mid.length();
    mid.normalize();
    mid.multiplyScalar(midLength + 0.85); // Arc bulge height
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const mat = lineRef.current.material as THREE.MeshStandardMaterial;
    if (mat) {
      mat.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3 + start.x) * 0.35;
    }
  });

  return (
    <mesh ref={lineRef}>
      <tubeGeometry args={[curve, 32, 0.022, 8, false]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Globe Scene Component
function GlobeScene({
  onSelectHub,
  selectedHub,
  autoRotate,
}: {
  onSelectHub: (hub: Hub) => void;
  selectedHub: Hub | null;
  autoRotate: boolean;
}) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const sphereRadius = 2.4;

  // Convert hubs to 3D positions
  const hubPositions = useMemo(() => {
    return TRADING_HUBS.map((h) => ({
      hub: h,
      pos: latLngToVector3(h.lat, h.lng, sphereRadius),
    }));
  }, [sphereRadius]);

  // Connect prominent trading pairs (London <-> NY, London <-> Frankfurt, London <-> Dubai, NY <-> Tokyo, Dubai <-> Singapore)
  const connections = useMemo(() => {
    const pairs: [Hub, Hub][] = [
      [TRADING_HUBS[0], TRADING_HUBS[1]], // London <-> NY
      [TRADING_HUBS[0], TRADING_HUBS[5]], // London <-> Frankfurt
      [TRADING_HUBS[0], TRADING_HUBS[3]], // London <-> Dubai
      [TRADING_HUBS[3], TRADING_HUBS[4]], // Dubai <-> Singapore
      [TRADING_HUBS[4], TRADING_HUBS[2]], // Singapore <-> Tokyo
      [TRADING_HUBS[1], TRADING_HUBS[2]], // NY <-> Tokyo
    ];

    return pairs.map(([h1, h2]) => ({
      start: latLngToVector3(h1.lat, h1.lng, sphereRadius),
      end: latLngToVector3(h2.lat, h2.lng, sphereRadius),
      color: h1.status === "Active" && h2.status === "Active" ? "#00F5A0" : "#00E5FF",
    }));
  }, [sphereRadius]);

  // Generate latitude/longitude grid rings
  const latitudeRings = useMemo(() => {
    const rings = [];
    const step = 30;
    for (let lat = -60; lat <= 60; lat += step) {
      const phi = (90 - lat) * (Math.PI / 180);
      const ringRadius = sphereRadius * Math.sin(phi);
      const y = sphereRadius * Math.cos(phi);
      rings.push({ y, radius: ringRadius });
    }
    return rings;
  }, [sphereRadius]);

  useFrame((state, delta) => {
    if (!globeGroupRef.current) return;
    if (autoRotate) {
      globeGroupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.8} color="#FFFFFF" />
      <pointLight position={[-8, 0, 5]} intensity={1.4} color="#00E5FF" />
      <pointLight position={[8, -5, -5]} intensity={1.2} color="#00F5A0" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        dampingFactor={0.08}
      />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <group ref={globeGroupRef}>
          {/* Inner Core Holographic Sphere with translucent glass */}
          <mesh>
            <sphereGeometry args={[sphereRadius - 0.05, 48, 48]} />
            <meshPhysicalMaterial
              color="#03121F"
              emissive="#00223A"
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Wireframe Outer Shell */}
          <mesh>
            <sphereGeometry args={[sphereRadius, 36, 36]} />
            <meshBasicMaterial
              color="#00E5FF"
              wireframe
              transparent
              opacity={0.15}
            />
          </mesh>

          {/* Latitude Concentric Wire Rings */}
          {latitudeRings.map((ring, idx) => (
            <mesh key={idx} position={[0, ring.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[ring.radius - 0.01, ring.radius + 0.01, 64]} />
              <meshBasicMaterial color="#00F5A0" transparent opacity={0.18} side={THREE.DoubleSide} />
            </mesh>
          ))}

          {/* Interbank Liquidity Arcs */}
          {connections.map((conn, idx) => (
            <LiquidityArc key={idx} start={conn.start} end={conn.end} color={conn.color} />
          ))}

          {/* Trading Hub Beacons */}
          {hubPositions.map(({ hub, pos }) => {
            const isSelected = selectedHub?.name === hub.name;
            const isActive = hub.status === "Active";

            return (
              <group
                key={hub.name}
                position={pos}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHub(hub);
                }}
              >
                {/* Hub Node Dot */}
                <mesh>
                  <sphereGeometry args={[isSelected ? 0.12 : 0.08, 16, 16]} />
                  <meshStandardMaterial
                    color={isActive ? "#00F5A0" : "#00E5FF"}
                    emissive={isActive ? "#00F5A0" : "#00E5FF"}
                    emissiveIntensity={isSelected ? 2.5 : 1.4}
                  />
                </mesh>

                {/* Outer Pulsing Ring */}
                <mesh>
                  <ringGeometry args={[0.13, 0.16, 32]} />
                  <meshBasicMaterial
                    color={isActive ? "#00F5A0" : "#00E5FF"}
                    transparent
                    opacity={isSelected ? 0.9 : 0.4}
                    side={THREE.DoubleSide}
                  />
                </mesh>

                {/* Interactive HTML Tag */}
                <Html distanceFactor={14} position={[0, 0.25, 0]} center className="pointer-events-none select-none">
                  <div
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? "bg-brand-teal text-[#090D11] shadow-lg shadow-brand-teal/50 scale-110"
                        : "bg-[#090D11]/80 text-gray-300 border border-white/20"
                    }`}
                  >
                    {hub.name}
                  </div>
                </Html>
              </group>
            );
          })}
        </group>
      </Float>
    </>
  );
}

export default function GlobalLiquidityGlobe3D({
  className = "w-full h-[480px] sm:h-[540px]",
}: {
  className?: string;
}) {
  const [selectedHub, setSelectedHub] = useState<Hub>(TRADING_HUBS[0]);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className={`relative rounded-3xl border border-cyan-500/25 bg-[#090D11]/90 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-cyan-950/20 ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/[0.08] rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 sm:p-5 flex items-center justify-between border-b border-white/[0.06] bg-[#090D11]/60 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-center text-brand-teal">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-white font-black text-sm font-display tracking-tight flex items-center gap-1.5">
              <span>Global Interbank Liquidity Globe</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                LIVE OVERLAP
              </span>
            </h4>
            <p className="text-[11px] text-gray-400 font-mono">
              London &amp; New York Financial Corridor Real-Time Flow
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold font-mono transition-all ${
            autoRotate
              ? "bg-brand-teal/20 border-brand-teal/50 text-brand-teal"
              : "bg-white/[0.04] border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">{autoRotate ? "Auto-Orbit" : "Manual"}</span>
        </button>
      </div>

      {/* 3D Canvas */}
      <TradingCanvasWrapper camera={{ position: [0, 0, 6.8], fov: 45 }}>
        <GlobeScene
          onSelectHub={setSelectedHub}
          selectedHub={selectedHub}
          autoRotate={autoRotate}
        />
      </TradingCanvasWrapper>

      {/* Bottom Selected Hub Inspector Telemetry */}
      {selectedHub && (
        <div className="absolute bottom-0 inset-x-0 z-20 p-3 sm:p-4 border-t border-white/[0.06] bg-[#090D11]/80 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-white font-extrabold text-sm">{selectedHub.name}</span>
                <span className="text-gray-400 text-xs ml-1.5">({selectedHub.code})</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-brand-teal/15 text-brand-teal text-[10px] font-bold">
                {selectedHub.session}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <div>
                <span className="text-gray-500">Vol: </span>
                <span className="text-white font-bold">{selectedHub.volume}</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-500">Pairs: </span>
                <span className="text-cyan-300 font-bold">{selectedHub.instruments.join(" · ")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

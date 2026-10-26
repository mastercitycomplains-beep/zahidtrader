"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Float, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import TradingCanvasWrapper from "./TradingCanvasWrapper";
import { ShieldCheck, Award, Zap, Compass, RotateCw } from "lucide-react";

// Generate procedural gold coin face texture with canvas
function createCoinFaceTexture(textTop: string, textCenter: string, textBottom: string) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Rich radial gold gradient base
  const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 512);
  grad.addColorStop(0, "#FFF4B8");
  grad.addColorStop(0.3, "#FFD700");
  grad.addColorStop(0.7, "#D4AF37");
  grad.addColorStop(0.92, "#AA771C");
  grad.addColorStop(1, "#664400");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Outer beaded concentric rings
  ctx.strokeStyle = "#855806";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(512, 512, 480, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#FFEC99";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(512, 512, 460, 0, Math.PI * 2);
  ctx.stroke();

  // Fine serration dots around rim
  const dotCount = 72;
  for (let i = 0; i < dotCount; i++) {
    const angle = (i / dotCount) * Math.PI * 2;
    const x = 512 + Math.cos(angle) * 440;
    const y = 512 + Math.sin(angle) * 440;
    ctx.fillStyle = i % 2 === 0 ? "#5E3E04" : "#FFF7C2";
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Inner ring
  ctx.strokeStyle = "#AA771C";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(512, 512, 380, 0, Math.PI * 2);
  ctx.stroke();

  // Text settings
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Top curved banner text
  ctx.font = "900 48px 'Outfit', sans-serif";
  ctx.fillStyle = "#472E03";
  ctx.shadowColor = "#FFF8D6";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText(textTop, 512, 210);

  // Center Emblem: Large ZT monogram
  ctx.font = "900 170px 'Outfit', sans-serif";
  ctx.fillStyle = "#331E00";
  ctx.shadowColor = "#FFE066";
  ctx.shadowBlur = 12;
  ctx.fillText(textCenter, 512, 490);

  // Subtle subtitle under emblem
  ctx.font = "bold 34px 'Inter', sans-serif";
  ctx.fillStyle = "#5E3E04";
  ctx.shadowBlur = 0;
  ctx.fillText("MASTER THE MARKETS", 512, 620);

  // Bottom fine purity stamp
  ctx.font = "800 40px 'Inter', sans-serif";
  ctx.fillStyle = "#472E03";
  ctx.fillText(textBottom, 512, 800);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 3D Coin Model with front/back face, serrated edge, and orbital rings
function CoinModel({
  onSpin,
}: {
  onSpin?: () => void;
}) {
  const coinGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const [spinVelocity, setSpinVelocity] = useState(0.015);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const frontTexture = useMemo(
    () => createCoinFaceTexture("ZAHID TRADER", "ZT", "999.9 FINE GOLD · XAU/USD"),
    []
  );

  const backTexture = useMemo(
    () => createCoinFaceTexture("INSTITUTIONAL DESK", "✦", "LONDON · NEW YORK · TOKYO"),
    []
  );

  useFrame((state, delta) => {
    if (!coinGroupRef.current) return;

    // Apply spin with inertia
    coinGroupRef.current.rotation.y += spinVelocity;

    // Dampen fast spin back to resting pace
    if (spinVelocity > 0.015) {
      setSpinVelocity((v) => Math.max(0.015, v - delta * 0.08));
    }

    // Interactive mouse tilt
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.4;
    coinGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      coinGroupRef.current.rotation.x,
      mouseY,
      0.08
    );
    coinGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      coinGroupRef.current.rotation.z,
      -mouseX,
      0.08
    );

    // Counter-rotate orbital energy rings
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.6;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.4;
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsPointerDown(true);
    setSpinVelocity(0.18); // Give it a high-speed spin burst!
    if (onSpin) onSpin();
  };

  return (
    <group>
      {/* Outer Holographic Energy Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={1.2}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Outer Holographic Energy Ring 2 */}
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[3.6, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#00F5A0"
          emissive="#00F5A0"
          emissiveIntensity={1.0}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Main 3D Gold Coin Group */}
      <group
        ref={coinGroupRef}
        onPointerDown={handlePointerDown}
        onPointerUp={() => setIsPointerDown(false)}
      >
        {/* Coin Edge (Cylinder Rim) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.4, 2.4, 0.35, 64]} />
          <meshPhysicalMaterial
            color="#E5B83B"
            emissive="#7A5800"
            emissiveIntensity={0.2}
            metalness={0.96}
            roughness={0.22}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
          />
        </mesh>

        {/* Front Coin Face with Engraved Texture */}
        <mesh position={[0, 0, 0.177]}>
          <circleGeometry args={[2.39, 64]} />
          {frontTexture ? (
            <meshStandardMaterial
              map={frontTexture}
              metalness={0.92}
              roughness={0.25}
            />
          ) : (
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
          )}
        </mesh>

        {/* Back Coin Face with Alternate Stamp */}
        <mesh position={[0, 0, -0.177]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[2.39, 64]} />
          {backTexture ? (
            <meshStandardMaterial
              map={backTexture}
              metalness={0.92}
              roughness={0.25}
            />
          ) : (
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
          )}
        </mesh>
      </group>
    </group>
  );
}

// Sparkle Particle Field around the Gold Coin
function GoldSparkles() {
  const count = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      pos[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.1;
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
      </bufferGeometry>
      <pointsMaterial
        color="#FFE57F"
        size={0.06}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GoldBullionCoin3D({
  className = "w-full h-[400px] sm:h-[480px]",
}: {
  className?: string;
}) {
  const [spinCount, setSpinCount] = useState(0);

  return (
    <div className={`relative rounded-3xl border border-amber-500/30 bg-[#090D11]/90 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-amber-950/20 ${className}`}>
      {/* Gold Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/[0.12] rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Card */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 sm:p-5 flex items-center justify-between border-b border-white/[0.06] bg-[#090D11]/60 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-white font-black text-sm font-display tracking-tight flex items-center gap-1.5">
              <span>XAU/USD Gold Asset Vault</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                24K 999.9
              </span>
            </h4>
            <p className="text-[11px] text-gray-400 font-mono">
              Live Bullion Benchmark · Institutional Liquidity
            </p>
          </div>
        </div>

        <div className="text-right font-mono">
          <div className="text-xs text-amber-400 font-bold">$2,684.50 / oz</div>
          <div className="text-[10px] text-emerald-400 font-bold">+0.84% (+22.40)</div>
        </div>
      </div>

      {/* 3D Canvas */}
      <TradingCanvasWrapper camera={{ position: [0, 0, 7.5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 8]} intensity={2.5} color="#FFF5D6" />
        <pointLight position={[-8, -5, 5]} intensity={1.8} color="#FFD700" />
        <pointLight position={[8, 5, -5]} intensity={1.5} color="#00E5FF" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.6}
        />

        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.35}>
          <CoinModel onSpin={() => setSpinCount((c) => c + 1)} />
        </Float>

        <GoldSparkles />
      </TradingCanvasWrapper>

      {/* Bottom Footer Info */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-3 sm:p-4 flex items-center justify-between border-t border-white/[0.06] bg-[#090D11]/70 backdrop-blur-md text-[11px] font-mono text-gray-400">
        <div className="flex items-center gap-2 text-amber-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Click &amp; Drag Coin to Spin 360°</span>
        </div>
        <div className="text-gray-500 text-[10px] hidden sm:block">
          Spins: {spinCount} · PBR Metallic 0.96
        </div>
      </div>
    </div>
  );
}

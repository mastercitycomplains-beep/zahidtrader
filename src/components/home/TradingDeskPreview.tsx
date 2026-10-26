"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  TrendingUp,
  Target,
  Zap,
  Globe,
  CheckCircle,
  Bell,
  ArrowRight,
  MessageCircle,
  Send,
  Sparkles,
  Coins,
} from "lucide-react";
import LiveTradingChart from "@/components/charts/LiveTradingChart";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";

const GlobalLiquidityGlobe3D = dynamic(
  () => import("@/components/three/GlobalLiquidityGlobe3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] rounded-3xl border border-cyan-500/20 bg-[#090D11]/80 backdrop-blur-xl animate-pulse flex flex-col items-center justify-center text-cyan-400 font-mono text-xs">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
        <span>Loading Interbank Liquidity Globe...</span>
      </div>
    ),
  }
);

const GoldBullionCoin3D = dynamic(
  () => import("@/components/three/GoldBullionCoin3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] rounded-3xl border border-amber-500/20 bg-[#090D11]/80 backdrop-blur-xl animate-pulse flex flex-col items-center justify-center text-amber-400 font-mono text-xs">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-3" />
        <span>Rendering 24K Gold Asset Vault...</span>
      </div>
    ),
  }
);

export default function TradingDeskPreview() {
  const [deskVisualMode, setDeskVisualMode] = useState<"globe" | "gold" | "chart">("globe");
  const features = [
    {
      icon: TrendingUp,
      title: "Daily trade ideas with entry zones",
      desc: "Clear structural levels, not vague signals.",
    },
    {
      icon: Target,
      title: "Invalidation levels for risk control",
      desc: "Know exactly where the trade thesis is wrong before you click buy or sell.",
    },
    {
      icon: Zap,
      title: "Key targets and multi-stage TP levels",
      desc: "Mathematical risk-to-reward ratios exceeding 1:2.5 minimum.",
    },
    {
      icon: Globe,
      title: "Gold, FX, Indices & Commodities coverage",
      desc: "Deep focus on XAU/USD, EUR/USD, GBP/USD, and NAS100.",
    },
    {
      icon: CheckCircle,
      title: "Real-time commentary during active sessions",
      desc: "London and New York interbank session live updates.",
    },
    {
      icon: Bell,
      title: "Event risk updates before major news",
      desc: "Protection ahead of NFP, CPI, and Fed interest rate releases.",
    },
  ];

  return (
    <section className="py-20 bg-[#0B0F12] relative overflow-hidden border-t border-white/[0.04]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Features List */}
          <ScrollReveal className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2">
              Live Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-4">
              DAILY MARKET DESK
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              We do not post retroactive hindsight charts. Every thesis is published before the London and New York opens, with explicit entry ranges, stop invalidations, and take-profit targets.
            </p>

            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">
                What You Get Inside
              </h3>
              <ul className="space-y-4">
                {features.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx} className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center text-brand-teal flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-white block">
                          {item.title}
                        </span>
                        <span className="text-xs text-gray-400 leading-snug">
                          {item.desc}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-[#0B0F12] font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wide transition-all shadow-lg shadow-[#25D366]/20 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Join WhatsApp VIP</span>
                <span className="text-sm font-light">›</span>
              </Link>

              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#11161B] hover:bg-white/[0.08] text-white border border-white/10 font-bold px-5 py-3 rounded-xl text-xs transition-all"
              >
                <Send className="w-4 h-4 text-blue-400" />
                <span>Free Telegram</span>
                <span className="text-sm font-light">›</span>
              </a>

              <Link
                href="/analysis"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-teal hover:underline ml-2"
              >
                <span>View Daily Analyses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Right Column: 3D Interactive Desk Visual & Chart */}
          <ScrollReveal className="lg:col-span-7 relative" delayMs={80}>
            {/* Visualizer Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setDeskVisualMode("globe")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    deskVisualMode === "globe"
                      ? "bg-brand-teal text-[#090D11] shadow-lg shadow-brand-teal/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>3D Liquidity Globe</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeskVisualMode("gold")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    deskVisualMode === "gold"
                      ? "bg-amber-400 text-[#090D11] shadow-lg shadow-amber-400/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>3D Gold Vault</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeskVisualMode("chart")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    deskVisualMode === "chart"
                      ? "bg-brand-teal text-[#090D11] shadow-lg shadow-brand-teal/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Scenario Chart</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
                Interactive 3D Engine · WebGL
              </span>
            </div>

            {/* Display Active Mode */}
            {deskVisualMode === "globe" && <GlobalLiquidityGlobe3D />}
            {deskVisualMode === "gold" && <GoldBullionCoin3D />}
            {deskVisualMode === "chart" && (
              <>
                <LiveTradingChart symbol="XAU/USD" initialPrice={2685.4} height={420} />
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500 px-2">
                  <span>* Real-time interbank price ticks simulated with verified pricing feeds</span>
                  <Link href="/markets" className="text-brand-teal hover:underline font-semibold">
                    Open Full Screen Dashboard →
                  </Link>
                </div>
              </>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

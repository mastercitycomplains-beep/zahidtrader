"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  AlertCircle,
  ShieldCheck,
  Activity,
  Zap,
  Sparkles,
} from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";
import { LOTTIE_ASSETS } from "@/lib/animations";
import TradingAtmosphere from "@/components/motion/TradingAtmosphere";
import MotionFade from "@/components/motion/MotionFade";

const HologramTradingChart3D = dynamic(
  () => import("@/components/three/HologramTradingChart3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[480px] sm:h-[540px] rounded-3xl border border-cyan-500/20 bg-[#090D11]/80 backdrop-blur-xl animate-pulse flex flex-col items-center justify-center text-cyan-400 font-mono text-xs">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
        <span>Initializing 3D Trading Matrix...</span>
      </div>
    ),
  }
);

const TradingLottie = dynamic(
  () => import("@/components/animations/TradingLottie"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full aspect-square max-w-md mx-auto rounded-3xl border border-theme bg-surface/50 animate-pulse"
        aria-hidden
      />
    ),
  }
);

export default function HeroSection() {
  const [heroVisualMode, setHeroVisualMode] = useState<"3d" | "2d">("3d");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribing(true);
    setSubscribeError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed.");
      setSubscribed(true);
      setEmail("");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Could not subscribe. Please try again.";
      setSubscribeError(message);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* 3D Financial Constellation Canvas in Background */}
      <TradingAtmosphere intensity="subtle" />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden />
      <div className="absolute inset-0 fintech-grid-bg opacity-35 pointer-events-none" aria-hidden />
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-brand-teal/[0.08] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[350px] h-[350px] bg-emerald-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Copy, CEO Trust Anchor, & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <MotionFade direction="up" delay={0.05}>
              <div className="relative mb-3 group inline-flex flex-col items-center lg:items-start">
                <div className="relative w-[7.5rem] h-[7.5rem] sm:w-[8.5rem] sm:h-[8.5rem] rounded-2xl bg-white p-1 shadow-xl shadow-brand-teal/20 border-2 border-brand-teal/40 overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:border-brand-teal">
                  <Image
                    src={SITE_CONFIG.images.ceo}
                    alt={`${SITE_CONFIG.ceo.name}, ${SITE_CONFIG.ceo.title} of Zahid Trader`}
                    width={140}
                    height={140}
                    className="object-cover object-[center_18%] w-full h-full scale-[1.05]"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-2 bg-brand-teal text-[#090D11] font-black text-[10px] tracking-widest uppercase px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap border border-white/30">
                  <span className="w-2 h-2 rounded-full bg-[#090D11] animate-pulse" aria-hidden />
                  <span>Desk Active</span>
                </div>
              </div>

              <p className="mt-3 mb-4 text-xs text-muted text-center lg:text-left">
                <span className="font-extrabold text-foreground">{SITE_CONFIG.ceo.name}</span>
                <span className="text-muted"> · {SITE_CONFIG.ceo.title} &amp; Market Strategist</span>
              </p>

              {/* Verified Pill */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-theme text-xs font-medium text-foreground mb-5 shadow-sm">
                <span className="text-brand-teal font-black uppercase tracking-wider text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ZAHID TRADER
                </span>
                <span className="text-muted hidden sm:inline">•</span>
                <span className="text-muted font-medium">Master the Markets</span>
                <span className="text-muted hidden sm:inline">•</span>
                <span className="text-brand-green font-bold inline-flex items-center gap-1">
                  <Activity className="w-3 h-3" aria-hidden />
                  Daily Institutional Desk
                </span>
              </div>
            </MotionFade>

            <MotionFade direction="up" delay={0.15}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground font-display tracking-tight leading-[1.06] mb-5">
                Master the Markets with{" "}
                <span className="teal-gradient-text">Disciplined Intelligence</span>
              </h1>
            </MotionFade>

            <MotionFade direction="up" delay={0.25}>
              <p className="text-muted text-base sm:text-lg max-w-xl leading-relaxed mb-8">
                A structured market desk engineered around macro context, interbank liquidity flow, and
                technical precision. Receive actionable Gold (XAU/USD) and Forex scenarios with explicit invalidation
                levels before major global sessions open.
              </p>
            </MotionFade>

            {/* Newsletter Dispatch Box */}
            <MotionFade direction="up" delay={0.3} className="w-full max-w-md mb-6">
              {subscribed ? (
                <div className="flex items-center justify-center lg:justify-start gap-2.5 bg-brand-green/10 border border-brand-green/30 text-brand-green py-3.5 px-4 rounded-2xl text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden />
                  <span>Subscribed! Check your inbox for the morning market dispatch.</span>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-2.5"
                  >
                    <label htmlFor="hero-email" className="sr-only">
                      Email address for daily market letter
                    </label>
                    <input
                      id="hero-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email for daily dispatches…"
                      className="flex-1 bg-surface border border-theme rounded-2xl px-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all shadow-sm"
                    />
                    <button
                      type="submit"
                      disabled={subscribing}
                      className="bg-brand-teal hover:bg-brand-teal-dark disabled:opacity-60 text-[#090D11] font-black px-6 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-brand-teal/25 whitespace-nowrap active:scale-[0.98]"
                    >
                      {subscribing ? "Subscribing…" : "Get Dispatch"}
                    </button>
                  </form>
                  {subscribeError && (
                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5 justify-center lg:justify-start">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden />
                      {subscribeError}
                    </p>
                  )}
                </>
              )}
            </MotionFade>

            {/* Action Buttons */}
            <MotionFade direction="up" delay={0.35}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/markets"
                  className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-[#090D11] font-black px-6 py-3.5 rounded-2xl text-sm shadow-xl shadow-brand-teal/25 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Explore Live Markets</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-surface hover:bg-surface-hover text-foreground border border-theme hover:border-brand-teal/40 font-bold px-6 py-3.5 rounded-2xl text-sm transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"
                >
                  <BookOpen className="w-4 h-4 text-brand-teal" aria-hidden />
                  <span>Daily Blog &amp; Notes</span>
                </Link>
                <Link
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold px-5 py-3.5 rounded-2xl text-sm transition-all shadow-sm"
                >
                  <span>WhatsApp VIP Desk</span>
                </Link>
              </div>
            </MotionFade>
          </div>

          {/* Right Column: 3D Holographic Visual with Mode Switcher */}
          <div className="lg:col-span-6 relative">
            <MotionFade direction="left" delay={0.2}>
              {/* Subtle top visual switcher */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface border border-theme shadow-sm">
                  <button
                    type="button"
                    onClick={() => setHeroVisualMode("3d")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                      heroVisualMode === "3d"
                        ? "bg-brand-teal text-[#090D11] shadow-lg shadow-brand-teal/25"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>3D Hologram Terminal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroVisualMode("2d")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      heroVisualMode === "2d"
                        ? "bg-brand-teal text-[#090D11] shadow-lg shadow-brand-teal/25"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <span>2D Flow</span>
                  </button>
                </div>

                <span className="text-[10px] font-mono font-bold text-brand-teal bg-brand-teal/10 border border-brand-teal/20 px-2.5 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">
                  Institutional 3D Engine
                </span>
              </div>

              {heroVisualMode === "3d" ? (
                <HologramTradingChart3D />
              ) : (
                <div className="relative rounded-3xl border border-theme bg-surface/80 backdrop-blur-xl p-5 sm:p-7 shadow-2xl transition-all duration-300 hover:border-brand-teal/30">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-theme">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping" />
                      <p className="text-[11px] uppercase tracking-[0.18em] text-brand-teal font-extrabold">
                        Live Market Pulse
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-muted tabular-nums">
                      XAU/USD · EUR/USD · DXY
                    </span>
                  </div>

                  <TradingLottie
                    src={LOTTIE_ASSETS.stockChart}
                    lazy={false}
                    ariaLabel="Animated financial chart showing market activity"
                    className="min-h-[290px] sm:min-h-[350px] lg:min-h-[390px]"
                  />

                  <div className="mt-4 pt-4 border-t border-theme grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-surface-deep border border-theme/60">
                      <div className="text-[10px] text-muted uppercase font-bold">Gold Bias</div>
                      <div className="font-extrabold text-brand-green tabular-nums">Bullish</div>
                    </div>
                    <div className="p-2 rounded-xl bg-surface-deep border border-theme/60">
                      <div className="text-[10px] text-muted uppercase font-bold">US Dollar</div>
                      <div className="font-extrabold text-foreground tabular-nums">Range 104.2</div>
                    </div>
                    <div className="p-2 rounded-xl bg-surface-deep border border-theme/60">
                      <div className="text-[10px] text-muted uppercase font-bold">Risk Regime</div>
                      <div className="font-extrabold text-brand-teal tabular-nums">Expansion</div>
                    </div>
                  </div>
                </div>
              )}
            </MotionFade>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center text-muted motion-safe:animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">Scroll to Desk</span>
          <ChevronDown className="w-5 h-5 text-brand-teal" aria-hidden />
        </div>
      </div>
    </section>
  );
}

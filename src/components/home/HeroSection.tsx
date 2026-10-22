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
} from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";
import { LOTTIE_ASSETS } from "@/lib/animations";

const TradingLottie = dynamic(
  () => import("@/components/animations/TradingLottie"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full aspect-square max-w-md mx-auto rounded-2xl border border-white/[0.06] bg-brand-surface/40 animate-pulse"
        aria-hidden
      />
    ),
  }
);

export default function HeroSection() {
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
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden />
      <div className="absolute inset-0 fintech-grid-bg opacity-40 pointer-events-none" aria-hidden />
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-brand-teal/[0.07] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative mb-2 group inline-flex flex-col items-center lg:items-start">
              <div className="relative w-[7.75rem] h-[7.75rem] sm:w-[8.75rem] sm:h-[8.75rem] rounded-2xl bg-white p-1 shadow-xl shadow-brand-teal/20 border border-brand-teal/35 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src={SITE_CONFIG.images.ceo}
                  alt={`${SITE_CONFIG.ceo.name}, ${SITE_CONFIG.ceo.title} of Zahid Trader`}
                  width={140}
                  height={140}
                  className="object-cover object-[center_18%] w-full h-full scale-[1.06]"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-2 bg-brand-teal text-brand-dark font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-dark animate-pulse" aria-hidden />
                <span>Desk Active</span>
              </div>
            </div>
            <p className="mt-4 mb-5 text-xs text-muted text-center lg:text-left">
              <span className="font-bold text-heading">{SITE_CONFIG.ceo.name}</span>
              <span className="text-muted"> · {SITE_CONFIG.ceo.title}</span>
            </p>

            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-medium text-gray-300 mb-5">
              <span className="text-brand-teal font-black uppercase tracking-wider text-[11px]">
                ZAHID TRADER
              </span>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span className="text-gray-300">Master the Markets</span>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span className="text-brand-green font-semibold inline-flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" aria-hidden />
                Daily desk scenarios
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.35rem] font-black text-white font-display tracking-tight leading-[1.08] mb-5">
              Master the Markets with{" "}
              <span className="teal-gradient-text">Disciplined Intelligence</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              A structured market desk built on macro context, interbank liquidity, and
              technical precision. Daily Gold and Forex scenarios with explicit invalidation
              levels before major sessions open.
            </p>

            <div className="w-full max-w-md mb-6">
              {subscribed ? (
                <div className="flex items-center justify-center lg:justify-start gap-2 bg-brand-green/10 border border-brand-green/30 text-brand-green py-3 px-4 rounded-xl text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden />
                  <span>Subscribed. Check your inbox for the daily dispatch.</span>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-2.5"
                  >
                    <label htmlFor="hero-email" className="sr-only">
                      Email for daily market letter
                    </label>
                    <input
                      id="hero-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email for the daily letter…"
                      className="flex-1 bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={subscribing}
                      className="bg-brand-teal hover:bg-brand-teal-dark disabled:opacity-60 text-brand-dark font-black px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-brand-teal/20 whitespace-nowrap active:scale-[0.98]"
                    >
                      {subscribing ? "Subscribing…" : "Subscribe"}
                    </button>
                  </form>
                  {subscribeError && (
                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5 justify-center lg:justify-start">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden />
                      {subscribeError}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                href="/markets"
                className="inline-flex items-center gap-2 bg-white text-brand-dark hover:bg-gray-100 font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                Explore Live Markets
                <ArrowUpRight className="w-4 h-4" aria-hidden />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 bg-brand-surface hover:bg-brand-surfaceHover text-white border border-white/10 hover:border-brand-teal/40 font-bold px-6 py-3.5 rounded-xl text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                <BookOpen className="w-4 h-4 text-brand-teal" aria-hidden />
                Start Learning Free
              </Link>
              <Link
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold px-5 py-3.5 rounded-xl text-sm transition-colors"
              >
                WhatsApp VIP
              </Link>
            </div>
          </div>

          {/* Lottie visual — single hero animation, code-split */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-4 rounded-3xl bg-brand-teal/[0.06] blur-2xl pointer-events-none" aria-hidden />
            <div className="relative rounded-3xl border border-white/[0.08] bg-brand-surface/40 backdrop-blur-sm p-4 sm:p-6 shadow-2xl shadow-black/40">
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-teal font-bold mb-3 text-center lg:text-left">
                Market pulse
              </p>
              <TradingLottie
                src={LOTTIE_ASSETS.stockChart}
                lazy={false}
                ariaLabel="Animated financial chart showing market activity"
                className="min-h-[280px] sm:min-h-[340px] lg:min-h-[380px]"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center text-gray-500 motion-safe:animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Scroll</span>
          <ChevronDown className="w-5 h-5 text-brand-teal" aria-hidden />
        </div>
      </div>
    </section>
  );
}

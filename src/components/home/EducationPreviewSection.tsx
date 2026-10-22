"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { EDUCATIONAL_LESSONS } from "@/lib/educationData";
import { LOTTIE_ASSETS } from "@/lib/animations";
import { ArrowRight, Check } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";

const TradingLottie = dynamic(
  () => import("@/components/animations/TradingLottie"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full aspect-[4/3] rounded-2xl border border-white/[0.06] bg-brand-surface/40 animate-pulse"
        aria-hidden
      />
    ),
  }
);

export default function EducationPreviewSection() {
  return (
    <section className="py-24 bg-[#0B0F12] border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-teal/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          <ScrollReveal className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
              Trading Academy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Master the Fundamentals of Institutional Trading
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mt-2 leading-relaxed">
              Step-by-step guides crafted for independent retail traders to understand interbank
              liquidity, candlestick psychology, and mathematical risk management.
            </p>

            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:underline mt-5"
            >
              <span>Visit Complete Academy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5" delayMs={100}>
            <div className="rounded-2xl border border-white/[0.08] bg-brand-surface/50 p-4 shadow-xl">
              <p className="text-[10px] uppercase tracking-[0.18em] text-brand-teal font-bold mb-2">
                Learning path
              </p>
              <TradingLottie
                src={LOTTIE_ASSETS.tradeGraph}
                lazy
                ariaLabel="Animated trading graph illustrating market structure"
                className="min-h-[200px] sm:min-h-[240px]"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATIONAL_LESSONS.slice(0, 3).map((lesson, idx) => (
            <ScrollReveal key={lesson.id} delayMs={idx * 70}>
              <Link
                href={`/learn/${lesson.slug}`}
                className="h-full bg-[#11161B] hover:bg-[#151C22] border border-white/[0.06] hover:border-brand-teal/30 rounded-2xl p-6 transition-all duration-300 shadow-lg flex flex-col justify-between group hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-teal/15 text-brand-teal border border-brand-teal/30">
                      {lesson.category}
                    </span>
                    <span className="text-xs text-gray-500">{lesson.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-brand-teal transition-colors font-display mb-3 leading-snug">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-5">
                    {lesson.summary}
                  </p>

                  <div className="space-y-2 mb-4">
                    {lesson.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-gray-300">
                        <Check className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-brand-teal font-semibold">
                  <span>Start Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { DAILY_MARKET_ANALYSIS } from "@/lib/analysisData";
import { ArrowUpRight, Target, ShieldAlert, ArrowRight, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function DailyAnalysisSection() {
  return (
    <section className="py-20 bg-[#080C0F] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
              Daily Scenarios
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Pre-Market Analysis & Key Levels
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mt-2 leading-relaxed">
              Institutional breakdown with precise entry zones, stop loss invalidations, and multi-tier profit targets.
            </p>
          </div>

          <Link
            href="/analysis"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:underline self-start md:self-auto"
          >
            <span>Browse All Daily Analyses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DAILY_MARKET_ANALYSIS.slice(0, 3).map((item, idx) => {
            const isBullish = item.bias === "Bullish";
            const isBearish = item.bias === "Bearish";
            return (
              <ScrollReveal key={item.id} delayMs={idx * 80}>
              <div
                className="h-full bg-[#11161B] hover:bg-[#151C22] border border-white/[0.06] hover:border-brand-teal/30 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-extrabold text-white text-lg font-mono">
                      {item.symbol}
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                        isBullish
                          ? "bg-brand-green/20 text-brand-green border border-brand-green/30"
                          : isBearish
                          ? "bg-brand-red/20 text-brand-red border border-brand-red/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      {item.bias}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-200 line-clamp-2 mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-5">
                    {item.summary}
                  </p>

                  {/* Level Cards */}
                  <div className="bg-[#0B0F12] rounded-xl p-3 border border-white/[0.04] space-y-2 text-xs mb-5 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Target className="w-3 h-3 text-brand-teal" /> Entry Zone:
                      </span>
                      <span className="text-white font-semibold">{item.entryZone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-brand-red" /> Invalidation:
                      </span>
                      <span className="text-brand-red font-semibold">
                        {item.invalidationLevel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-brand-green" /> Target 1:
                      </span>
                      <span className="text-brand-green font-semibold">{item.targets[0]}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/analysis/${item.slug}`}
                  className="w-full text-center py-2.5 rounded-xl bg-white/[0.05] hover:bg-brand-teal hover:text-[#0B0F12] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Thesis</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { DAILY_MARKET_ANALYSIS, TRACK_RECORD_CALLS } from "@/lib/analysisData";
import { Target, ShieldAlert, TrendingUp, ArrowRight, Clock, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Market Analysis",
  description: "Institutional daily trade setups, entry zones, invalidation levels, and multi-tier targets for Gold, Forex, and Indices.",
};

export default function AnalysisPage() {
  return (
    <div className="py-12 sm:py-16 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Pre-Market Intelligence
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Daily Market Analysis & Scenarios
          </h1>
          <p className="text-muted text-sm max-w-2xl leading-relaxed">
            Every analysis is framed with macro fundamentals, interbank liquidity order blocks, explicit entry shelves, and strict stop invalidations.
          </p>
        </div>

        {/* Highlighted Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {DAILY_MARKET_ANALYSIS.map((item) => {
            const isBullish = item.bias === "Bullish";
            const isBearish = item.bias === "Bearish";
            return (
              <div
                key={item.id}
                className="bg-surface hover:bg-[#141A20] border border-theme hover:border-brand-teal/40 rounded-3xl p-6 sm:p-8 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-white font-mono">
                        {item.symbol}
                      </span>
                      <span className="text-xs text-muted font-mono">
                        {item.timeframe}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-black uppercase px-3.5 py-1 rounded-full ${
                        isBullish
                          ? "bg-brand-green/20 text-brand-green border border-brand-green/30"
                          : isBearish
                          ? "bg-brand-red/20 text-brand-red border border-brand-red/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      {item.bias} Bias
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white mb-3 font-display leading-snug">
                    <Link
                      href={`/analysis/${item.slug}`}
                      className="hover:text-brand-teal transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  {/* Level Parameters Box */}
                  <div className="bg-page rounded-2xl p-4 border border-white/[0.05] grid grid-cols-3 gap-2 text-center text-xs font-mono mb-6">
                    <div className="p-2 rounded-xl bg-white/[0.02]">
                      <span className="text-[10px] text-muted block uppercase">Entry Zone</span>
                      <span className="text-white font-bold">{item.entryZone}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-brand-red/10 border border-brand-red/20">
                      <span className="text-[10px] text-brand-red block uppercase font-bold">
                        Invalidation
                      </span>
                      <span className="text-brand-red font-bold">{item.invalidationLevel}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-brand-green/10 border border-brand-green/20">
                      <span className="text-[10px] text-brand-green block uppercase font-bold">
                        Target 1
                      </span>
                      <span className="text-brand-green font-bold">{item.targets[0]}</span>
                    </div>
                  </div>

                  {/* Catalysts bullet list */}
                  <div className="mb-6 space-y-1.5">
                    <span className="text-[11px] font-bold text-muted-strong uppercase tracking-wider block mb-2">
                      Key Catalysts Monitored:
                    </span>
                    {item.risksAndCatalysts.slice(0, 3).map((cat, i) => (
                      <div key={i} className="text-xs text-muted flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal flex-shrink-0" />
                        <span className="line-clamp-1">{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-theme flex items-center justify-between text-xs">
                  <span className="text-muted font-medium">By {item.author}</span>
                  <Link
                    href={`/analysis/${item.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-brand-teal hover:underline"
                  >
                    <span>Full Analysis & Chart</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Management Disclaimer Box */}
        <div className="bg-surface border border-theme rounded-2xl p-6 flex items-start gap-4 text-xs text-muted leading-relaxed">
          <Shield className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Execution Methodology:</strong>
            Trade ideas published by Zahid Trader represent our macro desk's strategic perspective.
            Always confirm order flow reaction during London (08:00 UTC) or New York (13:00 UTC)
            opens, and never trade without a mandatory hard stop loss in your broker terminal.
          </div>
        </div>
      </div>
    </div>
  );
}

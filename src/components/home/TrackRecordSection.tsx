"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TRACK_RECORD_CALLS } from "@/lib/analysisData";
import { Palette, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

const ACCENT_COLORS = [
  { name: "Gold", hex: "#E0AD1E" },
  { name: "Teal", hex: "#16B8AD" },
  { name: "Emerald", hex: "#16A875" },
  { name: "Purple", hex: "#9F7AEA" },
];

export default function TrackRecordSection() {
  const [accentIdx, setAccentIdx] = useState(1); // default Teal
  const currentAccent = ACCENT_COLORS[accentIdx];

  const toggleAccent = () => {
    setAccentIdx((prev) => (prev + 1) % ACCENT_COLORS.length);
  };

  return (
    <section className="py-24 bg-page-elevated relative overflow-hidden border-t border-theme">
      {/* Background Accent Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15 transition-colors duration-500"
        style={{ backgroundColor: currentAccent.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Accent Palette Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                style={{ color: currentAccent.hex }}
              >
                The Public Record
              </span>
              <button
                onClick={toggleAccent}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-muted hover:text-white transition-colors border border-theme"
                title={`Accent: ${currentAccent.name}. Click to change theme.`}
                aria-label="Change section accent color"
              >
                <Palette className="w-3.5 h-3.5" style={{ color: currentAccent.hex }} />
              </button>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              Every call, dated before the data.
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              We publish our market bias before the economic release, then score it publicly. Scenarios and explicit invalidation levels are published in advance so the goalposts cannot move after the fact.
            </p>
          </div>

          <Link
            href="/analysis"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-theme transition-all self-start sm:self-auto"
          >
            <span>See live analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#0F1419] border border-theme rounded-2xl p-6 text-center shadow-lg">
            <div
              className="text-4xl sm:text-5xl font-black font-mono transition-colors duration-300"
              style={{ color: currentAccent.hex }}
            >
              45+
            </div>
            <div className="text-xs uppercase font-bold text-muted tracking-wider mt-2">
              Cross-Asset Calls Scored
            </div>
          </div>

          <div className="bg-[#0F1419] border border-theme rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl sm:text-5xl font-black font-mono text-brand-green">
              87%
            </div>
            <div className="text-xs uppercase font-bold text-muted tracking-wider mt-2">
              Held Thesis Or Better
            </div>
          </div>

          <div className="bg-[#0F1419] border border-theme rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl sm:text-5xl font-black font-mono text-white">
              5
            </div>
            <div className="text-xs uppercase font-bold text-muted tracking-wider mt-2">
              Asset Classes Covered
            </div>
          </div>
        </div>

        {/* Calls Grid */}
        <div className="mb-4">
          <span className="text-xs uppercase tracking-widest text-muted font-semibold block mb-4">
            The Move Made Available, At Peak
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRACK_RECORD_CALLS.map((call) => (
              <div
                key={call.id}
                className="bg-surface hover:bg-surface-hover border border-theme hover:border-white/20 rounded-2xl p-5 transition-all shadow-md group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-white group-hover:text-brand-teal transition-colors">
                    {call.pair}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      call.direction === "Long"
                        ? "bg-brand-teal/20 text-brand-teal border border-brand-teal/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {call.direction}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-2">
                  <span
                    className="text-2xl font-black font-mono transition-colors duration-300"
                    style={{ color: currentAccent.hex }}
                  >
                    +{call.pips}
                  </span>
                  <span className="text-xs font-semibold text-muted">{call.unit}</span>
                </div>

                <div className="text-xs text-muted leading-snug mt-2">
                  {call.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clarifying Disclaimer */}
        <p className="text-[11px] text-muted leading-relaxed max-w-4xl pt-4">
          * Peak is the maximum favorable travel each thesis made available while it was in play, measured against official end-of-day interbank levels, not a guaranteed realized profit. Every thesis carries the pre-published invalidation stop. We call the paths; the trader manages their risk.
        </p>
      </div>
    </section>
  );
}

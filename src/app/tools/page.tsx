import React from "react";
import PositionSizeCalculator from "@/components/tools/PositionSizeCalculator";
import RiskRewardCalculator from "@/components/tools/RiskRewardCalculator";
import SessionClock from "@/components/tools/SessionClock";
import { Calculator, Clock, Target, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Tools & Calculators",
  description: "Functional trading calculators: Position Sizing, Lot Sizing, Risk/Reward Ratio, and Interbank Session Clocks.",
};

export default function ToolsPage() {
  return (
    <div className="py-12 sm:py-16 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Trader Utilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Professional Trading Calculators & Clocks
          </h1>
          <p className="text-muted text-sm max-w-2xl leading-relaxed">
            Eliminate emotional estimation from your trading workflow. Use institutional mathematical models to establish proper position sizes, lot volumes, and session timings.
          </p>
        </div>

        {/* Global Trading Sessions Clock */}
        <div className="mb-12">
          <SessionClock />
        </div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <PositionSizeCalculator />
          <RiskRewardCalculator />
        </div>

        {/* Educational Note */}
        <div className="bg-surface border border-theme rounded-2xl p-6 flex items-start gap-4 text-xs text-muted leading-relaxed">
          <Shield className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Discipline over Luck:</strong>
            Professional risk allocation dictates that you should determine your stop loss level on the chart FIRST, and then calculate your lot size backwards using the calculator. Never pick an arbitrary lot size and adjust your stop loss to fit your account.
          </div>
        </div>
      </div>
    </div>
  );
}

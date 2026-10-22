import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description: "Comprehensive financial risk disclosure regarding Forex, CFDs, and leveraged trading.",
};

export default function RiskDisclosurePage() {
  return (
    <div className="py-16 sm:py-24 bg-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-brand-teal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-brand-red" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
              Mandatory Regulatory Statement
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Risk Disclosure Statement
          </h1>
          <p className="text-xs text-muted font-mono">Applicable across all ZAHID TRADER platforms</p>
        </div>

        <div className="prose prose-invert max-w-none text-muted-strong text-sm leading-relaxed space-y-6">
          <div className="bg-red-950/30 border border-red-900/50 p-6 rounded-2xl text-red-200">
            <strong>CRITICAL WARNING:</strong> Trading foreign exchange (Forex), contracts for difference (CFDs), precious metals (Gold/Silver), and derivative assets carries a substantial degree of financial risk and can result in the loss of all invested capital. It is not suitable for everyone.
          </div>

          <h2 className="text-xl font-bold text-white font-display">1. The Impact of Financial Leverage</h2>
          <p>
            Trading on margin and using leverage magnifies both prospective gains and potential losses. A relatively small market fluctuation against your position can wipe out your initial margin deposit, requiring immediate liquidation of positions by your broker.
          </p>

          <h2 className="text-xl font-bold text-white font-display">2. Market Volatility & Slippage</h2>
          <p>
            During macroeconomic releases (such as US Non-Farm Payrolls, CPI, or central bank rate decisions), market spreads can widen substantially and slippage may occur. Stop loss orders may not be executed at the exact stated price during periods of extreme illiquidity or flash crashes.
          </p>

          <h2 className="text-xl font-bold text-white font-display">3. Hypothetical & Historical Performance</h2>
          <p>
            Past performance or hypothetical track record statistics published by Zahid Trader do not represent a guarantee of future outcomes. Financial market conditions change constantly. You should never risk money you cannot afford to lose entirely.
          </p>
        </div>
      </div>
    </div>
  );
}

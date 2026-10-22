import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "General disclaimer regarding Zahid Trader content and market data providers.",
};

export default function DisclaimerPage() {
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
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            General Disclaimer
          </h1>
          <p className="text-xs text-muted font-mono">Educational and informational scope</p>
        </div>

        <div className="prose prose-invert max-w-none text-muted-strong text-sm leading-relaxed space-y-6">
          <p>
            The content on <strong>ZAHID TRADER</strong> is compiled from sources believed to be reliable and is provided in good faith. However, we do not warrant the absolute accuracy, completeness, or timeliness of any market quotations, charts, or commentary.
          </p>

          <h2 className="text-xl font-bold text-white font-display">No Individual Advice</h2>
          <p>
            None of our published material takes into account your personal financial situation, risk tolerance, or investment goals. Readers are advised to seek independent financial advice from qualified professionals before committing funds to trading accounts.
          </p>

          <h2 className="text-xl font-bold text-white font-display">Data Provider Delays</h2>
          <p>
            Market pricing shown on this website is indicative and may be delayed or simulated based on interbank quote providers. We bear no liability for any losses incurred from reliance on platform data.
          </p>
        </div>
      </div>
    </div>
  );
}

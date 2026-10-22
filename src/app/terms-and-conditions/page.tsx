import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions of use for Zahid Trader financial intelligence platform.",
};

export default function TermsPage() {
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
            Terms and Conditions
          </h1>
          <p className="text-xs text-muted font-mono">Last updated: October 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-muted-strong text-sm leading-relaxed space-y-6">
          <p>
            By accessing or using the <strong>ZAHID TRADER</strong> website, daily market letters, educational academy, or community channels, you agree to be bound by these Terms and Conditions.
          </p>

          <h2 className="text-xl font-bold text-white font-display">1. Educational Nature of Content</h2>
          <p>
            All content, including trade setups, scenario maps, invalidation levels, and economic commentaries, is provided strictly for educational and informational purposes. Nothing on this website constitutes personalized financial, investment, legal, or tax advice.
          </p>

          <h2 className="text-xl font-bold text-white font-display">2. No Brokerage or Asset Custody</h2>
          <p>
            ZAHID TRADER is not a registered financial broker, custodian, or fund manager. We do not accept deposits for trading, do not execute orders on behalf of users, and do not hold client funds. All trading decisions and risk allocations are made independently by the user through their chosen regulated broker.
          </p>

          <h2 className="text-xl font-bold text-white font-display">3. Intellectual Property</h2>
          <p>
            All analysis, research dossiers, written academy guides, and branding assets are the exclusive intellectual property of ZAHID TRADER. You may not republish, resell, or distribute our proprietary content without explicit prior written authorization.
          </p>
        </div>
      </div>
    </div>
  );
}

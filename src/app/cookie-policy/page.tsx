import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Zahid Trader Cookie Policy and browser tracking preferences.",
};

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="text-xs text-muted font-mono">Usage of local browser storage and preferences</p>
        </div>

        <div className="prose prose-invert max-w-none text-muted-strong text-sm leading-relaxed space-y-6">
          <p>
            This Cookie Policy explains how <strong>ZAHID TRADER</strong> uses cookies and similar technologies when you visit our website.
          </p>

          <h2 className="text-xl font-bold text-white font-display">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your browser or device by websites you visit. They help sites remember your display preferences (such as dark mode theme selection and chart timeframes).
          </p>

          <h2 className="text-xl font-bold text-white font-display">2. Essential Cookies We Use</h2>
          <p>
            We use essential cookies strictly to ensure website stability, remember your active market filters, and secure our contact forms against spam attacks.
          </p>

          <h2 className="text-xl font-bold text-white font-display">3. Managing Your Cookies</h2>
          <p>
            You can modify your browser settings to refuse cookies or alert you when cookies are being sent. Note that certain interactive calculators and charting features may not function as intended if cookies are disabled.
          </p>
        </div>
      </div>
    </div>
  );
}

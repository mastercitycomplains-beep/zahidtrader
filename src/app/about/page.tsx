import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Target, Compass, BookOpen, MessageCircle, ArrowRight } from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Zahid Trader's mission, macro research methodology, and risk-first trading education philosophy.",
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 bg-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="relative w-28 h-28 mx-auto mb-6 bg-white rounded-2xl p-1 shadow-xl border border-brand-teal/30 overflow-hidden">
            <Image
              src={SITE_CONFIG.images.ceo}
              alt={`${SITE_CONFIG.ceo.name}, ${SITE_CONFIG.ceo.title}`}
              width={112}
              height={112}
              className="object-cover object-[center_18%] w-full h-full scale-[1.06]"
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            About Our Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Demystifying Financial Markets Through Disciplined Intelligence
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            ZAHID TRADER was founded on a simple conviction: retail traders do not fail because they lack indicators; they fail because they lack macro context and mathematical risk control.
          </p>
        </div>

        {/* Brand Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-surface border border-theme rounded-2xl p-8 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center text-brand-teal mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3 font-display">Our Mission</h2>
            <p className="text-muted text-sm leading-relaxed">
              To empower independent traders across Pakistan and internationally with institutional-grade market intelligence, clear pre-market scenarios, and structured education. We bridge the gap between retail speculation and interbank execution standards.
            </p>
          </div>

          <div className="bg-surface border border-theme rounded-2xl p-8 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center text-brand-teal mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3 font-display">Our Vision</h2>
            <p className="text-muted text-sm leading-relaxed">
              To build a global community of mathematically grounded, emotionally disciplined traders who prioritize risk management over quick riches, maintaining long-term financial consistency.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="bg-surface border border-theme rounded-3xl p-8 sm:p-12 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 font-display text-center">
            The Three Pillars of Our Methodology
          </h2>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal font-black text-sm flex-shrink-0">
                01
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Macro Driver Alignment
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Price moves in response to central bank yield differentials, inflation expectations, and institutional liquidity flows. We evaluate interbank drivers before looking at any 15-minute or 1-hour chart.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal font-black text-sm flex-shrink-0">
                02
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Explicit Invalidation Levels
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Every trade idea must answer one question before execution: <em>At what price is this thesis definitively proven wrong?</em> Having pre-determined invalidation levels prevents emotional decision-making.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal font-black text-sm flex-shrink-0">
                03
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  The 1% Risk Law
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  No individual trade should ever risk more than 1% to 2% of total capital. With asymmetric 1:2.5+ risk-to-reward targets, a trader can maintain profitability even with a 45% win rate.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-[#161D24] border border-brand-teal/30 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 font-display">
              Connect Directly with the Desk
            </h3>
            <p className="text-xs text-muted">
              Have questions regarding our research, education, or VIP access?
            </p>
          </div>
          <Link
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-[#0B0F12] font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wide transition-all shadow-md hover:bg-[#20bd5a]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

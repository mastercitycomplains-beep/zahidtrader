import React from "react";
import Link from "next/link";
import { Check, MessageCircle, Send, Star, Zap, Shield } from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership & VIP Plans",
  description: "Transparent membership tiers for Zahid Trader: Free Letter, Premium Research Desk, and VIP Trader Club.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Public Free Desk",
      price: "$0",
      period: "forever",
      desc: "Essential pre-market headlines and public weekly educational market reviews.",
      badge: "Open Community",
      popular: false,
      ctaLabel: "Join Free Telegram",
      ctaHref: SITE_CONFIG.telegramUrl,
      isExternal: true,
      features: [
        "Weekly pre-market macro overview",
        "Public Trading Academy access (/learn)",
        "Financial market news feed",
        "Economic calendar with consensus data",
        "Full suite of trading calculators",
        "Public Telegram community announcements",
      ],
    },
    {
      name: "Premium Research Desk",
      price: "$49",
      period: "per month",
      desc: "Daily pre-market trade scenarios with explicit entry zones and stop invalidation thresholds.",
      badge: "Most Popular",
      popular: true,
      ctaLabel: "Request Desk Access",
      ctaHref: getWhatsAppUrl("Hello Zahid Trader, I would like to join the Premium Research Desk membership."),
      isExternal: true,
      features: [
        "Everything in Public Free Desk",
        "Daily pre-market Gold & FX scenario maps",
        "Explicit invalidation stop levels for each setup",
        "Multi-tier Take Profit targets (1:2.5+ R:R)",
        "Real-time event risk warnings ahead of NFP & CPI",
        "Full Partner Research Library access",
        "Priority Telegram broadcast feed",
      ],
    },
    {
      name: "VIP Trader Club & Mentorship",
      price: "$149",
      period: "per month",
      desc: "Direct 1-on-1 WhatsApp desk line, personalized risk audits, and institutional trade breakdowns.",
      badge: "VIP Concierge",
      popular: false,
      ctaLabel: "Connect on WhatsApp",
      ctaHref: getWhatsAppUrl("Hello Zahid Trader, I am interested in the VIP Trader Club & Mentorship program."),
      isExternal: true,
      features: [
        "Everything in Premium Research Desk",
        "Direct WhatsApp line with Zahid Trader desk",
        "Live London & New York session commentary",
        "Intraday chart request breakdowns",
        "Personal trading journal & risk audit",
        "Exclusive institutional macro quarterly dossiers",
        "Dedicated VIP onboarding call",
      ],
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Transparent Membership
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Invest in an Institutional Edge
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Choose the level of market intelligence that suits your trading journey. No hidden fees or automated card rebills—we onboard members transparently through direct desk consultation.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative shadow-2xl ${
                plan.popular
                  ? "bg-[#141A20] border-2 border-brand-teal shadow-brand-teal/10 scale-105 z-10"
                  : "bg-surface border border-theme"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-teal text-[#0B0F12] font-black text-[10px] tracking-widest uppercase px-4 py-1 rounded-full shadow-md">
                  RECOMMENDED DESK
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
                    {plan.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-2 font-display">
                  {plan.name}
                </h2>

                <p className="text-xs text-muted mb-6 leading-relaxed">
                  {plan.desc}
                </p>

                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-theme">
                  <span className="text-4xl font-black text-white font-mono">{plan.price}</span>
                  <span className="text-xs text-muted font-medium">/{plan.period}</span>
                </div>

                <div className="space-y-3.5 mb-8">
                  <span className="text-[11px] font-bold text-muted-strong uppercase tracking-wider block">
                    What's included:
                  </span>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-muted-strong">
                      <Check className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={plan.ctaHref}
                target={plan.isExternal ? "_blank" : undefined}
                rel={plan.isExternal ? "noopener noreferrer" : undefined}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? "bg-brand-teal text-[#0B0F12] hover:bg-brand-teal-dark shadow-lg shadow-brand-teal/20"
                    : "bg-white/[0.05] text-white hover:bg-white/[0.1] border border-theme"
                }`}
              >
                <span>{plan.ctaLabel}</span>
                <span className="text-sm">›</span>
              </a>
            </div>
          ))}
        </div>

        {/* Payment Policy Disclaimer */}
        <div className="bg-surface border border-theme rounded-2xl p-6 flex items-start gap-4 text-xs text-muted leading-relaxed max-w-4xl mx-auto">
          <Shield className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Transparent Onboarding Notice:</strong>
            To protect our members from fraudulent clones, all premium subscriptions and VIP admissions are processed directly via verified administrative channels on WhatsApp (+92 345 4706138) or our verified Telegram bot. We will never ask for your broker account passwords or private bank credentials.
          </div>
        </div>
      </div>
    </div>
  );
}

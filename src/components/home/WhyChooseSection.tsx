"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Crosshair, BarChart3, MessageCircle } from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function WhyChooseSection() {
  const pillars = [
    {
      icon: Crosshair,
      title: "Dated Before the Data",
      desc: "We do not cherry-pick hindsight charts. Every thesis is published in advance with explicit entry zones and clear stop invalidation levels.",
    },
    {
      icon: ShieldCheck,
      title: "Strict Mathematical Risk Controls",
      desc: "Capital preservation is our first doctrine. We prioritize 1:2.5+ risk-to-reward setups and teach the strict 1% maximum allocation rule.",
    },
    {
      icon: BarChart3,
      title: "Macro & Order Flow Confluence",
      desc: "We combine interbank yield differentials, central bank policy reads, and institutional liquidity blocks for high-probability setups.",
    },
    {
      icon: MessageCircle,
      title: `Direct WhatsApp Desk (${SITE_CONFIG.whatsappDisplay})`,
      desc: "Direct access to Zahid Trader support for inquiries, private mentorship consultations, and prompt assistance.",
    },
  ];

  return (
    <section className="py-24 bg-[#080C0F] border-t border-white/[0.04] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            The Zahid Trader Standard
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-4">
            Why Serious Traders Choose Our Desk
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            In an industry flooded with flashy hype and unverified claims, we provide transparent, mathematically sound financial intelligence.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={idx} delayMs={idx * 80}>
              <div
                className="h-full bg-brand-surface border border-white/[0.06] hover:border-brand-teal/30 p-6 rounded-2xl transition-all duration-300 shadow-xl group hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center text-brand-teal mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA banner */}
        <ScrollReveal className="mt-16 bg-gradient-to-r from-brand-teal/20 via-brand-surface to-brand-teal/10 border border-brand-teal/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Ready to elevate your trading execution?
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Subscribe to the daily letter or connect on WhatsApp for desk access and VIP onboarding.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto text-center px-6 py-3.5 rounded-xl bg-[#25D366] text-[#0B0F12] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20bd5a] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp</span>
            </Link>
            <Link
              href="/pricing"
              className="w-full md:w-auto text-center px-6 py-3.5 rounded-xl bg-brand-teal text-[#0B0F12] font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-teal/20 transition-all hover:bg-brand-teal-dark"
            >
              <span>Explore VIP Plans</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

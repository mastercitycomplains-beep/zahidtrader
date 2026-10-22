"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, Send, HelpCircle } from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What financial markets do you cover at Zahid Trader?",
    answer: "Our research desk specializes in Gold Spot (XAU/USD), Silver (XAG/USD), major G10 currency pairs (EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD), benchmark stock indices (NAS100, US30, DXY), and crude oil (WTI).",
  },
  {
    question: "Is Zahid Trader suitable for beginners?",
    answer: "Yes. Our Trading Academy (/learn) offers structured beginner modules explaining basic terminology, lot sizing, and candlestick patterns. In addition, our daily analysis clearly highlights the 'Why' behind every scenario, helping newer traders understand market dynamics rather than following signals blindly.",
  },
  {
    question: "What is an invalidation level and why is it important?",
    answer: "An invalidation level is the exact price threshold where a trading thesis is proven mathematically incorrect. Having an explicit invalidation level ensures you know where your stop loss belongs before entering, capping your risk strictly at 1% or less.",
  },
  {
    question: "How are market updates and trade scenarios delivered?",
    answer: "The daily market letter is published every morning before the London/NY session. Real-time intraday adjustments, event risk warnings, and breakout alerts are posted to our Telegram channel and shared via WhatsApp VIP desk.",
  },
  {
    question: "How do I connect directly with Zahid Trader on WhatsApp?",
    answer: `You can reach our official WhatsApp desk directly at ${SITE_CONFIG.whatsappDisplay} (+92 345 4706138). Our team is available to assist with onboarding, membership inquiries, and platform navigation.`,
  },
  {
    question: "Is this financial advice or guaranteed trading signals?",
    answer: "No. All content, trade scenarios, and research published by Zahid Trader are strictly for educational and informational purposes. Trading carries significant risk of capital loss. We teach probability, risk allocation, and disciplined execution.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-page border-t border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Heading & Support Contact CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed mb-8">
                Everything you need to know about our daily market desk, research publications, and risk principles. Can't find what you're looking for? Reach out directly.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-[#0B0F12] font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wide transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                  <span className="text-sm font-light">›</span>
                </Link>

                <a
                  href={SITE_CONFIG.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#161D24] hover:bg-[#1B242D] text-white border border-theme font-bold px-5 py-3 rounded-xl text-xs transition-all"
                >
                  <Send className="w-4 h-4 text-blue-400" />
                  <span>Telegram Channel</span>
                  <span className="text-sm font-light">›</span>
                </a>
              </div>
            </div>

            <div className="hidden lg:block mt-8 p-6 rounded-2xl bg-surface border border-theme">
              <h4 className="text-white font-bold text-sm mb-1">Direct Support Hotline</h4>
              <p className="text-xs text-muted mb-2">WhatsApp: {SITE_CONFIG.whatsappDisplay}</p>
              <p className="text-xs text-muted">Email: {SITE_CONFIG.email}</p>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-surface border border-theme rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-brand-teal transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-brand-teal flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-brand-teal/20" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-muted leading-relaxed border-t border-theme animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

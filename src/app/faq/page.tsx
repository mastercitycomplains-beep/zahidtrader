"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, MessageCircle, Send, HelpCircle } from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";

interface DetailedFaq {
  category: "Coverage" | "Education" | "Signals & Scenarios" | "Membership" | "Risk";
  question: string;
  answer: string;
}

const ALL_FAQS: DetailedFaq[] = [
  {
    category: "Coverage",
    question: "Which markets are analyzed on the Zahid Trader desk?",
    answer: "We primarily cover Gold Spot (XAU/USD), Silver (XAG/USD), major Forex currencies (EUR/USD, GBP/USD, USD/JPY, USD/CAD, AUD/USD), US Tech indices (NAS100, US30, S&P 500), and WTI Crude Oil.",
  },
  {
    category: "Coverage",
    question: "Do you cover cryptocurrency markets like Bitcoin?",
    answer: "Yes, we monitor institutional Bitcoin (BTC/USD) and Ethereum (ETH/USD) structural flows, specifically focusing on US spot ETF net inflows, CME futures open interest, and macro liquidity cycles.",
  },
  {
    category: "Education",
    question: "Is prior trading experience required to join Zahid Trader?",
    answer: "No. Our Trading Academy (/learn) offers structured lessons from day one. You will learn the fundamentals of pips, lot sizing, and risk allocation before reviewing our intermediate and advanced macro setups.",
  },
  {
    category: "Education",
    question: "What is your core educational philosophy?",
    answer: "Risk first, profits second. Most retail traders focus 100% on where to enter and 0% on risk management. We teach strict capital preservation using the 1% risk rule and 1:2.5+ minimum risk-to-reward setups.",
  },
  {
    category: "Signals & Scenarios",
    question: "What is the difference between a 'signal' and a 'scenario map'?",
    answer: "A blind signal tells you to buy or sell without context. A scenario map explains the macro driver, the institutional liquidity shelf, the exact price where the thesis is invalidated (stop loss), and multiple take-profit milestones. This empowers you to trade as an informed professional.",
  },
  {
    category: "Signals & Scenarios",
    question: "When are daily analyses published?",
    answer: "Pre-market outlooks are released before the London open (07:00 UTC) with intraday updates provided throughout the London / New York overlap when liquidity is at its peak.",
  },
  {
    category: "Membership",
    question: "What is included in the VIP Trader Club?",
    answer: "VIP members receive direct 1-on-1 WhatsApp access to Zahid Trader, real-time intraday chart breakdown requests, priority Telegram alerts, and personalized trade journal reviews.",
  },
  {
    category: "Membership",
    question: "How do I activate my membership?",
    answer: `You can reach our official WhatsApp desk directly at ${SITE_CONFIG.whatsappDisplay} to confirm enrollment and receive immediate access credentials.`,
  },
  {
    category: "Risk",
    question: "What is an invalidation level?",
    answer: "An invalidation level is the price point at which our technical thesis is proven wrong. Once price breaches this level, the trade idea is closed immediately to prevent emotional holding of losing positions.",
  },
  {
    category: "Risk",
    question: "Do you guarantee profits or win rates?",
    answer: "No. Anyone promising guaranteed profits in financial markets is deceitful. Trading involves substantial risk. We teach probability, risk allocation, and disciplined execution.",
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = ["All", "Coverage", "Education", "Signals & Scenarios", "Membership", "Risk"];

  const filteredFaqs = ALL_FAQS.filter((faq) => {
    const matchCat = activeCategory === "All" || faq.category === activeCategory;
    const matchSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-12 sm:py-20 bg-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Everything you need to know about our trading desk, daily scenarios, educational resources, and risk principles.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-10">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by keyword..."
            className="w-full bg-surface border border-theme rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal shadow-xl"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-theme">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-brand-teal text-[#0B0F12]"
                  : "bg-surface text-muted hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-16">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-surface border border-theme rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-white hover:text-brand-teal transition-colors text-sm sm:text-base"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/[0.05] text-brand-teal">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-brand-teal flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-brand-teal/20" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-muted-strong leading-relaxed border-t border-theme animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="bg-surface border border-theme rounded-3xl p-8 sm:p-10 text-center">
          <h3 className="text-xl font-bold text-white mb-2 font-display">
            Still Have an Unanswered Question?
          </h3>
          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mb-6">
            Our team is available on WhatsApp to answer inquiries about desk membership, mentorship, or technical issues.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-[#0B0F12] font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wide hover:bg-[#20bd5a] transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Ask on WhatsApp</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/[0.05] text-white hover:bg-white/10 font-bold px-6 py-3 rounded-xl text-xs uppercase border border-theme transition-all"
            >
              <span>Submit Ticket</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

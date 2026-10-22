"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  Shield,
  TrendingUp,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setSubscribeError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed.");
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribeError("Could not subscribe right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-deep border-t border-theme text-muted text-sm">
      {/* Top Banner / Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-white/[0.08]">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 group mb-4">
                <div className="relative w-12 h-12 bg-white rounded-lg p-1 shadow-md shadow-brand-teal/10 overflow-hidden flex items-center justify-center border border-white/20">
                  <Image
                    src={SITE_CONFIG.images.logo}
                    alt="ZAHID TRADER Logo"
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-extrabold text-xl tracking-tight text-white font-display">
                      ZAHID
                    </span>
                    <span className="bg-brand-teal text-[#0B0F12] font-black text-xs px-1.5 py-0.5 rounded uppercase tracking-wider">
                      TRADER
                    </span>
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-brand-teal font-medium mt-1">
                    Master the Markets
                  </span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Institutional-grade financial intelligence, daily Forex & Gold scenario mapping,
                and disciplined risk management principles for independent traders worldwide.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] px-4 py-2 rounded-xl text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: {SITE_CONFIG.whatsappDisplay}</span>
              </Link>
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram Desk</span>
              </a>
            </div>
          </div>

          {/* Quick Newsletter */}
          <div className="lg:col-span-7 flex flex-col justify-center bg-[#11161B] p-6 sm:p-8 rounded-2xl border border-white/[0.06] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-teal inline-block mb-1">
                The Daily Market Letter
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">
                Get Institutional Pre-Market Intelligence Daily
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-5 max-w-xl">
                Every trading morning, get our cross-asset bias, critical invalidation levels for Gold and FX, and high-impact macro calendar previews directly to your inbox.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2.5 bg-brand-green/10 border border-brand-green/30 text-brand-green px-4 py-3 rounded-xl text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Welcome aboard! You have been added to the Zahid Trader Daily Market Desk dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your institutional or trading email"
                    className="flex-1 bg-[#0B0F12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-brand-teal hover:bg-brand-teal-dark text-[#0B0F12] font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-brand-teal/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{loading ? "Subscribing..." : "Subscribe Free"}</span>
                    <span className="font-light">›</span>
                  </button>
                  {subscribeError && (
                    <p className="text-xs text-red-400 sm:col-span-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {subscribeError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/[0.08]">
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-display">
              Market Intelligence
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/markets" className="hover:text-brand-teal transition-colors">
                  Live Markets Dashboard
                </Link>
              </li>
              <li>
                <Link href="/analysis" className="hover:text-brand-teal transition-colors">
                  Daily Market Analysis
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-brand-teal transition-colors">
                  Financial News Portal
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-brand-teal transition-colors">
                  Partner Research Library
                </Link>
              </li>
              <li>
                <Link href="/economic-calendar" className="hover:text-brand-teal transition-colors">
                  Macro Economic Calendar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-display">
              Trading Academy
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/learn" className="hover:text-brand-teal transition-colors">
                  Trading Education Hub
                </Link>
              </li>
              <li>
                <Link href="/learn/what-is-forex-trading-complete-beginners-guide" className="hover:text-brand-teal transition-colors">
                  What is Forex Trading?
                </Link>
              </li>
              <li>
                <Link href="/learn/candlestick-patterns-every-trader-must-know" className="hover:text-brand-teal transition-colors">
                  Candlestick Patterns
                </Link>
              </li>
              <li>
                <Link href="/learn/risk-management-the-1-percent-golden-rule" className="hover:text-brand-teal transition-colors">
                  Risk Management Rules
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-brand-teal transition-colors">
                  Trading Calculators & Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-display">
              Company & Desk
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-brand-teal transition-colors">
                  About Zahid Trader
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-teal transition-colors">
                  Membership & VIP Plans
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-teal transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-teal transition-colors">
                  Contact Support Desk
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-brand-teal transition-colors font-mono text-[11px]"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline inline-flex items-center gap-1"
                >
                  Direct WhatsApp <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-display">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SITE_CONFIG.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory & Risk Disclaimer (Prominently featured as required for international financial brands) */}
        <div className="pt-8 pb-6 border-b border-white/[0.08]">
          <div className="flex items-start gap-3 bg-red-950/20 border border-red-900/30 p-4 rounded-xl text-xs text-gray-400 leading-relaxed">
            <Shield className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-300 block mb-1">High-Risk Financial Disclosure & Educational Disclaimer:</strong>
              The content published by ZAHID TRADER (including market analyses, research briefs, economic calendars, chart studies, and educational modules) is prepared strictly for educational and informational purposes and does not constitute financial, investment, or personalized trading advice. Trading foreign exchange (Forex), contracts for difference (CFDs), precious metals, commodities, equities, and cryptocurrencies carries a high level of risk and may not be suitable for all investors. High leverage can work against you as well as for you. Past performance or hypothetical track record scenarios do not guarantee future results. You should carefully consider your investment objectives, level of experience, and risk appetite before entering financial markets.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {currentYear} ZAHID TRADER. All rights reserved. Master the Markets.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <Link href="/risk-disclosure" className="hover:text-gray-300 transition-colors">
              Risk Disclosure
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

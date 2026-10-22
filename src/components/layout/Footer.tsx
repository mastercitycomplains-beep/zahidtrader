"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import BrandLogo from "@/components/layout/BrandLogo";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  Shield,
  ArrowRight,
  Lock,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  if (pathname?.startsWith("/admin")) {
    return null;
  }
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
    <footer className="w-full bg-page-elevated border-t border-theme text-muted text-sm transition-colors duration-300">
      {/* Top Banner / Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-theme">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <BrandLogo size="lg" href="/" />
              </div>
              <p className="text-muted text-sm leading-relaxed max-w-md mt-2">
                Institutional-grade financial intelligence, daily Forex &amp; Gold scenario mapping,
                and disciplined risk management principles for independent traders worldwide.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: {SITE_CONFIG.whatsappDisplay}</span>
              </Link>
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-500 dark:text-sky-400 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram Desk</span>
              </a>
            </div>
          </div>

          {/* Quick Newsletter */}
          <div className="lg:col-span-7 flex flex-col justify-center bg-surface p-6 sm:p-8 rounded-2xl border border-theme relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-teal inline-block mb-1">
                The Daily Market Letter
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-foreground mb-2 font-display">
                Get Institutional Pre-Market Intelligence Daily
              </h3>
              <p className="text-muted text-xs sm:text-sm mb-5 max-w-xl leading-relaxed">
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
                    placeholder="Enter your trading or personal email"
                    className="flex-1 bg-page border border-theme rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-brand-teal hover:bg-brand-teal-dark text-[#0B0F12] font-black px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-brand-teal/20 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                  >
                    <span>{loading ? "Subscribing..." : "Subscribe Free"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {subscribeError && (
                    <p className="text-xs text-red-500 sm:col-span-2 flex items-center gap-1.5 mt-1">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-theme">
          <div>
            <h4 className="text-foreground font-black text-xs uppercase tracking-wider mb-4 font-display">
              Market Intelligence
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/markets" className="text-muted hover:text-brand-teal transition-colors">
                  Live Markets Dashboard
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted hover:text-brand-teal transition-colors font-medium">
                  Daily Market Blog
                </Link>
              </li>
              <li>
                <Link href="/analysis" className="text-muted hover:text-brand-teal transition-colors">
                  Daily Market Analysis
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted hover:text-brand-teal transition-colors">
                  Financial News Portal
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-muted hover:text-brand-teal transition-colors">
                  Macro Research Library
                </Link>
              </li>
              <li>
                <Link href="/economic-calendar" className="text-muted hover:text-brand-teal transition-colors">
                  Macro Economic Calendar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-black text-xs uppercase tracking-wider mb-4 font-display">
              Trading Academy
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/learn" className="text-muted hover:text-brand-teal transition-colors">
                  Trading Education Hub
                </Link>
              </li>
              <li>
                <Link href="/learn/what-is-forex-trading-complete-beginners-guide" className="text-muted hover:text-brand-teal transition-colors">
                  What is Forex Trading?
                </Link>
              </li>
              <li>
                <Link href="/learn/candlestick-patterns-every-trader-must-know" className="text-muted hover:text-brand-teal transition-colors">
                  Candlestick Patterns
                </Link>
              </li>
              <li>
                <Link href="/learn/risk-management-the-1-percent-golden-rule" className="text-muted hover:text-brand-teal transition-colors">
                  Risk Management Rules
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-muted hover:text-brand-teal transition-colors">
                  Trading Calculators &amp; Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-black text-xs uppercase tracking-wider mb-4 font-display">
              Company &amp; Desk
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="text-muted hover:text-brand-teal transition-colors">
                  About Zahid Trader
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted hover:text-brand-teal transition-colors">
                  Membership &amp; VIP Plans
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted hover:text-brand-teal transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted hover:text-brand-teal transition-colors">
                  Contact Support Desk
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-muted hover:text-brand-teal transition-colors font-mono text-[11px]"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Direct WhatsApp <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-black text-xs uppercase tracking-wider mb-4 font-display">
              Compliance &amp; Admin
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SITE_CONFIG.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-brand-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 mt-2 border-t border-theme">
                <Link href="/admin" className="text-brand-teal hover:underline inline-flex items-center gap-1.5 font-bold">
                  <Lock className="w-3 h-3" />
                  <span>Admin CMS Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Risk Disclaimer */}
        <div className="pt-8 pb-6 border-b border-theme">
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-xs text-muted leading-relaxed">
            <Shield className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground block mb-1">High-Risk Financial Disclosure &amp; Educational Disclaimer:</strong>
              The content published by ZAHID TRADER (including market analyses, research briefs, economic calendars, chart studies, and educational modules) is prepared strictly for educational and informational purposes and does not constitute financial, investment, or personalized trading advice. Trading foreign exchange (Forex), contracts for difference (CFDs), precious metals, commodities, equities, and cryptocurrencies carries a high level of risk and may not be suitable for all investors. High leverage can work against you as well as for you. Past performance or hypothetical track record scenarios do not guarantee future results. You should carefully consider your investment objectives, level of experience, and risk appetite before entering financial markets.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <p>© {currentYear} ZAHID TRADER. All rights reserved. Master the Markets.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/risk-disclosure" className="hover:text-foreground transition-colors">
              Risk Disclosure
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Support
            </Link>
            <Link href="/admin/login" className="hover:text-brand-teal transition-colors">
              Staff Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

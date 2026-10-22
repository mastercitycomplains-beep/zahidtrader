import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DAILY_MARKET_ANALYSIS } from "@/lib/analysisData";
import LiveTradingChart from "@/components/charts/LiveTradingChart";
import {
  ArrowLeft,
  Target,
  ShieldAlert,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return DAILY_MARKET_ANALYSIS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = DAILY_MARKET_ANALYSIS.find((a) => a.slug === params.slug);
  if (!item) return { title: "Analysis Not Found" };
  return {
    title: item.title,
    description: item.summary,
  };
}

export default function AnalysisDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = DAILY_MARKET_ANALYSIS.find((a) => a.slug === params.slug);
  if (!item) notFound();

  const isBullish = item.bias === "Bullish";
  const isBearish = item.bias === "Bearish";

  return (
    <article className="py-12 sm:py-20 bg-[#0B0F12]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/analysis"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-brand-teal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Analysis</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-lg font-black text-white bg-white/[0.05] px-3 py-1 rounded-xl border border-white/10">
              {item.symbol}
            </span>
            <span
              className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                isBullish
                  ? "bg-brand-green/20 text-brand-green border border-brand-green/30"
                  : isBearish
                  ? "bg-brand-red/20 text-brand-red border border-brand-red/30"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              }`}
            >
              {item.bias} Bias
            </span>
            <span className="text-xs text-gray-400 font-mono">Timeframe: {item.timeframe}</span>
            <span className="text-xs text-gray-500 font-mono">• {item.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight mb-4">
            {item.title}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            {item.summary}
          </p>

          <div className="flex items-center justify-between py-4 border-y border-white/[0.08] mt-6 text-xs text-gray-400">
            <span>Authored by: <strong className="text-white">{item.author}</strong> ({item.authorRole})</span>
            <span className="font-mono">Reference Price: {item.currentPrice}</span>
          </div>
        </div>

        {/* Interactive Chart */}
        <div className="mb-12">
          <LiveTradingChart symbol={item.symbol} initialPrice={item.currentPrice} height={400} />
        </div>

        {/* Key Support & Resistance Matrix */}
        <div className="bg-[#11161B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6 font-display">
            Interbank Key Levels & Pivot Architecture
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
            <div className="p-3 rounded-xl bg-brand-red/10 border border-brand-red/20">
              <span className="text-[10px] text-brand-red block uppercase font-bold">R2 Ceiling</span>
              <span className="text-brand-red font-bold text-sm">{item.keyLevels.resistance2}</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-red/5 border border-brand-red/10">
              <span className="text-[10px] text-gray-400 block uppercase">R1 Resistance</span>
              <span className="text-white font-bold text-sm">{item.keyLevels.resistance1}</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-teal/15 border border-brand-teal/30 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-brand-teal block uppercase font-bold">Session Pivot</span>
              <span className="text-brand-teal font-black text-sm">{item.keyLevels.pivot}</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-green/5 border border-brand-green/10">
              <span className="text-[10px] text-gray-400 block uppercase">S1 Support</span>
              <span className="text-white font-bold text-sm">{item.keyLevels.support1}</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-green/10 border border-brand-green/20">
              <span className="text-[10px] text-brand-green block uppercase font-bold">S2 Floor</span>
              <span className="text-brand-green font-bold text-sm">{item.keyLevels.support2}</span>
            </div>
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#11161B] border border-brand-green/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-brand-green font-bold text-sm uppercase mb-3">
              <CheckCircle className="w-4 h-4" />
              <span>Bullish Expansion Scenario</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {item.bullishScenario}
            </p>
          </div>

          <div className="bg-[#11161B] border border-brand-red/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-brand-red font-bold text-sm uppercase mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Bearish / Invalidation Scenario</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {item.bearishScenario}
            </p>
          </div>
        </div>

        {/* Full Written Narrative Content */}
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-sm sm:text-base space-y-4 mb-12">
          <div className="whitespace-pre-line">{item.content}</div>
        </div>

        {/* Risks & Catalysts */}
        <div className="bg-[#11161B] border border-white/[0.08] rounded-2xl p-6 mb-12">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">
            High-Impact Macro Catalysts Monitored
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
            {item.risksAndCatalysts.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1.5 flex-shrink-0" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Discussion CTA */}
        <div className="bg-gradient-to-r from-brand-teal/20 via-[#11161B] to-transparent border border-brand-teal/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-white font-display">
              Questions regarding this setup or invalidation level?
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              Connect directly with our desk on WhatsApp for clarification.
            </p>
          </div>
          <Link
            href={getWhatsAppUrl(`Hello Zahid Trader, I am reading the ${item.symbol} analysis and would like to ask a question.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-[#0B0F12] font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wide transition-all shadow-md hover:bg-[#20bd5a]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Ask on WhatsApp</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

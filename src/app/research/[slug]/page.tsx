import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RESEARCH_REPORTS } from "@/lib/researchData";
import { ArrowLeft, Clock, BookOpen, ShieldCheck, ArrowRight, Share2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return RESEARCH_REPORTS.map((report) => ({
    slug: report.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const report = RESEARCH_REPORTS.find((r) => r.slug === params.slug);
  if (!report) return { title: "Report Not Found" };
  return {
    title: report.title,
    description: report.summary,
  };
}

export default function ResearchDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const report = RESEARCH_REPORTS.find((r) => r.slug === params.slug);
  if (!report) notFound();

  const related = RESEARCH_REPORTS.filter((r) => r.id !== report.id).slice(0, 3);

  return (
    <article className="py-12 sm:py-20 bg-[#0B0F12]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-brand-teal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research Library</span>
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-teal/20 text-brand-teal border border-brand-teal/30">
              {report.topic} Research
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" /> {report.readTime}
            </span>
            <span className="text-xs text-gray-500 font-mono">• {report.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight mb-4">
            {report.title}
          </h1>

          <p className="text-brand-teal text-base sm:text-lg font-semibold leading-relaxed mb-4">
            {report.subtitle}
          </p>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {report.summary}
          </p>

          <div className="flex items-center justify-between py-4 border-y border-white/[0.08] mt-6 text-xs text-gray-400">
            <span>Published by: <strong className="text-white">{report.author}</strong></span>
            <span className="px-2.5 py-0.5 rounded bg-white/[0.05] text-gray-300 font-mono">
              {report.badge}
            </span>
          </div>
        </div>

        {/* Report Content */}
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-sm sm:text-base space-y-6 mb-16">
          <div className="whitespace-pre-line">{report.content}</div>
        </div>

        {/* Related Reports */}
        <div className="pt-12 border-t border-white/[0.08]">
          <h3 className="text-xl font-bold text-white mb-6 font-display">
            Related Macro Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/research/${item.slug}`}
                className="bg-[#11161B] hover:bg-[#161D24] p-5 rounded-2xl border border-white/[0.06] transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-teal block mb-1">
                    {item.topic}
                  </span>
                  <h4 className="text-xs font-bold text-white group-hover:text-brand-teal transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>
                <span className="text-[11px] text-gray-500 mt-4 flex items-center justify-between">
                  <span className="font-mono">{item.readTime}</span>
                  <ArrowRight className="w-3 h-3 text-brand-teal" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

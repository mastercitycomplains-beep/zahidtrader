"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RESEARCH_REPORTS } from "@/lib/researchData";
import { LayoutGrid, List, ArrowRight, BookOpen, Clock, FileText } from "lucide-react";

const TABS = ["ALL", "USD", "RATES", "FED", "ENERGY", "FOREX", "GOLD", "BREAKDOWN"] as const;

export default function ResearchPreviewSection() {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"tiles" | "list">("tiles");

  const filteredReports =
    activeTab === "ALL"
      ? RESEARCH_REPORTS
      : RESEARCH_REPORTS.filter((r) => r.topic.toUpperCase() === activeTab);

  return (
    <section className="py-24 bg-page border-t border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Partner Library
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-4">
            ZAHID TRADER RESEARCH DESK
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Live from our cross-asset desk — thematic briefs, macro analysis, and structural order flow explainers, updated continuously.
          </p>
        </div>

        {/* Controls Toolbar: Tabs & View Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-theme">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-brand-teal text-[#0B0F12] shadow-sm"
                    : "text-muted hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Controls: Count & View Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs">
            <span className="font-mono text-muted uppercase font-semibold">
              SHOWING {filteredReports.length} OF {RESEARCH_REPORTS.length} REPORTS
            </span>

            <div className="flex items-center bg-surface rounded-lg p-0.5 border border-theme">
              <button
                onClick={() => setViewMode("tiles")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                  viewMode === "tiles"
                    ? "bg-white/15 text-brand-teal"
                    : "text-muted hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>TILES</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                  viewMode === "list"
                    ? "bg-white/15 text-brand-teal"
                    : "text-muted hover:text-white"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>LIST</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reports Content View */}
        {viewMode === "tiles" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredReports.map((report) => (
              <Link
                key={report.id}
                href={`/research/${report.slug}`}
                className="bg-surface hover:bg-[#161D24] border border-theme hover:border-brand-teal/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-teal/15 text-brand-teal border border-brand-teal/30">
                      {report.topic}
                    </span>
                    <span className="text-[11px] text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {report.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-brand-teal transition-colors font-display line-clamp-2 mb-2 leading-snug">
                    {report.title}
                  </h3>

                  <p className="text-xs text-muted line-clamp-3 leading-relaxed mb-4">
                    {report.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-theme flex items-center justify-between text-xs">
                  <span className="text-muted">{report.date}</span>
                  <span className="font-semibold text-brand-teal group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Report <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-3 mb-10">
            {filteredReports.map((report) => (
              <Link
                key={report.id}
                href={`/research/${report.slug}`}
                className="bg-surface hover:bg-[#161D24] border border-theme hover:border-brand-teal/40 rounded-xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/[0.04] text-brand-teal flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-teal/10 text-brand-teal">
                        {report.topic}
                      </span>
                      <span className="text-xs text-muted">{report.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-brand-teal transition-colors">
                      {report.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto text-xs text-brand-teal font-semibold">
                  <span>{report.readTime}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View Full Library CTA */}
        <div className="text-center">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 bg-[#161D24] hover:bg-[#1B242D] border border-theme hover:border-brand-teal/30 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <span>View Full Research Archive</span>
            <ArrowRight className="w-4 h-4 text-brand-teal" />
          </Link>
        </div>
      </div>
    </section>
  );
}

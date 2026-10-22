"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { RESEARCH_REPORTS } from "@/lib/researchData";
import { Search, Clock, ArrowRight, LayoutGrid, List, FileText } from "lucide-react";

const TABS = ["ALL", "USD", "RATES", "FED", "ENERGY", "FOREX", "GOLD", "BREAKDOWN"] as const;

export default function ResearchPage() {
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"tiles" | "list">("tiles");

  const filteredReports = useMemo(() => {
    return RESEARCH_REPORTS.filter((report) => {
      const matchTopic = selectedTopic === "ALL" || report.topic === selectedTopic;
      const matchSearch =
        report.title.toLowerCase().includes(search.toLowerCase()) ||
        report.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        report.summary.toLowerCase().includes(search.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [selectedTopic, search]);

  return (
    <div className="py-12 sm:py-16 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Institutional Research Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Research Library & Macro Dossiers
          </h1>
          <p className="text-muted text-sm max-w-2xl leading-relaxed">
            In-depth structural studies on cross-asset liquidity, sovereign gold reserves, interbank order flow mechanics, and central bank balance sheet policies.
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-4 border-b border-theme">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTopic(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap ${
                  selectedTopic === tab
                    ? "bg-brand-teal text-[#0B0F12]"
                    : "bg-surface text-muted hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dossiers..."
                className="w-full bg-surface border border-theme rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal"
              />
            </div>

            <div className="flex items-center bg-surface rounded-xl p-0.5 border border-theme">
              <button
                onClick={() => setViewMode("tiles")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "tiles" ? "bg-white/15 text-brand-teal" : "text-muted"
                }`}
                title="Tiles View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" ? "bg-white/15 text-brand-teal" : "text-muted"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Reports Content */}
        {viewMode === "tiles" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Link
                key={report.id}
                href={`/research/${report.slug}`}
                className="bg-surface hover:bg-[#161D24] border border-theme hover:border-brand-teal/40 rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-teal/15 text-brand-teal border border-brand-teal/30">
                      {report.topic}
                    </span>
                    <span className="text-xs text-muted flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" /> {report.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-brand-teal transition-colors font-display mb-2 leading-snug">
                    {report.title}
                  </h2>

                  <p className="text-xs text-brand-teal font-medium mb-3">
                    {report.subtitle}
                  </p>

                  <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-6">
                    {report.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-theme flex items-center justify-between text-xs">
                  <span className="text-muted font-mono">{report.date}</span>
                  <span className="font-bold text-brand-teal group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Open Dossier <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <Link
                key={report.id}
                href={`/research/${report.slug}`}
                className="bg-surface hover:bg-[#161D24] border border-theme hover:border-brand-teal/40 rounded-2xl p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/[0.04] text-brand-teal flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-teal/15 text-brand-teal">
                        {report.topic}
                      </span>
                      <span className="text-xs text-muted font-mono">{report.date}</span>
                    </div>
                    <h2 className="text-base font-bold text-white group-hover:text-brand-teal transition-colors">
                      {report.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto text-xs font-semibold text-brand-teal">
                  <span className="font-mono">{report.readTime}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EDUCATIONAL_LESSONS, TRADING_GLOSSARY } from "@/lib/educationData";
import { BookOpen, GraduationCap, ArrowRight, Check, Search, Shield, HelpCircle } from "lucide-react";

export default function LearnPage() {
  const [glossarySearch, setGlossarySearch] = useState("");

  const filteredGlossary = TRADING_GLOSSARY.filter(
    (g) =>
      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="py-12 sm:py-16 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Trading Academy
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Master the Craft of Financial Market Trading
          </h1>
          <p className="text-muted text-sm max-w-2xl leading-relaxed">
            From the basics of currency quotation to interbank order blocks and drawdown prevention, build a lifetime foundation in disciplined trading.
          </p>
        </div>

        {/* Structured Course Modules Grid */}
        <div className="mb-20">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 font-display flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-brand-teal" />
            <span>Core Academy Curriculum</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EDUCATIONAL_LESSONS.map((lesson, idx) => (
              <Link
                key={lesson.id}
                href={`/learn/${lesson.slug}`}
                className="bg-surface hover:bg-surface-hover border border-theme hover:border-brand-teal/40 rounded-3xl p-6 sm:p-8 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-brand-teal/15 text-brand-teal border border-brand-teal/30">
                      Module 0{idx + 1} • {lesson.category}
                    </span>
                    <span className="text-xs text-muted font-mono">{lesson.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-brand-teal transition-colors font-display mb-3 leading-snug">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-muted leading-relaxed mb-6">
                    {lesson.summary}
                  </p>

                  <div className="space-y-2 mb-6">
                    {lesson.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-strong">
                        <Check className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-theme flex items-center justify-between text-xs text-brand-teal font-semibold">
                  <span>Start Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Interactive Glossary Section */}
        <div className="bg-surface border border-theme rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-theme">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-teal block mb-1">
                Reference Guide
              </span>
              <h2 className="text-2xl font-bold text-white font-display">
                Trading Terminology Glossary
              </h2>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Search pip, spread, leverage..."
                className="w-full bg-page border border-theme rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-page border border-theme p-4 rounded-2xl"
              >
                <div className="font-extrabold text-sm text-brand-teal mb-1 font-mono">
                  {item.term}
                </div>
                <p className="text-xs text-muted-strong leading-relaxed">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

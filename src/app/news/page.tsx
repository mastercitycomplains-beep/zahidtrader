"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { NEWS_ARTICLES } from "@/lib/newsData";
import { Search, Clock, ArrowRight, Tag } from "lucide-react";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const categories = [
    "All",
    "Central Banks",
    "Gold & Metals",
    "Forex",
    "Stock Markets",
    "Commodities",
    "Crypto",
  ];

  const filteredNews = useMemo(() => {
    return NEWS_ARTICLES.filter((article) => {
      const matchCat = selectedCategory === "All" || article.category === selectedCategory;
      const matchSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.summary.toLowerCase().includes(search.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, search]);

  const featured = NEWS_ARTICLES.find((a) => a.featured) || NEWS_ARTICLES[0];

  return (
    <div className="py-12 sm:py-16 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Market Intelligence Feed
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Financial News & Global Macro Briefs
          </h1>
          <p className="text-muted text-sm max-w-xl leading-relaxed">
            Curated coverage of central bank decisions, currency trends, precious metals developments, and geopolitical catalyst updates.
          </p>
        </div>

        {/* Featured Story Banner */}
        {featured && (
          <div className="mb-14 bg-surface border border-theme rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
              <img
                src={featured.imageUrl}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11161B] via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-teal text-[#0B0F12]">
                    Featured Story
                  </span>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featured.publishedAt}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 font-display leading-snug group-hover:text-brand-teal transition-colors">
                  <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                  {featured.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-theme">
                <span className="text-xs text-muted font-medium">{featured.source}</span>
                <Link
                  href={`/news/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:underline"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-4 border-b border-theme">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-brand-teal text-[#0B0F12]"
                    : "bg-surface text-muted hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by keyword or asset..."
              className="w-full bg-surface border border-theme rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="bg-surface hover:bg-[#161D24] border border-theme hover:border-brand-teal/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-page/80 backdrop-blur-md text-brand-teal border border-theme">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-muted mb-2">
                    <span>{article.source}</span>
                    <span>{article.publishedAt}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-brand-teal transition-colors font-display line-clamp-2 mb-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-muted line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs text-brand-teal font-semibold">
                <span>{article.readTime}</span>
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NEWS_ARTICLES } from "@/lib/newsData";
import { ArrowLeft, Clock, User, Share2, Tag, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = NEWS_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.summary,
  };
}

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = NEWS_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = NEWS_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <article className="py-12 sm:py-20 bg-[#0B0F12]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-brand-teal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Market News</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-brand-teal/20 text-brand-teal border border-brand-teal/30">
              {article.category}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.publishedAt}
            </span>
            <span className="text-xs text-gray-400">• {article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-medium">
            {article.summary}
          </p>

          <div className="flex items-center justify-between py-4 border-y border-white/[0.08] mt-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-teal text-[#0B0F12] font-bold flex items-center justify-center text-xs">
                ZT
              </div>
              <span>By {article.author} ({article.source})</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.imageUrl && (
          <div className="mb-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full max-h-[480px] object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-sm sm:text-base space-y-6">
          <div className="whitespace-pre-line">{article.content}</div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 mr-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Tags:
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg bg-[#11161B] text-gray-300 text-xs border border-white/5 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Stories */}
        <div className="mt-16 pt-12 border-t border-white/[0.08]">
          <h3 className="text-xl font-bold text-white mb-6 font-display">
            Related Intelligence Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="bg-[#11161B] hover:bg-[#161D24] p-5 rounded-2xl border border-white/[0.06] transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-teal block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-white group-hover:text-brand-teal transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>
                <span className="text-[11px] text-gray-500 mt-4 flex items-center justify-between">
                  <span>{item.readTime}</span>
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

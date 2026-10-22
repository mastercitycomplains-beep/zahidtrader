"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { NEWS_ARTICLES } from "@/lib/newsData";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function DailyBlogSection() {
  const posts = NEWS_ARTICLES.slice(0, 4);

  return (
    <section
      className="py-24 bg-page-elevated border-t border-theme"
      aria-labelledby="daily-blog-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
              Daily Market Blog
            </span>
            <h2
              id="daily-blog-heading"
              className="text-3xl sm:text-4xl font-extrabold text-heading font-display tracking-tight"
            >
              Fresh Desk Commentary &amp; Macro Notes
            </h2>
            <p className="text-muted text-sm max-w-2xl mt-2 leading-relaxed">
              Short-form articles on Forex, Gold, central banks, and session prep—updated with
              each trading day. Full articles live in the news library.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:underline self-start md:self-auto"
          >
            View all blog posts
            <ArrowRight className="w-3.5 h-3.5" aria-hidden />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, idx) => (
            <ScrollReveal key={post.id} delayMs={idx * 70}>
              <article className="group h-full bg-surface border border-theme hover:border-brand-teal/35 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-40 md:w-44 h-44 sm:h-auto shrink-0 bg-page">
                  <Image
                    src={post.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 180px"
                  />
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide font-semibold text-brand-teal mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-brand-teal/10 border border-brand-teal/25">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted">
                      <CalendarDays className="w-3 h-3" aria-hidden />
                      {post.publishedAt}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted">
                      <Clock className="w-3 h-3" aria-hidden />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-heading font-display leading-snug mb-2 group-hover:text-brand-teal transition-colors line-clamp-2">
                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4 flex-1">
                    {post.summary}
                  </p>
                  <Link
                    href={`/news/${post.slug}`}
                    className="text-xs font-bold text-brand-teal inline-flex items-center gap-1"
                  >
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

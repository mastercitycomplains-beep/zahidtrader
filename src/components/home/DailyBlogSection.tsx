"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Clock, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { BlogPost } from "@/lib/blog/types";

export default function DailyBlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPublished() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load daily blog posts:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPublished();
  }, []);

  return (
    <section
      className="py-24 bg-page-elevated border-t border-theme"
      aria-labelledby="daily-blog-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-brand-teal block">
                Daily Market Desk Blog
              </span>
            </div>
            <h2
              id="daily-blog-heading"
              className="text-3xl sm:text-4xl font-black text-foreground font-display tracking-tight"
            >
              Fresh Desk Commentary &amp; Macro Notes
            </h2>
            <p className="text-muted text-sm max-w-2xl mt-2 leading-relaxed">
              Real-time dispatches on Forex liquidity, Gold invalidation levels, and central bank monetary shifts—synchronized directly from our editorial desk.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:underline self-start md:self-auto"
          >
            <span>Explore all blog briefings</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, idx) => (
            <ScrollReveal key={post.id} delayMs={idx * 70}>
              <article className="group h-full bg-surface border border-theme hover:border-brand-teal/40 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-44 md:w-48 h-44 sm:h-auto shrink-0 bg-surface-deep flex items-center justify-center p-4 border-b sm:border-b-0 sm:border-r border-theme">
                  <div className="relative w-28 h-28 bg-white rounded-2xl p-2 shadow-sm border border-theme flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={post.featured_image || "/images/zahid-trader-logo.png"}
                      alt={post.image_alt || post.title}
                      width={100}
                      height={100}
                      className="object-contain max-h-24"
                    />
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide font-bold text-brand-teal mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-teal/10 border border-brand-teal/25">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted">
                        <CalendarDays className="w-3 h-3" aria-hidden />
                        {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Recent"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted">
                        <Clock className="w-3 h-3" aria-hidden />
                        {post.reading_time}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-foreground font-display leading-snug mb-2 group-hover:text-brand-teal transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-theme flex items-center justify-between">
                    <span className="text-[11px] font-bold text-foreground">
                      {post.author_name}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-brand-teal inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Read Briefing</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

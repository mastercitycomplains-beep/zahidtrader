import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  ArrowRight,
  TrendingUp,
  Tag,
  Search,
  BookOpen,
  Filter,
  Sparkles,
} from "lucide-react";
import { blogService } from "@/lib/blog/blogService";
import { SITE_CONFIG } from "@/lib/config";
import MotionFade from "@/components/motion/MotionFade";
import MotionCard from "@/components/motion/MotionCard";

export const metadata: Metadata = {
  title: "Daily Market Desk Blog & Macro Notes",
  description:
    "Institutional market intelligence, daily Forex and Gold commentary, central bank policy analysis, and trading psychology from the Zahid Trader desk.",
  openGraph: {
    title: `Market Blog & Institutional Intelligence | ${SITE_CONFIG.name}`,
    description: "Daily Forex, Gold, and Macro analysis from CEO Zahid Hussain.",
    url: `${SITE_CONFIG.url}/blog`,
    images: [{ url: SITE_CONFIG.images.logo, width: 800, height: 800, alt: "Zahid Trader Blog" }],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
};

export const revalidate = 60; // Revalidate every minute

export default async function BlogIndexPage() {
  const posts = await blogService.getAllPosts(false);
  const featured = posts[0];
  const gridPosts = posts.slice(1);

  const categories = [
    "All",
    "Market Analysis",
    "Education",
    "Macro Research",
    "Psychology",
  ];

  return (
    <div className="min-h-screen bg-page py-12 md:py-20">
      {/* Blog Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${SITE_CONFIG.name} Market Intelligence Blog`,
            description: "Institutional market notes, gold analysis, and Forex research.",
            url: `${SITE_CONFIG.url}/blog`,
            publisher: {
              "@type": "Organization",
              name: SITE_CONFIG.name,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_CONFIG.url}${SITE_CONFIG.images.logo}`,
              },
            },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              description: p.excerpt,
              datePublished: p.published_at,
              url: `${SITE_CONFIG.url}/blog/${p.slug}`,
            })),
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionFade direction="up" delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/25 text-brand-teal text-xs font-black uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Desk Commentary &amp; Editorial Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground font-display tracking-tight leading-tight mb-4">
              Zahid Trader <span className="teal-gradient-text">Market Blog</span>
            </h1>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              Institutional perspectives on Gold, Forex, central banks, and disciplined risk execution.
              Updated daily by CEO Zahid Hussain and our market strategy desk.
            </p>
          </MotionFade>
        </div>

        {/* Featured Hero Post */}
        {featured && (
          <MotionFade direction="up" delay={0.15} className="mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-surface border border-theme shadow-xl hover:border-brand-teal/40 transition-all group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-brand-teal text-[#090D11]">
                        {featured.category}
                      </span>
                      <span className="text-xs text-muted font-medium flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {featured.published_at ? new Date(featured.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                      </span>
                      <span className="text-xs text-muted font-medium flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {featured.reading_time}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground font-display tracking-tight group-hover:text-brand-teal transition-colors mb-4">
                      <Link href={`/blog/${featured.slug}`}>
                        {featured.title}
                      </Link>
                    </h2>

                    <p className="text-muted text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-theme">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-teal/40 bg-white">
                        <Image
                          src={featured.author_avatar || "/images/zahid-trader-ceo.png"}
                          alt={featured.author_name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{featured.author_name}</div>
                        <div className="text-[11px] text-muted">{featured.author_title}</div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-brand-teal hover:underline"
                    >
                      <span>Read Full Analysis</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-surface-deep flex items-center justify-center p-8 border-t lg:border-t-0 lg:border-l border-theme">
                  <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl bg-white p-4 shadow-xl border border-theme flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={featured.featured_image || "/images/zahid-trader-logo.png"}
                      alt={featured.image_alt || featured.title}
                      width={220}
                      height={220}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </MotionFade>
        )}

        {/* Section Divider & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-theme">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat, idx) => (
              <span
                key={cat}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  idx === 0
                    ? "bg-brand-teal text-[#090D11] shadow-sm"
                    : "bg-surface text-muted hover:text-foreground hover:bg-surface-hover border border-theme"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="text-xs text-muted font-medium">
            Showing <strong className="text-foreground">{posts.length}</strong> institutional briefings
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {gridPosts.map((post, index) => (
            <MotionFade key={post.id} delay={index * 0.08} direction="up">
              <MotionCard className="h-full">
                <article className="h-full bg-surface border border-theme hover:border-brand-teal/40 rounded-3xl p-6 flex flex-col justify-between shadow-lg transition-all">
                  <div>
                    {/* Thumbnail / Header Area */}
                    <div className="relative h-44 w-full rounded-2xl bg-surface-deep border border-theme/60 mb-5 overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src={post.featured_image || "/images/zahid-trader-logo.png"}
                        alt={post.image_alt || post.title}
                        width={140}
                        height={140}
                        className="object-contain max-h-36 transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-surface/90 text-brand-teal backdrop-blur-md border border-theme">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted mb-2.5 font-medium">
                      <CalendarDays className="w-3.5 h-3.5 text-brand-teal" />
                      <span>
                        {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                      </span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.reading_time}</span>
                    </div>

                    <h3 className="text-lg font-black text-foreground font-display leading-snug mb-3 hover:text-brand-teal transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-muted text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-theme flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-white border border-brand-teal/30">
                        <Image
                          src={post.author_avatar || "/images/zahid-trader-ceo.png"}
                          alt={post.author_name}
                          width={28}
                          height={28}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-foreground">{post.author_name}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-teal hover:underline"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              </MotionCard>
            </MotionFade>
          ))}
        </div>

        {/* Bottom VIP CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-brand-teal/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-black uppercase tracking-widest text-brand-teal mb-2 block">
                Zahid Trader Concierge
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground font-display mb-3">
                Want Direct Morning Strategy Calls?
              </h2>
              <p className="text-muted text-sm leading-relaxed">
                Join CEO Zahid Hussain's VIP Telegram and WhatsApp desk to receive intraday trade invalidations, live audio commentary, and real-time execution alerts.
              </p>
            </div>
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-2xl bg-brand-teal hover:bg-brand-teal-dark text-[#090D11] font-black text-sm uppercase tracking-wider shadow-xl shadow-brand-teal/25 whitespace-nowrap active:scale-95 transition-all"
            >
              Access VIP Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

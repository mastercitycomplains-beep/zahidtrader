import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { blogService } from "@/lib/blog/blogService";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import MotionFade from "@/components/motion/MotionFade";

interface BlogPostPageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await blogService.getAllPosts(false);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await blogService.getPostBySlug(params.slug);
  if (!post) {
    return { title: "Article Not Found | Zahid Trader" };
  }

  const title = post.seo_title || `${post.title} | ${SITE_CONFIG.name}`;
  const description = post.seo_description || post.excerpt;
  const canonical = post.canonical_url || `${SITE_CONFIG.url}/blog/${post.slug}`;

  return {
    title,
    description,
    authors: [{ name: post.author_name }],
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      publishedTime: post.published_at || post.created_at,
      authors: [post.author_name],
      images: [
        {
          url: post.featured_image || SITE_CONFIG.images.logo,
          width: 800,
          height: 800,
          alt: post.image_alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.featured_image || SITE_CONFIG.images.logo],
    },
    alternates: {
      canonical,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await blogService.getPostBySlug(params.slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  const allPosts = await blogService.getAllPosts(false);
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Parse markdown headings for table of contents
  const headings = post.content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace("## ", "").trim());

  // Simple Markdown paragraph renderer
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-2xl sm:text-3xl font-black text-foreground font-display tracking-tight mt-10 mb-4 pt-4 border-t border-theme first:mt-0 first:pt-0 first:border-0"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-xl sm:text-2xl font-bold text-foreground font-display tracking-tight mt-6 mb-3 text-brand-teal"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        const items = trimmed.split("\n").map((li) => li.replace(/^[*\-]\s+/, ""));
        return (
          <ul key={idx} className="my-4 space-y-2 pl-4 list-disc marker:text-brand-teal text-muted text-sm sm:text-base leading-relaxed">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }
      if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ")) {
        const items = trimmed.split("\n").map((li) => li.replace(/^\d+\.\s+/, ""));
        return (
          <ol key={idx} className="my-4 space-y-2 pl-4 list-decimal marker:text-brand-teal text-muted text-sm sm:text-base leading-relaxed">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <p key={idx} className="my-4 text-muted text-base sm:text-lg leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <article className="min-h-screen bg-page py-12 md:py-20">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.featured_image || `${SITE_CONFIG.url}${SITE_CONFIG.images.logo}`,
            datePublished: post.published_at || post.created_at,
            dateModified: post.updated_at,
            author: {
              "@type": "Person",
              name: post.author_name,
            },
            publisher: {
              "@type": "Organization",
              name: SITE_CONFIG.name,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_CONFIG.url}${SITE_CONFIG.images.logo}`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
            },
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-brand-teal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Market Briefings</span>
          </Link>
        </div>

        {/* Post Metadata Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-teal text-[#090D11]">
              {post.category}
            </span>
            <span className="text-xs text-muted flex items-center gap-1.5 font-medium">
              <CalendarDays className="w-3.5 h-3.5" />
              {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recent"}
            </span>
            <span className="text-xs text-muted flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {post.reading_time}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-display tracking-tight leading-[1.12] mb-6">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted leading-relaxed pb-8 border-b border-theme font-medium">
            {post.excerpt}
          </p>

          {/* Author Badge & Social Triggers */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white border-2 border-brand-teal/40 shadow-sm">
                <Image
                  src={post.author_avatar || "/images/zahid-trader-ceo.png"}
                  alt={post.author_name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-extrabold text-foreground flex items-center gap-1.5">
                  <span>{post.author_name}</span>
                  <ShieldCheck className="w-4 h-4 text-brand-teal" />
                </div>
                <div className="text-xs text-muted">{post.author_title}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - Read more: ${SITE_CONFIG.url}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Share</span>
              </a>
              <Link
                href={getWhatsAppUrl(`Hello Zahid Trader, I read your article "${post.title}" and want to discuss desk execution.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-[#090D11] text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Ask Desk</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Featured Image Emblem Container */}
        {post.featured_image && (
          <div className="mb-12 relative rounded-3xl bg-surface border border-theme p-6 sm:p-10 overflow-hidden shadow-xl flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal/5 to-transparent pointer-events-none" />
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-2xl p-4 shadow-lg border border-theme flex items-center justify-center">
              <Image
                src={post.featured_image}
                alt={post.image_alt || post.title}
                width={240}
                height={240}
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}

        {/* Table of Contents if available */}
        {headings.length > 0 && (
          <div className="mb-10 p-6 rounded-2xl bg-surface border border-theme shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-teal mb-3 font-display">
              Table of Contents
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              {headings.map((h, i) => (
                <li key={i} className="flex items-center gap-2 hover:text-brand-teal transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-invert max-w-none mb-16">
          {renderContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-6 pb-8 border-t border-theme flex flex-wrap items-center gap-2 mb-12">
            <span className="text-xs font-bold text-muted mr-1">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-surface border border-theme text-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        <div className="p-8 rounded-3xl bg-surface border border-brand-teal/30 shadow-xl mb-16 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-20 h-20 rounded-2xl bg-white p-1 border-2 border-brand-teal shadow-md shrink-0 overflow-hidden">
              <Image
                src={SITE_CONFIG.images.ceo}
                alt={SITE_CONFIG.ceo.name}
                width={80}
                height={80}
                className="object-cover object-[center_20%] w-full h-full scale-105"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-lg font-black text-foreground font-display">{post.author_name}</h3>
                <span className="bg-brand-teal/15 text-brand-teal text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified Desk
                </span>
              </div>
              <p className="text-xs text-brand-teal font-semibold mb-2">{post.author_title}</p>
              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                Founder and Chief Executive Officer of ZAHID TRADER. Zahid leads market scenario mapping across London and New York sessions, mentoring serious traders in macro liquidity, price delivery, and capital defense.
              </p>
              <Link
                href={getWhatsAppUrl(`Hello Zahid, I would like to consult with you on trading education.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-brand-teal hover:underline"
              >
                <span>Direct WhatsApp Consultation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="pt-8 border-t border-theme">
            <h3 className="text-xl font-black text-foreground font-display mb-6">
              More Strategic Notes from Our Desk
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-5 rounded-2xl bg-surface border border-theme hover:border-brand-teal/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-brand-teal block mb-2">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-brand-teal transition-colors line-clamp-2 leading-snug mb-2 font-display">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-theme text-[11px] text-muted font-medium flex items-center justify-between">
                    <span>{rel.reading_time}</span>
                    <span className="text-brand-teal font-bold group-hover:translate-x-0.5 transition-transform">Read ›</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bold,
  Heading2,
  Heading3,
  List,
  Quote,
} from "lucide-react";

export default function NewBlogPostPage() {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Market Analysis");
  const [tagsInput, setTagsInput] = useState("Gold, Forex, Macro");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState(
    "## Strategic Market Overview\n\nWrite your institutional briefing here...\n\n### Key Invalidation Levels\n* Resistance:\n* Support:\n* Invalidation:"
  );
  const [featuredImage, setFeaturedImage] = useState("/images/zahid-trader-logo.png");
  const [imageAlt, setImageAlt] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generated = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generated);
    if (!seoTitle) setSeoTitle(val);
  };

  // Estimate reading time
  const wordCount = content.trim().split(/\s+/).length;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    setContent((prev) => `${prev}\n${prefix}Text${suffix}\n`);
  };

  const handleSubmit = async (publishImmediate: boolean) => {
    if (!title || !slug) {
      setError("Please provide a title and slug.");
      return;
    }

    setSaving(true);
    setError("");

    const chosenStatus = publishImmediate ? "published" : status;
    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category,
          tags: tagsArray,
          excerpt: excerpt || title,
          content,
          featured_image: featuredImage,
          image_alt: imageAlt || title,
          status: chosenStatus,
          reading_time: estimatedReadTime,
          seo_title: seoTitle || `${title} | Zahid Trader`,
          seo_description: seoDescription || excerpt || title,
          published_at: chosenStatus === "published" ? new Date().toISOString() : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save blog post.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/blogs");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving blog post.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-theme">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2.5 rounded-xl bg-surface border border-theme text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground font-display">
              Compose Market Article
            </h1>
            <p className="text-xs text-muted">
              Author institutional research and publish across the public website
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSubmit(false)}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl bg-surface border border-theme hover:bg-surface-hover text-xs font-bold text-foreground flex items-center gap-2 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save as Draft</span>
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-[#090D11] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-teal/25 transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{saving ? "Publishing…" : "Publish Now"}</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Article published successfully! Redirecting to index…</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Main Editor */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title */}
          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm">
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-2">
              Article Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Gold (XAU/USD) Weekly Desk Strategy: Liquidity Sweep Below $2,680"
              className="w-full px-4 py-3 bg-page border border-theme rounded-2xl text-base sm:text-lg font-bold text-foreground placeholder-muted focus:outline-none focus:border-brand-teal transition-all"
            />

            {/* Slug */}
            <div className="mt-4 pt-4 border-t border-theme flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
              <span className="font-bold text-muted uppercase tracking-wider text-[10px]">
                URL Slug:
              </span>
              <div className="flex-1 flex items-center gap-1 font-mono text-[11px] text-brand-teal bg-page px-3 py-1.5 rounded-xl border border-theme overflow-x-auto">
                <span>/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent border-0 p-0 text-foreground focus:outline-none flex-1 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm">
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-2">
              Short Summary / Excerpt *
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="2-3 sentence overview highlighting the key trade thesis, macro context, or central bank risk..."
              className="w-full px-4 py-3 bg-page border border-theme rounded-2xl text-xs sm:text-sm text-foreground placeholder-muted focus:outline-none focus:border-brand-teal transition-all leading-relaxed"
            />
          </div>

          {/* Content Body Editor */}
          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-theme">
              <label className="text-xs font-black uppercase tracking-wider text-muted">
                Article Body Content (Markdown Supported)
              </label>

              {/* Tabs */}
              <div className="flex items-center gap-1 p-1 bg-page rounded-xl border border-theme">
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "write"
                      ? "bg-brand-teal text-[#090D11]"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "preview"
                      ? "bg-brand-teal text-[#090D11]"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Live Preview
                </button>
              </div>
            </div>

            {/* Quick Toolbar */}
            {activeTab === "write" && (
              <div className="flex flex-wrap items-center gap-1.5 mb-3 p-2 bg-page rounded-xl border border-theme text-xs text-muted">
                <button
                  type="button"
                  onClick={() => insertMarkdown("**", "**")}
                  className="p-1.5 hover:text-brand-teal hover:bg-surface rounded-lg"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("## ")}
                  className="p-1.5 hover:text-brand-teal hover:bg-surface rounded-lg font-bold"
                  title="H2 Heading"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("### ")}
                  className="p-1.5 hover:text-brand-teal hover:bg-surface rounded-lg font-bold"
                  title="H3 Heading"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("* ")}
                  className="p-1.5 hover:text-brand-teal hover:bg-surface rounded-lg"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("> ")}
                  className="p-1.5 hover:text-brand-teal hover:bg-surface rounded-lg"
                  title="Blockquote"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <div className="ml-auto text-[10px] text-muted tabular-nums">
                  {wordCount} words · {estimatedReadTime}
                </div>
              </div>
            )}

            {activeTab === "write" ? (
              <textarea
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full font-mono text-xs sm:text-sm px-4 py-3 bg-page border border-theme rounded-2xl text-foreground placeholder-muted focus:outline-none focus:border-brand-teal transition-all leading-relaxed"
              />
            ) : (
              <div className="min-h-[380px] p-6 bg-page border border-theme rounded-2xl overflow-y-auto prose prose-invert max-w-none text-xs sm:text-sm">
                <div className="text-muted leading-relaxed whitespace-pre-wrap">
                  {content}
                </div>
              </div>
            )}
          </div>

          {/* Google SERP Snippet Preview */}
          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-brand-teal mb-3">
              Google Search SERP Preview
            </h3>
            <div className="p-4 rounded-2xl bg-page border border-theme">
              <div className="text-[11px] text-muted flex items-center gap-1.5 mb-1 font-mono">
                <span className="text-emerald-500 font-bold">https://zahidtrader.com</span>
                <span>› blog › {slug || "your-slug"}</span>
              </div>
              <div className="text-blue-500 dark:text-blue-400 font-bold text-sm hover:underline cursor-pointer">
                {seoTitle || title || "Zahid Trader Article Title"}
              </div>
              <div className="text-xs text-muted leading-snug mt-1">
                {seoDescription || excerpt || "Comprehensive institutional analysis and market insight from CEO Zahid Hussain."}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Taxonomy, Image, & Publishing Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publish Status Card */}
          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted mb-4">
              Publication Status
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-2xl border border-theme cursor-pointer hover:bg-surface-hover transition-colors">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={status === "published"}
                  onChange={() => setStatus("published")}
                  className="text-brand-teal focus:ring-brand-teal"
                />
                <div>
                  <div className="text-xs font-bold text-foreground">Published Immediately</div>
                  <div className="text-[10px] text-muted">Visible to all public visitors</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-2xl border border-theme cursor-pointer hover:bg-surface-hover transition-colors">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === "draft"}
                  onChange={() => setStatus("draft")}
                  className="text-brand-teal focus:ring-brand-teal"
                />
                <div>
                  <div className="text-xs font-bold text-foreground">Save as Private Draft</div>
                  <div className="text-[10px] text-muted">Hidden from public sitemap &amp; listing</div>
                </div>
              </label>
            </div>
          </div>

          {/* Category & Tags */}
          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-muted mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-page border border-theme rounded-xl px-3 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:border-brand-teal"
              >
                <option value="Market Analysis">Market Analysis</option>
                <option value="Education">Education</option>
                <option value="Macro Research">Macro Research</option>
                <option value="Psychology">Psychology</option>
                <option value="Risk Management">Risk Management</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-muted mb-2">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Gold, Forex, Order Flow, DXY"
                className="w-full px-3 py-2.5 bg-page border border-theme rounded-xl text-xs text-foreground placeholder-muted focus:outline-none focus:border-brand-teal"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted">
              Featured Image
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase text-muted mb-1.5">
                Image URL / Path
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="/images/zahid-trader-logo.png"
                className="w-full px-3 py-2 bg-page border border-theme rounded-xl text-xs text-foreground placeholder-muted font-mono focus:outline-none focus:border-brand-teal"
              />
            </div>

            {/* Live Image Preview */}
            <div className="relative h-32 rounded-2xl bg-surface-deep border border-theme flex items-center justify-center overflow-hidden p-3">
              <Image
                src={featuredImage || "/images/zahid-trader-logo.png"}
                alt={imageAlt || "Preview"}
                width={100}
                height={100}
                className="object-contain max-h-24"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-muted mb-1.5">
                Image Alt Text
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Descriptive alt text for accessibility & SEO"
                className="w-full px-3 py-2 bg-page border border-theme rounded-xl text-xs text-foreground placeholder-muted focus:outline-none focus:border-brand-teal"
              />
            </div>
          </div>

          {/* SEO Override Settings */}
          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted">
              SEO &amp; Meta Customization
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase text-muted mb-1.5">
                Custom SEO Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Leave blank to use article title"
                className="w-full px-3 py-2 bg-page border border-theme rounded-xl text-xs text-foreground placeholder-muted focus:outline-none focus:border-brand-teal"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-muted mb-1.5">
                Custom Meta Description
              </label>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Leave blank to use article excerpt"
                className="w-full px-3 py-2 bg-page border border-theme rounded-xl text-xs text-foreground placeholder-muted focus:outline-none focus:border-brand-teal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

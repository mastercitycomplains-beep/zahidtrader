"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Bold,
  Heading2,
  Heading3,
  List,
  Quote,
  RefreshCw,
} from "lucide-react";
import { BlogPost } from "@/lib/blog/types";

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Market Analysis");
  const [tagsInput, setTagsInput] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">("published");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();
        if (res.ok && data.post) {
          const p = data.post as BlogPost;
          setPost(p);
          setTitle(p.title);
          setSlug(p.slug);
          setCategory(p.category);
          setTagsInput((p.tags || []).join(", "));
          setExcerpt(p.excerpt);
          setContent(p.content);
          setFeaturedImage(p.featured_image || "/images/zahid-trader-logo.png");
          setImageAlt(p.image_alt || p.title);
          setStatus(p.status);
          setSeoTitle(p.seo_title || "");
          setSeoDescription(p.seo_description || "");
        } else {
          setError(data.error || "Post not found.");
        }
      } catch (err) {
        setError("Failed to load article details.");
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    setContent((prev) => `${prev}\n${prefix}Text${suffix}\n`);
  };

  const handleUpdate = async (newStatus?: "draft" | "published") => {
    if (!title || !slug) {
      setError("Title and slug are required.");
      return;
    }

    setSaving(true);
    setError("");

    const chosenStatus = newStatus || status;
    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category,
          tags: tagsArray,
          excerpt,
          content,
          featured_image: featuredImage,
          image_alt: imageAlt,
          status: chosenStatus,
          seo_title: seoTitle || `${title} | Zahid Trader`,
          seo_description: seoDescription || excerpt,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update article.");

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/blogs");
        router.refresh();
      }, 900);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error updating post.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post.");
      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError("Failed to delete post.");
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-brand-teal animate-spin" />
      </div>
    );
  }

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
              Edit Market Article
            </h1>
            <p className="text-xs text-muted font-mono">ID: {id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {post && post.status === "published" && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-surface border border-theme hover:bg-surface-hover text-xs font-bold text-muted hover:text-brand-teal flex items-center gap-1.5 transition-all"
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
          <button
            onClick={() => handleUpdate()}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-[#090D11] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-teal/25 transition-all active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving…" : "Save Changes"}</span>
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
          <span>Article updated successfully! Returning to management list…</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm">
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-2">
              Article Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-page border border-theme rounded-2xl text-base sm:text-lg font-bold text-foreground placeholder-muted focus:outline-none focus:border-brand-teal transition-all"
            />

            <div className="mt-4 pt-4 border-t border-theme flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
              <span className="font-bold text-muted uppercase tracking-wider text-[10px]">
                URL Slug:
              </span>
              <div className="flex-1 flex items-center gap-1 font-mono text-[11px] text-brand-teal bg-page px-3 py-1.5 rounded-xl border border-theme">
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

          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm">
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-2">
              Excerpt / Summary
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-3 bg-page border border-theme rounded-2xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-teal transition-all leading-relaxed"
            />
          </div>

          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-theme">
              <label className="text-xs font-black uppercase tracking-wider text-muted">
                Body Content (Markdown)
              </label>

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
                  title="Quote"
                >
                  <Quote className="w-4 h-4" />
                </button>
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
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted mb-4">
              Status &amp; Publishing
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
                  <div className="text-xs font-bold text-foreground">Published</div>
                  <div className="text-[10px] text-muted">Visible to all visitors</div>
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
                  <div className="text-xs font-bold text-foreground">Draft</div>
                  <div className="text-[10px] text-muted">Private / Unpublished</div>
                </div>
              </label>
            </div>
          </div>

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
                Tags
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2.5 bg-page border border-theme rounded-xl text-xs text-foreground focus:outline-none focus:border-brand-teal"
              />
            </div>
          </div>

          <div className="bg-surface border border-theme rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted">
              Featured Image
            </h3>
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              className="w-full px-3 py-2 bg-page border border-theme rounded-xl text-xs text-foreground font-mono focus:outline-none focus:border-brand-teal"
            />
            <div className="relative h-28 rounded-2xl bg-surface-deep border border-theme flex items-center justify-center overflow-hidden p-2">
              <Image
                src={featuredImage || "/images/zahid-trader-logo.png"}
                alt="Thumbnail"
                width={90}
                height={90}
                className="object-contain max-h-20"
              />
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/5 border border-red-500/25 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-red-500 mb-2">
              Danger Zone
            </h3>
            <p className="text-[11px] text-muted mb-4">
              Permanently delete this article and remove it from the database and public listing.
            </p>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 text-xs font-black transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete This Article</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface border border-theme rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-500 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-foreground font-display mb-2">
              Confirm Permanent Deletion
            </h3>
            <p className="text-xs text-muted leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-foreground">"{title}"</strong>? This will permanently erase it.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl bg-surface border border-theme text-foreground hover:bg-surface-hover text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-lg shadow-red-600/25"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

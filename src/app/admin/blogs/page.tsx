"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/lib/blog/types";
import {
  FileText,
  Search,
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  Filter,
  Check,
  X,
  RefreshCw,
} from "lucide-react";

export default function AdminBlogsListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [deleteModalPost, setDeleteModalPost] = useState<BlogPost | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog?includeDrafts=true");
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTogglePublish = async (post: BlogPost) => {
    const nextStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: nextStatus,
          published_at: nextStatus === "published" ? new Date().toISOString() : post.published_at,
        }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setActionMessage({
        type: "success",
        text: `Post successfully set to ${nextStatus.toUpperCase()}.`,
      });
      fetchPosts();
    } catch (err) {
      setActionMessage({ type: "error", text: "Could not update post status." });
    }
  };

  const handleDelete = async () => {
    if (!deleteModalPost) return;
    try {
      const res = await fetch(`/api/blog/${deleteModalPost.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");

      setActionMessage({
        type: "success",
        text: `Post "${deleteModalPost.title}" was permanently removed.`,
      });
      setDeleteModalPost(null);
      fetchPosts();
    } catch (err) {
      setActionMessage({ type: "error", text: "Failed to delete post." });
    }
  };

  const categories = [
    "All",
    "Market Analysis",
    "Education",
    "Macro Research",
    "Psychology",
  ];

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "all" || p.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-theme mb-8">
        <div>
          <h1 className="text-3xl font-black text-foreground font-display">
            Manage Blog Briefings
          </h1>
          <p className="text-muted text-xs sm:text-sm mt-1">
            Search, filter, edit, publish, or remove market articles across the platform.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            className="p-3 rounded-xl bg-surface border border-theme text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-brand-teal" : ""}`} />
          </button>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-[#090D11] font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-teal/20 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Article</span>
          </Link>
        </div>
      </div>

      {/* Action Notification */}
      {actionMessage && (
        <div
          className={`mb-6 p-4 rounded-2xl text-xs flex items-center justify-between border ${
            actionMessage.type === "success"
              ? "bg-brand-green/10 border-brand-green/30 text-brand-green"
              : "bg-red-500/10 border-red-500/30 text-red-500"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="font-semibold">{actionMessage.text}</span>
          </div>
          <button onClick={() => setActionMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="bg-surface border border-theme rounded-2xl p-4 sm:p-5 mb-8 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, slug, or content…"
            className="w-full pl-10 pr-4 py-2.5 bg-page border border-theme rounded-xl text-xs text-foreground placeholder-muted focus:outline-none focus:border-brand-teal transition-all"
          />
        </div>

        {/* Category & Status Selectors */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-page border border-theme rounded-xl px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:border-brand-teal"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-page border border-theme rounded-xl px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:border-brand-teal"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-surface border border-theme rounded-3xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-deep/50 border-b border-theme text-[10px] uppercase tracking-wider text-muted font-black">
                <th className="py-4 px-6">Post Details</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status Toggle</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme text-xs">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted">
                    No matching articles found. Try adjusting your search query or filter.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-hover/40 transition-colors">
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-bold text-foreground text-sm font-display leading-snug">
                        {post.title}
                      </div>
                      <div className="font-mono text-[11px] text-muted mt-0.5">
                        /blog/{post.slug}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-surface-deep border border-theme text-foreground">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                          post.status === "published"
                            ? "bg-brand-green/15 text-brand-green border-brand-green/30 hover:bg-brand-green/25"
                            : "bg-amber-500/15 text-amber-500 border-amber-500/30 hover:bg-amber-500/25"
                        }`}
                        title="Click to toggle publish status"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            post.status === "published" ? "bg-brand-green" : "bg-amber-500"
                          }`}
                        />
                        <span>{post.status}</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-muted tabular-nums">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Draft"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 rounded-xl bg-surface-deep hover:bg-surface border border-theme text-muted hover:text-brand-teal transition-colors"
                            title="View on public site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blogs/${post.id}/edit`}
                          className="p-2 rounded-xl bg-surface-deep hover:bg-surface border border-theme text-foreground hover:text-brand-teal transition-colors"
                          title="Edit article"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteModalPost(post)}
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-500 transition-colors"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-surface border border-theme rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-500 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-foreground font-display mb-2">
              Confirm Delete Article
            </h3>
            <p className="text-xs text-muted leading-relaxed mb-6">
              Are you sure you want to permanently delete{" "}
              <strong className="text-foreground font-semibold">
                "{deleteModalPost.title}"
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteModalPost(null)}
                className="px-4 py-2.5 rounded-xl bg-surface border border-theme text-foreground hover:bg-surface-hover text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-lg shadow-red-600/25"
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

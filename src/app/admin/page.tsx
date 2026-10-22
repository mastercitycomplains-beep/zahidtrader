import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAdminSession } from "@/lib/auth/adminAuth";
import { blogService } from "@/lib/blog/blogService";
import {
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  PlusCircle,
  ExternalLink,
  Edit,
  Database,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export const revalidate = 0; // Dynamic admin dashboard

export default async function AdminDashboardPage() {
  const session = getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const posts = await blogService.getAllPosts(true);
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;
  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const isSupabase = blogService.isUsingSupabase();

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-theme mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-brand-teal">
              CMS Console Online
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground font-display tracking-tight">
            Editorial Control Desk
          </h1>
          <p className="text-muted text-sm mt-1">
            Publish, edit, and orchestrate market briefings across all public routes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-[#090D11] font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-teal/20 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Post</span>
          </Link>
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-theme text-foreground hover:bg-surface-hover text-xs font-bold transition-colors"
          >
            <span>Live Blog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Database Engine Status Banner */}
      <div className="mb-8 p-5 rounded-2xl bg-surface border border-theme shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-brand-teal/15 text-brand-teal border border-brand-teal/30">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-foreground">
                Database Engine:
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${
                isSupabase
                  ? "bg-brand-green/15 text-brand-green border border-brand-green/30"
                  : "bg-amber-500/15 text-amber-500 border border-amber-500/30"
              }`}>
                {isSupabase ? "Supabase PostgreSQL (Connected)" : "Local File Vault Engine (Ready for Supabase)"}
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              {isSupabase
                ? "Your blog system is synchronizing in real time with your persistent Supabase cloud database."
                : "Posts are persistently stored locally. To connect Supabase, simply provide NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-surface border border-theme shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase text-muted tracking-wider">Total Articles</span>
            <div className="p-2 rounded-lg bg-surface-deep text-brand-teal border border-theme">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-foreground font-display tabular-nums">
            {posts.length}
          </div>
          <span className="text-[11px] text-muted mt-1 block">In publishing system</span>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-theme shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase text-muted tracking-wider">Live &amp; Published</span>
            <div className="p-2 rounded-lg bg-brand-green/10 text-brand-green border border-brand-green/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-green font-display tabular-nums">
            {publishedCount}
          </div>
          <span className="text-[11px] text-muted mt-1 block">Accessible to visitors</span>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-theme shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase text-muted tracking-wider">Drafts Pending</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-500 font-display tabular-nums">
            {draftCount}
          </div>
          <span className="text-[11px] text-muted mt-1 block">Editorial preparation</span>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-theme shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase text-muted tracking-wider">Total Readership</span>
            <div className="p-2 rounded-lg bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-foreground font-display tabular-nums">
            {totalViews.toLocaleString()}
          </div>
          <span className="text-[11px] text-muted mt-1 block">Article impressions</span>
        </div>
      </div>

      {/* Recent Blog Management Table */}
      <div className="bg-surface border border-theme rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-theme">
          <div>
            <h2 className="text-xl font-black text-foreground font-display">
              Recent Market Briefings
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Instant management of latest editorial content
            </p>
          </div>
          <Link
            href="/admin/blogs"
            className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
          >
            <span>View All ({posts.length})</span>
            <span className="text-sm">›</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-theme text-[10px] uppercase tracking-wider text-muted font-black">
                <th className="py-3 px-4">Title &amp; Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Published</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme text-xs">
              {recentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-extrabold text-foreground font-display text-sm">
                      {post.title}
                    </div>
                    <div className="font-mono text-[11px] text-muted mt-0.5">
                      /blog/{post.slug}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-surface-deep border border-theme text-foreground">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        post.status === "published"
                          ? "bg-brand-green/15 text-brand-green border border-brand-green/30"
                          : "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted tabular-nums">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Unpublished"}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/blogs/${post.id}/edit`}
                        className="p-2 rounded-lg bg-surface-deep hover:bg-surface border border-theme text-foreground hover:text-brand-teal transition-colors"
                        title="Edit Article"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      {post.status === "published" && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-surface-deep hover:bg-surface border border-theme text-muted hover:text-brand-teal transition-colors"
                          title="View on Live Site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

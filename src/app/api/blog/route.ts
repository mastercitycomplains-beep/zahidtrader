import { NextRequest, NextResponse } from "next/server";
import { blogService } from "@/lib/blog/blogService";
import { getAdminSession } from "@/lib/auth/adminAuth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeDraftsParam = searchParams.get("includeDrafts") === "true";

    // Server-side protection: drafts are only returned if request is authenticated as admin
    const session = getAdminSession();
    const includeDrafts = includeDraftsParam && Boolean(session);

    const posts = await blogService.getAllPosts(includeDrafts);
    return NextResponse.json({
      posts,
      total: posts.length,
      storageEngine: blogService.isUsingSupabase() ? "supabase-postgresql" : "local-file-vault",
    });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Strictly protect write operations on the server
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Administrator session required." },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "Title and slug are required fields." },
        { status: 400 }
      );
    }

    // Check slug collision
    const existing = await blogService.getPostBySlug(body.slug);
    if (existing) {
      return NextResponse.json(
        { error: `A blog post with slug '${body.slug}' already exists.` },
        { status: 409 }
      );
    }

    const newPost = await blogService.createPost({
      slug: body.slug.trim().toLowerCase(),
      title: body.title.trim(),
      excerpt: body.excerpt || "",
      content: body.content || "",
      featured_image: body.featured_image || "/images/zahid-trader-logo.png",
      image_alt: body.image_alt || body.title,
      category: body.category || "Market Analysis",
      tags: Array.isArray(body.tags) ? body.tags : [],
      author_name: body.author_name || session.name,
      author_title: body.author_title || "CEO & Founder",
      author_avatar: body.author_avatar || "/images/zahid-trader-ceo.png",
      status: body.status || "draft",
      reading_time: body.reading_time || "5 min read",
      seo_title: body.seo_title,
      seo_description: body.seo_description,
      canonical_url: body.canonical_url,
      published_at: body.status === "published" ? (body.published_at || new Date().toISOString()) : null,
    });

    return NextResponse.json(
      { success: true, post: newPost, message: "Blog post created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post." },
      { status: 500 }
    );
  }
}

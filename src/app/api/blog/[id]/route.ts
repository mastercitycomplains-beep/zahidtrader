import { NextRequest, NextResponse } from "next/server";
import { blogService } from "@/lib/blog/blogService";
import { getAdminSession } from "@/lib/auth/adminAuth";

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const post = (await blogService.getPostById(id)) || (await blogService.getPostBySlug(id));

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // If it's a draft, ensure caller is authenticated admin
    if (post.status !== "published") {
      const session = getAdminSession();
      if (!session) {
        return NextResponse.json({ error: "Post not found." }, { status: 404 });
      }
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("GET /api/blog/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch post." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Administrator session required." },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await req.json();

    const updated = await blogService.updatePost(id, body);
    return NextResponse.json({
      success: true,
      post: updated,
      message: "Blog post updated successfully.",
    });
  } catch (error) {
    console.error("PUT /api/blog/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Administrator session required." },
        { status: 401 }
      );
    }

    const { id } = params;
    await blogService.deletePost(id);

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/blog/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post." },
      { status: 500 }
    );
  }
}

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { BlogPost, BlogPostInput } from "./types";

const LOCAL_DATA_PATH = path.join(process.cwd(), "src", "data", "blogs.json");

// Check if Supabase credentials are configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project"));

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null;

/** Helper to read from local file */
function readLocalPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(LOCAL_DATA_PATH)) {
      return [];
    }
    const data = fs.readFileSync(LOCAL_DATA_PATH, "utf-8");
    return JSON.parse(data) as BlogPost[];
  } catch (error) {
    console.error("Error reading local posts:", error);
    return [];
  }
}

/** Helper to write to local file */
function writeLocalPosts(posts: BlogPost[]): void {
  try {
    const dir = path.dirname(LOCAL_DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(posts, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing local posts:", error);
  }
}

export const blogService = {
  isUsingSupabase(): boolean {
    return isSupabaseConfigured;
  },

  async getAllPosts(includeDrafts: boolean = false): Promise<BlogPost[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase
          .from("posts")
          .select("*")
          .order("published_at", { ascending: false, nullsFirst: false });

        if (!includeDrafts) {
          query = query.eq("status", "published");
        }

        const { data, error } = await query;
        if (error) {
          console.warn("Supabase fetch failed, falling back to local storage:", error.message);
        } else if (data) {
          return data as BlogPost[];
        }
      } catch (err) {
        console.warn("Supabase connection error, falling back:", err);
      }
    }

    // Local storage fallback
    const posts = readLocalPosts();
    if (!includeDrafts) {
      return posts.filter((p) => p.status === "published");
    }
    return posts;
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (!error && data) {
          return data as BlogPost;
        }
      } catch (err) {
        console.warn("Supabase single post fetch error:", err);
      }
    }

    const posts = readLocalPosts();
    return posts.find((p) => p.slug === slug) || null;
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          return data as BlogPost;
        }
      } catch (err) {
        console.warn("Supabase getById error:", err);
      }
    }

    const posts = readLocalPosts();
    return posts.find((p) => p.id === id) || null;
  },

  async createPost(input: BlogPostInput): Promise<BlogPost> {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      id: input.id || `post-${Date.now()}`,
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      featured_image: input.featured_image || "/images/zahid-trader-logo.png",
      image_alt: input.image_alt || input.title,
      category: input.category || "Market Analysis",
      tags: input.tags || [],
      author_name: input.author_name || "Zahid Hussain",
      author_title: input.author_title || "CEO & Founder",
      author_avatar: input.author_avatar || "/images/zahid-trader-ceo.png",
      status: input.status || "draft",
      reading_time: input.reading_time || "5 min read",
      seo_title: input.seo_title || `${input.title} | Zahid Trader`,
      seo_description: input.seo_description || input.excerpt,
      canonical_url: input.canonical_url,
      views: 0,
      published_at: input.status === "published" ? (input.published_at || now) : null,
      created_at: now,
      updated_at: now,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("posts").insert([newPost]).select().single();
        if (!error && data) {
          return data as BlogPost;
        }
        console.warn("Supabase insert error, saving locally:", error?.message);
      } catch (err) {
        console.warn("Supabase insert exception:", err);
      }
    }

    // Local save
    const posts = readLocalPosts();
    posts.unshift(newPost);
    writeLocalPosts(posts);
    return newPost;
  },

  async updatePost(id: string, updates: Partial<BlogPostInput>): Promise<BlogPost> {
    const now = new Date().toISOString();

    if (isSupabaseConfigured && supabase) {
      try {
        const payload: Record<string, unknown> = {
          ...updates,
          updated_at: now,
        };
        if (updates.status === "published" && !updates.published_at) {
          payload.published_at = now;
        }

        const { data, error } = await supabase
          .from("posts")
          .update(payload)
          .eq("id", id)
          .select()
          .single();

        if (!error && data) {
          return data as BlogPost;
        }
        console.warn("Supabase update error, falling back locally:", error?.message);
      } catch (err) {
        console.warn("Supabase update exception:", err);
      }
    }

    const posts = readLocalPosts();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Post with id ${id} not found.`);
    }

    const current = posts[index];
    const updatedPost: BlogPost = {
      ...current,
      ...updates,
      updated_at: now,
      published_at:
        updates.status === "published" && !current.published_at
          ? now
          : updates.published_at !== undefined
          ? updates.published_at
          : current.published_at,
    };

    posts[index] = updatedPost;
    writeLocalPosts(posts);
    return updatedPost;
  },

  async deletePost(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("posts").delete().eq("id", id);
        if (!error) {
          return true;
        }
        console.warn("Supabase delete error:", error.message);
      } catch (err) {
        console.warn("Supabase delete exception:", err);
      }
    }

    const posts = readLocalPosts();
    const filtered = posts.filter((p) => p.id !== id);
    writeLocalPosts(filtered);
    return true;
  },
};

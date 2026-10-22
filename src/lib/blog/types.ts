export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  image_alt?: string;
  category: string;
  tags: string[];
  author_name: string;
  author_title: string;
  author_avatar?: string;
  status: "draft" | "published" | "archived";
  reading_time: string;
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type BlogPostInput = Omit<BlogPost, "id" | "created_at" | "updated_at" | "views"> & {
  id?: string;
};

import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config";
import { NEWS_ARTICLES } from "@/lib/newsData";
import { DAILY_MARKET_ANALYSIS } from "@/lib/analysisData";
import { RESEARCH_REPORTS } from "@/lib/researchData";
import { EDUCATIONAL_LESSONS } from "@/lib/educationData";
import { blogService } from "@/lib/blog/blogService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  const staticRoutes = [
    "",
    "/markets",
    "/blog",
    "/news",
    "/analysis",
    "/research",
    "/learn",
    "/economic-calendar",
    "/tools",
    "/pricing",
    "/about",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-and-conditions",
    "/risk-disclosure",
    "/disclaimer",
    "/cookie-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : route === "/blog" ? 0.9 : 0.8,
  }));

  // Published blog articles
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedPosts = await blogService.getAllPosts(false);
    blogRoutes = publishedPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  } catch (err) {
    console.error("Failed to append blog posts to sitemap:", err);
  }

  const newsRoutes = NEWS_ARTICLES.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const analysisRoutes = DAILY_MARKET_ANALYSIS.map((item) => ({
    url: `${baseUrl}/analysis/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const researchRoutes = RESEARCH_REPORTS.map((report) => ({
    url: `${baseUrl}/research/${report.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const lessonRoutes = EDUCATIONAL_LESSONS.map((lesson) => ({
    url: `${baseUrl}/learn/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...newsRoutes,
    ...analysisRoutes,
    ...researchRoutes,
    ...lessonRoutes,
  ];
}

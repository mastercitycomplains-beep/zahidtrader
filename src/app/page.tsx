import HeroSection from "@/components/home/HeroSection";
import TradingDeskPreview from "@/components/home/TradingDeskPreview";
import FeaturesTicker from "@/components/home/FeaturesTicker";
import TrackRecordSection from "@/components/home/TrackRecordSection";
import DailyAnalysisSection from "@/components/home/DailyAnalysisSection";
import DailyBlogSection from "@/components/home/DailyBlogSection";
import ResearchPreviewSection from "@/components/home/ResearchPreviewSection";
import EducationPreviewSection from "@/components/home/EducationPreviewSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import FaqSection from "@/components/home/FaqSection";
import { NEWS_ARTICLES } from "@/lib/newsData";
import { SITE_CONFIG } from "@/lib/config";

function HomeBlogStructuredData() {
  const posts = NEWS_ARTICLES.slice(0, 4).map((article) => ({
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    datePublished: article.publishedAt,
    url: `${SITE_CONFIG.url}/news/${article.slug}`,
    image: article.imageUrl,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_CONFIG.name} Daily Market Blog`,
    description: "Daily Forex, Gold, and macro commentary from the Zahid Trader desk.",
    url: `${SITE_CONFIG.url}/news`,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}${SITE_CONFIG.images.logo}`,
      },
    },
    blogPost: posts,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HomeBlogStructuredData />
      <HeroSection />
      <FeaturesTicker />
      <TradingDeskPreview />
      <TrackRecordSection />
      <DailyAnalysisSection />
      <DailyBlogSection />
      <ResearchPreviewSection />
      <EducationPreviewSection />
      <WhyChooseSection />
      <FaqSection />
    </div>
  );
}

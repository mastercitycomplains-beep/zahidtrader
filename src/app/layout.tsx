import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopTicker from "@/components/layout/TopTicker";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import ChatbotFloat from "@/components/layout/ChatbotFloat";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { SITE_CONFIG } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Zahid Trader",
    "Forex trading Pakistan",
    "Gold market analysis",
    "XAUUSD analysis",
    "Forex education",
    "Trading risk management",
    "Daily market desk",
    "Trading blog",
    "Macro economic research",
  ],
  authors: [{ name: SITE_CONFIG.ceo.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.images.ceo,
        width: 800,
        height: 800,
        alt: `${SITE_CONFIG.ceo.name}, ${SITE_CONFIG.ceo.title} — ${SITE_CONFIG.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.images.ceo],
  },
  icons: {
    icon: SITE_CONFIG.images.logo,
    apple: SITE_CONFIG.images.logo,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-page text-foreground flex flex-col font-sans selection:bg-brand-teal selection:text-brand-dark">
        <ThemeProvider>
          <TopTicker />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <ChatbotFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}

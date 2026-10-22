export const SITE_CONFIG = {
  name: "ZAHID TRADER",
  tagline: "Master the Markets",
  description:
    "Institutional-grade market intelligence, daily Forex & Gold analysis, trading blog, and disciplined education for independent traders worldwide.",
  images: {
    logo: "/images/zahid-trader-logo.svg",
    ceo: "/images/zahid-trader-ceo.png",
  },
  ceo: {
    name: "Zahid Hussain",
    title: "CEO & Founder",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zahidtrader.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923454706138",
  whatsappDisplay: "+92 345 4706138",
  whatsappDefaultMessage: "Hello Zahid Trader, I would like to know more about your trading education and market analysis services.",
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/zahidtrader",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "zahidhussainpsr@gmail.com",
  socials: {
    instagram: "https://instagram.com/zahidtrader",
    telegram: "https://t.me/zahidtrader",
    youtube: "https://youtube.com/@zahidtrader",
    facebook: "https://facebook.com/zahidtrader",
    tiktok: "https://tiktok.com/@zahidtrader",
    twitter: "https://x.com/zahidtrader",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Markets", href: "/markets" },
    { label: "News", href: "/news" },
    { label: "Analysis", href: "/analysis" },
    { label: "Research", href: "/research" },
    { label: "Learn", href: "/learn" },
    { label: "Calendar", href: "/economic-calendar" },
    { label: "Tools", href: "/tools" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Risk Disclosure", href: "/risk-disclosure" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

export const getWhatsAppUrl = (customMessage?: string) => {
  const message = encodeURIComponent(customMessage || SITE_CONFIG.whatsappDefaultMessage);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
};

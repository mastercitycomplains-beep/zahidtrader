export interface MarketInstrument {
  symbol: string;
  name: string;
  category: "Forex" | "Metals" | "Indices" | "Commodities" | "Crypto";
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  sparkline: number[];
  status: "Open" | "Closed" | "Delayed";
  lastUpdated: string;
  isDemo?: boolean;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: "Forex" | "Gold & Metals" | "Central Banks" | "Stock Markets" | "Commodities" | "Crypto" | "Economic Events";
  source: string;
  sourceUrl?: string;
  author: string;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  imageUrl?: string;
  tags: string[];
}

export interface MarketAnalysis {
  id: string;
  slug: string;
  title: string;
  symbol: string;
  timeframe: string;
  bias: "Bullish" | "Bearish" | "Neutral";
  currentPrice: number;
  entryZone: string;
  invalidationLevel: number;
  targets: number[];
  author: string;
  authorRole: string;
  date: string;
  summary: string;
  content: string;
  bullishScenario: string;
  bearishScenario: string;
  risksAndCatalysts: string[];
  keyLevels: {
    resistance2: number;
    resistance1: number;
    pivot: number;
    support1: number;
    support2: number;
  };
}

export interface ResearchReport {
  id: string;
  slug: string;
  title: string;
  topic: "USD" | "RATES" | "FED" | "ENERGY" | "FOREX" | "GOLD" | "BREAKDOWN";
  subtitle: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  badge: string;
  author: string;
  featured?: boolean;
}

export interface EducationalLesson {
  id: string;
  slug: string;
  title: string;
  category: "Forex Basics" | "Chart Patterns" | "Technical Analysis" | "Fundamental Analysis" | "Risk Management" | "Trading Psychology";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
  relatedSlugs: string[];
}

export interface EconomicEvent {
  id: string;
  name: string;
  country: string;
  currency: string;
  flag: string;
  dateTime: string;
  impact: "High" | "Medium" | "Low";
  previous: string;
  forecast: string;
  actual?: string;
  status: "Upcoming" | "Released";
}

export interface TrackRecordCall {
  id: string;
  pair: string;
  direction: "Long" | "Short" | "Neutral";
  pips: number;
  unit: "pips" | "bp" | "pts";
  note: string;
  date: string;
  status: "Target Hit" | "Active" | "Closed";
}

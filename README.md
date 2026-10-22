# ZAHID TRADER — Master the Markets
### Institutional-Grade Financial Market Intelligence & Trading Education Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

---

## 1. Brand Identity & Overview

**ZAHID TRADER** is a world-class financial market intelligence, scenario mapping, and trading education platform inspired by institutional desk standards.

- **Brand Name:** ZAHID TRADER
- **Tagline:** Master the Markets
- **Official WhatsApp Support:** `+92 345 4706138` (prefilled direct concierge integration)
- **Primary Color Palette:**
  - Primary Brand Teal: `#16B8AD`
  - Deep Teal: `#0C948D`
  - Dark Surface / Background: `#0B0F12` & `#11161B`
  - Border Accents: `#1F2933`
  - Bullish Green: `#16A875`
  - Bearish Red: `#E45454`
  - Accent Gold: `#E0AD1E`

---

## 2. Platform Architecture & Features

### Core Pages & Routes
| Route | Page Name | Description |
|---|---|---|
| `/` | **Home** | Hero section with logo, live ticker, Daily Market Desk preview, 87% scored track record with accent switcher, features bar, research preview, academy highlights, why choose, newsletter, and FAQ. |
| `/markets` | **Live Markets** | Real-time multi-asset quotes (Gold, Silver, EUR/USD, GBP/USD, USD/JPY, WTI, NAS100, US30, BTC, ETH), search filter, category tabs, and interactive candlestick chart. |
| `/news` | **Market News** | Financial news portal with categories (Central Banks, Forex, Gold, Crypto, Equities), search filter, featured story, and reading layout. |
| `/news/[slug]` | **Article Detail** | Full editorial view with author attribution, tags, publication time, and related stories. |
| `/analysis` | **Daily Analysis** | Pre-market trade scenarios with explicit entry zones, invalidation stop levels, and multi-tier take-profit targets. |
| `/analysis/[slug]` | **Analysis Detail** | In-depth thesis, pivot and support/resistance level matrix, bullish & bearish scenarios, interactive chart, and catalysts. |
| `/research` | **Research Library** | Institutional partner library inspired by the reference site (ALL, USD, RATES, FED, ENERGY, FOREX, GOLD, BREAKDOWN) with tiles/list view toggle. |
| `/research/[slug]` | **Research Dossier** | Comprehensive macro reports on term premium, sovereign gold vaults, and order flow. |
| `/learn` | **Trading Academy** | Beginner-to-advanced curriculum: Forex basics, currency pairs, candlestick patterns, support/resistance, risk management, and trading psychology. |
| `/learn/[slug]` | **Academy Lesson** | Dedicated module article with essential key takeaways and inter-module navigation. |
| `/economic-calendar`| **Economic Calendar** | Live calendar with UTC schedule, currency flags, impact badges (High, Medium, Low), previous, forecast, and actual prints. |
| `/tools` | **Trading Calculators** | Practical utilities: Position Size & Lot Calculator, Risk/Reward Ratio Calculator, and Interbank Session Clock (London, NY, Tokyo, Sydney). |
| `/pricing` | **Membership & VIP** | Transparent pricing tiers: Public Free Desk, Premium Research Desk, and VIP Trader Club & Mentorship with direct desk onboarding. |
| `/about` | **About Us** | Brand philosophy, risk management doctrine, and mission statement. |
| `/contact` | **Contact Desk** | Validated contact form, direct WhatsApp click-to-chat CTA, email, and desk active hours. |
| `/faq` | **Frequently Asked Questions** | Searchable knowledge base and accordion with category filters. |
| `/privacy-policy` | **Privacy Policy** | Data security and user privacy standards. |
| `/terms-and-conditions` | **Terms & Conditions**| Platform usage agreement. |
| `/risk-disclosure` | **Risk Disclosure** | Regulatory warning regarding leveraged financial instruments and capital loss. |
| `/disclaimer` | **General Disclaimer** | Educational scope and data provider delay statement. |
| `/cookie-policy` | **Cookie Policy** | Local storage and browser preferences notice. |

### Global Interactive Features
- **Real-Time Financial Ticker Marquee:** Continuous interbank price movement across top 13 global instruments.
- **Floating WhatsApp Widget:** Persistent bottom-left button opening official WhatsApp chat (`+92 345 4706138`) with prefilled greeting.
- **Ask AI Desk Floating Assistant:** Persistent bottom-right AI assistant with suggested trading prompts, knowledge base, and deep links.
- **Interactive Financial Chart Engine:** High-performance SVG/Canvas charting with 15M, 1H, 4H, and 1D timeframes, OHLC readouts, and candlestick/line modes.
- **SEO & Search Visibility:** Dynamic XML Sitemap (`/sitemap.xml`), Robots (`/robots.txt`), OpenGraph meta tags, and structured heading hierarchies.

---

## 3. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom HSL design tokens
- **Icons:** Lucide React
- **Fonts:** Inter & Outfit (Google Fonts with `font-display: swap`)
- **Rendering:** Static Site Generation (SSG) for ultra-fast load times + Serverless API Routes

---

## 4. Getting Started Locally

### Prerequisites
- Node.js `v18.18+` or `v20+` (Tested on `v24.19.0`)
- npm `v10+`

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/zahid-trader.git

# Navigate into the project directory
cd zahid-trader

# Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Creating a Production Build
```bash
npm run build
npm run start
```

---

## 5. Environment Variables Configuration

Copy the sample environment file to `.env.local`:
```bash
cp .env.example .env.local
```

### Configuration Options (`.env.local`)
```ini
# Site Information
NEXT_PUBLIC_SITE_NAME="ZAHID TRADER"
NEXT_PUBLIC_SITE_URL="https://zahidtrader.com"
NEXT_PUBLIC_SITE_TAGLINE="Master the Markets"

# WhatsApp Direct Concierge (Official Business Number)
NEXT_PUBLIC_WHATSAPP_NUMBER="923454706138"
NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE="Hello Zahid Trader, I would like to know more about your trading education and market analysis services."
NEXT_PUBLIC_TELEGRAM_URL="https://t.me/zahidtrader"
NEXT_PUBLIC_CONTACT_EMAIL="support@zahidtrader.com"

# Optional External Data Providers (Server-side Only)
FINNHUB_API_KEY=""
TWELVE_DATA_API_KEY=""
ALPHA_VANTAGE_API_KEY=""

# Optional AI Key (Gemini or OpenAI for AI Desk)
AI_API_KEY=""
AI_PROVIDER="mock" # Set to 'openai' or 'gemini' when key is supplied
```

---

## 6. Vercel Deployment Instructions

The project is fully pre-configured for instant zero-configuration deployment to **Vercel**:

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "feat: complete ZAHID TRADER production platform"
git branch -M main
git remote add origin https://github.com/<your-username>/zahid-trader.git
git push -u origin main
```

### Step 2: Import into Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Connect your GitHub account and select the `zahid-trader` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `923454706138`
   - `NEXT_PUBLIC_SITE_NAME`: `ZAHID TRADER`
   - `NEXT_PUBLIC_SITE_TAGLINE`: `Master the Markets`
   - `NEXT_PUBLIC_SITE_URL`: `https://zahidtrader.com` (or your Vercel URL)
6. Click **Deploy**.

### Step 3: Custom Domain Setup
1. In Vercel, go to **Project Settings** -> **Domains**.
2. Enter your custom domain (e.g. `zahidtrader.com`).
3. Add the displayed DNS records (CNAME and A record) to your DNS registrar (Namecheap, Cloudflare, GoDaddy).
4. Vercel automatically provisions free SSL/TLS certificates.

---

## 7. WhatsApp Integration Guide

### 1. Direct Concierge (Currently Active)
The website is equipped with official click-to-chat WhatsApp deep links on every page:
- Format: `https://wa.me/923454706138?text=...`
- Prefilled greeting: *"Hello Zahid Trader, I would like to know more about your trading education and market analysis services."*
- Responsive mobile & desktop support.

### 2. Optional: WhatsApp Business Cloud API Bot Setup
If you later wish to deploy an automated 24/7 AI WhatsApp bot:
1. Create a Meta Developer account at [developers.facebook.com](https://developers.facebook.com).
2. Create an App with the **WhatsApp** product.
3. Configure a Webhook URL pointing to an endpoint like `/api/whatsapp/webhook`.
4. Verify your phone number `+92 345 4706138` in Meta WhatsApp Business Manager.
5. Generate a permanent System User Token and set `WHATSAPP_CLOUD_API_TOKEN` in your environment variables.

---

## 8. Quality Assurance & Validation Summary

- [x] All 13 core pages and dynamic routes built and verified.
- [x] Authentic ZAHID TRADER logo deployed across header, footer, hero, and favicon.
- [x] Validated production build (`next build` output: 50 static pages generated).
- [x] Interactive candlestick chart with multiple timeframes and OHLC readouts.
- [x] Functional trading calculators (Lot size & Position risk calculation).
- [x] Floating AI Chatbot tested with suggested prompts and financial knowledge base.
- [x] Verified WhatsApp integration with `+92 345 4706138`.
- [x] Full mobile and desktop responsiveness tested and validated.

---

## 9. License & Credits

© 2026 ZAHID TRADER. All rights reserved.  
*Educational platform for independent financial market analysts.*

-- ============================================================================
-- ZAHID TRADER — Institutional Blog CMS Database Schema
-- Brand: ZAHID TRADER | Master the Markets
-- PostgreSQL Schema for Supabase
-- ============================================================================

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. BLOG POSTS TABLE
create table if not exists public.posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  featured_image text,
  image_alt text,
  category text not null default 'Market Analysis',
  tags text[] default array[]::text[],
  author_name text not null default 'Zahid Hussain',
  author_title text not null default 'CEO & Market Strategist',
  author_avatar text default '/images/zahid-trader-ceo.png',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  reading_time text default '5 min read',
  seo_title text,
  seo_description text,
  canonical_url text,
  views integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

-- 2. INDEXES FOR HIGH-PERFORMANCE QUERIES
create index if not exists idx_posts_slug on public.posts (slug);
create index if not exists idx_posts_status on public.posts (status);
create index if not exists idx_posts_published_at on public.posts (published_at desc);
create index if not exists idx_posts_category on public.posts (category);

-- 3. AUTOMATIC UPDATED_AT TRIGGER
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
before update on public.posts
for each row
execute function public.handle_updated_at();

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.posts enable row level security;

-- Policy A: Anyone (public) can read published posts
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts
  for select
  using (status = 'published');

-- Policy B: Authenticated administrators can perform all actions
drop policy if exists "Admins can manage all posts" on public.posts;
create policy "Admins can manage all posts"
  on public.posts
  for all
  using (auth.role() = 'authenticated' or auth.jwt()->>'email' is not null)
  with check (auth.role() = 'authenticated' or auth.jwt()->>'email' is not null);

-- 5. INITIAL SEED DATA
insert into public.posts (
  slug,
  title,
  excerpt,
  content,
  featured_image,
  image_alt,
  category,
  tags,
  author_name,
  author_title,
  author_avatar,
  status,
  reading_time,
  seo_title,
  seo_description,
  published_at
) values
(
  'gold-xauusd-institutional-breakout-strategy',
  'Gold (XAU/USD) Institutional Breakout: Order Flow & Key Liquidity Zones',
  'A rigorous technical and macro analysis of Gold breaking multi-month range resistance, examining central bank accumulation and London fix order flow.',
  '## The Macro Backdrop for Precious Metals

Gold (XAU/USD) has demonstrated remarkable resilience across global trading sessions. In this briefing, we dissect the institutional order flow, interbank liquidity pools, and the precise invalidation levels that define our desk strategy.

### Key Price Levels to Monitor
* **Primary Resistance:** $2,750 / $2,780 zone
* **Critical Pivot:** $2,700 psychological benchmark
* **Invalidation Floor:** $2,660 structural swing low

### Institutional Order Flow Breakdown
Central bank reserve accumulation continues to underpin long-term spot purchases, absorbing speculative liquidations during US CPI and PPI release prints. When trading precious metals, risk mitigation via position sizing is paramount.',
  '/images/zahid-trader-logo.png',
  'Gold XAUUSD Technical Analysis Chart',
  'Market Analysis',
  array['Gold', 'XAUUSD', 'Order Flow', 'Macro'],
  'Zahid Hussain',
  'CEO & Founder',
  '/images/zahid-trader-ceo.png',
  'published',
  '6 min read',
  'Gold (XAU/USD) Institutional Breakout Strategy | Zahid Trader',
  'In-depth macro and order flow breakdown for Gold bullion and XAU/USD price action from CEO Zahid Hussain.',
  timezone('utc'::text, now() - interval '2 days')
),
(
  'risk-management-first-principles-for-forex',
  'Risk Management First Principles: The Mathematics of Capital Preservation',
  'Why position sizing, asymmetric risk-to-reward ratios, and emotional discipline separate profitable institutional traders from losing retail participants.',
  '## Why 90% of Retail Traders Fail at Capital Defense

In market operations, defense precedes offense. No edge in technical charting or fundamental research can compensate for irresponsible leverage and poor position sizing.

### The 1% Golden Rule Explained
Never risk more than 1% to 1.5% of your total account equity on any single execution. By limiting per-trade exposure, an account can withstand a string of consecutive drawdowns without triggering catastrophic psychological panic or margin liquidations.

### Formulating the Asymmetric R:R Formula
* Minimum targeted Risk-to-Reward: **1:2.5**
* At a 40% win rate with 1:2.5 R:R, the mathematical expectancy remains robustly positive.
* Document every stop-loss trigger in a structured trading journal.',
  '/images/zahid-trader-logo.png',
  'Trading Risk Management Blueprint',
  'Education',
  array['Risk Management', 'Psychology', 'Education'],
  'Zahid Hussain',
  'CEO & Founder',
  '/images/zahid-trader-ceo.png',
  'published',
  '8 min read',
  'Risk Management First Principles in Trading | Zahid Trader',
  'Master the math of capital preservation and position sizing with the Zahid Trader risk desk.',
  timezone('utc'::text, now() - interval '5 days')
),
(
  'us-dollar-liquidity-and-fed-rate-regimes',
  'US Dollar Index (DXY) Liquidity and Central Bank Rate Regimes',
  'Analyzing the Federal Reserve terminal rate trajectory and its cascading impact on EUR/USD, GBP/USD, and cross-border currency reserves.',
  '## Dissecting Global Currency Reservoirs

The US Dollar Index (DXY) continues to dictate cross-asset volatility. Understanding Treasury yield curve movements and FOMC forward guidance provides an indispensable compass for Forex desk positioning.

### Currency Pair Observations
1. **EUR/USD:** Bound by ECB economic divergence and European manufacturing data.
2. **GBP/USD:** Vulnerable to UK inflation prints and Bank of England monetary policy shifts.
3. **USD/JPY:** Sensitive to Bank of Japan yield curve control adjustments.',
  '/images/zahid-trader-logo.png',
  'US Dollar Index and Global Liquidity Flow',
  'Macro Research',
  array['Forex', 'DXY', 'Central Banks', 'Macro'],
  'Zahid Hussain',
  'CEO & Founder',
  '/images/zahid-trader-ceo.png',
  'published',
  '7 min read',
  'US Dollar Index & Global Rates Outlook | Zahid Trader',
  'Deep macro commentary on the US Dollar and cross-asset Forex implications.',
  timezone('utc'::text, now() - interval '8 days')
)
on conflict (slug) do nothing;

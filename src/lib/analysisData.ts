import { MarketAnalysis, TrackRecordCall } from "./types";

export const DAILY_MARKET_ANALYSIS: MarketAnalysis[] = [
  {
    id: "analysis-gold-daily",
    slug: "gold-xauusd-institutional-breakout-outlook",
    title: "XAU/USD (Gold): High-Timeframe Bullish Structure Holds Above $2,660 Liquidity Base",
    symbol: "XAU/USD",
    timeframe: "4H / Daily",
    bias: "Bullish",
    currentPrice: 2685.40,
    entryZone: "2,670.00 – 2,678.00",
    invalidationLevel: 2658.00,
    targets: [2700.00, 2725.00, 2750.00],
    author: "Zahid Research Desk",
    authorRole: "Head of Technical Strategy",
    date: "Today's Outlook",
    summary: "Gold demonstrates persistent higher-low structural momentum. Price has consolidated above the 50 EMA on the 4H timeframe, with institutional order blocks absorbing sell pressure on every pullback.",
    bullishScenario: "Sustained trading above $2,675 triggers liquidity sweeps toward the psychological barrier at $2,700. A daily candle close above $2,700 will confirm extension toward our $2,735 Fibonacci projection.",
    bearishScenario: "A loss of the $2,660.00 invalidation level would indicate structural exhaustion and open the door for a deeper mean-reversion move toward $2,625 and the daily 200 EMA.",
    risksAndCatalysts: [
      "US Core PCE Inflation print this Thursday",
      "FOMC speaker commentary on terminal rates",
      "Middle East ceasefire developments or escalation headlines",
      "US Treasury yield 10-year auction results",
    ],
    keyLevels: {
      resistance2: 2725.00,
      resistance1: 2700.00,
      pivot: 2680.00,
      support1: 2665.00,
      support2: 2642.00,
    },
    content: `
### Executive Summary
The structural posture in Gold (XAU/USD) remains overwhelmingly bullish across high-timeframe charts. Following a shallow consolidation between $2,665 and $2,685, the asset is building energy for an expansionary continuation move.

### Market Structure Breakdown
- **Daily Trend:** Primary bullish impulsive cycle with successive higher swing highs.
- **Order Flow:** Commercial entities continue to absorb liquidity on dips below $2,670, creating pronounced long lower wicks.
- **Volume Profile:** Point of Control (POC) for the week resides at $2,678.50, representing strong value acceptance.

### Execution Framework
Traders seeking favorable risk-to-reward positioning should look for retests of the $2,672 - $2,676 consolidation shelf during the London/New York session overlap, maintaining a protective stop loss strictly below $2,658.
    `,
  },
  {
    id: "analysis-eurusd-daily",
    slug: "eurusd-macro-divergence-bearish-bias",
    title: "EUR/USD: Euro Struggles at 1.0880 Resistance as ECB Rate Cut Expectations Mount",
    symbol: "EUR/USD",
    timeframe: "1H / 4H",
    bias: "Bearish",
    currentPrice: 1.0845,
    entryZone: "1.0865 – 1.0885",
    invalidationLevel: 1.0925,
    targets: [1.0810, 1.0760, 1.0720],
    author: "Zahid Research Desk",
    authorRole: "Macro Cross-Asset Analyst",
    date: "Today's Outlook",
    summary: "Diverging monetary paths between Frankfurt and Washington continue to constrain EUR/USD upside. Every intraday rally is met with aggressive institutional distribution.",
    bullishScenario: "A clean break and 4H close above 1.0925 invalidates the bearish bias and paves the way for a relief rally toward 1.0980.",
    bearishScenario: "Failure to reclaim 1.0880 leads to repeated tests of 1.0805, with subsequent continuation down to the 1.0760 swing lows.",
    risksAndCatalysts: [
      "German PMI flash estimates",
      "ECB President press conference remarks",
      "US Initial Jobless Claims and retail sales",
    ],
    keyLevels: {
      resistance2: 1.0940,
      resistance1: 1.0890,
      pivot: 1.0850,
      support1: 1.0805,
      support2: 1.0760,
    },
    content: `
### Fundamental Narrative
The Euro remains encumbered by subdued manufacturing data out of Germany and accelerating disinflation trends across France and Italy. With markets pricing in back-to-back 25 bps rate reductions by the ECB, the yield disadvantage versus the US Dollar is widening.

### Technical Confluence
On the 4-hour chart, the 20 and 50 Exponential Moving Averages have printed a bearish death cross. Furthermore, the Relative Strength Index (RSI) continues to fail below the 55 threshold during attempted bounces, signaling persistent distribution by institutional market makers.
    `,
  },
  {
    id: "analysis-gbpusd-daily",
    slug: "gbpusd-testing-1-3000-psychological-support",
    title: "GBP/USD: Cable Trapped in Range Below 1.3050; Breakout Imminent",
    symbol: "GBP/USD",
    timeframe: "4H",
    bias: "Neutral",
    currentPrice: 1.2980,
    entryZone: "Wait for breakout confirmation outside 1.2950 - 1.3040",
    invalidationLevel: 1.3060,
    targets: [1.2910, 1.2850],
    author: "Zahid Research Desk",
    authorRole: "FX Desk Strategist",
    date: "Today's Outlook",
    summary: "The British Pound is compressing into an apex triangle pattern against the Dollar. Risk-reward dictates patience until either 1.3040 breaks higher or 1.2950 breaks lower.",
    bullishScenario: "A confirmed 4H close above 1.3040 targets 1.3120 and 1.3180.",
    bearishScenario: "A decisive break below 1.2950 triggers sell stops and drives price toward 1.2880.",
    risksAndCatalysts: [
      "Bank of England monetary policy committee speeches",
      "UK Consumer Price Index release",
      "Broad US Dollar liquidity fluctuations",
    ],
    keyLevels: {
      resistance2: 1.3110,
      resistance1: 1.3040,
      pivot: 1.2985,
      support1: 1.2950,
      support2: 1.2880,
    },
    content: `
GBP/USD has entered a late-stage volatility contraction. Bollinger bands on the 4H timeframe are squeezed to their tightest reading in 6 weeks. Historically, such conditions precede a sharp directional expansion of 150+ pips.
    `,
  },
  {
    id: "analysis-nas100-daily",
    slug: "nas100-bullish-continuation-tech-momentum",
    title: "NAS100: Tech Index Targets 20,650 as Earnings Optimism Outweighs Valuation Skepticism",
    symbol: "NAS100",
    timeframe: "Daily / 1H",
    bias: "Bullish",
    currentPrice: 20450.00,
    entryZone: "20,380.00 – 20,420.00",
    invalidationLevel: 20240.00,
    targets: [20600.00, 20750.00, 20900.00],
    author: "Zahid Research Desk",
    authorRole: "Indices Strategist",
    date: "Today's Outlook",
    summary: "Momentum in semiconductor equities and cloud infrastructure heavyweights continues to propel Nasdaq 100 toward fresh milestones.",
    bullishScenario: "Holds above 20,400 pivot during New York open, triggering algorithmic continuation toward 20,650.",
    bearishScenario: "Failure below 20,240 invalidates short-term momentum and initiates mean-reversion toward 19,950.",
    risksAndCatalysts: [
      "Mega-cap tech earnings disclosures",
      "US Treasury 10-year yield reaction",
      "Quarterly rebalancing flows",
    ],
    keyLevels: {
      resistance2: 20750.00,
      resistance1: 20600.00,
      pivot: 20420.00,
      support1: 20300.00,
      support2: 20150.00,
    },
    content: `
Price continues to trace out impulsive Elliot wave expansions on the daily time horizon. Pullbacks to the 1-hour 50 EMA have historically offered premium long re-entry opportunities throughout this cycle.
    `,
  },
];

export const TRACK_RECORD_CALLS: TrackRecordCall[] = [
  {
    id: "tr-1",
    pair: "XAU/USD (Gold)",
    direction: "Long",
    pips: 1240,
    unit: "pips",
    note: "Macro Breakout Thesis · Target 3 Hit",
    date: "18 Sep",
    status: "Target Hit",
  },
  {
    id: "tr-2",
    pair: "USD/CAD",
    direction: "Long",
    pips: 652,
    unit: "pips",
    note: "Stronger for Longer Dollar Bias",
    date: "30 Apr",
    status: "Target Hit",
  },
  {
    id: "tr-3",
    pair: "GBP/USD",
    direction: "Short",
    pips: 438,
    unit: "pips",
    note: "BoE Easing Cycle Pricing",
    date: "14 May",
    status: "Target Hit",
  },
  {
    id: "tr-4",
    pair: "EUR/USD",
    direction: "Short",
    pips: 370,
    unit: "pips",
    note: "Eurozone Growth Divergence",
    date: "22 May",
    status: "Target Hit",
  },
  {
    id: "tr-5",
    pair: "AUD/USD",
    direction: "Short",
    pips: 314,
    unit: "pips",
    note: "Commodity FX Risk Off",
    date: "04 Jun",
    status: "Target Hit",
  },
  {
    id: "tr-6",
    pair: "NAS100",
    direction: "Long",
    pips: 860,
    unit: "pts",
    note: "Semiconductor Breakout Rally",
    date: "12 Jul",
    status: "Target Hit",
  },
  {
    id: "tr-7",
    pair: "USD/JPY",
    direction: "Long",
    pips: 520,
    unit: "pips",
    note: "BoJ Rate Decision Read",
    date: "28 Jul",
    status: "Target Hit",
  },
  {
    id: "tr-8",
    pair: "BTC/USD",
    direction: "Long",
    pips: 4800,
    unit: "pts",
    note: "ETF Inflow Re-acceleration",
    date: "15 Aug",
    status: "Target Hit",
  },
];

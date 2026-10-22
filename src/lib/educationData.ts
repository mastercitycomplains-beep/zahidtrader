import { EducationalLesson } from "./types";

export const EDUCATIONAL_LESSONS: EducationalLesson[] = [
  {
    id: "lesson-1",
    slug: "what-is-forex-trading-complete-beginners-guide",
    title: "What Is Forex Trading? The Complete Beginner's Blueprint",
    category: "Forex Basics",
    difficulty: "Beginner",
    readTime: "7 min read",
    summary: "Discover how the foreign exchange market functions, who participates, trading sessions, and the mechanics of buying and selling currency pairs.",
    keyTakeaways: [
      "The Forex market trades over $7.5 trillion daily, making it the largest financial market in the world.",
      "Currencies are always traded in pairs (Base currency vs. Quote currency).",
      "Major trading sessions span London, New York, Tokyo, and Sydney, creating 24/5 liquidity.",
      "Understanding leverage, margin, and lot sizing is mandatory before risking capital.",
    ],
    relatedSlugs: ["currency-pairs-explained-majors-minors-exotics", "risk-management-the-1-percent-golden-rule"],
    content: `
### What is the Forex Market?
Forex (foreign exchange or FX) is the global decentralized marketplace where the world's national currencies are exchanged against one another. It operates 24 hours a day, 5 days a week across major financial hubs including London, New York, Tokyo, Frankfurt, and Sydney.

### Key Market Participants
1. **Central Banks:** Formulate monetary policy and manage national reserves.
2. **Commercial & Interbank Banks:** Execute cross-border corporate payments and supply deep liquidity.
3. **Hedge Funds & Institutional Investors:** Trade multi-million dollar portfolios based on macro narratives.
4. **Retail Traders:** Individual traders speculating on price fluctuations through regulated online brokers.

### How Forex Quotes Work
Every forex quotation consists of two currencies:
- **Base Currency:** The first currency in the pair (e.g., EUR in EUR/USD).
- **Quote Currency:** The second currency in the pair (e.g., USD in EUR/USD).

When EUR/USD is quoted at **1.0850**, it means **1 Euro equals 1.0850 US Dollars**. If you believe the Euro will strengthen against the Dollar, you buy (go Long). If you believe the Euro will weaken, you sell (go Short).
    `,
  },
  {
    id: "lesson-2",
    slug: "currency-pairs-explained-majors-minors-exotics",
    title: "Currency Pairs Explained: Majors, Minors, and Exotics",
    category: "Forex Basics",
    difficulty: "Beginner",
    readTime: "6 min read",
    summary: "Learn the crucial differences between Major pairs, Minor cross pairs, and Exotic currencies, including volatility and spread considerations.",
    keyTakeaways: [
      "Major pairs always include the US Dollar (EUR/USD, GBP/USD, USD/JPY, etc.) and have the tightest spreads.",
      "Minor pairs (Crosses) do not involve the USD (e.g., EUR/GBP, GBP/JPY) but maintain healthy liquidity.",
      "Exotic pairs pair a major currency with an emerging market currency and carry wider spreads.",
    ],
    relatedSlugs: ["what-is-forex-trading-complete-beginners-guide", "pip-calculation-and-lot-sizing-guide"],
    content: `
### 1. The Major Pairs
The majors represent over 80% of daily global forex turnover. They always feature the US Dollar paired with another top global currency:
- **EUR/USD** (Euro / US Dollar) - The most liquid financial instrument on earth.
- **GBP/USD** (British Pound / US Dollar) - Often referred to as "Cable".
- **USD/JPY** (US Dollar / Japanese Yen) - Highly sensitive to US Treasury yield spreads.
- **AUD/USD** (Australian Dollar / US Dollar) - Closely tied to global commodity cycles and China.
- **USD/CAD** (US Dollar / Canadian Dollar) - Known as the "Loonie", sensitive to crude oil prices.

### 2. Minor Pairs (Currency Crosses)
Cross pairs do not contain the US Dollar. Prominent examples include:
- **EUR/GBP**, **EUR/JPY**, **GBP/JPY**, **AUD/JPY**.
- They allow traders to isolate European or Asian economic themes without direct USD dollar exposure.

### 3. Exotic Pairs
Exotics combine a major currency with an emerging economy currency (e.g., USD/ZAR, USD/TRY, EUR/PLN). Because of wider bid-ask spreads and sudden political volatility, beginner traders are urged to master majors first.
    `,
  },
  {
    id: "lesson-3",
    slug: "candlestick-patterns-every-trader-must-know",
    title: "High-Probability Candlestick Patterns: Reading Institutional Price Action",
    category: "Chart Patterns",
    difficulty: "Beginner",
    readTime: "8 min read",
    summary: "Master the visual language of Japanese candlesticks: Pin bars, Bullish & Bearish Engulfing, Morning Stars, and Wick Rejections.",
    keyTakeaways: [
      "A candlestick tells a story: Open, High, Low, and Close over a specific period of time.",
      "Long wicks indicate price rejection and institutional order fulfillment.",
      "Patterns must always be traded in the context of key support/resistance levels, never in isolation.",
    ],
    relatedSlugs: ["technical-analysis-support-resistance-mastery", "risk-management-the-1-percent-golden-rule"],
    content: `
### Anatomy of a Candlestick
Each candlestick reveals four critical price points:
- **Body:** The distance between the Open and the Close. Green (or teal) indicates buyers won; red indicates sellers won.
- **Upper Wick (Shadow):** The highest price reached before sellers pushed price lower.
- **Lower Wick (Shadow):** The lowest price reached before buyers entered to defend the level.

### Essential Candlestick Patterns
1. **The Pin Bar (Hammer / Shooting Star):** Features a small real body and a long tail at least two to three times the length of the body. Represents aggressive price rejection by institutional buyers or sellers.
2. **The Engulfing Bar:** Occurs when a candle's body completely swallows the preceding candle's body. An engulfing candle forming at a significant support or resistance level signifies a high-momentum reversal.
3. **The Morning Star / Evening Star:** A three-candle reversal pattern marking the transition from selling exhaustion to aggressive accumulation (or vice-versa).
    `,
  },
  {
    id: "lesson-4",
    slug: "technical-analysis-support-resistance-mastery",
    title: "Technical Analysis: Support, Resistance, and Key Market Structure",
    category: "Technical Analysis",
    difficulty: "Intermediate",
    readTime: "9 min read",
    summary: "How to identify genuine institutional liquidity pools, horizontal zones, order blocks, and avoid common retail breakout traps.",
    keyTakeaways: [
      "Support is a zone where buying interest prevents further decline.",
      "Resistance is a price ceiling where selling pressure halts upside advances.",
      "Once support is broken convincingly, it flips to act as future resistance (Role Reversal).",
    ],
    relatedSlugs: ["candlestick-patterns-every-trader-must-know", "risk-management-the-1-percent-golden-rule"],
    content: `
### Zones vs. Exact Lines
One of the most frequent beginner mistakes is drawing hair-thin lines on a chart. Financial markets operate on liquidity zones, not single pennies or pips. High-frequency algorithms frequently push prices slightly beyond obvious highs and lows to trigger retail stop orders before reversing.

### The Role Reversal Principle
When price breaks through an established resistance zone with strong volume and closes beyond it, that former ceiling transforms into a new floor (Support). Retests of broken structure offer some of the highest risk-reward trade entries available in technical trading.
    `,
  },
  {
    id: "lesson-5",
    slug: "risk-management-the-1-percent-golden-rule",
    title: "Risk Management: The 1% Golden Rule and Position Sizing Mastery",
    category: "Risk Management",
    difficulty: "Beginner",
    readTime: "10 min read",
    summary: "The single most critical pillar of long-term survival: mathematical capital preservation, position calculation, and drawdown defense.",
    keyTakeaways: [
      "Never risk more than 1% to 2% of total trading account equity on any single trade idea.",
      "Always calculate position lot size based on stop loss distance, never backwards.",
      "A 50% account drawdown requires a 100% gain just to return to breakeven.",
      "A trading edge is useless without strict mathematical risk controls.",
    ],
    relatedSlugs: ["trading-psychology-overcoming-fear-and-fomo", "what-is-forex-trading-complete-beginners-guide"],
    content: `
### The Mathematics of Ruin
Trading is a game of probability. Even world-class proprietary hedge fund traders rarely achieve win rates above 60%. What makes professional traders profitable is **asymmetric risk-to-reward**: winning trades generate significantly more than losing trades deduct.

| Drawdown Loss | Required Gain to Recover |
|---|---|
| -10% | +11.1% |
| -20% | +25.0% |
| -30% | +42.9% |
| -50% | +100.0% |
| -75% | +300.0% |

### How to Calculate Position Size
Formula:
\`\`\`
Position Size (Lots) = (Account Equity × Risk Percentage) / (Stop Loss in Pips × Pip Value per Lot)
\`\`\`
Example:
- Account: $10,000
- Risk: 1% ($100)
- Stop Loss: 25 pips on EUR/USD ($10 per pip per standard lot)
- Position Size = $100 / (25 × 10) = 0.40 Lots.

With our built-in **Zahid Trader Position Size Calculator**, you can calculate your exact lot size in seconds before placing any order.
    `,
  },
  {
    id: "lesson-6",
    slug: "trading-psychology-overcoming-fear-and-fomo",
    title: "Trading Psychology: Eliminating FOMO, Revenge Trading, and Fear of Loss",
    category: "Trading Psychology",
    difficulty: "Intermediate",
    readTime: "8 min read",
    summary: "Unpack the cognitive biases and emotional triggers that destroy trader accounts and build an unshakeable disciplined mindset.",
    keyTakeaways: [
      "FOMO (Fear of Missing Out) causes traders to chase extended moves directly into institutional reversals.",
      "Accepting that every trade has an uncertain outcome eliminates fear.",
      "Revenge trading after a loss is the primary catalyst for blown trading accounts.",
      "A trade journal is the ultimate mirror for psychological discipline.",
    ],
    relatedSlugs: ["risk-management-the-1-percent-golden-rule", "what-is-forex-trading-complete-beginners-guide"],
    content: `
### The Three Psychological Pitfalls
1. **Chasing the Candle (FOMO):** Seeing a large green candle and entering blindly at market without a defined stop loss or technical invalidation.
2. **Revenge Trading:** Increasing lot sizes immediately following a loss in an emotional bid to 'get the money back', leading to catastrophic drawdowns.
3. **Premature Profit Taking:** Closing winning trades too early out of fear of giving back gains, while letting losing trades run in hope of a reversal.

At Zahid Trader, we instill the discipline of treating trading as a risk-allocation business, not a casino.
    `,
  },
];

export const TRADING_GLOSSARY = [
  { term: "Pip", definition: "Percentage in Point. The fourth decimal place in most forex pairs (0.0001), representing the standard unit of currency price fluctuation." },
  { term: "Spread", definition: "The difference between the bid (sell) price and the ask (buy) price quoted by a broker or liquidity provider." },
  { term: "Leverage", definition: "The ratio of a trader's own capital to borrowed broker capital, allowing control of larger market positions with a smaller margin deposit." },
  { term: "Margin", definition: "The collateral deposit required to open and maintain a leveraged trading position." },
  { term: "Lot Size", definition: "The standardized volume unit in forex trading: Standard lot (100,000 units), Mini lot (10,000 units), Micro lot (1,000 units)." },
  { term: "Bullish", definition: "An expectation or market condition where asset prices are rising or expected to rise." },
  { term: "Bearish", definition: "An expectation or market condition where asset prices are declining or expected to decline." },
  { term: "Stop Loss (SL)", definition: "An automatic protective order placed with a broker to close a losing position once price touches a predetermined loss threshold." },
  { term: "Take Profit (TP)", definition: "An automatic target order placed to close a winning position when price reaches a specified profit level." },
  { term: "Risk-to-Reward (R:R)", definition: "The ratio measuring prospective profit against potential capital loss on a given trading setup (e.g., 1:2 or 1:3)." },
  { term: "Order Block", definition: "A specific price zone where large institutional market participants placed substantial orders before an impulsive directional move." },
  { term: "DXY", definition: "The US Dollar Index, measuring the value of the USD relative to a basket of six major foreign currencies (Euro, Yen, Pound, Canadian Dollar, Krona, Franc)." },
];

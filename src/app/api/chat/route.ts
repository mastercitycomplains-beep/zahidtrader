import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const query = message.toLowerCase().trim();

    // Default intelligent responses crafted for Zahid Trader
    let reply =
      "At ZAHID TRADER, our goal is to build disciplined traders through macro awareness and mathematical risk management. How can our desk assist you further?";
    let links: { label: string; href: string }[] = [
      { label: "Trading Academy", href: "/learn" },
      { label: "Daily Analysis", href: "/analysis" },
    ];

    if (query.includes("gold") || query.includes("xau")) {
      reply =
        "Gold (XAU/USD) is currently consolidating in a high-timeframe bullish trend supported by central bank reserve accumulation and real yield dynamics. Our daily outlook maintains a $2,660 invalidation level.";
      links = [
        { label: "View Gold Analysis", href: "/analysis/gold-xauusd-institutional-breakout-outlook" },
        { label: "Live Gold Price", href: "/markets" },
      ];
    } else if (query.includes("risk") || query.includes("lot") || query.includes("calculator")) {
      reply =
        "The #1 law of trading survival is the 1% risk rule: never risk more than 1% of account equity on a single setup. Always calculate your exact lot size according to your stop loss.";
      links = [
        { label: "Position Size Calculator", href: "/tools" },
        { label: "Risk Management Guide", href: "/learn/risk-management-the-1-percent-golden-rule" },
      ];
    } else if (query.includes("what is forex") || query.includes("beginner") || query.includes("start")) {
      reply =
        "Forex is the decentralized $7.5T global market for exchanging national currencies. If you are new, start with our beginner modules on currency pairs, market sessions, and candlestick patterns.";
      links = [
        { label: "What is Forex Guide", href: "/learn/what-is-forex-trading-complete-beginners-guide" },
        { label: "Currency Pairs Explained", href: "/learn/currency-pairs-explained-majors-minors-exotics" },
      ];
    } else if (query.includes("whatsapp") || query.includes("contact") || query.includes("phone")) {
      reply =
        "You can connect directly with our official WhatsApp desk at +92 319 7665050 for membership queries, direct assistance, and mentorship consultations.";
      links = [
        { label: "Open WhatsApp Chat", href: "https://wa.me/923197665050" },
        { label: "Contact Page", href: "/contact" },
      ];
    } else if (query.includes("vip") || query.includes("pricing") || query.includes("cost") || query.includes("membership")) {
      reply =
        "We offer transparent membership tiers: Free Access to public market letters, Premium Research Desk for daily scenario maps, and VIP Trader Club with direct desk access.";
      links = [{ label: "View Membership Pricing", href: "/pricing" }];
    } else if (query.includes("calendar") || query.includes("news") || query.includes("nfp") || query.includes("cpi")) {
      reply =
        "Track upcoming high-impact economic releases including US PCE, Non-Farm Payrolls, and Central Bank rate decisions on our Macro Economic Calendar.";
      links = [
        { label: "Economic Calendar", href: "/economic-calendar" },
        { label: "Market News", href: "/news" },
      ];
    } else if (query.includes("pip") || query.includes("spread")) {
      reply =
        "A 'pip' (Percentage in Point) is the standard measure of currency movement (usually 0.0001 in EUR/USD). Spread is the difference between the broker's bid and ask price.";
      links = [{ label: "Trading Glossary", href: "/learn" }];
    }

    return NextResponse.json({
      reply,
      links,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

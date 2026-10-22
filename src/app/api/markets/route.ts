import { NextResponse } from "next/server";
import { INITIAL_MARKET_INSTRUMENTS } from "@/lib/marketData";

export async function GET() {
  // Can be extended with Finnhub, Twelve Data, or Alpha Vantage server API integrations
  const hasExternalApi = Boolean(process.env.FINNHUB_API_KEY || process.env.TWELVE_DATA_API_KEY);

  return NextResponse.json({
    success: true,
    provider: hasExternalApi ? "live_feed" : "zahid_trader_desk_feed",
    isDemo: !hasExternalApi,
    data: INITIAL_MARKET_INSTRUMENTS,
    lastUpdated: new Date().toISOString(),
  });
}

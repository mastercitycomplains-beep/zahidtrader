"use client";

import React, { useState, useMemo } from "react";
import { formatPrice } from "@/lib/marketData";
import { TrendingUp, BarChart2, Activity, Maximize2 } from "lucide-react";

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface LiveTradingChartProps {
  symbol?: string;
  initialPrice?: number;
  height?: number;
}

export default function LiveTradingChart({
  symbol = "XAU/USD",
  initialPrice = 2685.4,
  height = 380,
}: LiveTradingChartProps) {
  const [timeframe, setTimeframe] = useState<"15M" | "1H" | "4H" | "1D">("4H");
  const [chartType, setChartType] = useState<"candles" | "line">("candles");
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);

  // Generate realistic OHLC candles around the current price
  const candles: Candle[] = useMemo(() => {
    const list: Candle[] = [];
    const count = 28;
    let current = initialPrice * 0.985;
    const volatility = symbol.includes("BTC") ? 400 : symbol.includes("XAU") ? 8 : 0.0015;

    for (let i = 0; i < count; i++) {
      const open = current;
      const change = (Math.random() - 0.47) * volatility;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * (volatility * 0.5);
      const low = Math.min(open, close) - Math.random() * (volatility * 0.5);
      const volume = Math.floor(Math.random() * 8000) + 1500;

      const dateObj = new Date();
      dateObj.setHours(dateObj.getHours() - (count - i) * (timeframe === "1D" ? 24 : timeframe === "4H" ? 4 : 1));
      const timeStr =
        timeframe === "1D"
          ? dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

      list.push({ time: timeStr, open, high, low, close, volume });
      current = close;
    }
    // Ensure the last candle closes at current price
    list[list.length - 1].close = initialPrice;
    return list;
  }, [symbol, initialPrice, timeframe]);

  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 1;

  const activeCandle = hoveredCandle || candles[candles.length - 1];

  return (
    <div className="w-full bg-[#0E1317] border border-theme rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* Top Controls Toolbar */}
      <div className="px-4 py-3 bg-[#131920] border-b border-theme flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white text-sm">
            <span>{symbol}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-brand-teal/20 text-brand-teal border border-brand-teal/30">
              Live Feed
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-xs border-l border-theme pl-3">
            <div>
              <span className="text-muted">O:</span>{" "}
              <span className="text-muted-strong">{formatPrice(activeCandle.open, symbol)}</span>
            </div>
            <div>
              <span className="text-muted">H:</span>{" "}
              <span className="text-brand-green">{formatPrice(activeCandle.high, symbol)}</span>
            </div>
            <div>
              <span className="text-muted">L:</span>{" "}
              <span className="text-brand-red">{formatPrice(activeCandle.low, symbol)}</span>
            </div>
            <div>
              <span className="text-muted">C:</span>{" "}
              <span className="text-white font-bold">{formatPrice(activeCandle.close, symbol)}</span>
            </div>
          </div>
        </div>

        {/* Timeframe & Mode Selectors */}
        <div className="flex items-center gap-2">
          {/* Timeframe buttons */}
          <div className="flex items-center bg-page rounded-lg p-0.5 border border-theme">
            {(["15M", "1H", "4H", "1D"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  timeframe === tf
                    ? "bg-brand-teal text-[#0B0F12]"
                    : "text-muted hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart type toggle */}
          <div className="flex items-center bg-page rounded-lg p-0.5 border border-theme">
            <button
              onClick={() => setChartType("candles")}
              className={`p-1 rounded-md transition-all ${
                chartType === "candles" ? "bg-white/15 text-brand-teal" : "text-muted hover:text-white"
              }`}
              title="Candlestick Chart"
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`p-1 rounded-md transition-all ${
                chartType === "line" ? "bg-white/15 text-brand-teal" : "text-muted hover:text-white"
              }`}
              title="Line Chart"
            >
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      <div className="relative p-4 flex-1 select-none" style={{ height: `${height}px` }}>
        {/* Horizontal Grid lines */}
        <div className="absolute inset-0 px-4 py-6 flex flex-col justify-between pointer-events-none opacity-20">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b border-dashed border-gray-600 w-full" />
          ))}
        </div>

        {/* SVG Drawing Layer */}
        <svg
          className="w-full h-full overflow-visible"
          viewBox={`0 0 ${candles.length * 28} 300`}
          preserveAspectRatio="none"
        >
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16B8AD" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#16B8AD" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Candlesticks view */}
          {chartType === "candles" &&
            candles.map((candle, idx) => {
              const x = idx * 28 + 14;
              const isUp = candle.close >= candle.open;
              const color = isUp ? "#16B8AD" : "#E45454";

              const yHigh = 300 - ((candle.high - minPrice) / priceRange) * 260 - 20;
              const yLow = 300 - ((candle.low - minPrice) / priceRange) * 260 - 20;
              const yOpen = 300 - ((candle.open - minPrice) / priceRange) * 260 - 20;
              const yClose = 300 - ((candle.close - minPrice) / priceRange) * 260 - 20;

              const bodyY = Math.min(yOpen, yClose);
              const bodyHeight = Math.max(3, Math.abs(yClose - yOpen));

              return (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredCandle(candle)}
                  onMouseLeave={() => setHoveredCandle(null)}
                  className="cursor-crosshair group"
                >
                  {/* Wick */}
                  <line
                    x1={x}
                    y1={yHigh}
                    x2={x}
                    y2={yLow}
                    stroke={color}
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                  {/* Candle Body */}
                  <rect
                    x={x - 6}
                    y={bodyY}
                    width="12"
                    height={bodyHeight}
                    fill={color}
                    rx="1.5"
                  />
                </g>
              );
            })}

          {/* Line view */}
          {chartType === "line" && (
            <>
              {/* Area fill */}
              <polygon
                points={`0,300 ${candles
                  .map((c, i) => `${i * 28 + 14},${300 - ((c.close - minPrice) / priceRange) * 260 - 20}`)
                  .join(" ")} ${candles.length * 28},300`}
                fill="url(#areaGradient)"
              />
              {/* Stroke */}
              <polyline
                fill="none"
                stroke="#16B8AD"
                strokeWidth="2.5"
                points={candles
                  .map((c, i) => `${i * 28 + 14},${300 - ((c.close - minPrice) / priceRange) * 260 - 20}`)
                  .join(" ")}
              />
            </>
          )}
        </svg>

        {/* Hover Crosshair Details Badge */}
        {hoveredCandle && (
          <div className="absolute top-4 left-6 bg-[#161D24]/90 border border-brand-teal/40 p-2 rounded-lg text-[10px] text-muted-strong font-mono backdrop-blur-md shadow-lg pointer-events-none">
            <span className="text-white font-bold block mb-0.5">{hoveredCandle.time}</span>
            <span>Price: {formatPrice(hoveredCandle.close, symbol)}</span>
          </div>
        )}
      </div>

      {/* Bottom Time Bar */}
      <div className="px-4 py-2 bg-page border-t border-theme flex items-center justify-between text-[10px] text-muted font-mono">
        <span>{candles[0]?.time}</span>
        <span>{candles[Math.floor(candles.length / 2)]?.time}</span>
        <span className="text-brand-teal font-bold">{candles[candles.length - 1]?.time}</span>
      </div>
    </div>
  );
}

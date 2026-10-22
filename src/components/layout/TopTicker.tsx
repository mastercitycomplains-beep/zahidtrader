"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { INITIAL_MARKET_INSTRUMENTS, formatPrice } from "@/lib/marketData";
import { MarketInstrument } from "@/lib/types";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function TopTicker() {
  const [instruments, setInstruments] = useState<MarketInstrument[]>(INITIAL_MARKET_INSTRUMENTS);

  // Subtle live tick simulation to create high-frequency financial feel
  useEffect(() => {
    const interval = setInterval(() => {
      setInstruments((prev) =>
        prev.map((inst) => {
          // 25% chance of tick movement per interval
          if (Math.random() > 0.25) return inst;
          const delta = (Math.random() - 0.49) * (inst.price * 0.0004);
          const newPrice = Math.max(0.0001, inst.price + delta);
          const newChange = inst.change + delta;
          const newChangePercent = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));
          return {
            ...inst,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Duplicate items for seamless continuous marquee loop
  const tickerItems = [...instruments, ...instruments];

  return (
    <div className="w-full bg-surface-deep border-b border-theme text-xs overflow-hidden h-9 flex items-center select-none relative z-40">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-page to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-page to-transparent z-10 pointer-events-none" />
      
      <div className="animate-marquee flex items-center gap-8 px-4 whitespace-nowrap">
        {tickerItems.map((item, index) => {
          const isPositive = item.change >= 0;
          return (
            <Link
              key={`${item.symbol}-${index}`}
              href="/markets"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity font-mono"
            >
              <span className="font-semibold text-muted-strong">{item.symbol}</span>
              <span className="text-gray-100 font-bold">
                {formatPrice(item.price, item.symbol)}
              </span>
              <span
                className={`inline-flex items-center text-[11px] font-medium ${
                  isPositive ? "text-brand-green" : "text-brand-red"
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3 inline mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 inline mr-0.5" />
                )}
                {isPositive ? "+" : ""}
                {item.changePercent.toFixed(2)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

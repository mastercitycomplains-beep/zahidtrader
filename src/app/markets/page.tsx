"use client";

import React, { useState, useMemo } from "react";
import { INITIAL_MARKET_INSTRUMENTS, formatPrice } from "@/lib/marketData";
import { MarketInstrument } from "@/lib/types";
import LiveTradingChart from "@/components/charts/LiveTradingChart";
import {
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  BarChart2,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

export default function MarketsPage() {
  const [instruments, setInstruments] = useState<MarketInstrument[]>(INITIAL_MARKET_INSTRUMENTS);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("XAU/USD");
  const [search, setSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [sortField, setSortField] = useState<"symbol" | "price" | "changePercent">("symbol");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const categories = ["All", "Forex", "Metals", "Indices", "Commodities", "Crypto"];

  const filteredInstruments = useMemo(() => {
    return instruments
      .filter((inst) => {
        const matchesCategory = categoryFilter === "All" || inst.category === categoryFilter;
        const matchesSearch =
          inst.symbol.toLowerCase().includes(search.toLowerCase()) ||
          inst.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === "string") {
          return sortAsc
            ? (valA as string).localeCompare(valB as string)
            : (valB as string).localeCompare(valA as string);
        }
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [instruments, search, categoryFilter, sortField, sortAsc]);

  const activeInstrument = instruments.find((i) => i.symbol === selectedSymbol) || instruments[0];

  const handleSort = (field: "symbol" | "price" | "changePercent") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">
                Market Terminal
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-green/20 text-brand-green text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                Interbank Feeds Active
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
              Live Financial Markets
            </h1>
            <p className="text-muted text-sm max-w-xl mt-2 leading-relaxed">
              Track real-time pricing, 24-hour ranges, and interactive candlestick structure across global currencies, bullion, and indices.
            </p>
          </div>
        </div>

        {/* Top Active Chart Panel */}
        <div className="mb-12 bg-surface border border-theme rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-white font-mono">
                  {activeInstrument.symbol}
                </h2>
                <span className="text-xs font-medium text-muted">
                  {activeInstrument.name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-brand-teal/15 text-brand-teal font-semibold">
                  {activeInstrument.category}
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-black text-white font-mono">
                  {formatPrice(activeInstrument.price, activeInstrument.symbol)}
                </span>
                <span
                  className={`text-sm font-bold flex items-center font-mono ${
                    activeInstrument.change >= 0 ? "text-brand-green" : "text-brand-red"
                  }`}
                >
                  {activeInstrument.change >= 0 ? "+" : ""}
                  {activeInstrument.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-muted bg-page p-3 rounded-xl border border-theme">
              <div>
                <span className="text-muted block text-[10px]">24H HIGH</span>
                <span className="text-white font-semibold">
                  {formatPrice(activeInstrument.high24h, activeInstrument.symbol)}
                </span>
              </div>
              <div className="border-l border-theme pl-4">
                <span className="text-muted block text-[10px]">24H LOW</span>
                <span className="text-white font-semibold">
                  {formatPrice(activeInstrument.low24h, activeInstrument.symbol)}
                </span>
              </div>
            </div>
          </div>

          <LiveTradingChart
            symbol={activeInstrument.symbol}
            initialPrice={activeInstrument.price}
            height={360}
          />
        </div>

        {/* Instruments Table Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap ${
                  categoryFilter === cat
                    ? "bg-brand-teal text-[#0B0F12] shadow-sm"
                    : "bg-surface text-muted hover:text-white border border-theme"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search EUR/USD, Gold, BTC..."
              className="w-full bg-surface border border-theme rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal"
            />
          </div>
        </div>

        {/* Instruments Table */}
        <div className="bg-surface border border-theme rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0E1317] text-muted uppercase font-mono tracking-wider border-b border-theme">
                <tr>
                  <th
                    className="p-4 cursor-pointer hover:text-white"
                    onClick={() => handleSort("symbol")}
                  >
                    Instrument
                  </th>
                  <th
                    className="p-4 cursor-pointer hover:text-white"
                    onClick={() => handleSort("price")}
                  >
                    Last Price
                  </th>
                  <th
                    className="p-4 cursor-pointer hover:text-white"
                    onClick={() => handleSort("changePercent")}
                  >
                    24h Change
                  </th>
                  <th className="p-4 hidden sm:table-cell">24h High</th>
                  <th className="p-4 hidden sm:table-cell">24h Low</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredInstruments.map((item) => {
                  const isPositive = item.change >= 0;
                  const isSelected = selectedSymbol === item.symbol;
                  return (
                    <tr
                      key={item.symbol}
                      onClick={() => setSelectedSymbol(item.symbol)}
                      className={`hover:bg-white/[0.03] transition-colors cursor-pointer ${
                        isSelected ? "bg-brand-teal/10" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <span className="font-extrabold text-white text-sm font-mono">
                            {item.symbol}
                          </span>
                          <span className="text-[11px] text-muted hidden sm:inline">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 font-mono font-bold text-white text-sm">
                        {formatPrice(item.price, item.symbol)}
                      </td>

                      <td className="p-4 font-mono">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold ${
                            isPositive ? "text-brand-green" : "text-brand-red"
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5" />
                          )}
                          {isPositive ? "+" : ""}
                          {item.changePercent.toFixed(2)}%
                        </span>
                      </td>

                      <td className="p-4 font-mono text-muted hidden sm:table-cell">
                        {formatPrice(item.high24h, item.symbol)}
                      </td>

                      <td className="p-4 font-mono text-muted hidden sm:table-cell">
                        {formatPrice(item.low24h, item.symbol)}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSymbol(item.symbol);
                            window.scrollTo({ top: 120, behavior: "smooth" });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-brand-teal hover:text-[#0B0F12] text-brand-teal text-[11px] font-bold transition-all"
                        >
                          Chart
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

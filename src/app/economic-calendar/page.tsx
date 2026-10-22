"use client";

import React, { useState, useMemo } from "react";
import { ECONOMIC_EVENTS } from "@/lib/calendarData";
import { EconomicEvent } from "@/lib/types";
import { Calendar, Filter, Search, AlertCircle, Clock, Globe } from "lucide-react";

export default function EconomicCalendarPage() {
  const [selectedImpact, setSelectedImpact] = useState<string>("All");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const currencies = ["All", "USD", "EUR", "GBP", "JPY", "CAD", "AUD"];
  const impacts = ["All", "High", "Medium", "Low"];

  const filteredEvents = useMemo(() => {
    return ECONOMIC_EVENTS.filter((event) => {
      const matchImpact = selectedImpact === "All" || event.impact === selectedImpact;
      const matchCurr = selectedCurrency === "All" || event.currency === selectedCurrency;
      const matchSearch =
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.country.toLowerCase().includes(search.toLowerCase()) ||
        event.currency.toLowerCase().includes(search.toLowerCase());
      return matchImpact && matchCurr && matchSearch;
    });
  }, [selectedImpact, selectedCurrency, search]);

  return (
    <div className="py-12 sm:py-16 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">
              Macro Intelligence
            </span>
            <span className="px-2 py-0.5 rounded-full bg-brand-teal/15 text-brand-teal text-[10px] font-bold">
              Timezone: UTC
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Economic Calendar & Risk Events
          </h1>
          <p className="text-muted text-sm max-w-2xl leading-relaxed">
            Monitor high-impact central bank announcements, non-farm payroll releases, and inflation prints with pre-release consensus forecasts and historical benchmarks.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-surface border border-theme rounded-2xl p-4 sm:p-6 mb-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Impact Filter */}
            <div className="flex items-center gap-1 bg-page p-1 rounded-xl border border-theme">
              <span className="text-[10px] uppercase font-bold text-muted px-2">Impact:</span>
              {impacts.map((imp) => (
                <button
                  key={imp}
                  onClick={() => setSelectedImpact(imp)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedImpact === imp
                      ? "bg-brand-teal text-[#0B0F12]"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {imp}
                </button>
              ))}
            </div>

            {/* Currency Filter */}
            <div className="flex items-center gap-1 bg-page p-1 rounded-xl border border-theme">
              <span className="text-[10px] uppercase font-bold text-muted px-2">Currency:</span>
              {currencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedCurrency === curr
                      ? "bg-brand-teal text-[#0B0F12]"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event name..."
              className="w-full bg-page border border-theme rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal"
            />
          </div>
        </div>

        {/* Economic Events Table */}
        <div className="bg-surface border border-theme rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0E1317] text-muted uppercase font-mono tracking-wider border-b border-theme">
                <tr>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Cur</th>
                  <th className="p-4">Impact</th>
                  <th className="p-4">Event Name</th>
                  <th className="p-4 font-mono">Actual</th>
                  <th className="p-4 font-mono">Forecast</th>
                  <th className="p-4 font-mono">Previous</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredEvents.map((evt) => {
                  const isHigh = evt.impact === "High";
                  const isMedium = evt.impact === "Medium";
                  return (
                    <tr key={evt.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-mono text-muted-strong whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-muted" />
                          <span>{evt.dateTime}</span>
                        </div>
                      </td>

                      <td className="p-4 font-bold text-white whitespace-nowrap">
                        <span className="mr-1.5">{evt.flag}</span>
                        <span>{evt.currency}</span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isHigh
                              ? "bg-brand-red/20 text-brand-red border border-brand-red/30"
                              : isMedium
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                              : "bg-gray-800 text-muted"
                          }`}
                        >
                          {evt.impact}
                        </span>
                      </td>

                      <td className="p-4 font-semibold text-white max-w-xs sm:max-w-md">
                        {evt.name}
                      </td>

                      <td className="p-4 font-mono font-bold text-brand-teal whitespace-nowrap">
                        {evt.actual || "—"}
                      </td>

                      <td className="p-4 font-mono text-muted-strong whitespace-nowrap">
                        {evt.forecast}
                      </td>

                      <td className="p-4 font-mono text-muted whitespace-nowrap">
                        {evt.previous}
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

"use client";

import React, { useState, useEffect } from "react";
import { Clock, Globe, Zap } from "lucide-react";

interface SessionInfo {
  name: string;
  city: string;
  timezone: string;
  openUtc: number;
  closeUtc: number;
}

const SESSIONS: SessionInfo[] = [
  { name: "Sydney", city: "Australia", timezone: "Australia/Sydney", openUtc: 22, closeUtc: 7 },
  { name: "Tokyo", city: "Japan", timezone: "Asia/Tokyo", openUtc: 0, closeUtc: 9 },
  { name: "London", city: "United Kingdom", timezone: "Europe/London", openUtc: 8, closeUtc: 16.5 },
  { name: "New York", city: "United States", timezone: "America/New_York", openUtc: 13, closeUtc: 21 },
];

export default function SessionClock() {
  const [utcTime, setUtcTime] = useState<Date | null>(null);

  useEffect(() => {
    setUtcTime(new Date());
    const interval = setInterval(() => {
      setUtcTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getUtcHoursDecimal = () => {
    if (!utcTime) return 0;
    return utcTime.getUTCHours() + utcTime.getUTCMinutes() / 60;
  };

  const currentUtcHours = getUtcHoursDecimal();

  const isSessionOpen = (session: SessionInfo) => {
    if (session.openUtc < session.closeUtc) {
      return currentUtcHours >= session.openUtc && currentUtcHours < session.closeUtc;
    } else {
      // Over midnight
      return currentUtcHours >= session.openUtc || currentUtcHours < session.closeUtc;
    }
  };

  const isOverlap = isSessionOpen(SESSIONS[2]) && isSessionOpen(SESSIONS[3]);

  return (
    <div className="bg-surface border border-theme rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-theme">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center text-brand-teal">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Global Interbank Trading Sessions
            </h3>
            <p className="text-xs text-muted">
              Real-time institutional market hours & high-volume overlap periods
            </p>
          </div>
        </div>

        {isOverlap && (
          <div className="inline-flex items-center gap-1.5 bg-brand-teal/15 border border-brand-teal/40 text-brand-teal px-3 py-1.5 rounded-full text-xs font-bold animate-pulse">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>London / New York Liquidity Overlap Active</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SESSIONS.map((session) => {
          const active = isSessionOpen(session);
          let localTimeStr = "--:--:--";
          if (utcTime) {
            try {
              localTimeStr = utcTime.toLocaleTimeString("en-US", {
                timeZone: session.timezone,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              });
            } catch (e) {
              localTimeStr = utcTime.toTimeString().split(" ")[0];
            }
          }

          return (
            <div
              key={session.name}
              className={`p-4 rounded-xl border transition-all ${
                active
                  ? "bg-brand-teal/10 border-brand-teal/40 shadow-lg shadow-brand-teal/5"
                  : "bg-page border-theme opacity-75"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">{session.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    active
                      ? "bg-brand-green/20 text-brand-green border border-brand-green/30"
                      : "bg-gray-800 text-muted"
                  }`}
                >
                  {active ? "Active" : "Closed"}
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-white tracking-wider my-1">
                {localTimeStr}
              </div>
              <div className="text-[11px] text-muted">{session.city}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

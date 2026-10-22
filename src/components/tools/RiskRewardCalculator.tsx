"use client";

import React, { useState } from "react";
import { TrendingUp, Target, AlertTriangle } from "lucide-react";

export default function RiskRewardCalculator() {
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [entryPrice, setEntryPrice] = useState<number>(2680.0);
  const [stopLoss, setStopLoss] = useState<number>(2660.0);
  const [takeProfit, setTakeProfit] = useState<number>(2730.0);

  const risk = direction === "long" ? entryPrice - stopLoss : stopLoss - entryPrice;
  const reward = direction === "long" ? takeProfit - entryPrice : entryPrice - takeProfit;

  const ratio = risk > 0 && reward > 0 ? (reward / risk).toFixed(2) : "0.00";
  const requiredWinRate = risk > 0 && reward > 0 ? (1 / (1 + Number(ratio))) * 100 : 50;

  return (
    <div className="bg-surface border border-theme rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-theme">
        <div className="w-10 h-10 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center text-brand-teal">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-display">
            Risk / Reward Ratio Calculator
          </h3>
          <p className="text-xs text-muted">
            Verify asymmetric trade expectancy before opening any position
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Direction toggle */}
          <div>
            <label className="block text-xs font-semibold text-muted-strong mb-1.5">
              Trade Direction
            </label>
            <div className="grid grid-cols-2 gap-2 bg-page p-1 rounded-xl border border-theme">
              <button
                type="button"
                onClick={() => setDirection("long")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  direction === "long"
                    ? "bg-brand-teal text-[#0B0F12]"
                    : "text-muted hover:text-white"
                }`}
              >
                LONG (Buy)
              </button>
              <button
                type="button"
                onClick={() => setDirection("short")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  direction === "short"
                    ? "bg-brand-red text-white"
                    : "text-muted hover:text-white"
                }`}
              >
                SHORT (Sell)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-strong mb-1.5">
              Entry Price
            </label>
            <input
              type="number"
              step="any"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              className="w-full bg-page border border-theme rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-teal"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-strong mb-1.5">
                Stop Loss Price
              </label>
              <input
                type="number"
                step="any"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className="w-full bg-page border border-theme rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-teal"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-strong mb-1.5">
                Take Profit Price
              </label>
              <input
                type="number"
                step="any"
                value={takeProfit}
                onChange={(e) => setTakeProfit(Number(e.target.value))}
                className="w-full bg-page border border-theme rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-teal"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-page border border-theme rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-teal block mb-1">
              Risk to Reward Expectancy
            </span>
            <div className="text-3xl font-black text-white font-mono flex items-baseline gap-2">
              <span>1 : {ratio}</span>
              {Number(ratio) >= 2 ? (
                <span className="text-xs font-bold text-brand-green px-2 py-0.5 rounded bg-brand-green/20">
                  Institutional Quality
                </span>
              ) : (
                <span className="text-xs font-bold text-yellow-500 px-2 py-0.5 rounded bg-yellow-500/20">
                  Sub-Optimal Ratio
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3 my-4 py-3 border-y border-theme text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted">Total Price Risk:</span>
              <span className="font-bold text-brand-red font-mono">{risk.toFixed(2)} pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Total Potential Reward:</span>
              <span className="font-bold text-brand-green font-mono">{reward.toFixed(2)} pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Breakeven Win Rate:</span>
              <span className="font-semibold text-white font-mono">{requiredWinRate.toFixed(1)}%</span>
            </div>
          </div>

          <p className="text-[11px] text-muted leading-relaxed">
            With a 1:{ratio} R:R setup, you only need to win{" "}
            <strong>{requiredWinRate.toFixed(1)}%</strong> of your trades to maintain overall
            breakeven profitability.
          </p>
        </div>
      </div>
    </div>
  );
}

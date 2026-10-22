"use client";

import React, { useState } from "react";
import { Calculator, Shield, HelpCircle } from "lucide-react";

export default function PositionSizeCalculator() {
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [stopLossPips, setStopLossPips] = useState<number>(30);
  const [instrument, setInstrument] = useState<string>("EUR/USD");

  // Approximate pip value per standard lot in USD
  const pipValuePerLot = instrument === "USD/JPY" ? 6.6 : instrument === "XAU/USD" ? 10.0 : 10.0;

  const riskAmount = (balance * riskPercent) / 100;
  const standardLots = stopLossPips > 0 ? riskAmount / (stopLossPips * pipValuePerLot) : 0;
  const miniLots = standardLots * 10;
  const microLots = standardLots * 100;

  return (
    <div className="bg-surface border border-theme rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-theme">
        <div className="w-10 h-10 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center text-brand-teal">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-display">
            Position Size & Lot Calculator
          </h3>
          <p className="text-xs text-muted">
            Calculate exact lot sizing according to strict risk management
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-strong mb-1.5">
              Account Balance ($ USD)
            </label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(Math.max(0, Number(e.target.value)))}
              className="w-full bg-page border border-theme rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-teal"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-strong mb-1.5">
                Risk Percentage (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={riskPercent}
                onChange={(e) => setRiskPercent(Math.max(0.1, Number(e.target.value)))}
                className="w-full bg-page border border-theme rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-teal"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-strong mb-1.5">
                Stop Loss (Pips / Points)
              </label>
              <input
                type="number"
                value={stopLossPips}
                onChange={(e) => setStopLossPips(Math.max(1, Number(e.target.value)))}
                className="w-full bg-page border border-theme rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-teal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-strong mb-1.5">
              Select Instrument
            </label>
            <select
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
              className="w-full bg-page border border-theme rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-teal"
            >
              <option value="EUR/USD">EUR/USD (Major FX)</option>
              <option value="GBP/USD">GBP/USD (Cable)</option>
              <option value="USD/JPY">USD/JPY (Yen)</option>
              <option value="XAU/USD">XAU/USD (Gold Spot)</option>
              <option value="USD/CAD">USD/CAD (Loonie)</option>
              <option value="AUD/USD">AUD/USD (Aussie)</option>
            </select>
          </div>
        </div>

        {/* Output Results Card */}
        <div className="bg-page border border-brand-teal/20 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-teal block mb-1">
              Recommended Risk Exposure
            </span>
            <div className="text-2xl font-black text-white font-mono">
              ${riskAmount.toFixed(2)}{" "}
              <span className="text-xs font-normal text-muted">total risk</span>
            </div>
          </div>

          <div className="space-y-3 my-4 py-3 border-y border-theme text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted">Standard Lots (100k):</span>
              <span className="font-bold text-brand-teal text-base font-mono">
                {standardLots.toFixed(2)} Lots
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Mini Lots (10k):</span>
              <span className="font-semibold text-white font-mono">{miniLots.toFixed(2)} Mini</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Micro Lots (1k):</span>
              <span className="font-semibold text-white font-mono">{microLots.toFixed(0)} Micro</span>
            </div>
          </div>

          <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-lg p-3 text-[11px] text-muted-strong flex items-start gap-2">
            <Shield className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
            <span>
              By sticking to <strong>{standardLots.toFixed(2)} lots</strong>, your maximum loss on a{" "}
              {stopLossPips} pip move is capped at exactly ${riskAmount.toFixed(2)}.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

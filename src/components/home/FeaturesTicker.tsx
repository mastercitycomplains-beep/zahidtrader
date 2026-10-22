"use client";

import React from "react";
import { Zap, Users, Activity, Star, Headphones } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function FeaturesTicker() {
  const badges = [
    { icon: Zap, label: "Quick and disciplined onboarding", color: "#FFD700" },
    { icon: Users, label: "10K+ Active Global Traders", color: "#FF7675" },
    { icon: Activity, label: "Live session interbank updates", color: "#A29BFE" },
    { icon: Star, label: "Rated 4.9/5 for Risk Discipline", color: "#00B894" },
    { icon: Headphones, label: `Direct WhatsApp Desk (${SITE_CONFIG.whatsappDisplay})`, color: "#FD79A8" },
  ];

  // Repeat for continuous marquee
  const items = [...badges, ...badges, ...badges];

  return (
    <div className="w-full bg-page-elevated border-y border-theme py-4 overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {items.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-theme text-xs font-semibold text-muted-strong"
            >
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: badge.color }} />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  showTagline?: boolean;
  href?: string;
  className?: string;
}

export default function BrandLogo({
  size = "md",
  showText = true,
  showTagline = true,
  href = "/",
  className = "",
}: BrandLogoProps) {
  const dimensions = {
    sm: { box: "w-9 h-9", img: 36, text: "text-lg", badge: "text-[10px] px-1.5 py-0.5", tag: "text-[9px]" },
    md: { box: "w-11 h-11", img: 44, text: "text-xl", badge: "text-[11px] px-2 py-0.5", tag: "text-[10px]" },
    lg: { box: "w-14 h-14", img: 56, text: "text-2xl", badge: "text-xs px-2.5 py-1", tag: "text-[11px]" },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Emblem in luxury two-tone halftone accent container */}
      <div
        className={`relative ${dimensions.box} rounded-xl bg-white p-1 overflow-hidden shrink-0 flex items-center justify-center transition-all duration-300
        border border-slate-200 shadow-sm group-hover:shadow-md
        dark:border-brand-teal/40 dark:shadow-[0_0_14px_rgba(22,184,173,0.22)] dark:group-hover:border-brand-teal dark:group-hover:shadow-[0_0_22px_rgba(22,184,173,0.38)]`}
      >
        {/* Subtle halftone/gradient ambient glow ring */}
        <span
          className="absolute inset-0 bg-gradient-to-tr from-brand-teal/15 via-transparent to-brand-gold/15 opacity-60 pointer-events-none"
          aria-hidden
        />
        <Image
          src={SITE_CONFIG.images.logo}
          alt="ZAHID TRADER — Bull & Markets Mark"
          width={dimensions.img}
          height={dimensions.img}
          className="object-contain w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* Typography Brand Lockup */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight text-foreground font-display ${dimensions.text} transition-colors group-hover:text-brand-teal`}
            >
              ZAHID
            </span>
            <span
              className={`bg-brand-teal text-[#090D11] font-black uppercase tracking-wider rounded-md shadow-sm font-display ${dimensions.badge}`}
            >
              TRADER
            </span>
          </div>
          {showTagline && (
            <span
              className={`font-medium tracking-widest uppercase text-brand-teal/90 mt-1 ${dimensions.tag}`}
            >
              Master the Markets
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Zahid Trader - Return to Homepage">
        {content}
      </Link>
    );
  }

  return content;
}

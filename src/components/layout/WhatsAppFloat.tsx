"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center group">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 mr-3 bg-surface text-white text-xs px-3.5 py-2 rounded-xl border border-theme shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-left-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span>Need direct guidance? Chat on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-muted hover:text-white ml-1 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Zahid Trader on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 group-hover:ring-4 group-hover:ring-[#25D366]/30"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-teal"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}

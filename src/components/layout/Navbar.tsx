"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import ThemeToggle from "@/components/theme/ThemeToggle";
import BrandLogo from "@/components/layout/BrandLogo";
import {
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  BookOpen,
  Calendar,
  Calculator,
  Compass,
  MessageCircle,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Markets", href: "/markets" },
    { label: "Blog", href: "/blog" },
    { label: "Analysis", href: "/analysis" },
    { label: "Research", href: "/research" },
    { label: "Learn", href: "/learn" },
    { label: "Tools", href: "/tools" },
    {
      label: "More",
      isDropdown: true,
      children: [
        { label: "Economic Calendar", href: "/economic-calendar", icon: Calendar, desc: "Key global economic events & releases" },
        { label: "Pricing & VIP Desk", href: "/pricing", icon: TrendingUp, desc: "Institutional research & VIP access" },
        { label: "About Us", href: "/about", icon: Compass, desc: "Our philosophy & risk principles" },
        { label: "FAQ", href: "/faq", icon: BookOpen, desc: "Frequently asked questions" },
      ],
    },
  ];

  // Do not render public navbar on admin console routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-page/92 backdrop-blur-md border-b border-theme shadow-md shadow-black/5 dark:shadow-black/25"
          : "bg-page/75 backdrop-blur-sm border-b border-theme/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Official Bull & Candlestick Artwork */}
        <BrandLogo size="md" href="/" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navItems.map((item, index) => {
            if (item.isDropdown && item.children) {
              const isChildActive = item.children.some((c) => pathname === c.href);
              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      dropdownOpen || isChildActive
                        ? "text-brand-teal font-semibold"
                        : "text-muted hover:text-foreground hover:bg-surface-hover"
                    }`}
                    aria-expanded={dropdownOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180 text-brand-teal" : ""
                      }`}
                      aria-hidden
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 w-80 pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                      <div className="bg-surface border border-theme rounded-2xl p-2.5 shadow-2xl backdrop-blur-2xl">
                        {item.children.map((child) => {
                          const Icon = child.icon;
                          const isActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                                isActive
                                  ? "bg-brand-teal/15 text-brand-teal border border-brand-teal/20"
                                  : "text-muted hover:text-foreground hover:bg-surface-hover"
                              }`}
                            >
                              <div className="p-2 rounded-lg bg-surface-deep text-brand-teal mt-0.5 shrink-0 border border-theme">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-foreground">{child.label}</div>
                                <div className="text-xs text-muted leading-tight mt-0.5">
                                  {child.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const href = item.href || "/";
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-brand-teal font-bold bg-brand-teal/10"
                    : "text-muted hover:text-foreground hover:bg-surface-hover"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-teal rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          
          <Link
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-[#25D366]/20" />
            <span>WhatsApp VIP</span>
          </Link>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 bg-brand-teal hover:bg-brand-teal-dark text-[#0B0F12] px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase shadow-lg shadow-brand-teal/25 hover:shadow-brand-teal/35 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Desk</span>
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Link
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30"
            aria-label="WhatsApp Desk"
          >
            <MessageCircle className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-surface border border-theme text-foreground hover:text-brand-teal focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6 text-brand-teal" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-page/98 backdrop-blur-2xl border-t border-theme p-6 overflow-y-auto animate-in slide-in-from-top-4 duration-200 z-50">
          <div className="flex flex-col gap-2 pb-8">
            <div className="pb-3 mb-2 border-b border-theme">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal">Navigation</span>
            </div>
            {navItems.map((item) => {
              if (item.isDropdown && item.children) {
                return (
                  <div key={item.label} className="flex flex-col gap-1.5 pt-2">
                    <span className="text-xs font-semibold text-muted px-3 py-1">{item.label}</span>
                    <div className="grid grid-cols-1 gap-1 pl-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-surface-hover"
                        >
                          <child.icon className="w-4 h-4 text-brand-teal" />
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href || "/"}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-brand-teal/15 text-brand-teal border border-brand-teal/30"
                      : "text-muted hover:text-foreground hover:bg-surface-hover"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-muted font-light">›</span>
                </Link>
              );
            })}

            <div className="pt-6 mt-4 border-t border-theme flex flex-col gap-3">
              <Link
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-[#0B0F12] font-bold text-sm shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chat on WhatsApp (+92 345 4706138)</span>
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-teal text-[#0B0F12] font-bold text-sm shadow-lg shadow-brand-teal/20"
              >
                <span>Access Trading Desk &amp; VIP</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

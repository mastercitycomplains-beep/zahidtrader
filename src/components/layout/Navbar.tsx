"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import ThemeToggle from "@/components/theme/ThemeToggle";
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
  ShieldAlert,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
    { label: "News", href: "/news" },
    { label: "Analysis", href: "/analysis" },
    { label: "Research", href: "/research" },
    { label: "Learn", href: "/learn" },
    {
      label: "More",
      isDropdown: true,
      children: [
        { label: "Economic Calendar", href: "/economic-calendar", icon: Calendar, desc: "Key global economic events & releases" },
        { label: "Trading Tools", href: "/tools", icon: Calculator, desc: "Position size & risk/reward calculators" },
        { label: "Pricing & VIP", href: "/pricing", icon: TrendingUp, desc: "Institutional research & VIP access" },
        { label: "About Us", href: "/about", icon: Compass, desc: "Our philosophy & risk principles" },
        { label: "Contact", href: "/contact", icon: MessageCircle, desc: "Reach our desk or WhatsApp concierge" },
        { label: "FAQ", href: "/faq", icon: BookOpen, desc: "Frequently asked questions" },
      ],
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-page/90 backdrop-blur-md border-b border-theme shadow-lg shadow-black/10"
          : "bg-page/70 backdrop-blur-sm border-b border-theme/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 bg-white rounded-lg p-1 shadow-md shadow-brand-teal/10 overflow-hidden flex items-center justify-center border border-white/20 group-hover:border-brand-teal transition-colors">
            <Image
              src={SITE_CONFIG.images.logo}
              alt="ZAHID TRADER Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-xl tracking-tight text-white font-display">
                ZAHID
              </span>
              <span className="bg-brand-teal text-[#0B0F12] font-black text-xs px-1.5 py-0.5 rounded uppercase tracking-wider">
                TRADER
              </span>
            </div>
            <span className="text-[10px] tracking-widest uppercase text-brand-teal font-medium mt-1">
              Master the Markets
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item, index) => {
            if (item.isDropdown && item.children) {
              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      dropdownOpen ? "text-brand-teal" : "text-gray-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180 text-brand-teal" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="bg-[#11161B] border border-white/10 rounded-xl p-2 shadow-2xl shadow-black/80 backdrop-blur-xl">
                        {item.children.map((child) => {
                          const Icon = child.icon;
                          const isActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-start gap-3 p-2.5 rounded-lg transition-all ${
                                isActive
                                  ? "bg-brand-teal/15 text-brand-teal border border-brand-teal/20"
                                  : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
                              }`}
                            >
                              <div className="p-2 rounded-md bg-white/[0.04] text-brand-teal mt-0.5">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold">{child.label}</div>
                                <div className="text-xs text-gray-400 leading-tight mt-0.5">
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
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-brand-teal bg-brand-teal/10 font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-white/[0.04]"
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
            className="inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-[#25D366]/20" />
            <span>WhatsApp VIP</span>
          </Link>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 bg-brand-teal hover:bg-brand-teal-dark text-[#0B0F12] px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase shadow-lg shadow-brand-teal/20 hover:shadow-brand-teal/30 transition-all active:scale-95"
          >
            <span>Join Desk</span>
            <span className="text-sm font-light">›</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Link
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6 text-brand-teal" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-28 bottom-0 bg-page/95 backdrop-blur-2xl border-t border-theme p-6 overflow-y-auto animate-in slide-in-from-top-4 duration-200 z-50">
          <div className="flex flex-col gap-2 pb-8">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-brand-teal/15 text-brand-teal font-bold border border-brand-teal/30"
                      : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-gray-500 font-light">›</span>
                </Link>
              );
            })}

            <div className="pt-6 mt-4 border-t border-white/10 flex flex-col gap-3">
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
                <span>Access Trading Desk & VIP</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

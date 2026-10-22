"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BrandLogo from "@/components/layout/BrandLogo";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { AdminUser } from "@/lib/auth/adminAuth";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  ExternalLink,
  LogOut,
  Shield,
  Database,
  Menu,
  X,
} from "lucide-react";

export default function AdminNav({ user }: { user: AdminUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, render clean minimal header
  if (pathname === "/admin/login") {
    return (
      <header className="w-full bg-surface/80 border-b border-theme py-4 px-6 flex items-center justify-between">
        <BrandLogo size="sm" href="/" />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            className="text-xs font-bold text-muted hover:text-brand-teal transition-colors flex items-center gap-1"
          >
            <span>Return to Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>
    );
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "All Blogs", href: "/admin/blogs", icon: FileText },
    { label: "New Post", href: "/admin/blogs/new", icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-xl border-b border-theme shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <BrandLogo size="sm" href="/admin" />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-teal/15 text-brand-teal border border-brand-teal/30">
            Editorial CMS Console
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-brand-teal text-[#090D11] shadow-sm"
                    : "text-muted hover:text-foreground hover:bg-surface-hover"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/blog"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-brand-teal px-3 py-1.5 rounded-xl border border-theme hover:bg-surface-hover transition-colors"
          >
            <span>Live Blog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {user && (
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold border border-red-500/20 transition-all active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{loggingOut ? "Signing out..." : "Sign Out"}</span>
            </button>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl bg-surface-deep border border-theme text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-theme bg-surface p-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-brand-teal text-[#090D11]"
                    : "text-muted hover:text-foreground hover:bg-surface-hover"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <Link
            href="/blog"
            target="_blank"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-muted hover:bg-surface-hover"
          >
            <span>View Public Blog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </header>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/components/layout/BrandLogo";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  KeyRound,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@zahidtrader.com");
  const [password, setPassword] = useState("zahidtrader2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      // Successful login
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sign in. Please verify your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-page">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <BrandLogo size="lg" href="/" className="justify-center mb-4" />
          <h1 className="text-2xl sm:text-3xl font-black text-foreground font-display tracking-tight">
            Administrator Sign In
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-2">
            Secure editorial console for publishing market intelligence and managing blog articles.
          </p>
        </div>

        <div className="bg-surface border border-theme rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-500 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@zahidtrader.com"
                  className="w-full pl-10 pr-4 py-3 bg-page border border-theme rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                Master Security Key / Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-page border border-theme rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-teal hover:bg-brand-teal-dark disabled:opacity-60 text-[#090D11] font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-brand-teal/25 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? "Authenticating..." : "Sign In to CMS"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Test Credentials Box */}
          <div className="mt-6 pt-5 border-t border-theme text-xs text-muted">
            <div className="p-3.5 rounded-xl bg-surface-deep border border-theme">
              <span className="font-extrabold text-foreground block mb-1">
                Default Administrator Access:
              </span>
              <p className="font-mono text-[11px] text-muted-strong">
                Email: <span className="text-brand-teal font-semibold">admin@zahidtrader.com</span>
                <br />
                Password: <span className="text-brand-teal font-semibold">zahidtrader2026</span>
              </p>
              <p className="text-[10px] text-muted mt-1.5">
                (Configure custom values in <code className="text-foreground">.env.local</code> via <code className="text-foreground">ADMIN_PASSWORD</code>)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

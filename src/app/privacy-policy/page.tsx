import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Zahid Trader Privacy Policy and data handling standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-brand-teal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted font-mono">Last updated: October 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-muted-strong text-sm leading-relaxed space-y-6">
          <p>
            At <strong>ZAHID TRADER</strong> ("we", "our", or "us"), we respect your privacy and are committed to protecting the personal information you share with us through our website and related intelligence services.
          </p>

          <h2 className="text-xl font-bold text-white font-display">1. Information We Collect</h2>
          <p>
            We may collect information you voluntarily provide when subscribing to our newsletter, contacting our desk via forms, or communicating with us over WhatsApp. This information includes your name, email address, and any specific inquiries you submit.
          </p>

          <h2 className="text-xl font-bold text-white font-display">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Deliver pre-market market briefs and research letters you requested.</li>
            <li>Respond to your direct inquiries, questions, and support tickets.</li>
            <li>Improve the functionality, security, and user experience of our platform.</li>
          </ul>

          <h2 className="text-xl font-bold text-white font-display">3. Third-Party Sharing and Data Security</h2>
          <p>
            We do not sell, rent, or trade your personal information to third-party data brokers. We utilize industry-standard encryption protocols and secure server environments to safeguard your data.
          </p>

          <h2 className="text-xl font-bold text-white font-display">4. Contact Regarding Privacy</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data deletion, contact us at <code>support@zahidtrader.com</code> or reach our desk via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

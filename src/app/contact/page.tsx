"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "An unexpected error occurred. Please reach out via WhatsApp.");
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[#0B0F12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            Direct Communication
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Connect With the Zahid Trader Desk
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Have questions about our daily market scenarios, educational modules, or VIP desk membership? Send us an inquiry or start a direct conversation on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct WhatsApp & Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Priority Card */}
            <div className="bg-gradient-to-br from-[#11161B] to-[#14231E] border border-[#25D366]/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] mb-5">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 font-display">
                Fastest Response: WhatsApp Desk
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                For prompt replies, mentorship inquiries, and VIP onboarding, our administrative line is active on WhatsApp.
              </p>
              <div className="text-sm font-bold text-[#25D366] font-mono mb-6">
                {SITE_CONFIG.whatsappDisplay}
              </div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-[#0B0F12] font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wide transition-all shadow-lg shadow-[#25D366]/20 active:scale-95"
              >
                <span>Launch WhatsApp Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Email & Desk Info */}
            <div className="bg-[#11161B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/[0.04] text-brand-teal flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">Email Inquiries</h3>
                  <p className="text-xs text-gray-400 mb-1">General inquiries and institutional partnerships</p>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-xs font-semibold text-brand-teal hover:underline font-mono"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-white/[0.06]">
                <div className="p-3 rounded-xl bg-white/[0.04] text-brand-teal flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">Desk Active Hours</h3>
                  <p className="text-xs text-gray-400">
                    London Open (08:00 UTC) to New York Close (21:00 UTC), Monday through Friday.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#11161B] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2 font-display">
              Send a Direct Message
            </h2>
            <p className="text-xs text-gray-400 mb-2">
              Fill out the form below and a representative from the desk will get back to you within
              24 hours.
            </p>
            <p className="text-[11px] text-gray-500 mb-8">
              Submissions are delivered to{" "}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-brand-teal hover:underline font-mono"
              >
                {SITE_CONFIG.email}
              </a>
              . For the fastest reply, use WhatsApp.
            </p>

            {status === "success" ? (
              <div className="p-8 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-center">
                <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed mb-6">
                  Thank you for reaching out to Zahid Trader. We have received your submission and will contact you via email or WhatsApp shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-5 py-2.5 rounded-xl bg-brand-teal text-[#0B0F12] font-bold text-xs uppercase"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === "error" && (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#0B0F12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-[#0B0F12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Question about Gold setup or VIP membership"
                    className="w-full bg-[#0B0F12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Message / Inquiry Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your question or trading experience..."
                    className="w-full bg-[#0B0F12] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-[#0B0F12] font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-teal/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{status === "loading" ? "Transmitting..." : "Send Message to Desk"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

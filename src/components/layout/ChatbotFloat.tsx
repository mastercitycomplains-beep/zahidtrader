"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Shield,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  links?: { label: string; href: string }[];
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    sender: "bot",
    text: "Welcome to ZAHID TRADER Intelligence Desk! I am your AI Market Assistant. How can I assist your trading journey today?",
    timestamp: "Desk Active",
  },
];

const SUGGESTED_PROMPTS = [
  "What is forex trading?",
  "Explain today's gold market.",
  "How does risk management work?",
  "What is a pip and lot size?",
  "How do I join the VIP Telegram?",
  "Help me navigate the website.",
];

export default function ChatbotFloat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.reply,
          timestamp: "Just now",
          links: data.links,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      // Fallback offline intelligence
      setTimeout(() => {
        let fallbackText =
          "At ZAHID TRADER, we focus on disciplined risk management, macro analysis, and clear invalidation levels. Explore our educational articles or contact our desk directly.";
        let fallbackLinks = [{ label: "Explore Academy", href: "/learn" }];

        const lower = textToSend.toLowerCase();
        if (lower.includes("gold") || lower.includes("xau")) {
          fallbackText =
            "Gold (XAU/USD) is currently trading in a high-timeframe bullish trend, supported by sovereign reserve flows and safe-haven accumulation. Check our Daily Analysis for exact entry zones and invalidation levels.";
          fallbackLinks = [{ label: "View Gold Analysis", href: "/analysis" }];
        } else if (lower.includes("risk")) {
          fallbackText =
            "Our #1 rule: Never risk more than 1% to 2% of equity on any single idea. Use our Position Size Calculator before entering any order.";
          fallbackLinks = [{ label: "Position Size Calculator", href: "/tools" }];
        } else if (lower.includes("forex") || lower.includes("trading")) {
          fallbackText =
            "Forex is the $7.5T daily global currency market. Beginners should start with our structured lessons covering currency pairs, candlesticks, and session timing.";
          fallbackLinks = [{ label: "Beginner's Guide", href: "/learn" }];
        } else if (lower.includes("vip") || lower.includes("pricing") || lower.includes("join")) {
          fallbackText =
            `You can join the Zahid Trader VIP Desk or connect with Zahid directly via WhatsApp (${SITE_CONFIG.whatsappDisplay}) for real-time market updates.`;
          fallbackLinks = [{ label: "View Membership Plans", href: "/pricing" }];
        }

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: fallbackText,
          timestamp: "Just now",
          links: fallbackLinks,
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 700);
      return;
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 bg-surface hover:bg-[#161D24] text-white border border-brand-teal/40 px-4 py-3.5 rounded-full shadow-2xl shadow-brand-teal/20 transition-all duration-300 hover:scale-105 active:scale-95 group"
          aria-label="Open Zahid Trader AI Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center text-[#0B0F12]">
            <Sparkles className="w-4 h-4 fill-current animate-pulse" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <span className="block text-xs font-bold font-display text-white">Ask AI Desk</span>
            <span className="block text-[10px] text-brand-teal font-medium">Market Intelligence</span>
          </div>
        </button>
      )}

      {/* Chatbot Window Panel */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-4 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-[400px] h-[560px] max-h-[85vh] bg-[#0E1317] border border-theme rounded-2xl shadow-2xl shadow-black/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-250 z-50">
          {/* Header */}
          <div className="bg-[#141A20] px-4 py-3.5 border-b border-theme flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg bg-white p-0.5 overflow-hidden flex items-center justify-center">
                <Image
                  src={SITE_CONFIG.images.logo}
                  alt="ZAHID TRADER Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                  <span>ZAHID TRADER AI Desk</span>
                  <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                </h4>
                <p className="text-[10px] text-muted">Market Intelligence & Education</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-muted hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-brand-teal text-[#0B0F12] font-medium rounded-tr-none shadow-md"
                      : "bg-[#161D24] text-muted-strong border border-theme rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Links suggested by bot */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-theme space-y-1">
                      {msg.links.map((link, i) => (
                        <Link
                          key={i}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-teal hover:underline mr-2"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-muted mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-xl bg-[#161D24] text-muted w-24">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Pills */}
          <div className="px-3 py-2 bg-surface/80 border-t border-theme overflow-x-auto no-scrollbar flex items-center gap-1.5 whitespace-nowrap">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-brand-teal/20 text-muted-strong hover:text-brand-teal border border-theme transition-colors flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSubmit} className="p-3 bg-[#141A20] border-t border-theme flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about markets, risk, or education..."
              className="flex-1 bg-page border border-theme rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-brand-teal text-[#0B0F12] hover:bg-brand-teal-dark transition-colors disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

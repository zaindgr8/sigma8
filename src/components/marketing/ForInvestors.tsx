"use client";

import React from "react";

interface ForInvestorsProps {
  onOpenApply: () => void;
}

export function ForInvestors({ onOpenApply }: ForInvestorsProps) {
  const investorPillars = [
    {
      title: "Total Anonymity Until You Decide",
      description:
        "Your name, firm, and personal contacts are strictly hidden. Founders only see your anonymous headline and verified cheque metrics until you mutually accept an intro.",
    },
    {
      title: "Pre-Vetted Metrics & Tractions",
      description:
        "No inflated claims or vanity metrics. Every startup profile has substantiated revenue, growth rates, cap table sanity, and customer traction verified by our committee.",
    },
    {
      title: "Precision Filtering to Your Mandate",
      description:
        "Filter GCC startups by exact stage (Pre-Seed to Series B), sector (Fintech, AI, Logistics, Health), check requirement, and country HQ across the Gulf.",
    },
    {
      title: "Zero Broker Commissions",
      description:
        "Sigma 8 is a private introduction club, not an investment bank or broker-dealer. We take 0% carry and 0% finder fees from allocations.",
    },
  ];

  return (
    <section id="investors" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0e0e11] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Benefits Grid */}
        <div className="lg:col-span-6 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {investorPillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#141417] border border-white/5 hover:border-[#C6A15B]/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#C6A15B]/10 border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] text-xs font-mono mb-4">
                0{idx + 1}
              </div>
              <h3 className="text-base font-serif text-[#F4F1EA] mb-2 font-medium">
                {p.title}
              </h3>
              <p className="text-xs text-[#8A8780] font-sans leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column Text */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C20] border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#C6A15B]">
              03 — For Discreet Investors
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Curated Deal Flow. Complete Discretion.
          </h2>

          <p className="text-sm sm:text-base text-[#8A8780] font-sans leading-relaxed">
            Eliminate unwanted pitch spam and retain complete control over your
            identity. Invest in high-growth GCC founders without making your
            personal inbox public.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenApply}
              className="px-6 py-3 rounded-full bg-[#1C1C20] border border-[#C6A15B]/40 text-[#F4F1EA] text-xs font-mono font-medium uppercase tracking-wider hover:bg-[#26262B] hover:border-[#C6A15B] transition-all shadow-lg"
            >
              Apply as Investor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";

interface ForFoundersProps {
  onOpenApply: () => void;
}

export function ForFounders({ onOpenApply }: ForFoundersProps) {
  const benefits = [
    {
      title: "Direct Access to Legitimate GCC Capital",
      description:
        "Every investor profile represents verified cheque-writing capacity—family offices, tier-1 angels, and active institutional funds in the UAE, Saudi Arabia, and Qatar.",
    },
    {
      title: "Absolute Cap Table & Deck Protection",
      description:
        "Your institutional data room, cap table, and customer identities remain hidden. You decide specifically which verified investors unlock your deck.",
    },
    {
      title: "Zero Cold Emailing & Zero Spam",
      description:
        "No more ghosting on LinkedIn or sending decks to generic info@ inboxes. Every connection begins with explicit, mutual confirmation.",
    },
    {
      title: "Equal Footing with Capital",
      description:
        "Sigma 8 is founded on the conviction that high-caliber vision and capital are equal partners. You are not begging for meetings; you are entering a room of peers.",
    },
  ];

  return (
    <section id="founders" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0B0B0D]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C20] border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#C6A15B]">
              02 — For Exceptional Founders
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Fundraise with Dignity, Privacy, and Precision.
          </h2>

          <p className="text-sm sm:text-base text-[#8A8780] font-sans leading-relaxed">
            Building in the GCC is hard enough without wasting months pitching
            unqualified parties. Sigma 8 ensures every investor you interact
            with has verified liquidity and an active mandate.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenApply}
              className="px-6 py-3 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#d8b56f] transition-all shadow-lg shadow-[#C6A15B]/20"
            >
              Apply as Founder
            </button>
          </div>
        </div>

        {/* Right Column Benefits Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#141417] border border-white/5 hover:border-[#C6A15B]/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#C6A15B]/10 border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] text-xs font-mono mb-4">
                0{idx + 1}
              </div>
              <h3 className="text-base font-serif text-[#F4F1EA] mb-2 font-medium">
                {b.title}
              </h3>
              <p className="text-xs text-[#8A8780] font-sans leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

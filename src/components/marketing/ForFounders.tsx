"use client";

import React from "react";
import { Reveal, Eyebrow } from "./Reveal";

const BENEFITS = [
  { title: "Direct access to verified GCC capital", text: "Family offices, angels and funds — cheque capacity confirmed before you meet." },
  { title: "Your deck stays yours", text: "Cap table and customer names stay hidden until you choose to unlock them." },
];

export function ForFounders({ onOpenApply }: { onOpenApply: () => void }) {
  return (
    <section id="founders" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Eyebrow>02 — For Founders</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Fundraise with dignity.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8A8780] leading-relaxed max-w-md">
            No cold outreach, no unqualified pitches. Every investor you meet has verified liquidity
            and an active mandate.
          </p>
          <button
            onClick={onOpenApply}
            className="btn-gold mt-7 px-6 py-3 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider hover:bg-[#d8b56f] transition-all hover:-translate-y-0.5"
          >
            Apply as Founder
          </button>
        </Reveal>
        <div className="space-y-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 120}>
              <div className="p-6 rounded-2xl bg-[#141417] border border-white/5 hover:border-[#C6A15B]/30 transition-colors">
                <div className="text-[10px] tracking-wider text-[#C6A15B] mb-2">0{i + 1}</div>
                <h3 className="font-serif text-lg text-[#F4F1EA] mb-1.5" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                  {b.title}
                </h3>
                <p className="text-xs text-[#8A8780] leading-relaxed">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

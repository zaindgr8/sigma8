"use client";

import React from "react";
import { Reveal, Eyebrow } from "./Reveal";

const PILLARS = [
  { title: "Anonymous until you decide", text: "Name, firm and contacts stay hidden until you accept a mutual match." },
  { title: "Pre-vetted, not inflated", text: "Revenue, growth and cap tables verified by the committee before you see them." },
];

export function ForInvestors({ onOpenApply }: { onOpenApply: () => void }) {
  return (
    <section id="investors" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0e0e11] border-t border-white/5">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 order-2 lg:order-1">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="p-6 rounded-2xl bg-[#141417] border border-white/5 hover:border-[#C6A15B]/30 transition-colors">
                <div className="text-[10px] tracking-wider text-[#C6A15B] mb-2">0{i + 1}</div>
                <h3 className="font-serif text-lg text-[#F4F1EA] mb-1.5" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                  {p.title}
                </h3>
                <p className="text-xs text-[#8A8780] leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="order-1 lg:order-2">
          <Eyebrow>03 — For Investors</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Curated deal flow. Complete discretion.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8A8780] leading-relaxed max-w-md">
            No pitch spam, no public inbox. High-growth GCC founders — without revealing who you are.
          </p>
          <button
            onClick={onOpenApply}
            className="mt-7 px-6 py-3 rounded-full bg-[#1C1C20] border border-[#C6A15B]/40 text-[#F4F1EA] text-xs font-medium uppercase tracking-wider hover:bg-[#26262B] hover:border-[#C6A15B] transition-all hover:-translate-y-0.5"
          >
            Apply as Investor
          </button>
        </Reveal>
      </div>
    </section>
  );
}

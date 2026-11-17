"use client";

import React from "react";
import { LogoMark } from "../brand/LogoMark";
import { Reveal, Eyebrow } from "./Reveal";

const MEANINGS = [
  { symbol: "8 — Two Equal Rings", title: "Capital · Vision", text: "Neither towers over the other. They meet on identical footing." },
  { symbol: "∞ — Infinity", title: "Infinite Possibilities", text: "The eight, turned sideways — boundless potential across the GCC." },
  { symbol: "The Gold Lens", title: "The Verified Meeting Point", text: "Where the rings intersect: the only gold in the mark." },
  { symbol: "Σ — Sigma", title: "Limitless Growth", text: "The right pair is more than the sum of its parts." },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>05 — The Mark</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            One Mark. Four Meanings.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-5 flex flex-col items-center justify-center p-10 rounded-3xl bg-[#141417] border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#C6A15B]/5 to-transparent pointer-events-none" />
            <span className="animate-lens relative z-10 py-6">
              <LogoMark size={140} lensGlow={true} />
            </span>
            <div className="relative z-10 text-center">
              <div className="text-xl font-serif text-[#F4F1EA] tracking-[0.28em] uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                Sigma 8
              </div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[#C6A15B] mt-1">
                Infinite Possibilities · Limitless Growth
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MEANINGS.map((m, i) => (
              <Reveal key={m.title} delay={i * 120}>
                <div className="p-6 rounded-2xl bg-[#141417] border border-white/5 hover:border-[#C6A15B]/30 transition-colors h-full">
                  <div className="text-[10px] text-[#C6A15B] uppercase tracking-wider mb-1">{m.symbol}</div>
                  <h3 className="text-lg font-serif text-[#F4F1EA] mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{m.title}</h3>
                  <p className="text-xs text-[#8A8780] leading-relaxed">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

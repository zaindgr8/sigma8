"use client";

import React from "react";
import { LogoMark } from "../brand/LogoMark";

export function Philosophy() {
  const meanings = [
    {
      symbol: "The Eight (8)",
      meaning: "Two Equal Rings",
      description:
        "Stacked into an eight: the upper ring signifies Capital, the lower ring signifies Vision. Neither towers over the other; they meet on identical, balanced footing.",
    },
    {
      symbol: "Infinity (∞)",
      meaning: "Infinite Possibilities",
      description:
        "Rotated horizontally, the eight becomes the infinity symbol—representing the boundless economic and technological potential emerging across Dubai and the GCC.",
    },
    {
      symbol: "The Gold Lens",
      meaning: "The Verified Meeting Point",
      description:
        "Where the two rings intersect lies the champagne gold lens. It is the only gold in the mark, symbolizing the exact moment of mutual verification and alignment.",
    },
    {
      symbol: "Σ (Sigma)",
      meaning: "Limitless Growth",
      description:
        "Sigma represents mathematical summation. When exceptional founders unite with catalytic GCC capital, the collective outcome far exceeds the sum of its parts.",
    },
  ];

  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0B0B0D]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C20] border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#C6A15B]">
              04 — Brand Identity & Philosophy
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            One Mark. Four Meanings.
          </h2>

          <p className="text-sm sm:text-base text-[#8A8780] font-sans leading-relaxed">
            Quiet luxury. Restrained, confident, spacious. No loud gradients or
            generic SaaS gimmicks. Designed for the private members&apos; club of
            tomorrow.
          </p>
        </div>

        {/* Central Display & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Big Visual Mark Center */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl bg-[#141417] border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#C6A15B]/5 to-transparent pointer-events-none" />
            <div className="relative z-10 py-10 scale-125">
              <LogoMark size={140} lensGlow={true} />
            </div>
            <div className="text-center relative z-10 mt-4">
              <div
                className="text-xl font-serif text-[#F4F1EA] tracking-[0.28em] uppercase"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                SIGMA 8
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#C6A15B] mt-1">
                Infinite Possibilities · Limitless Growth
              </div>
            </div>
          </div>

          {/* Meaning Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {meanings.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#141417] border border-white/5 hover:border-[#C6A15B]/30 transition-colors"
              >
                <div className="text-[10px] font-mono text-[#C6A15B] uppercase tracking-wider mb-1">
                  {m.symbol}
                </div>
                <h3
                  className="text-lg font-serif text-[#F4F1EA] mb-2"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                  }}
                >
                  {m.meaning}
                </h3>
                <p className="text-xs text-[#8A8780] font-sans leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

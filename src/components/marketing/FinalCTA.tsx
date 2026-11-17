"use client";

import React from "react";
import { LogoMark } from "../brand/LogoMark";

interface FinalCTAProps {
  onOpenApply: (role: "founder" | "investor") => void;
}

export function FinalCTA({ onOpenApply }: FinalCTAProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0e0e11] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C6A15B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#141417] border border-white/10 mb-2">
          <LogoMark size={44} lensGlow={true} />
        </div>

        <div className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#C6A15B]">
          INVITATION ADMISSION
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F4F1EA] tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Enter the Room Where Deals Actually Happen.
        </h2>

        <p className="text-sm sm:text-base text-[#8A8780] max-w-xl mx-auto font-sans leading-relaxed">
          Every member is verified before they enter. Deal flow is curated,
          introductions are deliberate, and every meeting is worth the time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenApply("founder")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-mono font-semibold uppercase tracking-[0.16em] hover:bg-[#d8b56f] transition-all shadow-[0_0_30px_rgba(198,161,91,0.25)] hover:-translate-y-0.5"
          >
            Apply as Founder
          </button>

          <button
            onClick={() => onOpenApply("investor")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1C1C20] border border-white/15 text-[#F4F1EA] text-xs font-mono uppercase tracking-[0.16em] hover:bg-[#26262B] transition-all hover:-translate-y-0.5"
          >
            Apply as Investor
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#8A8780] pt-4">
          Season 1 Cohort Admission Open · Dubai & GCC
        </div>
      </div>
    </section>
  );
}


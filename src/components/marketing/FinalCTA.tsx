"use client";

import React from "react";
import { LogoMark } from "../brand/LogoMark";
import { Reveal } from "./Reveal";

interface FinalCTAProps {
  onOpenApply: (role: "founder" | "investor") => void;
}

export function FinalCTA({ onOpenApply }: FinalCTAProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0e0e11] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C6A15B]/5 rounded-full blur-[140px] pointer-events-none" />
      <Reveal className="max-w-3xl mx-auto text-center relative z-10">
        <span className="animate-lens inline-flex justify-center p-4 rounded-2xl bg-[#141417] border border-white/10 mb-6">
          <LogoMark size={44} lensGlow={true} />
        </span>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F4F1EA] tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Enter the room where deals actually happen.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#8A8780] max-w-xl mx-auto leading-relaxed">
          Every member is verified before they enter. Every meeting is worth the time.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={() => onOpenApply("founder")}
            className="btn-gold w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#d8b56f] transition-all hover:-translate-y-0.5 shadow-[0_0_30px_rgba(198,161,91,0.25)]"
          >
            Apply as Founder
          </button>
          <button
            onClick={() => onOpenApply("investor")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1C1C20] border border-white/15 text-[#F4F1EA] text-xs uppercase tracking-[0.16em] hover:bg-[#26262B] transition-all hover:-translate-y-0.5"
          >
            Apply as Investor
          </button>
        </div>
        <p className="text-[11px] text-[#8A8780] mt-6">Season 1 Cohort Admission Open · Dubai &amp; GCC</p>
      </Reveal>
    </section>
  );
}

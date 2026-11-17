"use client";

import React from "react";
import { RingsBackdrop } from "../brand/RingsBackdrop";
import { MemberPass } from "../brand/MemberPass";
import { VerifiedSeal } from "../brand/VerifiedSeal";

interface HeroProps {
  onOpenApply: (role: "founder" | "investor") => void;
}

export function Hero({ onOpenApply }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background overlapping rings motif */}
      <RingsBackdrop className="top-10 -right-24 sm:-right-40 md:-right-20 lg:right-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text / Value Proposition Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1C1C20] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-ping" />
              <span className="text-[10px] font-mono tracking-[0.26em] uppercase text-[#C6A15B]">
                BY INVITATION ONLY · DUBAI & GCC
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-serif font-normal leading-[1.08] text-[#F4F1EA] tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Where verified investors meet{" "}
              <span className="italic font-normal text-[#C6A15B]">
                exceptional
              </span>{" "}
              founders.
            </h1>

            {/* Signature Gold Rule */}
            <div className="w-16 h-[1.5px] bg-[#C6A15B] mx-auto lg:mx-0 opacity-80" />

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#8A8780] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              <strong className="text-[#F4F1EA] font-medium">
                Infinite Possibilities. Limitless Growth.
              </strong>{" "}
              Every member is vetted before they enter the room. Founders gain
              direct access to authentic GCC capital; investors discover curated
              deal flow while remaining discreet until mutual match.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onOpenApply("founder")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-mono font-semibold uppercase tracking-[0.16em] hover:bg-[#d8b56f] transition-all shadow-[0_0_30px_rgba(198,161,91,0.28)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Apply as Founder
              </button>

              <button
                onClick={() => onOpenApply("investor")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1C1C20] border border-white/15 text-[#F4F1EA] text-xs font-mono uppercase tracking-[0.16em] hover:bg-[#26262B] hover:border-white/25 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Apply as Investor
              </button>
            </div>

            {/* Micro proof counter */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#8A8780] font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[#C6A15B]">✓</span>
                <span>$250M+ Verified Cheque Capacity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C6A15B]">✓</span>
                <span>Strict Pre-Screening</span>
              </div>
            </div>
          </div>

          {/* Right Visual / Pass Display Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Background Glow */}
            <div className="absolute w-72 h-72 bg-[#C6A15B]/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Stacked Showcase Passes */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              {/* Back card (Founder pass tilted) */}
              <div className="absolute -top-6 -right-3 w-full opacity-60 transform rotate-3 scale-95 pointer-events-none transition-transform duration-500">
                <MemberPass
                  role="FOUNDER"
                  name="PayFlow MENA"
                  memberNumber="0088"
                  tier="FOUNDING MEMBER"
                  interactive={false}
                />
              </div>

              {/* Front main card (Investor pass) */}
              <div className="relative z-20">
                <MemberPass
                  role="INVESTOR"
                  name="Tariq Al-Mansoor"
                  memberNumber="0042"
                  tier="VERIFIED INVESTOR"
                  interactive={true}
                />
              </div>

              {/* Verified Seal Floating Pill */}
              <div className="absolute -bottom-6 -left-4 z-30 p-2 rounded-2xl bg-[#0B0B0D]/90 border border-white/10 backdrop-blur-md shadow-xl flex items-center gap-3">
                <VerifiedSeal size={52} glow={true} />
                <div className="pr-3">
                  <div className="text-[10px] font-mono tracking-wider uppercase text-[#C6A15B]">
                    VERIFIED SEAL
                  </div>
                  <div className="text-xs text-[#F4F1EA] font-medium">
                    Manual Committee Vetting
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

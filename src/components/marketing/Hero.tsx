"use client";

import React from "react";
import { RingsBackdrop } from "../brand/RingsBackdrop";
import { MemberPass } from "../brand/MemberPass";
import { VerifiedSeal } from "../brand/VerifiedSeal";
import { Reveal } from "./Reveal";

interface HeroProps {
  onOpenApply: (role: "founder" | "investor") => void;
}

export function Hero({ onOpenApply }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="animate-rings">
        <RingsBackdrop className="top-10 -right-24 sm:-right-40 md:-right-20 lg:right-0" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <Reveal className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1C1C20] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
              <span className="text-[10px] tracking-[0.26em] uppercase text-[#C6A15B]">
                By invitation only · Dubai &amp; GCC
              </span>
            </div>

            <h1
              className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-serif leading-[1.08] text-[#F4F1EA] tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Where verified investors meet{" "}
              <span className="italic text-[#C6A15B]">exceptional</span> founders.
            </h1>

            <div className="rule-draw w-16 h-[1.5px] bg-[#C6A15B] mx-auto lg:mx-0 mt-7 opacity-80" />

            <p className="mt-6 text-base sm:text-lg text-[#8A8780] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <strong className="text-[#F4F1EA] font-medium">
                Infinite Possibilities. Limitless Growth.
              </strong>{" "}
              Every member is vetted before they enter the room.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onOpenApply("founder")}
                className="btn-gold w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#d8b56f] transition-all hover:-translate-y-0.5 shadow-[0_0_30px_rgba(198,161,91,0.28)]"
              >
                Apply as Founder
              </button>
              <button
                onClick={() => onOpenApply("investor")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1C1C20] border border-white/15 text-[#F4F1EA] text-xs uppercase tracking-[0.16em] hover:bg-[#26262B] hover:border-white/25 transition-all hover:-translate-y-0.5"
              >
                Apply as Investor
              </button>
            </div>

            <p className="mt-7 text-xs text-[#8A8780] tracking-wide flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1">
              <span><span className="text-[#C6A15B]">✓</span> $250M+ Verified Cheque Capacity</span>
              <span className="text-white/15" aria-hidden="true">·</span>
              <span><span className="text-[#C6A15B]">✓</span> Strict Pre-Screening</span>
            </p>
          </Reveal>

          <Reveal delay={180} className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute w-72 h-72 bg-[#C6A15B]/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              <div className="absolute -top-6 -right-3 w-full opacity-60 rotate-3 scale-95 pointer-events-none">
                <MemberPass
                  role="FOUNDER"
                  name="PayFlow MENA"
                  memberNumber="0088"
                  tier="FOUNDING MEMBER"
                  interactive={false}
                />
              </div>
              <div className="relative z-20 animate-float">
                <MemberPass
                  role="INVESTOR"
                  name="Tariq Al-Mansoor"
                  memberNumber="0042"
                  tier="VERIFIED INVESTOR"
                  interactive={true}
                />
              </div>
              <div className="animate-float-slow absolute -bottom-4 sm:-bottom-6 left-0 sm:-left-4 z-30 p-2 rounded-2xl bg-[#0B0B0D]/90 border border-white/10 backdrop-blur-md shadow-xl flex items-center gap-3">
                <span className="animate-lens inline-flex">
                  <VerifiedSeal size={52} glow={true} />
                </span>
                <div className="pr-3">
                  <div className="text-[10px] tracking-wider uppercase text-[#C6A15B]">Verified Seal</div>
                  <div className="text-xs text-[#F4F1EA] font-medium">Manual Committee Vetting</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

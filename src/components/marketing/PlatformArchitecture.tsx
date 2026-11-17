"use client";

import React, { useState } from "react";
import { LogoMark } from "../brand/LogoMark";
import { VerifiedSeal } from "../brand/VerifiedSeal";
import { Reveal, Eyebrow } from "./Reveal";

const STARTUPS = [
  {
    name: "PayFlow MENA",
    meta: "Fintech · Seed · Dubai (DIFC)",
    raising: "$1.8M",
    tagline: "Multi-currency treasury and FX settlement for GCC enterprises.",
    traction: "$52,000 MRR · 32% MoM · 6 enterprise clients",
  },
  {
    name: "Aura Logistics",
    meta: "Enterprise AI · Series A · Riyadh & Abu Dhabi",
    raising: "$4.5M",
    tagline: "Autonomous yard and customs-clearance AI for Gulf ports.",
    traction: "$180,000 ARR · 14 ports onboarded",
  },
];

const INVESTORS = [
  {
    handle: "Investor · No. 0042",
    type: "Angel Syndicate Lead",
    headline: "Former fintech founder · Active GCC angel",
    ticket: "$100k – $300k",
    meta: "UAE, KSA, Qatar · Seed · 12 investments",
    revealed: "Rashid Al-Husseini · Founding Partner, Oryx Capital",
  },
  {
    handle: "Investor · No. 0118",
    type: "Family Office Principal",
    headline: "Gulf single family office · Tech & logistics",
    ticket: "$500k – $2.0M",
    meta: "KSA, UAE, Bahrain · Seed–Series A · 20+ investments",
    revealed: "Sheikha Maryam Al-Sabah · Director, Al-Sabah Investment Group",
  },
];

const PRINCIPLES = [
  { n: "01", title: "Discreet by design", text: "Investors stay anonymous until mutual interest." },
  { n: "02", title: "Deck gated by founder", text: "Pitch materials unlock only on a verified match." },
  { n: "03", title: "5 intros a week", text: "Founders are capped — every request is deliberate." },
];

export function PlatformArchitecture() {
  const [view, setView] = useState<"investor" | "founder">("investor");
  const [index, setIndex] = useState(0);
  const [matched, setMatched] = useState(false);

  const startup = STARTUPS[index % STARTUPS.length];
  const investor = INVESTORS[index % INVESTORS.length];

  const pass = () => {
    setIndex((i) => i + 1);
    setMatched(false);
  };
  const express = () => setMatched(true);

  return (
    <section id="platform" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0e0e11] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow>04 — Platform Architecture</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            How dealmaking actually happens
          </h2>
          <p className="mt-3 text-sm text-[#8A8780] leading-relaxed">
            Try it — one card, one decision. This is the whole protocol.
          </p>
          <div className="inline-flex items-center p-1.5 rounded-xl bg-[#141417] border border-white/10 mt-7">
            <button
              onClick={() => { setView("investor"); setMatched(false); }}
              className={`px-4 sm:px-6 py-2 text-xs uppercase tracking-wider rounded-lg transition-all ${view === "investor" ? "bg-[#C6A15B] text-[#0B0B0D] font-semibold" : "text-[#8A8780] hover:text-[#F4F1EA]"}`}
            >
              Investor view
            </button>
            <button
              onClick={() => { setView("founder"); setMatched(false); }}
              className={`px-4 sm:px-6 py-2 text-xs uppercase tracking-wider rounded-lg transition-all ${view === "founder" ? "bg-[#C6A15B] text-[#0B0B0D] font-semibold" : "text-[#8A8780] hover:text-[#F4F1EA]"}`}
            >
              Founder view
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative max-w-xl mx-auto rounded-2xl bg-gradient-to-b from-[#18181C] to-[#101013] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <LogoMark size={22} />
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#8A8780]">
                  {view === "investor" ? "Verified startup profile" : "Discreet investor profile"}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#C6A15B]">● Verified</span>
            </div>

            <div key={`${view}-${index}`} className="animate-match py-6">
              {view === "investor" ? (
                <>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#F4F1EA]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{startup.name}</h3>
                      <p className="text-xs text-[#C6A15B] mt-1">{startup.meta}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] uppercase text-[#8A8780]">Raising</div>
                      <div className="text-base font-medium text-[#F4F1EA]">{startup.raising}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#F4F1EA]/80 leading-relaxed mb-5">{startup.tagline}</p>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] uppercase tracking-wider text-[#8A8780] mb-1">Verified traction</div>
                    <div className="text-xs sm:text-sm font-medium text-[#F4F1EA]">{startup.traction}</div>
                  </div>
                  <p className="mt-5 text-xs text-[#8A8780]">Full pitch deck unlocks on mutual match.</p>
                </>
              ) : (
                <>
                  <div className="inline-flex px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase text-[#8A8780] mb-2">{investor.type}</div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#F4F1EA]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                    {matched ? investor.revealed : investor.handle}
                  </h3>
                  <p className="mt-3 text-sm text-[#F4F1EA] font-medium">“{investor.headline}”</p>
                  <p className="mt-4 text-xs text-[#8A8780] leading-relaxed">{investor.meta}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[10px] uppercase text-[#8A8780]">Typical cheque</span>
                    <span className="text-base font-medium text-[#C6A15B]">{investor.ticket}</span>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-4">
              <button onClick={pass} className="px-5 py-2.5 rounded-xl border border-white/10 text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] hover:border-white/20 transition-all">
                Pass
              </button>
              <button onClick={express} className="btn-gold flex-1 py-2.5 px-6 rounded-xl bg-[#C6A15B] text-[#0B0B0D] font-semibold text-xs uppercase tracking-wider hover:bg-[#d4b069] transition-all">
                {view === "investor" ? "Express Interest" : "Request Introduction"}
              </button>
            </div>

            {matched && (
              <div className="animate-match absolute inset-0 z-30 bg-[#0B0B0D]/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center">
                <span className="animate-lens inline-flex mb-4"><VerifiedSeal size={84} glow={true} /></span>
                <div className="text-[10px] tracking-[0.28em] uppercase text-[#C6A15B] mb-1">Sigma 8 Moment</div>
                <h4 className="text-2xl sm:text-3xl font-serif text-[#F4F1EA] mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>A Verified Match.</h4>
                <p className="text-xs sm:text-sm text-[#8A8780] max-w-sm mb-6">Identity revealed, deck unlocked, direct chat now active.</p>
                <button onClick={pass} className="px-5 py-2 rounded-lg bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider hover:bg-[#d8b56f] transition-colors">
                  Next Candidate
                </button>
              </div>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={i * 120}>
              <div className="p-5 rounded-2xl bg-[#141417] border border-white/5 hover:border-[#C6A15B]/30 transition-colors">
                <div className="text-[10px] uppercase tracking-wider text-[#C6A15B] mb-2">{p.n}</div>
                <h4 className="text-sm font-medium text-[#F4F1EA] mb-1">{p.title}</h4>
                <p className="text-xs text-[#8A8780] leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

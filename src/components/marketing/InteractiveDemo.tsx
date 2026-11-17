"use client";

import React, { useState } from "react";
import { LogoMark } from "../brand/LogoMark";
import { VerifiedSeal } from "../brand/VerifiedSeal";

export function InteractiveDemo() {
  const [viewMode, setViewMode] = useState<"founder" | "investor">("investor");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [matched, setMatched] = useState(false);
  const [revealedInvestor, setRevealedInvestor] = useState(false);

  // Sample Startups (seen by Investors)
  const startups = [
    {
      id: "s1",
      name: "PayFlow MENA",
      tagline: "Automated multi-currency treasury and FX settlement for GCC enterprises.",
      sector: "Fintech",
      stage: "Seed",
      hq: "Dubai (DIFC)",
      raising: "$1.8M",
      traction: "$52,000 MRR · 32% MoM · 6 Enterprise Clients",
      verified: true,
      deckAvailableOnMatch: true,
    },
    {
      id: "s2",
      name: "Aura Logistics",
      tagline: "Autonomous yard and cross-border customs clearance AI for Gulf ports.",
      sector: "Enterprise AI",
      stage: "Series A",
      hq: "Riyadh & Abu Dhabi",
      raising: "$4.5M",
      traction: "$180,000 ARR · 14 Ports Onboarded",
      verified: true,
      deckAvailableOnMatch: true,
    },
    {
      id: "s3",
      name: "Qahwa BioHealth",
      tagline: "Preventative metabolic health tracking integrated with regional clinical labs.",
      sector: "HealthTech",
      stage: "Seed",
      hq: "Doha & Dubai",
      raising: "$1.2M",
      traction: "4,200 Active Patients · 4 Clinic Partnerships",
      verified: true,
      deckAvailableOnMatch: true,
    },
  ];

  // Sample Investors (seen by Founders - discreet anonymous cards until match)
  const investors = [
    {
      id: "inv1",
      handle: "Investor · No. 0042",
      type: "Angel Syndicate Lead",
      headline: "Former Fintech Founder (Exited $120M) · Active GCC Angel",
      bio: "Investing early in GCC B2B payments, infrastructure, and cross-border settlement. Cheques backed by deep operator experience.",
      ticket: "$100k – $300k",
      stages: ["Seed", "Pre-Seed"],
      geo: "UAE, KSA, Qatar",
      dealCount: "12 investments",
      verified: true,
      // Private layer revealed on match:
      privateName: "Rashid Al-Husseini",
      privateFirm: "Oryx Capital Partners / Ex-Founder PayLink",
      privateTitle: "Founding Partner",
    },
    {
      id: "inv2",
      handle: "Investor · No. 0118",
      type: "Family Office Principal",
      headline: "Leading Gulf Single Family Office · Tech & Logistics Allocation",
      bio: "Providing catalytic growth capital for supply chain, enterprise automation, and deep tech with expansion potential across Saudi Arabia.",
      ticket: "$500k – $2.0M",
      stages: ["Seed", "Series A"],
      geo: "KSA, UAE, Bahrain",
      dealCount: "20+ investments",
      verified: true,
      // Private layer revealed on match:
      privateName: "Sheikha Maryam Al-Sabah",
      privateFirm: "Al-Sabah Investment Group",
      privateTitle: "Director of Alternative Assets",
    },
  ];

  const currentStartup = startups[activeCardIndex % startups.length];
  const currentInvestor = investors[activeCardIndex % investors.length];

  const handleAction = (action: "interest" | "pass") => {
    if (action === "interest") {
      setMatched(true);
      setRevealedInvestor(true);
    } else {
      setActiveCardIndex((prev) => prev + 1);
      setMatched(false);
      setRevealedInvestor(false);
    }
  };

  const resetMatch = () => {
    setMatched(false);
    setRevealedInvestor(false);
    setActiveCardIndex((prev) => prev + 1);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-[#0e0e11] overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A15B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#C6A15B]">
              05 — Live Platform Architecture
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            How Dealmaking Actually Happens
          </h2>

          <p className="text-sm sm:text-base text-[#8A8780] leading-relaxed font-sans">
            Founders showcase prominent traction without leaking cap tables.
            Investors remain entirely confidential until both parties express
            mutual interest. Try the interactive simulator below.
          </p>

          {/* Perspective Selector */}
          <div className="inline-flex items-center p-1.5 rounded-xl bg-[#141417] border border-white/10 mt-6 shadow-inner">
            <button
              onClick={() => {
                setViewMode("investor");
                setMatched(false);
                setRevealedInvestor(false);
              }}
              className={`px-4 sm:px-6 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                viewMode === "investor"
                  ? "bg-[#C6A15B] text-[#0B0B0D] font-bold shadow-md"
                  : "text-[#8A8780] hover:text-[#F4F1EA]"
              }`}
            >
              Investor Perspective (Discover Startups)
            </button>
            <button
              onClick={() => {
                setViewMode("founder");
                setMatched(false);
                setRevealedInvestor(false);
              }}
              className={`px-4 sm:px-6 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                viewMode === "founder"
                  ? "bg-[#C6A15B] text-[#0B0B0D] font-bold shadow-md"
                  : "text-[#8A8780] hover:text-[#F4F1EA]"
              }`}
            >
              Founder Perspective (Discreet Investors)
            </button>
          </div>
        </div>

        {/* Simulator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Card Presentation Canvas (8 columns) */}
          <div className="lg:col-span-8 flex justify-center">
            <div className="relative w-full max-w-xl min-h-[480px] rounded-2xl bg-gradient-to-b from-[#18181C] to-[#101013] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
              {/* Card Header Status */}
              <div className="flex items-center justify-between pb-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <LogoMark size={22} />
                  <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#8A8780]">
                    {viewMode === "investor"
                      ? "VERIFIED STARTUP PROFILE"
                      : "DISCREET INVESTOR PROFILE"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A15B]">
                    VERIFIED TIER
                  </span>
                </div>
              </div>

              {/* Dynamic Content depending on view mode */}
              <div className="py-6 flex-1">
                {viewMode === "investor" ? (
                  /* Investor looking at Startup */
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3
                          className="text-2xl sm:text-3xl font-serif text-[#F4F1EA]"
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                          }}
                        >
                          {currentStartup.name}
                        </h3>
                        <p className="text-xs text-[#C6A15B] font-mono mt-0.5">
                          {currentStartup.sector} · {currentStartup.stage} · {currentStartup.hq}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-[#8A8780] uppercase">
                          Raising Target
                        </div>
                        <div className="text-base sm:text-lg font-mono font-medium text-[#F4F1EA]">
                          {currentStartup.raising}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-[#F4F1EA]/80 leading-relaxed font-sans mb-6">
                      {currentStartup.tagline}
                    </p>

                    {/* Traction Highlight Bar */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#8A8780] mb-1">
                        Verified Traction Metrics
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-[#F4F1EA]">
                        {currentStartup.traction}
                      </div>
                    </div>

                    {/* Deck lock indicator */}
                    <div className="flex items-center gap-2 text-xs text-[#8A8780] font-mono">
                      <svg
                        className="w-4 h-4 text-[#C6A15B]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Full 14-page Institutional Pitch Deck unlocked upon mutual
                      match.
                    </div>
                  </div>
                ) : (
                  /* Founder looking at Investor */
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#8A8780] uppercase mb-1">
                          {currentInvestor.type}
                        </div>
                        <h3
                          className="text-2xl sm:text-3xl font-serif text-[#F4F1EA]"
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                          }}
                        >
                          {revealedInvestor
                            ? currentInvestor.privateName
                            : currentInvestor.handle}
                        </h3>
                        {revealedInvestor && (
                          <p className="text-xs text-[#C6A15B] font-mono mt-1">
                            {currentInvestor.privateTitle} · {currentInvestor.privateFirm}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] font-mono text-[#8A8780] uppercase">
                          Typical Cheque
                        </div>
                        <div className="text-base sm:text-lg font-mono font-medium text-[#C6A15B]">
                          {currentInvestor.ticket}
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 mb-4">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#C6A15B] mb-1">
                        Anonymous Operator Thesis
                      </div>
                      <p className="text-xs text-[#F4F1EA] font-medium leading-relaxed">
                        &quot;{currentInvestor.headline}&quot;
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#8A8780] leading-relaxed mb-4">
                      {currentInvestor.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#8A8780]">
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/5">
                        Focus: {currentInvestor.geo}
                      </span>
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/5">
                        Stages: {currentInvestor.stages.join(", ")}
                      </span>
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/5">
                        Track: {currentInvestor.dealCount}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                <button
                  onClick={() => handleAction("pass")}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-mono uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] hover:border-white/20 transition-all"
                >
                  ✕ Pass
                </button>

                <button
                  onClick={() => handleAction("interest")}
                  className="flex-1 py-2.5 px-6 rounded-xl bg-[#C6A15B] text-[#0B0B0D] font-semibold text-xs font-mono uppercase tracking-wider hover:bg-[#d4b069] transition-all shadow-lg shadow-[#C6A15B]/20 flex items-center justify-center gap-2"
                >
                  <span>◎</span>
                  {viewMode === "investor" ? "Express Interest" : "Request Introduction"}
                </button>
              </div>

              {/* Match Moment Overlay */}
              {matched && (
                <div className="absolute inset-0 z-30 bg-[#0B0B0D]/95 backdrop-blur-md p-6 sm:p-8 flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="mb-4">
                    <VerifiedSeal size={100} glow={true} />
                  </div>

                  <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#C6A15B] mb-1">
                    SIGMA 8 MOMENT
                  </div>

                  <h4
                    className="text-2xl sm:text-3xl font-serif text-[#F4F1EA] mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                    }}
                  >
                    A Verified Match.
                  </h4>

                  <p className="text-xs sm:text-sm text-[#8A8780] max-w-sm mb-6 font-sans">
                    Both parties have confirmed alignment. Investor identity is
                    revealed, data room unlocked, and direct encrypted chat is
                    now active.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={resetMatch}
                      className="px-5 py-2 rounded-lg bg-[#C6A15B] text-[#0B0B0D] text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#d8b56f] transition-colors"
                    >
                      Next Candidate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Architecture Explainer Sidebar (4 columns) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-[#141417] border border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#C6A15B] mb-2">
                01 — Strict Asymmetry
              </div>
              <h4 className="text-base font-medium text-[#F4F1EA] mb-1.5">
                Investors Stay Completely Discreet
              </h4>
              <p className="text-xs text-[#8A8780] leading-relaxed">
                Family offices and partners avoid spam and cold pitches.
                Founders only see verified cheque size, track record, and
                thesis until mutual approval.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141417] border border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#C6A15B] mb-2">
                02 — Guarded Materials
              </div>
              <h4 className="text-base font-medium text-[#F4F1EA] mb-1.5">
                Full Deck Access Gated by Founder
              </h4>
              <p className="text-xs text-[#8A8780] leading-relaxed">
                Founders keep pitch decks, financial models, and customer names
                strictly private until an investor expresses confirmed interest.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141417] border border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#C6A15B] mb-2">
                03 — Quality Quota
              </div>
              <h4 className="text-base font-medium text-[#F4F1EA] mb-1.5">
                Max 5 Introductions Per Week
              </h4>
              <p className="text-xs text-[#8A8780] leading-relaxed">
                Founders are limited to 5 curated intros per rolling 7 days.
                Every outreach is deliberate, considered, and worth the
                recipient&apos;s time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

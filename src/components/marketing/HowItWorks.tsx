"use client";

import React from "react";

export function HowItWorks() {
  const steps = [
    {
      numeral: "I",
      title: "Apply by Invitation",
      description:
        "Founders share vetted traction, stage, and pitch materials. Investors submit ticket size, thesis, and verifiable track record.",
      tag: "5-Min Vetted Form",
    },
    {
      numeral: "II",
      title: "Committee Verification",
      description:
        "Every application is personally reviewed by the Sigma 8 committee in Dubai. Accredited status and corporate metrics are authenticated.",
      tag: "48-Hour SLA",
    },
    {
      numeral: "III",
      title: "Curated Discovery",
      description:
        "Approved investors browse prominent startup profiles. Founders discover anonymous investor cards showing verifiable cheque capacity and thesis.",
      tag: "Discreet by Design",
    },
    {
      numeral: "IV",
      title: "Mutual Match",
      description:
        "When an investor and founder both express interest, a verified match is formed. The investor's identity and firm are instantly revealed.",
      tag: "Data Room Unlocks",
    },
    {
      numeral: "V",
      title: "Direct Connection",
      description:
        "Encrypted chat unlocks. Founders and investors schedule direct partner meetings in Dubai or Riyadh without broker commissions.",
      tag: "Zero Intermediaries",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Eyebrow and Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C20] border border-white/10 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
          <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#C6A15B]">
            01 — How It Works
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight mb-4"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          From Invitation to Verified Allocation
        </h2>

        <p className="text-sm sm:text-base text-[#8A8780] font-sans leading-relaxed">
          Sigma 8 replaces unsolicited spam, cold LinkedIn outreach, and
          unqualified pitches with a refined, confidential protocol.
        </p>
      </div>

      {/* 5-Step Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#141417] border border-white/5 flex flex-col justify-between hover:border-[#C6A15B]/30 hover:bg-[#18181D] transition-all group duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-2xl text-[#C6A15B] font-light group-hover:scale-110 transition-transform inline-block">
                  {step.numeral}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#8A8780] px-2 py-0.5 rounded bg-white/5">
                  {step.tag}
                </span>
              </div>

              <h3
                className="text-lg font-serif text-[#F4F1EA] mb-2"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {step.title}
              </h3>

              <p className="text-xs text-[#8A8780] font-sans leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="w-full h-0.5 bg-white/5 mt-6 group-hover:bg-[#C6A15B]/50 transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
}


"use client";

import React, { useState } from "react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Who is eligible to join Sigma 8?",
      answer:
        "Membership is strictly invitation-only. We admit high-growth founders with proven traction (revenue, enterprise pilots, or credible technical milestones) and accredited investors (single/multi family offices, angel syndicate leads, and institutional VCs) actively allocating capital in Dubai and the wider GCC.",
    },
    {
      question: "How does the manual verification process work?",
      answer:
        "After submitting your application, our Dubai-based admissions committee conducts a discrete authentication check. For investors, we verify track record and cheque-writing capability. For founders, we verify company registration, traction data, and cap table sanity. Turnaround is typically 48 hours.",
    },
    {
      question: "How is investor identity kept private?",
      answer:
        "Investor profiles are split into a public anonymous layer and a private revealed layer. In the public directory, founders only see an anonymous handle (e.g. 'Investor No. 0042'), sector focus, stages, and ticket range. Personal names, fund names, websites, and direct contacts are only revealed when the investor accepts a mutual match.",
    },
    {
      question: "Is Sigma 8 a broker or investment bank?",
      answer:
        "No. Sigma 8 is an invitation-only networking and matchmaking platform. We do not provide financial advice, broker securities transactions, hold escrow funds, or take a percentage/carry on deals. Any transactions or agreements occur independently between matched members.",
    },
    {
      question: "What does membership cost?",
      answer:
        "During Season 1 (Founding Cohort), approved members are admitted with zero upfront listing fees. A nominal membership subscription may apply to future cohorts to preserve network density and fund private member events.",
    },
    {
      question: "Can founders see other founders' startups?",
      answer:
        "No. To prevent competitive intelligence leakage and safeguard confidential traction metrics, founders can only discover accredited investors. Only approved investors can browse startup profiles.",
    },
  ];

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0B0B0D]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C20] border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#C6A15B]">
              07 — Inquiries & Protocols
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Frequently Addressed Questions
          </h2>

          <p className="text-sm sm:text-base text-[#8A8780] font-sans">
            Transparent protocols designed for the high-trust Gulf ecosystem.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#141417] border border-white/5 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span
                    className="font-serif text-lg sm:text-xl text-[#F4F1EA]"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                    }}
                  >
                    {faq.question}
                  </span>
                  <span className="text-sm font-mono text-[#C6A15B] shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#8A8780] leading-relaxed font-sans border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { Reveal, Eyebrow } from "./Reveal";

const FAQS = [
  {
    question: "Who can join Sigma 8?",
    answer:
      "Membership is by application and approval only. Founders with real traction and accredited investors actively allocating capital in Dubai and the wider GCC.",
  },
  {
    question: "How does verification work?",
    answer:
      "The Dubai committee reviews every application — track record and cheque capacity for investors, registration and traction for founders. Typically within 48 hours.",
  },
  {
    question: "How is investor identity kept private?",
    answer:
      "Founders only see an anonymous handle, thesis, stages and ticket range. Name, firm and contact details are revealed only after a mutual match.",
  },
  {
    question: "Is Sigma 8 a broker?",
    answer:
      "No. Sigma 8 is an introduction and matchmaking platform only. It does not hold funds, give investment advice, or arrange deals.",
  },
  {
    question: "What does membership cost?",
    answer:
      "Season 1 founding members are admitted with no upfront listing fees.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-10">
          <Eyebrow>07 — Questions</Eyebrow>
          <h2
            className="font-serif text-3xl sm:text-4xl mt-5"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Frequently addressed questions
          </h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="rounded-xl bg-[#141417] border border-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif text-lg text-[#F4F1EA]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                    {faq.question}
                  </span>
                  <span className="text-sm text-[#C6A15B] shrink-0">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-[#8A8780] leading-relaxed">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

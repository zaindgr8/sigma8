"use client";

import React from "react";
import { Reveal, Eyebrow } from "./Reveal";

const STEPS = [
  { n: "01", title: "Apply", text: "One vetted form. Founders share traction; investors share thesis." },
  { n: "02", title: "Reviewed", text: "Every application is reviewed by the Sigma 8 committee in Dubai." },
  { n: "03", title: "Matched", text: "Mutual interest forms a verified match. Identity and deck unlock." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>01 — How It Works</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            From Invitation to Verified Allocation
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="font-serif text-2xl text-[#C6A15B] mb-2">{s.n}</div>
              <h3
                className="font-serif text-xl text-[#F4F1EA] mb-2"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {s.title}
              </h3>
              <p className="text-sm text-[#8A8780] leading-relaxed">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

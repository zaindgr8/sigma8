"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { FAQ } from "@/components/marketing/FAQ";
import { Footer } from "@/components/marketing/Footer";
import { ApplicationModal } from "@/components/marketing/ApplicationModal";

const STEPS = [
  { n: "01", title: "Apply", text: "One vetted form. Founders share traction; investors share thesis." },
  { n: "02", title: "Reviewed", text: "Every application is reviewed by the Sigma 8 committee in Dubai." },
  { n: "03", title: "Matched", text: "Mutual interest forms a verified match. Identity and deck unlock." },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<"founder" | "investor">("founder");

  const openApply = (role: "founder" | "investor") => {
    setModalRole(role);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0D] text-[#F4F1EA] flex flex-col">
      <Navbar onOpenApply={openApply} />

      {/* Hero — the only introduction */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-36 pb-24">
        <p className="text-[11px] tracking-[0.26em] uppercase text-[#C6A15B] mb-6">
          By invitation only · Dubai &amp; GCC
        </p>
        <h1
          className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-3xl"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Where verified investors meet <span className="italic text-[#C6A15B]">exceptional</span> founders.
        </h1>
        <p className="mt-6 text-base text-[#8A8780] max-w-xl leading-relaxed">
          Infinite Possibilities. Limitless Growth. Every member is vetted before they enter the room.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => openApply("founder")}
            className="px-7 py-3.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#d8b56f] transition-colors"
          >
            Apply as Founder
          </button>
          <button
            onClick={() => openApply("investor")}
            className="px-7 py-3.5 rounded-full bg-[#1C1C20] border border-white/15 text-[#F4F1EA] text-xs uppercase tracking-[0.16em] hover:bg-[#26262B] transition-colors"
          >
            Apply as Investor
          </button>
        </div>
      </section>

      {/* How it works — three lines */}
      <section id="how-it-works" className="px-6 py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">
          {STEPS.map((s) => (
            <div key={s.n}>
              <div className="font-serif text-2xl text-[#C6A15B] mb-2">{s.n}</div>
              <h2 className="font-serif text-xl mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                {s.title}
              </h2>
              <p className="text-sm text-[#8A8780] leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <FAQ />
      <Footer />

      <ApplicationModal isOpen={modalOpen} initialRole={modalRole} onClose={() => setModalOpen(false)} />
    </main>
  );
}

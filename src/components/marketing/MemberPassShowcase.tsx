"use client";

import React, { useState } from "react";
import { MemberPass } from "../brand/MemberPass";
import { VerifiedSeal } from "../brand/VerifiedSeal";
import { Reveal, Eyebrow } from "./Reveal";

export function MemberPassShowcase() {
  const [role, setRole] = useState<"INVESTOR" | "FOUNDER">("INVESTOR");

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0e0e11] overflow-hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Eyebrow>06 — Membership Artifact</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Your membership, authenticated.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8A8780] leading-relaxed max-w-md">
            On approval, each member receives a numbered Member Pass — physical and digital — sealed
            by the committee.
          </p>
          <div className="mt-7 inline-flex p-1 rounded-xl bg-[#141417] border border-white/10">
            <button
              onClick={() => setRole("INVESTOR")}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-lg transition-all ${role === "INVESTOR" ? "bg-[#C6A15B] text-[#0B0B0D] font-semibold" : "text-[#8A8780] hover:text-[#F4F1EA]"}`}
            >
              Investor Pass
            </button>
            <button
              onClick={() => setRole("FOUNDER")}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-lg transition-all ${role === "FOUNDER" ? "bg-[#C6A15B] text-[#0B0B0D] font-semibold" : "text-[#8A8780] hover:text-[#F4F1EA]"}`}
            >
              Founder Pass
            </button>
          </div>
          <p className="mt-6 text-xs text-[#8A8780] leading-relaxed">
            <span className="text-[#C6A15B]">✦</span> Individual numbered sequence ·{" "}
            <span className="text-[#C6A15B]">✦</span> Committee seal ·{" "}
            <span className="text-[#C6A15B]">✦</span> Access to the Sigma Table in Dubai
          </p>
        </Reveal>
        <Reveal delay={150} className="flex flex-col items-center justify-center relative">
          <div className="absolute w-80 h-80 bg-[#C6A15B]/10 rounded-full blur-[100px] pointer-events-none" />
          <div key={role} className="animate-match relative z-10 w-full max-w-md">
            <MemberPass
              role={role}
              name={role === "INVESTOR" ? "Tariq Al-Mansoor" : "PayFlow MENA"}
              memberNumber={role === "INVESTOR" ? "0042" : "0088"}
              tier={role === "INVESTOR" ? "VERIFIED INVESTOR" : "FOUNDING MEMBER"}
            />
          </div>
          <div className="mt-8 flex items-center gap-4 p-3 rounded-2xl bg-[#141417] border border-white/5 max-w-xs w-full relative z-10">
            <VerifiedSeal size={56} glow={true} />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#C6A15B]">Accreditation Seal</div>
              <div className="text-xs text-[#F4F1EA] font-medium">Verified Liquidity &amp; Track</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

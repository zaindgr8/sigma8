"use client";

import React, { useState } from "react";
import { MemberPass } from "../brand/MemberPass";
import { VerifiedSeal } from "../brand/VerifiedSeal";

export function MemberPassShowcase() {
  const [selectedRole, setSelectedRole] = useState<"INVESTOR" | "FOUNDER">("INVESTOR");

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0e0e11] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C20] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
              <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#C6A15B]">
                06 — Membership Artifact
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4F1EA] tracking-tight leading-[1.15]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Your Membership, Authenticated.
            </h2>

            <p className="text-sm sm:text-base text-[#8A8780] font-sans leading-relaxed">
              Upon approval by the Sigma 8 committee, each member is minted an
              exclusive physical and cryptographic digital Member Pass. Your
              member sequence number and verified accreditation unlock the
              entire private ecosystem.
            </p>

            {/* Toggle Pass Role */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A8780]">
                Preview:
              </span>
              <div className="inline-flex p-1 rounded-xl bg-[#141417] border border-white/10">
                <button
                  onClick={() => setSelectedRole("INVESTOR")}
                  className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                    selectedRole === "INVESTOR"
                      ? "bg-[#C6A15B] text-[#0B0B0D] font-bold"
                      : "text-[#8A8780] hover:text-[#F4F1EA]"
                  }`}
                >
                  Investor Pass
                </button>
                <button
                  onClick={() => setSelectedRole("FOUNDER")}
                  className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                    selectedRole === "FOUNDER"
                      ? "bg-[#C6A15B] text-[#0B0B0D] font-bold"
                      : "text-[#8A8780] hover:text-[#F4F1EA]"
                  }`}
                >
                  Founder Pass
                </button>
              </div>
            </div>

            {/* Verification attributes */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-xs text-[#8A8780]">
                <span className="text-[#C6A15B]">✦</span>
                <span>Individual numbered sequence (e.g. No. 0042)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#8A8780]">
                <span className="text-[#C6A15B]">✦</span>
                <span>Cryptographic seal authenticated on DIFC / UAE data nodes</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#8A8780]">
                <span className="text-[#C6A15B]">✦</span>
                <span>Access to private quarterly Sigma Table dinners in Dubai</span>
              </div>
            </div>
          </div>

          {/* Right Column Pass Display */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="absolute w-80 h-80 bg-[#C6A15B]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
              <MemberPass
                role={selectedRole}
                name={
                  selectedRole === "INVESTOR"
                    ? "Tariq Al-Mansoor"
                    : "PayFlow MENA / Sarah Al-Zahra"
                }
                memberNumber={selectedRole === "INVESTOR" ? "0042" : "0088"}
                tier={
                  selectedRole === "INVESTOR"
                    ? "VERIFIED INVESTOR"
                    : "FOUNDING MEMBER"
                }
              />
            </div>

            <div className="mt-8 flex items-center gap-4 p-3 rounded-2xl bg-[#141417] border border-white/5 max-w-xs w-full">
              <VerifiedSeal size={56} glow={true} />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#C6A15B]">
                  ACCREDITATION SEAL
                </div>
                <div className="text-xs text-[#F4F1EA] font-medium">
                  Verified Liquidity & Track
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

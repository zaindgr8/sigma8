"use client";

import React from "react";
import { LogoMark } from "./LogoMark";

interface MemberPassProps {
  memberNumber?: string;
  name?: string;
  role?: "INVESTOR" | "FOUNDER";
  tier?: string;
  sinceYear?: string;
  className?: string;
  interactive?: boolean;
}

export function MemberPass({
  memberNumber = "0042",
  name = "Tariq Al-Mansoor",
  role = "INVESTOR",
  tier = "VERIFIED MEMBER",
  sinceYear = "2026",
  className = "",
  interactive = true,
}: MemberPassProps) {
  return (
    <div
      className={`relative w-full max-w-[360px] sm:max-w-[400px] aspect-[1.586/1] rounded-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 bg-gradient-to-br from-[#1F1F24] via-[#161619] to-[#0D0D0F] border border-white/10 group ${
        interactive ? "hover:border-[#C6A15B]/50 hover:shadow-[0_0_35px_rgba(198,161,91,0.18)] hover:-translate-y-1" : ""
      } ${className}`}
    >
      {/* Background watermark motif */}
      <div className="absolute -right-12 -bottom-16 opacity-10 pointer-events-none transform rotate-12 transition-transform duration-700 group-hover:rotate-6">
        <LogoMark size={220} />
      </div>

      {/* Subtle iridescent hairline sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <LogoMark size={24} />
          <div>
            <span
              className="text-sm tracking-[0.28em] font-serif uppercase text-[#F4F1EA]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              SIGMA 8
            </span>
            <div className="text-[9px] tracking-[0.2em] uppercase text-[#8A8780] font-mono">
              Dubai · GCC
            </div>
          </div>
        </div>

        {/* Verification Status Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/30 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse" />
          <span className="text-[10px] tracking-[0.16em] uppercase font-medium text-[#C6A15B]">
            {tier}
          </span>
        </div>
      </div>

      {/* Middle: Pass Member Details */}
      <div className="relative z-10 my-auto py-2">
        <div className="text-[10px] tracking-[0.24em] uppercase text-[#C6A15B] font-mono mb-1">
          MEMBER · {role}
        </div>
        <div
          className="text-xl sm:text-2xl font-serif text-[#F4F1EA] tracking-wide truncate"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {name}
        </div>
        <div className="text-xs text-[#8A8780] font-sans tracking-wider mt-0.5">
          Verified Private Credentials
        </div>
      </div>

      {/* Bottom Row: Number, Chip & Since */}
      <div className="relative z-10 flex items-end justify-between pt-3 border-t border-white/5">
        <div>
          <div className="text-[9px] tracking-[0.2em] uppercase text-[#8A8780] font-mono">
            MEMBER NO.
          </div>
          <div className="font-mono text-xs sm:text-sm text-[#F4F1EA] tracking-[0.2em]">
            #{memberNumber}
          </div>
        </div>

        <div className="text-right">
          <div className="text-[9px] tracking-[0.2em] uppercase text-[#8A8780] font-mono">
            VALIDATED
          </div>
          <div className="font-mono text-xs text-[#C6A15B] tracking-widest">
            SINCE {sinceYear}
          </div>
        </div>
      </div>
    </div>
  );
}

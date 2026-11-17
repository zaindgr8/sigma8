"use client";

import React from "react";
import { Reveal } from "./Reveal";

const PILLARS = [
  "Every Member Verified",
  "Curated Deal Flow",
  "Equal Footing",
  "Dubai & GCC Focused",
];

export function TrustStrip() {
  return (
    <div className="w-full border-y border-white/5 bg-[#121215] py-6 px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {PILLARS.map((label) => (
          <span key={label} className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
            <span className="text-xs uppercase tracking-[0.18em] text-[#F4F1EA] font-medium">
              {label}
            </span>
          </span>
        ))}
      </Reveal>
    </div>
  );
}

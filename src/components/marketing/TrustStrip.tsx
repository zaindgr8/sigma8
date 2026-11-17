"use client";

import React from "react";

export function TrustStrip() {
  const pillars = [
    {
      label: "Every Member Verified",
      sub: "Identity, cheque capacity, and metrics validated before entry",
    },
    {
      label: "Curated Deal Flow",
      sub: "No spam, no broker intermediaries, only direct relationships",
    },
    {
      label: "Equal Footing",
      sub: "Vision and Capital represented in equal balance",
    },
    {
      label: "Dubai & GCC Focused",
      sub: "Built specifically for founders and family offices in the Gulf",
    },
  ];

  return (
    <div className="w-full border-y border-white/5 bg-[#121215] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {pillars.map((pillar, idx) => (
          <div key={idx} className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#F4F1EA] font-medium">
                {pillar.label}
              </span>
            </div>
            <p className="text-xs text-[#8A8780] font-sans pl-3.5 leading-relaxed">
              {pillar.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

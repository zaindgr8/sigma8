"use client";

import React from "react";
import { LogoMark } from "./LogoMark";

interface LogoHorizontalProps {
  className?: string;
  markSize?: number;
  variant?: "dark" | "light" | "champagne";
  showTagline?: boolean;
}

export function LogoHorizontal({
  className = "",
  markSize = 26,
  variant = "dark",
  showTagline = false,
}: LogoHorizontalProps) {
  const textColor =
    variant === "light"
      ? "text-[#0B0B0D]"
      : variant === "champagne"
      ? "text-[#0B0B0D]"
      : "text-[#F4F1EA]";

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <LogoMark size={markSize} variant={variant} />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`font-serif text-xl sm:text-2xl font-medium tracking-[0.28em] uppercase ${textColor}`}
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            SIGMA 8
          </span>
        </div>
        {showTagline && (
          <span className="text-[9px] tracking-[0.24em] uppercase text-[#8A8780] font-sans">
            Verified GCC Capital × Founders
          </span>
        )}
      </div>
    </div>
  );
}

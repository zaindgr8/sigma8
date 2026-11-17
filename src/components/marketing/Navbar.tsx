"use client";

import React from "react";
import { LogoHorizontal } from "../brand/LogoHorizontal";

interface NavbarProps {
  onOpenApply: (role: "founder" | "investor") => void;
}

export function Navbar({ onOpenApply }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0B0D]/85 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <LogoHorizontal markSize={26} showTagline={false} />
        </a>
        <div className="flex items-center gap-5">
          <a href="/status" className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] transition-colors">
            Check status
          </a>
          <a href="/member" className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] transition-colors">
            Member
          </a>
          <a href="/admin" className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] transition-colors">
            Admin
          </a>
          <button
            onClick={() => onOpenApply("founder")}
            className="px-5 py-2 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider hover:bg-[#d8b56f] transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </header>
  );
}

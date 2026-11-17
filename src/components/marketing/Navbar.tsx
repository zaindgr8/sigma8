"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogoHorizontal } from "../brand/LogoHorizontal";

interface NavbarProps {
  onOpenApply: (role: "founder" | "investor") => void;
}

const LINKS = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#founders", label: "For Founders" },
  { href: "#investors", label: "For Investors" },
  { href: "#philosophy", label: "The Mark" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar({ onOpenApply }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0B0D]/85 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <LogoHorizontal markSize={28} showTagline={false} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-xs uppercase tracking-[0.16em] text-[#8A8780] hover:text-[#F4F1EA] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <a href="/status" className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] transition-colors">Check status</a>
          <a href="/member" className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] transition-colors">Member</a>
          <a href="/admin" className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] transition-colors">Admin</a>
          <button
            onClick={() => onOpenApply("founder")}
            className="btn-gold px-5 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider hover:bg-[#d8b56f] transition-all"
          >
            Apply
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2.5 rounded-lg text-[#8A8780] hover:text-[#F4F1EA] hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pt-3 pb-6 bg-[#101013] border-b border-white/10">
          <div className="flex flex-col space-y-3 pt-2">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] py-3 min-h-[44px] flex items-center">
                {l.label}
              </a>
            ))}
            <a href="/status" onClick={() => setOpen(false)} className="text-xs uppercase tracking-wider text-[#8A8780] py-3 min-h-[44px] flex items-center">Check status</a>
            <a href="/member" onClick={() => setOpen(false)} className="text-xs uppercase tracking-wider text-[#8A8780] py-3 min-h-[44px] flex items-center">Member</a>
            <a href="/admin" onClick={() => setOpen(false)} className="text-xs uppercase tracking-wider text-[#8A8780] py-3 min-h-[44px] flex items-center">Admin</a>
          </div>
          <button
            onClick={() => { setOpen(false); onOpenApply("founder"); }}
            className="w-full mt-4 py-3 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider"
          >
            Apply
          </button>
        </div>
      )}
    </header>
  );
}

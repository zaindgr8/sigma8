"use client";

import React, { useState } from "react";
import { LogoHorizontal } from "../brand/LogoHorizontal";

interface NavbarProps {
  onOpenApply: (role: "founder" | "investor") => void;
}

export function Navbar({ onOpenApply }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0B0D]/85 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Lockup */}
        <a href="#" className="flex items-center">
          <LogoHorizontal markSize={28} showTagline={false} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-xs font-mono uppercase tracking-[0.16em] text-[#8A8780] hover:text-[#F4F1EA] transition-colors"
          >
            How It Works
          </a>
          <a
            href="#founders"
            className="text-xs font-mono uppercase tracking-[0.16em] text-[#8A8780] hover:text-[#F4F1EA] transition-colors"
          >
            For Founders
          </a>
          <a
            href="#investors"
            className="text-xs font-mono uppercase tracking-[0.16em] text-[#8A8780] hover:text-[#F4F1EA] transition-colors"
          >
            For Investors
          </a>
          <a
            href="#philosophy"
            className="text-xs font-mono uppercase tracking-[0.16em] text-[#8A8780] hover:text-[#F4F1EA] transition-colors"
          >
            The Mark
          </a>
          <a
            href="#faq"
            className="text-xs font-mono uppercase tracking-[0.16em] text-[#8A8780] hover:text-[#F4F1EA] transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => onOpenApply("founder")}
            className="text-xs font-mono uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] px-3 py-2 transition-colors"
          >
            Sign In
          </button>

          <button
            onClick={() => onOpenApply("founder")}
            className="px-5 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#d8b56f] transition-all shadow-[0_0_20px_rgba(198,161,91,0.25)]"
          >
            Request Invitation
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#8A8780] hover:text-[#F4F1EA] hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-3 pb-6 bg-[#101013] border-b border-white/10 space-y-4">
          <div className="flex flex-col space-y-3 pt-2">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] py-1"
            >
              How It Works
            </a>
            <a
              href="#founders"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] py-1"
            >
              For Founders
            </a>
            <a
              href="#investors"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] py-1"
            >
              For Investors
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] py-1"
            >
              The Mark
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] py-1"
            >
              FAQ
            </a>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply("founder");
              }}
              className="w-full py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-mono font-semibold uppercase tracking-wider"
            >
              Request Invitation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

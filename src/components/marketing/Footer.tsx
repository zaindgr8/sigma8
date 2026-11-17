"use client";

import React from "react";
import { LogoHorizontal } from "../brand/LogoHorizontal";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#09090B] py-16 px-4 sm:px-6 lg:px-8 text-[#8A8780] font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <LogoHorizontal markSize={26} showTagline={true} />
            <p className="text-xs text-[#8A8780] max-w-sm leading-relaxed">
              The verified matchmaking network between exceptional founders and
              accredited capital across Dubai, Abu Dhabi, Riyadh, and the wider
              GCC.
            </p>
            <div className="text-[11px] font-mono text-[#C6A15B]">
              Registered in Dubai, United Arab Emirates
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            <div className="space-y-3">
              <div className="text-[10px] uppercase tracking-wider text-[#F4F1EA] font-semibold">
                Network
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#how-it-works" className="hover:text-[#F4F1EA] transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#founders" className="hover:text-[#F4F1EA] transition-colors">
                    For Founders
                  </a>
                </li>
                <li>
                  <a href="#investors" className="hover:text-[#F4F1EA] transition-colors">
                    For Investors
                  </a>
                </li>
                <li>
                  <a href="#philosophy" className="hover:text-[#F4F1EA] transition-colors">
                    The Mark
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-[10px] uppercase tracking-wider text-[#F4F1EA] font-semibold">
                Governance
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#faq" className="hover:text-[#F4F1EA] transition-colors">
                    Verification
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#F4F1EA] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#F4F1EA] transition-colors">
                    Terms of Membership
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#F4F1EA] transition-colors">
                    Community Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-[10px] uppercase tracking-wider text-[#F4F1EA] font-semibold">
                Locations
              </div>
              <ul className="space-y-2 text-[#8A8780]">
                <li>Dubai (DIFC)</li>
                <li>Abu Dhabi (ADGM)</li>
                <li>Riyadh (KAFD)</li>
                <li>Doha & Manama</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer (Required by build spec section 11) */}
        <div className="pt-8 border-t border-white/5 space-y-4 text-[11px] text-[#8A8780]/70 leading-relaxed">
          <p>
            <strong>Regulatory Disclosure:</strong> Sigma 8 is an
            invitation-only technology and networking matchmaking platform.
            Sigma 8 is not a registered broker-dealer, investment advisor, or
            crowdfunding portal. Sigma 8 does not hold client funds, manage
            escrow, provide financial or legal advice, or broker investment
            transactions. All deal negotiations and diligence occur
            independently between verified parties.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs">
            <div>
              &copy; {new Date().getFullYear()} Sigma 8 Technologies Ltd. All
              rights reserved.
            </div>
            <div className="text-[10px] font-mono tracking-wider uppercase text-[#C6A15B]">
              Infinite Possibilities · Limitless Growth
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

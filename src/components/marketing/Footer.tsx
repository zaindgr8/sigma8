import React from "react";
import { LogoHorizontal } from "../brand/LogoHorizontal";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#09090B] py-14 px-4 sm:px-6 lg:px-8 text-[#8A8780]">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-3">
            <LogoHorizontal markSize={26} showTagline={true} />
            <p className="text-xs max-w-sm leading-relaxed">
              The verified matchmaking network between exceptional founders and accredited
              capital across Dubai, Abu Dhabi, Riyadh and the wider GCC.
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            <div className="space-y-2.5">
              <div className="text-[10px] uppercase tracking-wider text-[#F4F1EA] font-semibold">Network</div>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="hover:text-[#F4F1EA] transition-colors">How It Works</a></li>
                <li><a href="#founders" className="hover:text-[#F4F1EA] transition-colors">For Founders</a></li>
                <li><a href="#investors" className="hover:text-[#F4F1EA] transition-colors">For Investors</a></li>
                <li><a href="#philosophy" className="hover:text-[#F4F1EA] transition-colors">The Mark</a></li>
              </ul>
            </div>
            <div className="space-y-2.5">
              <div className="text-[10px] uppercase tracking-wider text-[#F4F1EA] font-semibold">Governance</div>
              <ul className="space-y-2">
                <li><a href="#faq" className="hover:text-[#F4F1EA] transition-colors">Verification</a></li>
                <li><a href="#faq" className="hover:text-[#F4F1EA] transition-colors">Privacy</a></li>
                <li><a href="#faq" className="hover:text-[#F4F1EA] transition-colors">Terms of Membership</a></li>
              </ul>
            </div>
            <div className="space-y-2.5">
              <div className="text-[10px] uppercase tracking-wider text-[#F4F1EA] font-semibold">Locations</div>
              <ul className="space-y-2">
                <li>Dubai (DIFC)</li>
                <li>Abu Dhabi (ADGM)</li>
                <li>Riyadh (KAFD)</li>
                <li>Doha &amp; Manama</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-7 border-t border-white/5 space-y-3 text-[11px] leading-relaxed">
          <p>
            <strong className="text-[#8A8780]">Regulatory Disclosure:</strong> Sigma 8 is an
            invitation-only introduction and matchmaking platform. It is not a broker-dealer,
            investment advisor or crowdfunding portal, and does not hold client funds, provide
            financial advice, or broker transactions. Deals are agreed independently between
            verified members.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs">
            <div>© 2026 Sigma 8 Technologies Ltd. All rights reserved.</div>
            <div className="text-[10px] tracking-wider uppercase text-[#C6A15B]">
              Infinite Possibilities · Limitless Growth
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

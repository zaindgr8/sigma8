"use client";

import React, { useState } from "react";
import { LogoMark } from "../brand/LogoMark";
import { VerifiedSeal } from "../brand/VerifiedSeal";

interface ApplicationModalProps {
  isOpen: boolean;
  initialRole?: "founder" | "investor";
  onClose: () => void;
}

export function ApplicationModal({
  isOpen,
  initialRole = "founder",
  onClose,
}: ApplicationModalProps) {
  const [role, setRole] = useState<"founder" | "investor">(initialRole);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: "",
    email: "",
    phone: "",
    country: "United Arab Emirates",
    city: "Dubai",
    linkedin: "",
    title: "",

    // Founder specifics
    startupName: "",
    website: "",
    tagline: "",
    sector: "Fintech",
    stage: "Seed",
    raiseAmount: "$1,500,000",
    revenueBand: "$10k–$50k MRR",
    tractionSummary: "",

    // Investor specifics
    investorType: "Angel",
    firmName: "",
    ticketRange: "$50k – $250k",
    yearsInvesting: "5–10 years",
    anonymousHeadline: "Operator-Angel, ex-Fintech founder",
    anonymousBio: "Backing high-growth B2B SaaS and enterprise fintech across UAE and KSA.",
    accreditationConsent: true,
  });

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#141417] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 z-20 text-[#8A8780] hover:text-[#F4F1EA] p-2 rounded-full hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-white/5 bg-gradient-to-b from-[#1C1C21] to-[#141417]">
          <div className="flex items-center gap-3 mb-2">
            <LogoMark size={24} />
            <span className="text-[11px] font-mono tracking-[0.24em] text-[#C6A15B] uppercase">
              Application for Admission
            </span>
          </div>

          <h3
            className="text-xl sm:text-2xl font-serif text-[#F4F1EA] tracking-wide"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {isSubmitted
              ? "Application Received"
              : `Apply as ${role === "founder" ? "Founder" : "Investor"}`}
          </h3>

          {!isSubmitted && (
            <div className="flex items-center justify-between mt-4">
              {/* Role Toggle */}
              <div className="inline-flex p-1 rounded-lg bg-black/40 border border-white/5">
                <button
                  type="button"
                  onClick={() => {
                    setRole("founder");
                    setStep(1);
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    role === "founder"
                      ? "bg-[#C6A15B] text-[#0B0B0D] font-semibold"
                      : "text-[#8A8780] hover:text-[#F4F1EA]"
                  }`}
                >
                  Founder
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole("investor");
                    setStep(1);
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    role === "investor"
                      ? "bg-[#C6A15B] text-[#0B0B0D] font-semibold"
                      : "text-[#8A8780] hover:text-[#F4F1EA]"
                  }`}
                >
                  Investor
                </button>
              </div>

              {/* Step indicator */}
              <div className="text-xs font-mono text-[#8A8780]">
                Step {step} of 4
              </div>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="inline-flex mb-5">
                <VerifiedSeal size={110} glow={true} />
              </div>
              <h4
                className="text-2xl font-serif text-[#F4F1EA] mb-2"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Under Committee Review
              </h4>
              <p className="text-sm text-[#8A8780] max-w-md mx-auto leading-relaxed mb-6 font-sans">
                Your application has been received for Season 1 vetting. Every
                member is reviewed personally by the Sigma 8 advisory board in
                Dubai to protect confidentiality and guarantee caliber.
              </p>

              <div className="p-4 rounded-xl bg-black/30 border border-white/5 max-w-sm mx-auto text-left mb-6">
                <div className="text-[10px] font-mono tracking-wider uppercase text-[#C6A15B] mb-1">
                  Expected Timeline
                </div>
                <div className="text-xs text-[#F4F1EA]">
                  48 to 72 hours · You will receive an invitation link and
                  verified credentials via email once validated.
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold tracking-wider uppercase hover:bg-[#d8b56f] transition-colors"
              >
                Return to Overview
              </button>
            </div>
          ) : (
            <form onSubmit={handleNext} className="space-y-4">
              {/* Step 1: Personal Profile */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#8A8780] uppercase tracking-wider mb-2">
                    01 — Personal & Credentials
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Al-Mansoor"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tariq@firm.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp (Default +971) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                        LinkedIn Profile *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://linkedin.com/in/username"
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedin: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                        Base Country & City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dubai, UAE"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                        Role / Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={
                          role === "founder" ? "Co-founder & CEO" : "Managing Partner / Angel"
                        }
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Entity & Profile Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#8A8780] uppercase tracking-wider mb-2">
                    02 — {role === "founder" ? "Startup Profile" : "Investor Credentials"}
                  </div>

                  {role === "founder" ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                            Startup Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. PayFlow Mena"
                            value={formData.startupName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                startupName: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                            Company Website *
                          </label>
                          <input
                            type="url"
                            required
                            placeholder="https://company.com"
                            value={formData.website}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                website: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                          One-line Tagline (≤ 120 chars) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Cross-border treasury and automated FX settlement for GCC merchants."
                          value={formData.tagline}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tagline: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                            Primary Sector *
                          </label>
                          <select
                            value={formData.sector}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                sector: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                          >
                            <option>Fintech / Web3</option>
                            <option>Enterprise AI & B2B SaaS</option>
                            <option>Logistics & Supply Chain</option>
                            <option>HealthTech</option>
                            <option>PropTech & Real Estate</option>
                            <option>Consumer Tech & Marketplace</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                            Current Stage *
                          </label>
                          <select
                            value={formData.stage}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                stage: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                          >
                            <option>Pre-Seed</option>
                            <option>Seed</option>
                            <option>Series A</option>
                            <option>Series B+</option>
                          </select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                            Investor Classification *
                          </label>
                          <select
                            value={formData.investorType}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                investorType: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                          >
                            <option>Angel Investor</option>
                            <option>Venture Capital Firm</option>
                            <option>Family Office</option>
                            <option>Corporate VC (CVC)</option>
                            <option>Syndicate Lead</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                            Firm / Vehicle Name (Kept Confidential) *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Al-Futtaim Family Office / Nomad VC"
                            value={formData.firmName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                firmName: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                            Typical Cheque / Ticket Size *
                          </label>
                          <select
                            value={formData.ticketRange}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                ticketRange: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                          >
                            <option>$25k – $50k</option>
                            <option>$50k – $250k</option>
                            <option>$250k – $1M</option>
                            <option>$1M – $5M+</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                            Years of Active Angel / VC Investing *
                          </label>
                          <select
                            value={formData.yearsInvesting}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                yearsInvesting: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                          >
                            <option>1–3 years</option>
                            <option>3–5 years</option>
                            <option>5–10 years</option>
                            <option>10+ years</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 3: Financials / Anonymous Thesis */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#8A8780] uppercase tracking-wider mb-2">
                    03 — {role === "founder" ? "Traction & Capital" : "Discreet Public Persona"}
                  </div>

                  {role === "founder" ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                            Target Raise Amount (USD) *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="$1,500,000"
                            value={formData.raiseAmount}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                raiseAmount: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                            Monthly Revenue Band *
                          </label>
                          <select
                            value={formData.revenueBand}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                revenueBand: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                          >
                            <option>Pre-revenue</option>
                            <option>&lt; $10k MRR</option>
                            <option>$10k – $50k MRR</option>
                            <option>$50k – $250k MRR</option>
                            <option>$250k+ MRR</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                          Traction Summary (Key metrics, MoM growth) *
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="e.g. $42,000 MRR, 28% MoM growth over past 6 months, 4 Enterprise pilots in Dubai and Riyadh."
                          value={formData.tractionSummary}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tractionSummary: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 rounded-lg bg-[#C6A15B]/5 border border-[#C6A15B]/20 text-xs text-[#C6A15B] leading-relaxed">
                        Notice: As an investor on Sigma 8, your name, firm, and
                        contact details remain hidden until you mutually accept
                        a match with a founder. Founders will only see your
                        anonymous headline and verified credentials.
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                          Anonymous Headline (Do not include personal names) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Operator-Angel, ex-Fintech founder, investing $50k-$250k"
                          value={formData.anonymousHeadline}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              anonymousHeadline: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5">
                          Investment Thesis & Value-Add *
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Focus areas, how you assist portfolio companies, typical governance preferences."
                          value={formData.anonymousBio}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              anonymousBio: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 4: Verification & Confidentiality Agreement */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#8A8780] uppercase tracking-wider mb-2">
                    04 — Verification & Terms
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 accent-[#C6A15B] rounded"
                      />
                      <label
                        htmlFor="terms"
                        className="text-xs text-[#8A8780] leading-relaxed cursor-pointer"
                      >
                        I certify that all information submitted is accurate and
                        represent an accredited or authorized party. I agree to
                        the{" "}
                        <span className="text-[#C6A15B] underline">
                          Sigma 8 Non-Disclosure Agreement
                        </span>{" "}
                        and Terms of Service.
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="verification-call"
                        required
                        defaultChecked
                        className="mt-1 accent-[#C6A15B] rounded"
                      />
                      <label
                        htmlFor="verification-call"
                        className="text-xs text-[#8A8780] leading-relaxed cursor-pointer"
                      >
                        I consent to a brief 10-minute verification check by the
                        Sigma 8 vetting team in Dubai prior to member pass
                        issuance.
                      </label>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#8A8780] italic">
                    Regulatory note: Sigma 8 does not handle investments, hold
                    funds, or broker securities transactions. We are a private,
                    vetted introduction network.
                  </div>
                </div>
              )}

              {/* Footer navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold tracking-wider uppercase hover:bg-[#d8b56f] transition-colors shadow-lg shadow-[#C6A15B]/20"
                >
                  {step === 4 ? "Submit Application" : "Continue"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


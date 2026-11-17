"use client";

import React, { useState } from "react";
import { LogoMark } from "../brand/LogoMark";
import { VerifiedSeal } from "../brand/VerifiedSeal";
import { submitApplication } from "@/app/actions";

interface ApplicationModalProps {
  isOpen: boolean;
  initialRole?: "founder" | "investor";
  onClose: () => void;
}

const SECTORS = [
  "Fintech / Web3",
  "Enterprise AI & B2B SaaS",
  "Logistics & Supply Chain",
  "HealthTech",
  "PropTech & Real Estate",
  "Consumer Tech & Marketplace",
];

const STAGES = ["Pre-Seed", "Seed", "Series A", "Series B+"];
const INVESTOR_TYPES = ["Angel Investor", "Venture Capital Firm", "Family Office", "Corporate VC (CVC)", "Syndicate Lead"];
const TICKET_RANGES = ["$25k – $50k", "$50k – $250k", "$250k – $1M", "$1M – $5M+"];

const inputCls =
  "w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C6A15B]";
const labelCls = "block text-[11px] font-mono text-[#8A8780] uppercase tracking-wider mb-1.5";

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

export function ApplicationModal({ isOpen, initialRole = "founder", onClose }: ApplicationModalProps) {
  const [role, setRole] = useState<"founder" | "investor">(initialRole);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // One page, essentials only.
  const [f, setF] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    website: "",
    socials: "",
    deckName: "",
    // founder
    startupName: "",
    sector: "",
    stage: "",
    raiseAmount: "",
    // investor
    firmName: "",
    investorType: "",
    ticketRange: "",
    sectors: "",
  });

  if (!isOpen) return null;

  const set = (key: keyof typeof f, value: string) => setF({ ...f, [key]: value });

  const parseTicket = (range: string): [number | null, number | null] => {
    const nums = range
      .replace(/[^0-9]/g, " ")
      .trim()
      .split(/\s+/)
      .map(Number)
      .filter((n) => Number.isFinite(n) && n > 0);
    if (nums.length === 0) return [null, null];
    return [nums[0] * 1000, (nums[1] ?? nums[0]) * 1000];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const [ticketMin, ticketMax] = parseTicket(f.ticketRange);
    const res = await submitApplication({
      role,
      fullName: f.fullName,
      email: f.email,
      phone: f.phone,
      city: "Dubai",
      linkedinUrl: f.linkedin,
      title: "",
      website: f.website,
      socials: f.socials || undefined,
      deckName: f.deckName || undefined,
      startupName: f.startupName,
      sector: f.sector || undefined,
      stage: f.stage,
      raiseAmount: f.raiseAmount,
      investorType: f.investorType,
      firmName: f.firmName,
      ticketMin,
      ticketMax,
      sectors: f.sectors
        ? f.sectors.split(",").map((s) => s.trim()).filter(Boolean)
        : undefined,
    });
    setSubmitting(false);
    if (res.ok) setIsSubmitted(true);
    else setSubmitError(res.error ?? "Something went wrong. Please try again.");
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#141417] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden my-8">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 z-20 text-[#8A8780] hover:text-[#F4F1EA] p-2 rounded-full hover:bg-white/5 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <LogoMark size={24} />
            <span className="text-[11px] font-mono tracking-[0.24em] text-[#C6A15B] uppercase">Application for Admission</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#F4F1EA]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
            {isSubmitted ? "Application Received" : `Apply as ${role === "founder" ? "Founder" : "Investor"}`}
          </h3>
          {!isSubmitted && (
            <div className="inline-flex p-1 rounded-lg bg-black/40 border border-white/5 mt-4">
              {(["founder", "investor"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    role === r ? "bg-[#C6A15B] text-[#0B0B0D] font-semibold" : "text-[#8A8780] hover:text-[#F4F1EA]"
                  }`}
                >
                  {r === "founder" ? "Founder" : "Investor"}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="inline-flex mb-5">
                <VerifiedSeal size={110} glow={true} />
              </div>
              <h4 className="text-2xl font-serif text-[#F4F1EA] mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                Under Committee Review
              </h4>
              <p className="text-sm text-[#8A8780] max-w-md mx-auto leading-relaxed mb-6">
                Your application is under review. Every member is reviewed personally by the Sigma 8 committee in Dubai.
                You will hear back once a decision is made.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold tracking-wider uppercase hover:bg-[#d8b56f] transition-colors"
              >
                Return to Overview
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full name" required>
                  <input type="text" required placeholder="Your full name" value={f.fullName} onChange={(e) => set("fullName", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Business email" required>
                  <input type="email" required placeholder="you@company.com" value={f.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Contact number" required>
                  <input type="tel" required placeholder="+971 50 123 4567" value={f.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
                </Field>
                <Field label="LinkedIn" required>
                  <input type="url" required placeholder="https://linkedin.com/in/username" value={f.linkedin} onChange={(e) => set("linkedin", e.target.value)} className={inputCls} />
                </Field>
              </div>

              <Field label="Website" required>
                <input type="url" required placeholder="https://company.com" value={f.website} onChange={(e) => set("website", e.target.value)} className={inputCls} />
              </Field>

              {role === "founder" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Startup name" required>
                      <input type="text" required placeholder="Startup name" value={f.startupName} onChange={(e) => set("startupName", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Sector" required>
                      <select required value={f.sector} onChange={(e) => set("sector", e.target.value)} className={inputCls}>
                        <option value="">Select a sector</option>
                        {SECTORS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Stage" required>
                      <select required value={f.stage} onChange={(e) => set("stage", e.target.value)} className={inputCls}>
                        <option value="">Select a stage</option>
                        {STAGES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Raise amount (optional)">
                      <input type="text" placeholder="$1,500,000" value={f.raiseAmount} onChange={(e) => set("raiseAmount", e.target.value)} className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Pitch deck (optional — file name or link)">
                    <input type="text" placeholder="e.g. pitch-deck.pdf" value={f.deckName} onChange={(e) => set("deckName", e.target.value)} className={inputCls} />
                  </Field>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Firm / fund name" required>
                      <input type="text" required placeholder="Firm / fund name" value={f.firmName} onChange={(e) => set("firmName", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Investor type" required>
                      <select required value={f.investorType} onChange={(e) => set("investorType", e.target.value)} className={inputCls}>
                        <option value="">Select a type</option>
                        {INVESTOR_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Ticket range" required>
                      <select required value={f.ticketRange} onChange={(e) => set("ticketRange", e.target.value)} className={inputCls}>
                        <option value="">Select a range</option>
                        {TICKET_RANGES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Sectors" required>
                      <input type="text" required placeholder="e.g. Fintech, AI SaaS" value={f.sectors} onChange={(e) => set("sectors", e.target.value)} className={inputCls} />
                    </Field>
                  </div>
                </>
              )}

              <Field label="Socials (optional)">
                <input type="text" placeholder="X / Instagram — one link or handle" value={f.socials} onChange={(e) => set("socials", e.target.value)} className={inputCls} />
              </Field>

              <p className="text-[11px] text-[#8A8780] italic">
                Sigma 8 does not hold funds, give investment advice, or broker deals. We are a private, vetted
                introduction network.
              </p>

              {submitError && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold tracking-wider uppercase hover:bg-[#d8b56f] transition-colors disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
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

// 48px-tall fields: comfortable to tap, readable without zooming on mobile.
const inputCls =
  "w-full px-4 py-3 min-h-[48px] rounded-lg bg-[#0B0B0D] border border-white/10 text-[#F4F1EA] text-[15px] focus:outline-none focus:border-[#C6A15B]";
const labelCls = "block text-xs font-medium text-[#A39E93] uppercase tracking-wider mb-1.5";

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="min-w-0">
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

  // Lock the page behind the modal and close on Escape. Hooks run before
  // the early return so hook order stays stable.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

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
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md"
      onClick={handleReset}
      role="dialog"
      aria-modal="true"
      aria-label={isSubmitted ? "Application received" : `Apply as ${role === "founder" ? "Founder" : "Investor"}`}
    >
      {/*
        Grid + `m-auto` on the dialog (NOT flex items-center on the scroll
        container): when the form is taller than the viewport, flex
        centering pushes the top off-screen and the submit button gets
        cut off. Grid with margin-auto centres short content and lets
        tall content scroll from the top instead.
      */}
      <div className="grid min-h-full place-items-center p-4 sm:p-6">
        <div
          className="m-auto flex w-full max-w-[720px] max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] flex-col rounded-2xl bg-[#141417] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="shrink-0 px-6 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-white/5 relative">
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-11 h-11 flex items-center justify-center text-[#8A8780] hover:text-[#F4F1EA] rounded-full hover:bg-white/5 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-3 mb-2 pr-12">
              <LogoMark size={24} />
              <span className="text-[11px] font-mono tracking-[0.24em] text-[#C6A15B] uppercase">Application for Admission</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-[#F4F1EA] pr-12" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
              {isSubmitted ? "Application Received" : `Apply as ${role === "founder" ? "Founder" : "Investor"}`}
            </h3>
            {!isSubmitted && (
              <div className="inline-flex p-1 rounded-lg bg-black/40 border border-white/5 mt-4" role="group" aria-label="Application type">
                {(["founder", "investor"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    aria-pressed={role === r}
                    className={`min-h-[40px] px-4 py-2 text-xs font-medium rounded-md transition-all ${
                      role === r ? "bg-[#C6A15B] text-[#0B0B0D] font-semibold" : "text-[#8A8780] hover:text-[#F4F1EA]"
                    }`}
                  >
                    {r === "founder" ? "Founder" : "Investor"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isSubmitted ? (
            <div className="overflow-y-auto px-6 sm:px-8 py-6">
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
                  className="min-h-[48px] px-6 py-3 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold tracking-wider uppercase hover:bg-[#d8b56f] transition-colors"
                >
                  Return to Overview
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
              {/* Scrollable fields — the submit bar below stays pinned. */}
              <div className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full name" required>
                    <input type="text" required autoComplete="name" placeholder="Your full name" value={f.fullName} onChange={(e) => set("fullName", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Business email" required>
                    <input type="email" required autoComplete="email" placeholder="you@company.com" value={f.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Contact number" required>
                    <input type="tel" required autoComplete="tel" placeholder="+971 50 123 4567" value={f.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="LinkedIn" required>
                    <input type="url" required autoComplete="url" placeholder="https://linkedin.com/in/username" value={f.linkedin} onChange={(e) => set("linkedin", e.target.value)} className={inputCls} />
                  </Field>
                </div>

                <Field label="Website" required>
                  <input type="url" required autoComplete="url" placeholder="https://company.com" value={f.website} onChange={(e) => set("website", e.target.value)} className={inputCls} />
                </Field>

                {role === "founder" ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Startup name" required>
                        <input type="text" required autoComplete="organization" placeholder="Startup name" value={f.startupName} onChange={(e) => set("startupName", e.target.value)} className={inputCls} />
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
                        <input type="text" inputMode="decimal" placeholder="$1,500,000" value={f.raiseAmount} onChange={(e) => set("raiseAmount", e.target.value)} className={inputCls} />
                      </Field>
                    </div>
                    <Field label="Pitch deck (optional — file name or link)">
                      <input type="text" placeholder="e.g. pitch-deck.pdf" value={f.deckName} onChange={(e) => set("deckName", e.target.value)} className={inputCls} />
                    </Field>
                  </>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Firm / fund name" required>
                      <input type="text" required autoComplete="organization" placeholder="Firm / fund name" value={f.firmName} onChange={(e) => set("firmName", e.target.value)} className={inputCls} />
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
                )}

                <Field label="Socials (optional)">
                  <input type="text" placeholder="X / Instagram — one link or handle" value={f.socials} onChange={(e) => set("socials", e.target.value)} className={inputCls} />
                </Field>

                <p className="text-xs text-[#8A8780] italic leading-relaxed">
                  Sigma 8 does not hold funds, give investment advice, or broker deals. We are a private, vetted
                  introduction network.
                </p>
              </div>

              {/* Pinned footer — the submit button is always visible. */}
              <div className="shrink-0 border-t border-white/5 bg-[#141417] px-6 sm:px-8 py-4">
                {submitError && (
                  <p role="alert" className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-3">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-[52px] px-6 py-3.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold tracking-wider uppercase hover:bg-[#d8b56f] transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

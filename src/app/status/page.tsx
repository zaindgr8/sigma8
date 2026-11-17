"use client";
import Link from "next/link";

import React, { useState } from "react";
import { checkStatus } from "@/app/actions";

const COPY: Record<string, { title: string; text: string }> = {
  pending: { title: "Under review", text: "Your application is with the Sigma 8 committee. You will hear back once a decision is made." },
  approved: { title: "Approved", text: "Welcome to Sigma 8. Open the member portal with this email to enter." },
  rejected: { title: "Not approved this time", text: "Thank you for applying. The committee was unable to approve this application. You are welcome to apply again in a future cohort." },
  waitlisted: { title: "You're on the list", text: "Your application is waitlisted. We will contact you if a place opens up." },
  suspended: { title: "Suspended", text: "Your membership is currently suspended. Please contact the Sigma 8 team." },
  draft: { title: "Application incomplete", text: "Your application has not been submitted yet." },
};

export default function StatusPage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ found: boolean; status: string | null; role: string | null; memberNumber: number | null } | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(await checkStatus(email));
    setLoading(false);
  };

  return (
    <main className="min-h-screen min-h-dvh bg-[#0B0B0D] text-[#F4F1EA] flex flex-col items-center justify-center px-4 sm:px-6 py-10">
      <Link href="/" className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] mb-10">← Sigma 8</Link>
      <h1 className="font-serif text-4xl mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Check your status</h1>
      <p className="text-sm text-[#8A8780] mb-8">Enter the email you applied with.</p>
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="status-email" className="block text-xs font-medium text-[#A39E93] uppercase tracking-wider mb-1.5">Email you applied with</label>
          <input id="status-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
            className="w-full px-4 py-3 min-h-[48px] rounded-lg bg-[#141417] border border-white/10 text-[15px] focus:outline-none focus:border-[#C6A15B]" />
        </div>
        <button disabled={loading} className="w-full min-h-[52px] py-3.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider disabled:opacity-50">
          {loading ? "Checking…" : "Check status"}
        </button>
      </form>
      {result && (
        <div className="mt-8 w-full max-w-sm rounded-xl bg-[#141417] border border-white/5 p-5 text-center">
          {!result.found ? (
            <p className="text-sm text-[#8A8780]">No application found for that email.</p>
          ) : (
            <>
              <p className="font-serif text-2xl text-[#C6A15B]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                {COPY[result.status ?? "pending"]?.title ?? result.status}
              </p>
              <p className="text-sm text-[#8A8780] mt-2 leading-relaxed">{COPY[result.status ?? "pending"]?.text}</p>
              {result.memberNumber && <p className="text-xs text-[#8A8780] mt-3">Member No. {String(result.memberNumber).padStart(4, "0")}</p>}
              {result.status === "approved" && (
                <Link href="/member" className="inline-block mt-4 text-xs uppercase tracking-wider text-[#C6A15B] underline">Open member portal →</Link>
              )}
            </>
          )}
        </div>
      )}
    </main>
  );
}

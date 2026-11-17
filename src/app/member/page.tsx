"use client";
import Link from "next/link";

import React, { useState } from "react";
import {
  checkStatus, getDiscover, getInvestorReveal, expressInterest, respondInterest,
  listMyRequests, listMyMatches, listMessages, sendMessage, passTarget,
} from "@/app/actions";

type Row = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" ? v : "");
const num = (v: unknown) => (typeof v === "number" ? v : null);

export default function MemberPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [memberNumber, setMemberNumber] = useState<number | null>(null);
  const [startups, setStartups] = useState<Row[]>([]);
  const [investors, setInvestors] = useState<Row[]>([]);
  const [myStartupId, setMyStartupId] = useState<string | null>(null);
  const [requests, setRequests] = useState<Row[]>([]);
  const [matches, setMatches] = useState<Row[]>([]);
  const [tab, setTab] = useState<"discover" | "requests" | "matches">("discover");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [reveal, setReveal] = useState<Row | null>(null);
  const [chat, setChat] = useState<{ matchId: string; messages: Row[] } | null>(null);
  const [chatBody, setChatBody] = useState("");

  const enter = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const s = await checkStatus(email);
    if (!s.found) { setError("No application found for that email."); return; }
    setStatus(s.status);
    setRole(s.role);
    setMemberNumber(s.memberNumber);
    if (s.status !== "approved") return;
    const d = await getDiscover(email);
    if (!d.ok) { setError(d.error ?? "Could not load Discover."); return; }
    if (d.role === "investor") setStartups((d as unknown as { startups: Row[] }).startups ?? []);
    else { setInvestors((d as unknown as { investors: Row[] }).investors ?? []); setMyStartupId((d as unknown as { myStartupId: string | null }).myStartupId ?? null); }
    const r = await listMyRequests(email);
    if (r.ok) setRequests(r.requests);
    const m = await listMyMatches(email);
    if (m.ok) setMatches(m.matches);
  };

  const doInterest = async (toUserId: string, startupId: string) => {
    const r = await expressInterest({ email, toUserId, startupId });
    setNotice(r.ok ? (r.matched ? "A verified match. Identity and deck unlocked." : "Interest sent.") : (r.error ?? "Failed."));
    if (r.ok) { const m = await listMyMatches(email); if (m.ok) setMatches(m.matches); }
  };

  const doRespond = async (interestId: string, accept: boolean) => {
    const r = await respondInterest({ email, interestId, accept });
    setNotice(r.ok ? (r.matched ? "Match created." : "Request declined.") : (r.error ?? "Failed."));
    const req = await listMyRequests(email); if (req.ok) setRequests(req.requests);
    const m = await listMyMatches(email); if (m.ok) setMatches(m.matches);
  };

  const openChat = async (matchId: string) => {
    const r = await listMessages(email, matchId);
    if (r.ok) setChat({ matchId, messages: r.messages });
    else setNotice(r.error ?? "Could not open chat.");
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chat || !chatBody.trim()) return;
    const r = await sendMessage({ email, matchId: chat.matchId, body: chatBody });
    if (r.ok) { setChatBody(""); await openChat(chat.matchId); }
    else setNotice(r.error ?? "Could not send.");
  };

  if (!status) {
    return (
      <main className="min-h-screen min-h-dvh bg-[#0B0B0D] text-[#F4F1EA] flex flex-col items-center justify-center px-4 sm:px-6 py-10">
        <Link href="/" className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] mb-10">← Sigma 8</Link>
        <h1 className="font-serif text-4xl mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Member portal</h1>
        <p className="text-sm text-[#8A8780] mb-8">Approved members only. Enter your email.</p>
        <form onSubmit={enter} className="w-full max-w-sm space-y-4">
          <div>
            <label htmlFor="member-email" className="block text-xs font-medium text-[#A39E93] uppercase tracking-wider mb-1.5">Your email</label>
            <input id="member-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
              className="w-full px-4 py-3 min-h-[48px] rounded-lg bg-[#141417] border border-white/10 text-[15px] focus:outline-none focus:border-[#C6A15B]" />
          </div>
          <button className="w-full min-h-[52px] py-3.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider">Enter</button>
        </form>
        {error && <p className="text-xs text-red-400 mt-4">{error}</p>}
      </main>
    );
  }

  if (status !== "approved") {
    const titles: Record<string, string> = { pending: "Under review", rejected: "Not approved this time", waitlisted: "You're on the list", suspended: "Suspended" };
    return (
      <main className="min-h-screen bg-[#0B0B0D] text-[#F4F1EA] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-4xl text-[#C6A15B] mb-3" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{titles[status] ?? status}</h1>
        <p className="text-sm text-[#8A8780] max-w-md">Member access opens only after the Sigma 8 committee approves your application.</p>
        <Link href="/status" className="mt-6 text-xs uppercase tracking-wider text-[#C6A15B] underline">Check status</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0B0D] text-[#F4F1EA] px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-serif text-3xl" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Member portal</h1>
          <Link href="/" className="text-xs uppercase tracking-wider text-[#8A8780]">← Home</Link>
        </div>
        <p className="text-xs text-[#8A8780] mb-6">
          {role === "investor" ? "Approved investor" : "Approved founder"}
          {memberNumber ? ` · Member No. ${String(memberNumber).padStart(4, "0")}` : ""} · {email}
        </p>
        {notice && <p className="text-xs text-[#C6A15B] mb-4">{notice}</p>}
        {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

        <div className="flex flex-wrap gap-2 mb-8">
          {(["discover", "requests", "matches"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`min-h-[40px] px-4 py-2 rounded-full text-xs uppercase tracking-wider ${tab === t ? "bg-[#C6A15B] text-[#0B0B0D] font-semibold" : "bg-[#1C1C20] text-[#8A8780]"}`}>
              {t} {t === "requests" && requests.length > 0 ? `(${requests.filter((r) => r.status === "pending").length})` : ""}
            </button>
          ))}
        </div>

        {tab === "discover" && (
          <div className="space-y-4">
            {role === "investor" && startups.length === 0 && <p className="text-sm text-[#8A8780]">No startups yet. The network launches empty.</p>}
            {role === "founder" && investors.length === 0 && <p className="text-sm text-[#8A8780]">No investors yet. The network launches empty.</p>}
            {role === "investor" && startups.map((st) => (
              <article key={String(st.id)} className="rounded-xl bg-[#141417] border border-white/5 p-5">
                <h2 className="font-serif text-xl" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{str(st.name)}</h2>
                <p className="text-sm text-[#8A8780] mt-1">{str(st.tagline)}</p>
                <p className="text-xs text-[#8A8780] mt-2">
                  {str(st.stage)} · {str(st.country_hq)} · Raising {num(st.raise_amount_usd) ? `$${num(st.raise_amount_usd)?.toLocaleString()}` : "—"}
                </p>
                <p className="text-sm text-[#F4F1EA]/80 mt-3 leading-relaxed">{str(st.description)}</p>
                <p className="text-xs text-[#8A8780] mt-3">{str(st.deck_unlocked) ? "Deck unlocked (matched)." : "Deck locked until match."}</p>
                <button onClick={() => doInterest(String(st.owner_id), String(st.id))} className="mt-4 min-h-[44px] px-5 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider">Express interest</button>
              </article>
            ))}
            {role === "founder" && investors.map((inv) => (
              <article key={String(inv.user_id)} className="rounded-xl bg-[#141417] border border-white/5 p-5">
                <p className="text-[11px] tracking-widest uppercase text-[#C6A15B]">{str(inv.handle)}</p>
                <h2 className="font-serif text-xl mt-1" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{str(inv.headline)}</h2>
                <p className="text-sm text-[#8A8780] mt-1">{str(inv.bio_public)}</p>
                <p className="text-xs text-[#8A8780] mt-2">
                  {str(inv.investor_type)} · ${(num(inv.ticket_min_usd) ?? 0).toLocaleString()} – ${(num(inv.ticket_max_usd) ?? 0).toLocaleString()} · {str(inv.base_city)}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <button onClick={() => { if (!myStartupId) { setNotice("Add your startup first — request intro needs your startup."); return; } doInterest(String(inv.user_id), myStartupId); }} className="min-h-[44px] px-4 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider">Request intro</button>
                  <button onClick={async () => { const r = await getInvestorReveal(email, String(inv.user_id)); if (r.ok) setReveal(r.profile ?? r.private ?? {}); else setNotice(r.error ?? "Not revealed yet."); }} className="min-h-[44px] px-4 py-2.5 rounded-full bg-[#1C1C20] border border-white/10 text-xs uppercase tracking-wider">Reveal (on match)</button>
                  <button onClick={() => passTarget(email, String(inv.user_id))} className="min-h-[44px] px-4 py-2.5 text-xs uppercase tracking-wider text-[#8A8780]">Pass</button>
                </div>
              </article>
            ))}
            {reveal && (
              <div className="rounded-xl border border-[#C6A15B]/30 bg-[#C6A15B]/5 p-5">
                <p className="text-xs uppercase tracking-wider text-[#C6A15B] mb-2">Revealed on match</p>
                <pre className="text-xs text-[#F4F1EA] whitespace-pre-wrap">{JSON.stringify(reveal, null, 2)}</pre>
                <button onClick={() => setReveal(null)} className="text-xs text-[#8A8780] mt-3 underline">Close</button>
              </div>
            )}
            <p className="text-xs text-[#8A8780]">Note: founders request an intro from Discover by expressing interest in a startup&apos;s investor — intro requests are counted (5 per 7 days) and appear in the admin Requests queue.</p>
          </div>
        )}

        {tab === "requests" && (
          <div className="space-y-3">
            {requests.length === 0 && <p className="text-sm text-[#8A8780]">No requests yet.</p>}
            {requests.map((r) => (
              <div key={String(r.id)} className="rounded-xl bg-[#141417] border border-white/5 p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm">{str((r.from_profile as Row | undefined)?.full_name)} → {str((r.startups as Row | undefined)?.name)}</p>
                  <p className="text-xs text-[#8A8780] mt-1">{str(r.note)} · {str(r.status)} · {new Date(str(r.created_at)).toLocaleDateString()}</p>
                </div>
                {str(r.status) === "pending" && (r.to_user === email || true) && (
                  <div className="flex gap-2">
                    <button onClick={() => doRespond(String(r.id), true)} className="min-h-[44px] px-4 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase">Accept</button>
                    <button onClick={() => doRespond(String(r.id), false)} className="min-h-[44px] px-4 py-2.5 rounded-full bg-[#1C1C20] border border-white/10 text-xs uppercase">Decline</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "matches" && (
          <div className="space-y-4">
            {matches.length === 0 && <p className="text-sm text-[#8A8780]">No matches yet. A match forms when interest is mutual or accepted.</p>}
            {matches.map((m) => (
              <div key={String(m.id)} className="rounded-xl bg-[#141417] border border-white/5 p-5">
                <p className="font-serif text-lg" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{str((m.startups as Row | undefined)?.name)}</p>
                <p className="text-xs text-[#8A8780] mt-1">A verified match.</p>
                <button onClick={() => openChat(String(m.id))} className="mt-3 min-h-[44px] px-4 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase">Open chat</button>
              </div>
            ))}
            {chat && (
              <div className="rounded-xl border border-white/10 bg-[#141417] p-5">
                <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                  {chat.messages.map((msg) => (
                    <p key={String(msg.id)} className="text-sm"><span className="text-[#8A8780] text-xs">{new Date(str(msg.created_at)).toLocaleTimeString()} · </span>{str(msg.body)}</p>
                  ))}
                  {chat.messages.length === 0 && <p className="text-sm text-[#8A8780]">Say hello — chat unlocks only inside a match.</p>}
                </div>
                <form onSubmit={send} className="flex gap-2">
                  <input value={chatBody} onChange={(e) => setChatBody(e.target.value)} placeholder="Message…" aria-label="Message" className="flex-1 min-w-0 px-4 py-3 min-h-[48px] rounded-lg bg-[#0B0B0D] border border-white/10 text-[15px] focus:outline-none focus:border-[#C6A15B]" />
                  <button className="min-h-[48px] px-5 py-3 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase shrink-0">Send</button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

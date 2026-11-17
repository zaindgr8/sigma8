"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase/client";
import { decideApplication, setMemberStatus, updateSettings, getDatabaseOverview } from "@/app/actions";

type Row = Record<string, unknown>;
type AdminData = {
  adminEmail: string;
  counts: Record<string, number>;
  applications: Row[];
  requests: Row[];
  reports: Row[];
  members: Row[];
  matches: Row[];
  settings: Row;
};

const str = (v: unknown) => (typeof v === "string" ? v : "");
const num = (v: unknown) => (typeof v === "number" ? v : null);
const fmtDate = (v: unknown) => { try { return new Date(str(v)).toLocaleDateString(); } catch { return ""; } };

type Tab = "applications" | "requests" | "reports" | "members" | "matches" | "settings" | "database";

export function AdminConsole({ data }: { data: AdminData }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("applications");
  const [notice, setNotice] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dbCounts, setDbCounts] = useState<Record<string, number> | null>(null);
  const [settingsForm, setSettingsForm] = useState({
    founder_weekly_intro_limit: num(data.settings.founder_weekly_intro_limit) ?? 5,
    pass_cooldown_days: num(data.settings.pass_cooldown_days) ?? 90,
    interest_expiry_days: num(data.settings.interest_expiry_days) ?? 14,
    applications_open: data.settings.applications_open !== false,
  });

  const refresh = () => router.refresh();

  const decide = async (id: string, decision: "approved" | "rejected" | "waitlisted") => {
    const r = await decideApplication({ applicationId: id, decision });
    setNotice(r.ok ? `Application ${decision}${r.memberNumber ? ` — Member No. ${String(r.memberNumber).padStart(4, "0")}` : ""}.` : (r.error ?? "Failed."));
    refresh();
  };

  const signOut = async () => {
    try {
      await getBrowserClient().auth.signOut();
    } catch {
      // Supabase not configured — just leave the page.
    }
    router.push("/admin/login");
    router.refresh();
  };

  const loadDb = async () => {
    const r = await getDatabaseOverview();
    if (r.ok) setDbCounts(r.counts);
    else setNotice(r.error ?? "Could not load database overview.");
  };

  const c = data.counts;
  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "applications", label: "Applications", badge: c.pendingApplications },
    { id: "requests", label: "Requests", badge: data.requests.filter((r) => r.status === "pending").length },
    { id: "reports", label: "Reports", badge: c.openReports },
    { id: "members", label: "Members" },
    { id: "matches", label: "Matches" },
    { id: "settings", label: "Settings" },
    { id: "database", label: "Database" },
  ];

  return (
    <main className="min-h-screen bg-[#0B0B0D] text-[#F4F1EA] px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <h1 className="font-serif text-3xl" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Admin console</h1>
          <button onClick={signOut} className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA]">Sign out</button>
        </div>
        <p className="text-xs text-[#8A8780] mb-6">Signed in as {data.adminEmail} · Every application and request lands here.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            ["Pending applications", c.pendingApplications],
            ["Approved members", c.totalMembers],
            ["Interests this week", c.interestsThisWeek],
            ["Matches this week", c.matchesThisWeek],
            ["Total matches", c.totalMatches],
            ["Open reports", c.openReports],
            ["Approved founders", c.approvedFounders],
            ["Approved investors", c.approvedInvestors],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-xl bg-[#141417] border border-white/5 p-4">
              <p className="font-serif text-2xl text-[#C6A15B]">{value as number}</p>
              <p className="text-[11px] uppercase tracking-wider text-[#8A8780] mt-1">{label as string}</p>
            </div>
          ))}
        </div>

        {notice && <p className="text-xs text-[#C6A15B] mb-4">{notice}</p>}

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`min-h-[40px] px-4 py-2 rounded-full text-xs uppercase tracking-wider ${tab === t.id ? "bg-[#C6A15B] text-[#0B0B0D] font-semibold" : "bg-[#1C1C20] text-[#8A8780]"}`}>
              {t.label}{t.badge ? ` (${t.badge})` : ""}
            </button>
          ))}
        </div>

        {tab === "applications" && (
          <div className="space-y-3">
            {data.applications.length === 0 && <p className="text-sm text-[#8A8780]">No applications yet.</p>}
            {data.applications.map((a) => {
              const prof = a.profiles as Row | undefined;
              const answers = (a.answers ?? {}) as Row;
              return (
                <article key={String(a.id)} className="rounded-xl bg-[#141417] border border-white/5 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-lg" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                        {str(prof?.full_name) || str(answers.fullName)}
                      </p>
                      <p className="text-xs text-[#8A8780] mt-1 break-words">
                        {str(a.role)} · {str(prof?.email) || str(answers.email)} · {str(answers.startupName) || str(answers.firmName) || ""} · {fmtDate(a.submitted_at)}
                      </p>
                      <p className="text-xs mt-1"><span className="text-[#C6A15B] uppercase tracking-wider">{str(a.status)}</span>{prof?.member_number ? ` · Member No. ${String(prof.member_number).padStart(4, "0")}` : ""}</p>
                    </div>
                    {str(a.status) === "pending" && (
                      <div className="flex gap-2">
                        <button onClick={() => decide(String(a.id), "approved")} className="min-h-[40px] px-4 py-2 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase">Approve</button>
                        <button onClick={() => decide(String(a.id), "waitlisted")} className="min-h-[40px] px-4 py-2 rounded-full bg-[#1C1C20] border border-white/10 text-xs uppercase">Waitlist</button>
                        <button onClick={() => decide(String(a.id), "rejected")} className="min-h-[40px] px-4 py-2 rounded-full bg-[#1C1C20] border border-white/10 text-xs uppercase">Reject</button>
                      </div>
                    )}
                  </div>
                  <button onClick={() => setExpanded(expanded === String(a.id) ? null : String(a.id))} className="text-xs text-[#8A8780] underline mt-3">
                    {expanded === String(a.id) ? "Hide full form" : "Show full form details"}
                  </button>
                  {expanded === String(a.id) && (
                    <pre className="mt-3 text-xs text-[#F4F1EA]/80 bg-black/30 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">{JSON.stringify(answers, null, 2)}</pre>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {tab === "requests" && (
          <div className="space-y-3">
            <p className="text-xs text-[#8A8780]">Every express-interest and intro request, whoever it was sent to.</p>
            {data.requests.length === 0 && <p className="text-sm text-[#8A8780]">No requests yet.</p>}
            {data.requests.map((r) => (
              <div key={String(r.id)} className="rounded-xl bg-[#141417] border border-white/5 p-4">
                <p className="text-sm">{str((r.from_profile as Row | undefined)?.full_name)} → {str((r.to_profile as Row | undefined)?.full_name)} · {str((r.startups as Row | undefined)?.name)}</p>
                <p className="text-xs text-[#8A8780] mt-1">{str(r.note)} · {str(r.status)} · {fmtDate(r.created_at)}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "reports" && (
          <div className="space-y-3">
            {data.reports.length === 0 && <p className="text-sm text-[#8A8780]">No reports.</p>}
            {data.reports.map((r) => (
              <div key={String(r.id)} className="rounded-xl bg-[#141417] border border-white/5 p-4">
                <p className="text-sm">{str((r.reporter as Row | undefined)?.full_name)} reported {str((r.reported as Row | undefined)?.full_name)}</p>
                <p className="text-xs text-[#8A8780] mt-1">{str(r.reason)} — {str(r.details)} · {str(r.status)} · {fmtDate(r.created_at)}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "members" && (
          <div className="space-y-3">
            {data.members.length === 0 && <p className="text-sm text-[#8A8780]">No members yet. The network launches empty.</p>}
            {data.members.map((m) => (
              <div key={String(m.id)} className="rounded-xl bg-[#141417] border border-white/5 p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm break-words">{str(m.full_name)} · {str(m.email)}</p>
                  <p className="text-xs text-[#8A8780] mt-1">{str(m.role)} · {str(m.status)}{m.member_number ? ` · No. ${String(m.member_number).padStart(4, "0")}` : ""}</p>
                </div>
                {str(m.status) === "approved" && (
                  <button onClick={async () => { await setMemberStatus({ userId: String(m.id), status: "suspended" }); refresh(); }} className="min-h-[40px] px-4 py-2 rounded-full bg-[#1C1C20] border border-white/10 text-xs uppercase">Suspend</button>
                )}
                {str(m.status) === "suspended" && (
                  <button onClick={async () => { await setMemberStatus({ userId: String(m.id), status: "approved" }); refresh(); }} className="min-h-[40px] px-4 py-2 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase">Reinstate</button>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "matches" && (
          <div className="space-y-3">
            {data.matches.length === 0 && <p className="text-sm text-[#8A8780]">No matches yet.</p>}
            {data.matches.map((m) => (
              <div key={String(m.id)} className="rounded-xl bg-[#141417] border border-white/5 p-4">
                <p className="text-sm">{str((m.founder as Row | undefined)?.full_name)} × {str((m.investor as Row | undefined)?.full_name)} · {str((m.startups as Row | undefined)?.name)}</p>
                <p className="text-xs text-[#8A8780] mt-1">{str(m.status)} · {fmtDate(m.created_at)}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "settings" && (
          <form onSubmit={async (e) => { e.preventDefault(); const r = await updateSettings(settingsForm); setNotice(r.ok ? "Settings saved." : (r.error ?? "Failed.")); refresh(); }} className="rounded-xl bg-[#141417] border border-white/5 p-5 space-y-4 max-w-md">
            <label className="block text-xs text-[#8A8780]">Founder intro limit (per 7 days)
              <input type="number" min={1} value={settingsForm.founder_weekly_intro_limit} onChange={(e) => setSettingsForm({ ...settingsForm, founder_weekly_intro_limit: Number(e.target.value) })} className="mt-1 w-full px-3 py-3 min-h-[48px] rounded-lg bg-[#0B0B0D] border border-white/10 text-[15px] text-[#F4F1EA]" />
            </label>
            <label className="block text-xs text-[#8A8780]">Pass cooldown (days)
              <input type="number" min={1} value={settingsForm.pass_cooldown_days} onChange={(e) => setSettingsForm({ ...settingsForm, pass_cooldown_days: Number(e.target.value) })} className="mt-1 w-full px-3 py-3 min-h-[48px] rounded-lg bg-[#0B0B0D] border border-white/10 text-[15px] text-[#F4F1EA]" />
            </label>
            <label className="block text-xs text-[#8A8780]">Interest expiry (days)
              <input type="number" min={1} value={settingsForm.interest_expiry_days} onChange={(e) => setSettingsForm({ ...settingsForm, interest_expiry_days: Number(e.target.value) })} className="mt-1 w-full px-3 py-3 min-h-[48px] rounded-lg bg-[#0B0B0D] border border-white/10 text-[15px] text-[#F4F1EA]" />
            </label>
            <label className="flex items-center gap-2 text-xs text-[#8A8780]">
              <input type="checkbox" checked={settingsForm.applications_open} onChange={(e) => setSettingsForm({ ...settingsForm, applications_open: e.target.checked })} className="accent-[#C6A15B]" />
              Applications open
            </label>
            <button className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase">Save settings</button>
          </form>
        )}

        {tab === "database" && (
          <div className="rounded-xl bg-[#141417] border border-white/5 p-5">
            <p className="text-xs text-[#8A8780] mb-4">Live row counts in Supabase (project tnjiuzrucjrppzaqxkkg).</p>
            <button onClick={loadDb} className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase mb-4">Load counts</button>
            {dbCounts && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(dbCounts).map(([table, count]) => (
                  <div key={table} className="rounded-lg bg-black/30 p-3">
                    <p className="font-serif text-xl text-[#C6A15B]">{count}</p>
                    <p className="text-[11px] text-[#8A8780]">{table}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

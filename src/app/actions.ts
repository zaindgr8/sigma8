"use server";

import { getServiceClient, getAuthUser, getProfileByEmail, NOT_CONFIGURED_ERROR } from "@/lib/supabase/server";

export type Role = "founder" | "investor" | "admin";

type DbRow = Record<string, unknown>;

function service() {
  const sb = getServiceClient();
  if (!sb) throw new Error(NOT_CONFIGURED_ERROR);
  return sb;
}

async function settings() {
  const sb = service();
  const { data } = await sb.from("app_settings").select("*").eq("id", 1).maybeSingle();
  return {
    founder_weekly_intro_limit: (data?.founder_weekly_intro_limit as number) ?? 5,
    pass_cooldown_days: (data?.pass_cooldown_days as number) ?? 90,
    interest_expiry_days: (data?.interest_expiry_days as number) ?? 14,
    applications_open: (data?.applications_open as boolean) ?? true,
  };
}

async function requireAdmin() {
  try {
    const user = await getAuthUser();
    if (!user?.email) return null;
    const profile = await getProfileByEmail(user.email);
    if (!profile || (profile as DbRow).role !== "admin" || (profile as DbRow).status !== "approved") {
      return null;
    }
    return { user, profile: profile as DbRow };
  } catch {
    return null;
  }
}

function parseRaise(v: string): number | null {
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function stageToDb(stage: string): string {
  const map: Record<string, string> = {
    "Pre-Seed": "pre_seed",
    Seed: "seed",
    "Series A": "series_a",
    "Series B+": "series_b_plus",
  };
  return map[stage] ?? "seed";
}

// ── Applications ────────────────────────────────────────────────

export interface ApplicationInput {
  role: "founder" | "investor";
  fullName: string;
  email: string;
  phone: string;
  city: string;
  linkedinUrl: string;
  title: string;
  socials?: string;
  deckName?: string;
  sectors?: string[];
  // founder
  startupName?: string;
  website?: string;
  tagline?: string;
  description?: string;
  sector?: string;
  stage?: string;
  raiseAmount?: string;
  revenueBand?: string;
  tractionSummary?: string;
  // investor
  investorType?: string;
  firmName?: string;
  ticketMin?: number | null;
  ticketMax?: number | null;
  headline?: string;
  bio?: string;
  yearsBand?: string;
}

export async function submitApplication(input: ApplicationInput): Promise<{ ok: boolean; error?: string }> {
  try {
    const sb = service();
    const s = await settings();
    if (!s.applications_open) return { ok: false, error: "Applications are currently closed." };
    const email = input.email.toLowerCase().trim();

    // One profile per email; reuse it if they already applied.
    let profile = await getProfileByEmail(email);
    if (!profile) {
      const { data, error } = await sb
        .from("profiles")
        .insert({
          role: input.role,
          status: "pending",
          full_name: input.fullName,
          email,
          phone: input.phone || null,
          city: input.city || null,
          country: "United Arab Emirates",
          linkedin_url: input.linkedinUrl || null,
        })
        .select("*")
        .single();
      if (error || !data) return { ok: false, error: error?.message ?? "Could not save your application." };
      profile = data as DbRow;
    }
    const profileId = profile.id as string;

    if (input.role === "founder") {
      await sb.from("startups").upsert(
        {
          owner_id: profileId,
          name: input.startupName ?? "Untitled startup",
          tagline: input.tagline ?? null,
          description: input.description ?? input.tractionSummary ?? null,
          website: input.website ?? null,
          sector: input.sector ? [input.sector] : [],
          stage: stageToDb(input.stage ?? "Seed"),
          country_hq: "United Arab Emirates",
          city: input.city || null,
          business_model: null,
          traction_summary: input.tractionSummary ?? null,
          monthly_revenue_band: input.revenueBand ?? null,
          raising: true,
          raise_amount_usd: parseRaise(input.raiseAmount ?? ""),
          deck_path: input.deckName ?? null,
          deck_visibility: "matched_only",
          is_visible: true,
        },
        { onConflict: "owner_id" }
      );
    } else {
      await sb.from("investor_profiles").upsert(
        {
          user_id: profileId,
          investor_type: input.investorType ?? "Angel",
          headline: input.headline ?? null,
          bio_public: input.bio ?? null,
          ticket_min_usd: input.ticketMin ?? null,
          ticket_max_usd: input.ticketMax ?? null,
          stages: [],
          sectors: input.sectors ?? [],
          geographies: ["United Arab Emirates"],
          years_investing_band: input.yearsBand ?? null,
          leads_rounds: false,
          is_visible: true,
        },
        { onConflict: "user_id" }
      );
      await sb.from("investor_private").upsert(
        {
          user_id: profileId,
          firm_name: input.firmName ?? null,
          title: input.title ?? null,
          portfolio: [],
          share_contact_on_match: true,
        },
        { onConflict: "user_id" }
      );
    }

    const { error: appErr } = await sb.from("applications").insert({
      user_id: profileId,
      role: input.role,
      answers: input as unknown as Record<string, unknown>,
      status: "pending",
    });
    if (appErr) return { ok: false, error: appErr.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Application failed." };
  }
}

export async function checkStatus(email: string) {
  const profile = await getProfileByEmail(email);
  if (!profile) return { found: false, status: null as string | null, role: null as string | null, memberNumber: null as number | null };
  return {
    found: true,
    status: profile.status as string,
    role: profile.role as string,
    memberNumber: (profile.member_number as number | null) ?? null,
  };
}

// ── Member portal (approval-gated) ──────────────────────────────

async function approvedProfile(email: string) {
  const profile = await getProfileByEmail(email);
  if (!profile || (profile as DbRow).status !== "approved") return null;
  return profile as DbRow;
}

export async function getDiscover(email: string) {
  const profile = await approvedProfile(email);
  if (!profile) return { ok: false as const, error: "Not approved yet." };
  const sb = service();
  const role = profile.role as string;
  const myId = profile.id as string;
  const s = await settings();

  if (role === "investor") {
    // Startups: full profiles, deck locked unless matched / all_investors.
    const { data: startups } = await sb
      .from("startups")
      .select("*, profiles!startups_owner_id_fkey(full_name, email)")
      .eq("is_visible", true)
      .order("created_at", { ascending: false });
    const { data: matches } = await sb.from("matches").select("startup_id").eq("investor_id", myId).eq("status", "active");
    const matched = new Set((matches ?? []).map((m) => (m as DbRow).startup_id as string));
    return {
      ok: true as const,
      role,
      startups: (startups ?? []).map((st) => {
        const row = st as DbRow;
        const unlocked = row.deck_visibility === "all_investors" || matched.has(row.id as string);
        return { ...row, deck_unlocked: unlocked, deck_path: unlocked ? row.deck_path : null };
      }),
    };
  }

  // Founder: anonymous investor cards only — never private data.
  const { data: myStartup } = await sb
    .from("startups")
    .select("id")
    .eq("owner_id", myId)
    .maybeSingle();
  const { data: passed } = await sb
    .from("passes")
    .select("target_user")
    .eq("user_id", myId)
    .gte("created_at", new Date(Date.now() - s.pass_cooldown_days * 86400000).toISOString());
  const passedIds = new Set((passed ?? []).map((p) => (p as DbRow).target_user as string));
  const { data: investors } = await sb
    .from("investor_profiles")
    .select("*, profiles!investor_profiles_user_id_fkey(member_number)")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });
  return {
    ok: true as const,
    role,
    myStartupId: (myStartup as DbRow | null)?.id as string | null,
    investors: (investors ?? [])
      .filter((i) => !passedIds.has((i as DbRow).user_id as string))
      .map((i) => {
        const row = i as DbRow;
        const prof = row.profiles as DbRow | null;
        return {
          user_id: row.user_id,
          handle: `Investor · No. ${String(prof?.member_number ?? "—").padStart(4, "0")}`,
          investor_type: row.investor_type,
          headline: row.headline,
          bio_public: row.bio_public,
          ticket_min_usd: row.ticket_min_usd,
          ticket_max_usd: row.ticket_max_usd,
          stages: row.stages,
          sectors: row.sectors,
          geographies: row.geographies,
          investments_count_band: row.investments_count_band,
          years_investing_band: row.years_investing_band,
          leads_rounds: row.leads_rounds,
          base_city: row.base_city,
        };
      }),
  };
}

export async function getInvestorReveal(email: string, investorId: string) {
  const me = await approvedProfile(email);
  if (!me) return { ok: false as const, error: "Not approved yet." };
  const sb = service();
  const { data: match } = await sb
    .from("matches")
    .select("id")
    .eq("founder_id", me.id as string)
    .eq("investor_id", investorId)
    .eq("status", "active")
    .maybeSingle();
  if (!match) return { ok: false as const, error: "Identity is revealed only after a match." };
  const [{ data: priv }, { data: prof }] = await Promise.all([
    sb.from("investor_private").select("*").eq("user_id", investorId).maybeSingle(),
    sb.from("profiles").select("full_name, email, phone, linkedin_url").eq("id", investorId).maybeSingle(),
  ]);
  return { ok: true as const, private: priv as DbRow | null, profile: prof as DbRow | null };
}

export async function expressInterest(input: { email: string; toUserId: string; startupId: string; note?: string }) {
  try {
    const me = await approvedProfile(input.email);
    if (!me) return { ok: false, error: "Not approved yet." };
    const sb = service();
    const s = await settings();
    // Founder intro limit: 5 per rolling 7 days.
    if (me.role === "founder") {
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
      const { count } = await sb
        .from("interests")
        .select("id", { count: "exact", head: true })
        .eq("from_user", me.id as string)
        .gte("created_at", weekAgo);
      if ((count ?? 0) >= s.founder_weekly_intro_limit) {
        return { ok: false, error: `Intro limit reached — ${s.founder_weekly_intro_limit} requests per 7 days.` };
      }
    }
    const { data: interest, error } = await sb
      .from("interests")
      .insert({
        from_user: me.id,
        to_user: input.toUserId,
        startup_id: input.startupId,
        note: input.note?.slice(0, 300) ?? null,
        status: "pending",
        expires_at: new Date(Date.now() + s.interest_expiry_days * 86400000).toISOString(),
      })
      .select("*")
      .single();
    if (error || !interest) return { ok: false, error: error?.message ?? "Could not send." };

    // Mutual interest → verified match.
    const { data: reverse } = await sb
      .from("interests")
      .select("id")
      .eq("from_user", input.toUserId)
      .eq("to_user", me.id as string)
      .eq("startup_id", input.startupId)
      .eq("status", "pending")
      .maybeSingle();
    if (reverse) {
      const founderId = me.role === "founder" ? (me.id as string) : input.toUserId;
      const investorId = me.role === "investor" ? (me.id as string) : input.toUserId;
      await sb.from("matches").insert({
        founder_id: founderId,
        investor_id: investorId,
        startup_id: input.startupId,
        created_from_interest: (interest as DbRow).id,
        status: "active",
      });
      await sb.from("interests").update({ status: "accepted" }).in("id", [(interest as DbRow).id, (reverse as DbRow).id]);
      return { ok: true, matched: true };
    }
    return { ok: true, matched: false };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed." };
  }
}

export async function respondInterest(input: { email: string; interestId: string; accept: boolean }) {
  const me = await approvedProfile(input.email);
  if (!me) return { ok: false, error: "Not approved yet." };
  const sb = service();
  const { data: interest } = await sb.from("interests").select("*").eq("id", input.interestId).maybeSingle();
  if (!interest || (interest as DbRow).to_user !== me.id) return { ok: false, error: "Not your request." };
  await sb.from("interests").update({ status: input.accept ? "accepted" : "declined", responded_at: new Date().toISOString() }).eq("id", input.interestId);
  if (!input.accept) return { ok: true, matched: false };
  const row = interest as DbRow;
  const founderId = me.role === "founder" ? (me.id as string) : (row.from_user as string);
  const investorId = me.role === "investor" ? (me.id as string) : (row.from_user as string);
  await sb.from("matches").insert({
    founder_id: founderId,
    investor_id: investorId,
    startup_id: row.startup_id,
    created_from_interest: row.id,
    status: "active",
  });
  return { ok: true, matched: true };
}

export async function listMyRequests(email: string) {
  const me = await approvedProfile(email);
  if (!me) return { ok: false as const, error: "Not approved yet." };
  const sb = service();
  const { data } = await sb
    .from("interests")
    .select("*, from_profile:profiles!interests_from_user_fkey(full_name, email), startups(name)")
    .or(`from_user.eq.${me.id as string},to_user.eq.${me.id as string}`)
    .order("created_at", { ascending: false });
  return { ok: true as const, requests: (data ?? []) as DbRow[] };
}

export async function listMyMatches(email: string) {
  const me = await approvedProfile(email);
  if (!me) return { ok: false as const, error: "Not approved yet." };
  const sb = service();
  const { data } = await sb
    .from("matches")
    .select("*, startups(name, tagline), founder:profiles!matches_founder_id_fkey(full_name, email), investor:profiles!matches_investor_id_fkey(full_name, email)")
    .or(`founder_id.eq.${me.id as string},investor_id.eq.${me.id as string}`)
    .eq("status", "active")
    .order("created_at", { ascending: false });
  return { ok: true as const, matches: (data ?? []) as DbRow[] };
}

export async function listMessages(email: string, matchId: string) {
  const me = await approvedProfile(email);
  if (!me) return { ok: false as const, error: "Not approved yet." };
  const sb = service();
  const { data: match } = await sb.from("matches").select("*").eq("id", matchId).eq("status", "active").maybeSingle();
  if (!match || ((match as DbRow).founder_id !== me.id && (match as DbRow).investor_id !== me.id)) {
    return { ok: false as const, error: "No access to this chat." };
  }
  const { data } = await sb.from("messages").select("*").eq("match_id", matchId).order("created_at", { ascending: true });
  return { ok: true as const, messages: (data ?? []) as DbRow[] };
}

export async function sendMessage(input: { email: string; matchId: string; body: string }) {
  const me = await approvedProfile(input.email);
  if (!me) return { ok: false, error: "Not approved yet." };
  const sb = service();
  const { data: match } = await sb.from("matches").select("*").eq("id", input.matchId).eq("status", "active").maybeSingle();
  if (!match || ((match as DbRow).founder_id !== me.id && (match as DbRow).investor_id !== me.id)) {
    return { ok: false, error: "No access to this chat." };
  }
  const { error } = await sb.from("messages").insert({ match_id: input.matchId, sender_id: me.id, body: input.body.slice(0, 2000) });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function passTarget(email: string, targetUserId: string) {
  const me = await approvedProfile(email);
  if (!me) return { ok: false, error: "Not approved yet." };
  const sb = service();
  await sb.from("passes").upsert({ user_id: me.id, target_user: targetUserId }, { onConflict: "user_id,target_user" });
  return { ok: true };
}

// ── Admin ───────────────────────────────────────────────────────

export async function getAdminData() {
  try {
  const admin = await requireAdmin();
  if (!admin) return { ok: false as const, error: "Admin only." };
  const sb = service();
  const [apps, interests, reports, members, matches, settingsRow, counts] = await Promise.all([
    sb.from("applications").select("*, profiles!applications_user_id_fkey(full_name, email, member_number)").order("submitted_at", { ascending: false }),
    sb.from("interests").select("*, from_profile:profiles!interests_from_user_fkey(full_name, email), to_profile:profiles!interests_to_user_fkey(full_name, email), startups(name)").order("created_at", { ascending: false }),
    sb.from("reports").select("*, reporter:profiles!reports_reporter_id_fkey(full_name, email), reported:profiles!reports_reported_user_fkey(full_name, email)").order("created_at", { ascending: false }),
    sb.from("profiles").select("*").order("created_at", { ascending: false }),
    sb.from("matches").select("*, startups(name), founder:profiles!matches_founder_id_fkey(full_name, email), investor:profiles!matches_investor_id_fkey(full_name, email)").order("created_at", { ascending: false }),
    sb.from("app_settings").select("*").eq("id", 1).maybeSingle(),
    sb.from("applications").select("id", { count: "exact", head: true }).eq("status", "pending"),
  ]);
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
  const { count: interestsWeek } = await sb.from("interests").select("id", { count: "exact", head: true }).gte("created_at", weekAgo);
  const { count: matchesWeek } = await sb.from("matches").select("id", { count: "exact", head: true }).gte("created_at", weekAgo);
  return {
    ok: true as const,
    adminEmail: admin.user.email ?? "",
    counts: {
      pendingApplications: counts.count ?? 0,
      totalMembers: (members.data ?? []).filter((m) => (m as DbRow).status === "approved").length,
      approvedFounders: (members.data ?? []).filter((m) => (m as DbRow).status === "approved" && (m as DbRow).role === "founder").length,
      approvedInvestors: (members.data ?? []).filter((m) => (m as DbRow).status === "approved" && (m as DbRow).role === "investor").length,
      interestsThisWeek: interestsWeek ?? 0,
      matchesThisWeek: matchesWeek ?? 0,
      totalMatches: (matches.data ?? []).length,
      openReports: (reports.data ?? []).filter((r) => (r as DbRow).status === "open").length,
    },
    applications: (apps.data ?? []) as DbRow[],
    requests: (interests.data ?? []) as DbRow[],
    reports: (reports.data ?? []) as DbRow[],
    members: (members.data ?? []) as DbRow[],
    matches: (matches.data ?? []) as DbRow[],
    settings: (settingsRow.data ?? {}) as DbRow,
  };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "Admin data failed to load." };
  }
}

export async function decideApplication(input: { applicationId: string; decision: "approved" | "rejected" | "waitlisted"; notes?: string }) {
  try {
  const admin = await requireAdmin();
  if (!admin) return { ok: false, error: "Admin only." };
  const sb = service();
  const { data: app } = await sb.from("applications").select("*").eq("id", input.applicationId).maybeSingle();
  if (!app) return { ok: false, error: "Application not found." };
  const row = app as DbRow;
  let memberNumber: number | null = null;
  if (input.decision === "approved") {
    const { data: maxRow } = await sb.from("profiles").select("member_number").order("member_number", { ascending: false }).limit(1).maybeSingle();
    memberNumber = ((maxRow?.member_number as number | null) ?? 0) + 1;
    await sb.from("profiles").update({ status: "approved", member_number: memberNumber, approved_at: new Date().toISOString() }).eq("id", row.user_id as string);
  } else {
    await sb.from("profiles").update({ status: input.decision }).eq("id", row.user_id as string);
  }
  await sb.from("applications").update({
    status: input.decision,
    reviewed_by: admin.profile.id as string,
    reviewed_at: new Date().toISOString(),
    admin_notes: input.notes ?? null,
  }).eq("id", input.applicationId);
  await sb.from("admin_audit_log").insert({
    admin_id: admin.profile.id as string,
    action: `application_${input.decision}`,
    target_type: "application",
    target_id: input.applicationId,
    details: { member_number: memberNumber },
  });
  return { ok: true, memberNumber };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Decision failed." };
  }
}

export async function setMemberStatus(input: { userId: string; status: "approved" | "suspended" }) {
  try {
    const admin = await requireAdmin();
    if (!admin) return { ok: false, error: "Admin only." };
    const sb = service();
    const { error } = await sb.from("profiles").update({ status: input.status }).eq("id", input.userId);
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed." };
  }
}

export async function updateSettings(input: { founder_weekly_intro_limit?: number; pass_cooldown_days?: number; interest_expiry_days?: number; applications_open?: boolean }) {
  try {
    const admin = await requireAdmin();
    if (!admin) return { ok: false, error: "Admin only." };
    const sb = service();
    const { error } = await sb.from("app_settings").update(input).eq("id", 1);
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed." };
  }
}

export async function getDatabaseOverview() {
  try {
  const admin = await requireAdmin();
  if (!admin) return { ok: false as const, error: "Admin only." };
  const sb = service();
  const tables = ["profiles", "applications", "startups", "investor_profiles", "investor_private", "interests", "passes", "matches", "messages", "reports", "notifications", "admin_audit_log", "app_settings"];
  const counts: Record<string, number> = {};
  for (const t of tables) {
    const { count } = await sb.from(t).select("id", { count: "exact", head: true });
    counts[t] = count ?? 0;
  }
  return { ok: true as const, counts };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "Failed." };
  }
}

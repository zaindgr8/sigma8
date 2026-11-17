# Sigma 8 — MVP Website Build Plan

> **Purpose of this document:** a complete, self-contained build spec for the Sigma 8 MVP web platform. Hand it to any developer or AI coding agent and they should be able to build the product end to end without other context.
>
> **Version:** 1.0 · **Status:** Approved for build · **Target:** Web MVP (Next.js) → Mobile app later (Expo/React Native on the same backend)

---

## 0. TL;DR

Sigma 8 is a **verified, invitation-only matchmaking platform between startup founders and investors** ("Tinder for founders and investors"), launching in **Dubai first, then the wider GCC**.

- Everyone **applies** via a form → an **admin approves** them in an admin panel → only then can they access the platform.
- **Founders/startups are prominent** — full public profiles.
- **Investors are discreet** — they show proof they are legit (verified seal, type, ticket size, focus) but **not their identity** until they accept a match.
- **Investors browse startups** and can express interest. **Founders browse investor cards** and can request an intro (rate-limited).
- **Mutual interest = Match** → investor identity revealed, chat unlocked, email notification sent.
- Look and feel: **quiet luxury** — obsidian black, ivory type, a touch of champagne gold. Cormorant Garamond + Inter.

---

## 1. Brand System (from Sigma 8 Brand Identity v1.0)

### 1.1 Positioning
- Tagline: **"Infinite Possibilities. Limitless Growth."**
- Headline voice: **"Where verified investors meet exceptional founders."** / **"Where serious capital meets exceptional founders."**
- Brand descriptors: **Verified · High value · By invitation.**
- Supporting copy tone: *"Every member is verified before they enter the room. Deal flow is curated, introductions are deliberate, and every meeting is worth the time."*
- Feel: a private members' club, not a generic SaaS. Restrained, confident, spacious. No loud gradients, no stock emojis, no playful illustrations.

### 1.2 Logo concept
- Two equal rings stacked into an **8** = investor and founder, equal footing. Upper ring = *Capital*, lower ring = *Vision*.
- Rotated, the 8 becomes **∞** (Infinite Possibilities).
- The **gold lens** where the rings overlap = the verified meeting point. It is the only gold in the mark.
- **Σ (Sigma)** = sum; the right pair is more than the sum of its parts (Limitless Growth).

### 1.3 Logo assets to produce (as inline SVG React components)
| Asset | Notes |
|---|---|
| `LogoMark` | Two stacked rings (stroke = currentColor / Ivory), gold lens fill `#C6A15B`. Prop `variant: "dark" \| "light" \| "champagne"` — on champagne background the lens turns obsidian. |
| `LogoHorizontal` | Mark + wordmark "SIGMA 8" (Cormorant Garamond 500, caps, tracking ~0.28em). |
| `LogoStacked` | Mark above wordmark, optional slogan below in Inter caps tracked +24%. |
| `AppIcon` / favicon | Mark on obsidian rounded square. Heavier strokes below 48px; drop the lens at 16px. |
| `VerifiedSeal` | Circular seal: thin champagne ring with text on a circle path "SIGMA 8 · VERIFIED MEMBER · INVESTORS × FOUNDERS ·", mark in centre. Used on verified profiles, member pass, certificates. |
| Banner motif | Two very large, faint overlapping rings with a dim gold lens, bleeding off the right edge (hero background). |

Clear space around any lockup = height of the gold lens.

### 1.4 Colour tokens
| Token | Hex | Usage | Share |
|---|---|---|---|
| `obsidian` | `#0B0B0D` | Primary background | ~70% |
| `graphite` | `#1C1C20` | Cards, panels, inputs | ~12% |
| `ivory` | `#F4F1EA` | Primary text; light sections background | ~12% |
| `stone` | `#8A8780` | Labels, secondary text, rules/dividers | ~4% |
| `champagne` | `#C6A15B` | **Accent only** — verified badges, match moments, primary CTA, active states | ~2% |

Derived helpers (allowed): `graphite-2 #26262B` (hover), `line rgba(244,241,234,0.08)` (hairlines), `champagne-dim rgba(198,161,91,0.15)` (badge backgrounds).
Light sections (e.g. invitation-style cards, legal pages) may use ivory `#F4F1EA` / `#E9E5DD` background with obsidian text.

**Rule:** gold is used only where it means something (verification, a match, the one main action on a screen). Never for decoration en masse.

### 1.5 Typography
| Role | Font | Weights | Notes |
|---|---|---|---|
| Display (headlines, wordmark, big numbers) | **Cormorant Garamond** | 500 (400/600 allowed) | Caps tracked +26–30% for wordmark/eyebrows; sentence case for headlines |
| Text (body, UI, labels) | **Inter** | 300–500 | Labels/eyebrows in caps, tracked +24%, small size (11–12px), Stone colour |

Load via `next/font/google`. Arabic (Phase GCC): pair with **IBM Plex Sans Arabic** (text) and **Noto Naskh Arabic** or **Amiri** (display).

### 1.6 UI language
- Generous whitespace, thin 1px hairline borders, subtle radius (6–12px; app icon/pass 16–20px).
- Eyebrow labels like `01 — HOW IT WORKS` above section headings.
- Short gold rule (≈64px × 1px) under hero headings.
- Motion: slow and soft (200–400ms ease-out fades/slides). Swipe cards may use spring physics. Respect `prefers-reduced-motion`.
- Brand-in-use references: **Member Pass** card (graphite card, "SIGMA 8" + VERIFIED tag top, large mark, "MEMBER · INVESTOR", name, "No. 0042 · Since 2026") and **Private Invitation** card (ivory card, "The Sigma Table"). Reuse these as UI patterns.

---

## 2. Product Rules

### 2.1 Roles
| Role | Description |
|---|---|
| `founder` | Represents a startup. One startup per founder account in MVP (co-founders can be listed on the profile but only one login). |
| `investor` | Angel, VC, family office, corporate VC, syndicate lead, etc. |
| `admin` | Sigma 8 team. Reviews applications, moderates, sees everything. |

### 2.2 Membership status (gate)
`pending` → `approved` | `rejected` | `waitlisted`; approved members can later be `suspended`.
- Only `approved` users can access `/app/*`.
- `pending` users see an "Under review" screen.
- `rejected` users see a polite decline message (option to re-apply after 90 days).
- `waitlisted` users see "You're on the list" (used when supply/demand balance requires it).

### 2.3 Visibility rules (critical — enforce in the database with RLS, not just in UI)

**Startup profiles (prominent):** visible in full to all approved investors (and to admins). Founders can see other startups? → **No** in MVP (founders only see investors), to protect founders' information.

**Pitch deck:** visible to approved investors **only after the founder accepts their interest / after a match** (default). Configurable per startup: `deck_visibility = 'matched_only' | 'all_investors'`.

**Investor profiles (discreet):** split into two layers.

| Public layer (visible to approved founders) | Private layer (revealed only to matched founders) |
|---|---|
| Verified seal | Full name |
| Investor type (Angel / VC / Family Office / CVC / Syndicate / Other) | Firm / fund name, website |
| Headline (e.g. "Operator-angel, ex-fintech founder") — no names/firms | Title / role |
| Ticket size range (e.g. $50k–$250k) | LinkedIn URL |
| Preferred stages (Pre-seed, Seed, Series A, B+) | Email, phone (only if investor opts in) |
| Sectors of interest | Photo |
| Geographic focus (UAE, KSA, Qatar, Bahrain, Kuwait, Oman, MENA, Global) | Full portfolio list |
| Number of investments (bucket: 1–5, 6–20, 20+) | |
| Years investing (bucket) | |
| Base city (e.g. Dubai) | |
| Optional: "Lead / follow" preference | |

Investor card shows an **anonymous handle** e.g. "Investor · No. 0042" plus an abstract avatar (the ring mark in a tinted variant), never a photo, until matched.

### 2.4 Interaction & matching logic

```
INVESTOR → startup:  "Express interest"  (or "Pass")
FOUNDER  → investor: "Request intro"     (or "Pass") — limited to 5 per rolling 7 days
```

- An **interest** row is created with `from_user`, `to_user`, `status = 'pending'`, optional short note (max 300 chars).
- The recipient sees it in **Requests** and can **Accept** or **Decline**.
- If the other side had already expressed interest (both directions exist), the match is created automatically.
- **Match created when:** recipient accepts, OR mutual interest exists.
- On match:
  1. `matches` row created.
  2. Investor's private layer becomes readable by that founder (RLS checks existence of a match).
  3. Deck becomes visible to that investor (if `matched_only`).
  4. Chat thread unlocked.
  5. Both receive email: "You have a new match on Sigma 8".
  6. UI shows a **match moment**: rings animate together, gold lens fills, "A verified match."
- **Pass** = hidden from that user's Discover for 90 days (stored in `passes`).
- Declined interests are not shown to the requester as "declined" — they simply stay "Pending" for 14 days then show "Expired" (protects feelings, keeps it premium).
- Founder intro limit: **5 requests per rolling 7 days** (configurable in `app_settings`). Investors: unlimited in MVP.
- Either side can **unmatch** or **report**. Reports go to admin queue.

### 2.5 Discover experience
- **Swipe deck** (default on mobile): one card at a time, buttons ✕ Pass / ◎ Interest (and keyboard ← →), drag-to-swipe.
- **Grid view** toggle (default on desktop) with filters.
- Filters for investors browsing startups: sector, stage, country, raise amount range, revenue/traction band.
- Filters for founders browsing investors: investor type, ticket range, stage, sector, geography.
- Ordering: relevance score = overlap of sector + stage + geography + ticket/raise compatibility, then newest. Keep it simple SQL scoring for MVP.
- Exclude: self, already-interested, passed (within 90 days), matched, suspended users.

---

## 3. User Flows

### 3.1 Application & approval
1. Visitor lands on site → clicks **Apply** → chooses **I'm a Founder** / **I'm an Investor**.
2. Creates account (email + magic link / OTP) — this ensures email is verified.
3. Fills **multi-step application form** (see §7). Progress saved as draft.
4. Submits → status `pending` → sees "Under review" screen + receives "Application received" email.
5. Admin reviews in `/admin/applications` → Approve / Reject / Waitlist / Request more info, with internal notes.
6. On approve → email "Welcome to Sigma 8" → user logs in → sees **Member Pass** reveal screen (their number, role, "Since 2026") → completes remaining profile fields → lands on Discover.

### 3.2 Founder flow
Discover investors → Request intro (with optional note) → wait → Match → chat → meeting.
Also: Requests inbox shows **investors who expressed interest** in their startup → Accept/Decline.

### 3.3 Investor flow
Discover startups → open full startup profile → Express interest → founder accepts → Match → identity revealed to founder, deck opens → chat.
Also: Requests inbox shows founders' intro requests (founder profile fully visible) → Accept/Decline.

### 3.4 Admin flow
Application queue → review → decision. Members list → view / suspend / change role. Reports queue. Matches overview + basic metrics.

---

## 4. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (latest stable, App Router)** + **TypeScript (strict)** | SSR/SEO for marketing, server actions for app |
| Styling | **Tailwind CSS v4** with brand tokens as CSS variables | Fast, consistent |
| UI primitives | **shadcn/ui** (Radix) restyled to brand | Accessible components |
| Animation | **Framer Motion** (`motion`) | Swipe deck, match moment |
| Forms | **React Hook Form + Zod** | Multi-step application forms, shared validation client/server |
| Backend | **Supabase**: Postgres, Auth, Storage, Realtime | One backend for web now and mobile app later; RLS enforces privacy |
| DB access | `@supabase/ssr` + `@supabase/supabase-js`; SQL migrations via Supabase CLI; generated TS types | |
| Email | **Resend** + **React Email** templates | Transactional emails |
| i18n | **next-intl** (EN at launch, AR + RTL ready) | GCC rollout |
| Analytics | Vercel Analytics (+ PostHog optional) | |
| Errors | Sentry (optional, Phase 6) | |
| Hosting | **Vercel** | |
| Package manager | pnpm | |
| Lint/format | ESLint + Prettier | |
| Tests | Vitest (unit, RLS policy tests via SQL), Playwright (critical flows) | |

**Data region note:** choose the Supabase region closest to the GCC that is available (check for a Middle East region first; otherwise Mumbai or Frankfurt). Revisit UAE PDPL / data residency before scale.

---

## 5. Project Structure

```
sigma8/
├─ app/
│  ├─ [locale]/
│  │  ├─ (marketing)/
│  │  │  ├─ page.tsx                 # Home
│  │  │  ├─ how-it-works/page.tsx
│  │  │  ├─ founders/page.tsx
│  │  │  ├─ investors/page.tsx
│  │  │  ├─ about/page.tsx
│  │  │  ├─ privacy/page.tsx
│  │  │  ├─ terms/page.tsx
│  │  │  └─ layout.tsx               # Public header/footer
│  │  ├─ (auth)/
│  │  │  ├─ login/page.tsx
│  │  │  └─ auth/callback/route.ts
│  │  ├─ apply/
│  │  │  ├─ page.tsx                 # Choose role
│  │  │  ├─ founder/page.tsx         # Multi-step form
│  │  │  ├─ investor/page.tsx
│  │  │  └─ status/page.tsx          # Pending / rejected / waitlisted screens
│  │  ├─ app/                        # Approved members only
│  │  │  ├─ layout.tsx               # App shell (sidebar desktop / bottom nav mobile)
│  │  │  ├─ welcome/page.tsx         # Member Pass reveal (first login after approval)
│  │  │  ├─ discover/page.tsx
│  │  │  ├─ startups/[id]/page.tsx
│  │  │  ├─ investors/[id]/page.tsx
│  │  │  ├─ requests/page.tsx
│  │  │  ├─ matches/page.tsx
│  │  │  ├─ messages/page.tsx
│  │  │  ├─ messages/[matchId]/page.tsx
│  │  │  └─ profile/page.tsx         # Edit own profile + settings
│  │  └─ admin/                      # Admin only
│  │     ├─ layout.tsx
│  │     ├─ page.tsx                 # Dashboard metrics
│  │     ├─ applications/page.tsx
│  │     ├─ applications/[id]/page.tsx
│  │     ├─ members/page.tsx
│  │     ├─ members/[id]/page.tsx
│  │     ├─ matches/page.tsx
│  │     ├─ reports/page.tsx
│  │     └─ settings/page.tsx
│  └─ api/ (only if needed, prefer server actions)
├─ components/
│  ├─ brand/ (LogoMark, LogoHorizontal, VerifiedSeal, MemberPass, RingsBackdrop)
│  ├─ marketing/ (Hero, Section, FeatureCard, ApplyCTA, FAQ, Footer)
│  ├─ app/ (SwipeDeck, StartupCard, InvestorCard, FilterBar, MatchMoment, ChatThread, RequestItem)
│  ├─ admin/ (ApplicationTable, ReviewPanel, StatusBadge, MetricCard)
│  └─ ui/ (shadcn components, restyled)
├─ lib/
│  ├─ supabase/ (server.ts, client.ts, middleware.ts, admin.ts [service role, server-only])
│  ├─ validation/ (zod schemas: application, startup, investor, message)
│  ├─ matching/ (scoring, limits)
│  ├─ email/ (resend client + send helpers)
│  └─ constants.ts (sectors, stages, countries, ticket ranges)
├─ emails/ (React Email templates)
├─ messages/ (next-intl: en.json, ar.json)
├─ supabase/
│  ├─ migrations/*.sql
│  ├─ seed.sql                       # demo data for local/dev
│  └─ tests/*.sql                    # RLS tests
├─ middleware.ts                     # locale + auth + status gate
├─ public/ (favicons, og image)
└─ tests/e2e/*.spec.ts
```

---

## 6. Data Model (Postgres / Supabase)

All tables have `id uuid pk default gen_random_uuid()`, `created_at timestamptz default now()`, `updated_at timestamptz` (trigger) unless noted.

### 6.1 Enums
```sql
create type user_role         as enum ('founder','investor','admin');
create type member_status     as enum ('draft','pending','approved','rejected','waitlisted','suspended');
create type investor_type     as enum ('angel','vc','family_office','cvc','syndicate','accelerator','other');
create type startup_stage     as enum ('idea','pre_seed','seed','series_a','series_b_plus','growth');
create type interest_status   as enum ('pending','accepted','declined','expired','withdrawn');
create type deck_visibility   as enum ('matched_only','all_investors');
create type report_status     as enum ('open','reviewing','resolved','dismissed');
```

### 6.2 Tables

**`profiles`** (1:1 with `auth.users`, `id = auth.users.id`)
| column | type | notes |
|---|---|---|
| id | uuid pk fk auth.users | |
| role | user_role | |
| status | member_status | default `draft` |
| member_number | int unique | assigned on approval (sequence), shown on Member Pass |
| full_name | text | private for investors |
| email | text | |
| phone | text | E.164, default country +971 |
| country | text | ISO code |
| city | text | |
| linkedin_url | text | |
| avatar_url | text | founders only shown publicly |
| locale | text | 'en' / 'ar' |
| approved_at | timestamptz | |
| last_active_at | timestamptz | |
| welcome_seen | boolean default false | Member Pass shown once |

**`applications`**
| column | type | notes |
|---|---|---|
| user_id | uuid fk profiles | |
| role | user_role | |
| answers | jsonb | full form payload (snapshot) |
| status | member_status | pending/approved/rejected/waitlisted |
| submitted_at | timestamptz | |
| reviewed_by | uuid fk profiles | admin |
| reviewed_at | timestamptz | |
| decision_reason | text | internal |
| admin_notes | text | internal |
| referral_source | text | how they heard about Sigma 8 |
| referred_by_code | text | optional invite code |

**`startups`**
| column | type | notes |
|---|---|---|
| owner_id | uuid fk profiles unique | founder |
| name | text | |
| tagline | text | ≤ 120 chars |
| description | text | ≤ 1500 chars |
| logo_url | text | |
| website | text | |
| sector | text[] | from constants |
| stage | startup_stage | |
| country_hq | text | |
| city | text | |
| founded_year | int | |
| team_size | int | |
| business_model | text | B2B / B2C / B2B2C / Marketplace / Other |
| traction_summary | text | e.g. "$40k MRR, 30% MoM" |
| monthly_revenue_band | text | pre-revenue, <10k, 10–50k, 50–250k, 250k+ (USD) |
| raising | boolean | |
| raise_amount_usd | numeric | |
| raise_currency_display | text | 'USD' / 'AED' |
| valuation_cap_usd | numeric | optional, private-ish (investors only) |
| use_of_funds | text | |
| previous_funding_usd | numeric | |
| co_founders | jsonb | [{name, role, linkedin}] |
| deck_path | text | Supabase Storage path (private bucket) |
| deck_visibility | deck_visibility | default `matched_only` |
| video_url | text | optional pitch video (YouTube/Loom) |
| is_visible | boolean default true | founder can pause listing |

**`investor_profiles`**
| column | type | layer |
|---|---|---|
| user_id | uuid fk profiles unique | — |
| public_handle | text | public — e.g. "Investor No. 0042" (auto) |
| investor_type | investor_type | public |
| headline | text | public — no names/firms (validated + admin-reviewed) |
| bio_public | text | public, ≤ 500 chars, anonymous |
| ticket_min_usd | numeric | public |
| ticket_max_usd | numeric | public |
| stages | startup_stage[] | public |
| sectors | text[] | public |
| geographies | text[] | public |
| investments_count_band | text | public ('1-5','6-20','20+') |
| years_investing_band | text | public |
| leads_rounds | boolean | public |
| base_city | text | public |
| firm_name | text | **private** |
| firm_website | text | **private** |
| title | text | **private** |
| portfolio | jsonb | **private** |
| share_contact_on_match | boolean default true | **private** |
| accreditation_note | text | **admin-only** (how verified) |
| is_visible | boolean default true | |

> **Implementation of the private layer:** keep private columns in a separate table **`investor_private`** (`user_id`, `firm_name`, `firm_website`, `title`, `portfolio`, `share_contact_on_match`) so RLS can protect it cleanly. Public discover queries only touch `investor_profiles`. Investor's `full_name`, `avatar_url`, `linkedin_url`, `phone` on `profiles` are exposed to others only through a **security-definer view/function** `get_investor_reveal(investor_id)` that checks a match exists.

**`interests`**
| column | type | notes |
|---|---|---|
| from_user | uuid fk profiles | |
| to_user | uuid fk profiles | |
| startup_id | uuid fk startups | the startup involved (always set) |
| note | text | ≤ 300 chars |
| status | interest_status | default pending |
| responded_at | timestamptz | |
| expires_at | timestamptz | created_at + 14 days |
| unique(from_user, to_user) | | |

**`passes`** — `user_id`, `target_user`, `created_at` (hidden from Discover for 90 days).

**`matches`**
| column | type | notes |
|---|---|---|
| founder_id | uuid fk profiles | |
| investor_id | uuid fk profiles | |
| startup_id | uuid fk startups | |
| created_from_interest | uuid fk interests | |
| status | text | 'active' / 'unmatched' |
| unmatched_by | uuid | |
| unique(founder_id, investor_id) | | |

**`messages`**
| column | type | notes |
|---|---|---|
| match_id | uuid fk matches | |
| sender_id | uuid fk profiles | |
| body | text | ≤ 4000 chars |
| read_at | timestamptz | |

**`reports`** — `reporter_id`, `reported_user`, `match_id` (nullable), `reason` (enum-ish text), `details`, `status report_status`, `handled_by`, `handled_at`.

**`notifications`** (in-app bell) — `user_id`, `type` ('interest_received','match','message','application_update'), `payload jsonb`, `read_at`.

**`admin_audit_log`** — `admin_id`, `action`, `target_table`, `target_id`, `diff jsonb`, `created_at`.

**`app_settings`** (single row / key-value) — `founder_weekly_intro_limit = 5`, `pass_cooldown_days = 90`, `interest_expiry_days = 14`, `applications_open = true`.

### 6.3 Storage buckets
| Bucket | Access |
|---|---|
| `avatars` | Public read (founders); investor avatars in a private bucket `investor-avatars` (signed URLs after match) |
| `logos` | Public read |
| `decks` | **Private**. Signed URL (short expiry, 10 min) generated server-side only if: requester is admin, owner, or approved investor AND (`deck_visibility = 'all_investors'` OR a match exists). |

### 6.4 Database functions / triggers
- `handle_new_user()` — trigger on `auth.users` insert → create `profiles` row (role from signup metadata, status `draft`).
- `is_admin()`, `is_approved()`, `my_role()` — `security definer stable` helpers used in RLS.
- `has_match(a uuid, b uuid) returns boolean`.
- `approve_application(app_id uuid)` — admin only: sets application + profile status `approved`, assigns `member_number` from sequence, sets `approved_at`, writes audit log. (Email sent from the server action after success.)
- `express_interest(target uuid, note text)` — validates both approved, role pairing (founder↔investor only), rate limit for founders, not already matched; inserts interest; **if reverse interest exists → creates match** atomically. Returns `{interest_id, matched: boolean, match_id}`.
- `respond_interest(interest_id uuid, accept boolean)` — only `to_user` can call; on accept → create match.
- `discover_startups(filters jsonb, limit int, offset int)` and `discover_investors(filters jsonb, ...)` — return ranked lists applying exclusion rules and scoring.
- `get_investor_reveal(investor_id uuid)` — returns private fields only if caller is admin, the investor, or has an active match.
- Scheduled job (pg_cron or Vercel Cron) daily: expire interests past `expires_at`.

### 6.5 Row-Level Security (enable on every table)
| Table | Select | Insert/Update/Delete |
|---|---|---|
| profiles | self; admins all; founders' public fields readable by approved investors via view `public_founder_profiles` | self update (limited columns, not role/status/member_number); admin all |
| applications | self; admins | self insert/update while `draft`/`pending`; admin update |
| startups | owner; admins; approved investors where `is_visible` | owner; admin |
| investor_profiles | self; admins; approved founders where `is_visible` | self; admin |
| investor_private | self; admins; matched founders (via `has_match`) | self; admin |
| interests | from_user or to_user; admins | via RPC functions only (no direct insert) |
| passes | self | self |
| matches | participants; admins | via RPC; participants may set `status='unmatched'` |
| messages | match participants (active match); admins | sender must be participant of active match |
| reports | reporter; admins | reporter insert; admin update |
| notifications | self | system/RPC insert; self update `read_at` |
| admin_audit_log, app_settings | admins (settings readable by authenticated) | admins |

**Write SQL tests** proving: a founder cannot read `investor_private` without a match; an investor cannot read another investor; a pending user cannot read startups; a founder cannot see other startups; deck URL not issuable without permission.

---

## 7. Application Forms (multi-step, Zod-validated, draft autosave)

### 7.1 Founder application
**Step 1 — You:** full name, email (pre-filled), phone (+971 default), country, city, LinkedIn URL (required), role at company (CEO/CTO/…).
**Step 2 — Company:** startup name, website, one-line tagline, sector(s) (multi, max 3), stage, HQ country/city, founded year, team size, business model.
**Step 3 — Traction & raise:** revenue band, traction summary (textarea), currently raising (y/n), raise amount (USD or AED toggle; store USD), previous funding, use of funds.
**Step 4 — Materials:** logo upload, pitch deck upload (PDF ≤ 20MB), optional pitch video URL, co-founders (repeatable: name, role, LinkedIn).
**Step 5 — Final:** how did you hear about us, invite/referral code (optional), agree to Terms & Privacy & Community Guidelines (checkbox), confirm info accuracy. Submit.

### 7.2 Investor application
**Step 1 — You:** full name, email, phone, country, city, LinkedIn URL (required), title.
**Step 2 — Investing profile:** investor type, firm/fund name (private), firm website (private), years investing, number of investments, ticket min/max (USD), leads rounds (y/n).
**Step 3 — Thesis:** stages, sectors, geographies, anonymous headline (helper text: "Don't include your name or firm"), short anonymous bio.
**Step 4 — Verification:** notable portfolio companies (private), proof note (free text: e.g. "Partner at X, see LinkedIn"), optional supporting doc upload (private, admin-only), consent to be contacted by Sigma 8 for verification call.
**Step 5 — Final:** referral, invite code, terms agreement. Submit.

On submit: write `applications.answers` snapshot + populate `startups` / `investor_profiles` / `investor_private` tables (so approval just flips status).

---

## 8. Pages & Screens

### 8.1 Marketing site (public, SEO, dark obsidian theme)
**Header:** LogoHorizontal · How it works · For Founders · For Investors · About · [Sign in] · **[Apply]** (champagne). Language switcher (EN / عربي — AR hidden until enabled).

**Home**
1. **Hero:** eyebrow "BY INVITATION · DUBAI"; H1 "Where verified investors meet exceptional founders."; gold rule; sub "Infinite possibilities. Limitless growth."; CTAs: [Apply as Founder] [Apply as Investor]; RingsBackdrop motif.
2. **Trust strip:** "Every member verified" · "Curated deal flow" · "Founders ↔ Investors, on equal footing" · "Dubai · GCC".
3. **01 — How it works:** Apply → Get verified → Discover → Match → Meet (5 steps, numbered I–V in Roman numerals, gold small).
4. **02 — For Founders:** reach verified GCC capital, no cold emails, control who sees your deck.
5. **03 — For Investors:** curated, pre-screened deal flow; stay discreet until you choose to reveal yourself.
6. **04 — The mark / philosophy:** "One mark. Three meanings." (The Eight, Infinity, The gold point, Σ) — brand storytelling section.
7. **Member Pass showcase:** visual of the pass + VerifiedSeal: "Your membership, verified."
8. **FAQ** (who can join, cost, how verification works, privacy of investors, is Sigma 8 a broker — no).
9. **Final CTA:** "Request your invitation." [Apply].
**Footer:** logo, tagline, links, legal, "Dubai, UAE", social, © Sigma 8.

**How it works / For Founders / For Investors / About:** deeper versions of the home sections. About tells the brand story + mission for GCC.
**Privacy / Terms / Community Guidelines:** light ivory theme, readable long-form.

### 8.2 Auth
- `/login`: email → magic link / 6-digit OTP. Brand-styled, minimal.
- Middleware gate: unauthenticated → login; `draft` → continue application; `pending/rejected/waitlisted` → `/apply/status`; `approved` → `/app/*`; `admin` → can access `/admin/*`; `suspended` → status page.

### 8.3 Member app (approved only)
**Shell:** desktop left sidebar (Discover, Requests [badge], Matches, Messages [badge], Profile) + top bar with notifications bell; mobile bottom nav.

- **Welcome / Member Pass** (`/app/welcome`): animated reveal of the pass — rings draw in, gold lens fills, "SIGMA 8 · VERIFIED", "MEMBER · FOUNDER/INVESTOR", name, "No. 0042 · Since 2026". CTA "Enter".
- **Discover:**
  - Investor view → **StartupCard**: logo, name, tagline, sector chips, stage, HQ, raise amount, traction line, VerifiedSeal small. Actions: Pass / Express interest (opens note modal) / View full profile.
  - Founder view → **InvestorCard**: anonymous handle "Investor · No. 0042", abstract ring avatar, VerifiedSeal, type, headline, ticket range, stages, sectors, geographies, deal count band. Actions: Pass / Request intro (shows remaining "3 of 5 intros left this week").
  - Toggle Swipe / Grid. FilterBar. Empty state: "You've seen everyone for now. New members are verified every week."
- **Startup detail** (`/app/startups/[id]`): full profile, team, traction, raise, deck section (locked with "Unlocks when you match" or available), video. Sticky action bar.
- **Investor detail** (`/app/investors/[id]`): public layer; after match, the revealed private layer with a subtle gold "Revealed on match" label.
- **Requests:** tabs *Received* / *Sent*. Received items show requester card + note + Accept / Decline. Sent shows Pending / Expired / Matched.
- **Matches:** grid of matched counterparts; click → profile or chat.
- **Messages:** thread list + chat view (Supabase Realtime), read receipts, text only in MVP; "Suggest a meeting" helper inserts a template message. Safety footer: "Never share funds through chat. Report suspicious behaviour."
- **MatchMoment overlay:** full-screen obsidian, two rings slide together, lens fills gold, "A verified match." + [Send a message] [Keep discovering].
- **Profile:** edit profile fields, upload deck/logo, deck visibility toggle, pause listing (is_visible), notification preferences, language, delete account request.

### 8.4 Admin panel (`/admin`, role = admin)
- **Dashboard:** counts — pending applications, approved founders/investors, interests this week, matches this week, messages, acceptance rate; simple charts.
- **Applications queue:** table with filters (role, status, date, country); columns: name, role, company/firm, country, submitted, status. Detail page shows all answers, uploaded files (signed links), LinkedIn link, internal notes, decision buttons **Approve / Waitlist / Reject / Request info** (request info sends email with admin message). Bulk approve allowed.
- **Members:** search, filter, view profile (both layers), change status (suspend/reinstate), edit anonymous headline if it leaks identity, reset intro limit.
- **Matches:** list with founder, investor, startup, date, message count.
- **Reports:** queue with actions.
- **Settings:** applications open/closed, intro limit, cooldowns, admin users.
- Every admin action → `admin_audit_log`.

---

## 9. Emails (Resend + React Email, brand-styled dark with ivory text)
| Trigger | Email |
|---|---|
| Application submitted | "We've received your application" |
| Approved | "Welcome to Sigma 8 — your membership is verified" (with member number) |
| Rejected | Polite decline |
| Waitlisted | "You're on the list" |
| Request info | Admin's message + link back to edit application |
| Interest/intro received | "A verified [founder/investor] wants to connect" (no identity of investor) |
| Match | "You have a new match" |
| New message (batched, max 1 per thread per hour if user offline) | "New message on Sigma 8" |
| Admin alert | New application submitted (to admin inbox) |

---

## 10. Internationalisation & GCC readiness
- next-intl with `[locale]` segment; `en` default; `ar` prepared (all strings in `messages/*.json`, no hard-coded copy).
- Use logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`, `start`, `end`) everywhere so RTL works by setting `dir="rtl"`.
- Phone input with GCC country codes first (+971, +966, +974, +973, +965, +968).
- Currency: store USD; display toggle USD / AED (fixed peg 3.6725).
- Countries list prioritises GCC. Dates in `Asia/Dubai` timezone by default.
- Weekend awareness (Sat–Sun in UAE) for any scheduled emails.

---

## 11. Security, Privacy & Compliance
- RLS on every table; service-role key only on server, never shipped to client.
- Investor anonymity: validate `headline`/`bio_public` server-side against firm name and full name (reject if contained); admin can edit.
- Signed, short-lived URLs for decks and private files.
- Rate limiting on auth, interests, messages (Supabase function checks + Vercel middleware / Upstash optional).
- Input sanitisation; markdown not rendered in chat (plain text).
- Audit log for admin actions.
- Account deletion request flow (admin processes; hard delete or anonymise).
- Cookie banner (essential + analytics opt-in).
- Legal pages: Terms, Privacy (UAE PDPL-aware), Community Guidelines.
- **Regulatory positioning:** Sigma 8 is an **introduction / networking platform**. It does **not** hold or transfer funds, give investment advice, or arrange deals. Include this disclaimer in footer + Terms. **Get legal review** (DFSA / ADGM FSRA / SCA depending on licence jurisdiction) before public launch.

---

## 12. Performance, SEO & Quality
- Marketing pages statically rendered; Lighthouse ≥ 90 on all categories.
- Metadata, Open Graph image (obsidian with logo + tagline), sitemap, robots (block `/app`, `/admin`).
- `next/image`, `next/font`, minimal client JS on marketing pages.
- Accessibility: WCAG AA contrast (check Stone on Obsidian for small text — use it for labels only at ≥ 12px), keyboard navigable swipe deck, focus rings in champagne.
- Fully responsive: 360px → 1440px+.

---

## 13. Environment Variables
```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server only
RESEND_API_KEY=
EMAIL_FROM="Sigma 8 <hello@DOMAIN>"
ADMIN_ALERT_EMAIL=
NEXT_PUBLIC_DEFAULT_LOCALE=en
CRON_SECRET=
```

---

## 14. Build Phases & Acceptance Criteria

### Phase 1 — Foundation
- Next.js + TS + Tailwind + shadcn + next-intl scaffolded; pnpm; ESLint/Prettier.
- Brand tokens (CSS variables), fonts, all brand SVG components (§1.3), favicon/app icons, OG image.
- Base layouts (marketing, app shell, admin shell) with placeholder pages.
- **Done when:** `pnpm build` passes; a `/styleguide` page (dev only) shows colours, type scale, buttons, inputs, cards, logo variants, seal, member pass.

### Phase 2 — Marketing site + Apply UI
- All marketing pages with final copy (§8.1), responsive, animated tastefully.
- Apply role chooser + both multi-step forms (UI + Zod validation, local draft state).
- **Done when:** Lighthouse ≥ 90; forms validate every field; mobile looks premium.

### Phase 3 — Backend, Auth, Admin approval (soft-launch milestone)
- Supabase project, migrations for all tables/enums/functions/RLS (§6), seed data, generated types.
- Auth (magic link/OTP), middleware gating by status.
- Forms persist drafts and submit to DB; file uploads to storage.
- Admin panel: dashboard, applications queue + detail + decisions, members list.
- Emails: submitted, approved, rejected, waitlisted, request-info, admin alert.
- **Done when:** a real user can apply, admin approves, user receives email, logs in and sees the Member Pass. RLS tests pass. **→ Can go live as an application-gated waitlist.**

### Phase 4 — Profiles & Discover
- Profile editing for both roles; deck visibility; pause listing.
- Discover (swipe + grid), filters, scoring, pass logic, startup & investor detail pages with correct visibility layers.
- `express_interest` with founder weekly limit.
- **Done when:** investors see startups, founders see anonymous investor cards, no private data leaks (verified via RLS tests + manual check in network tab).

### Phase 5 — Requests, Matching, Chat
- Requests inbox, accept/decline, auto-match on mutual interest, MatchMoment animation, reveal of investor private layer, deck unlock.
- Realtime chat, unread badges, notifications bell, interest/match/message emails, unmatch & report.
- Daily expiry job.
- **Done when:** full flow founder ↔ investor → match → chat works end to end (Playwright test).

### Phase 6 — Polish & Launch
- Reports queue, admin matches view, settings, audit log UI.
- Analytics, error monitoring, SEO (sitemap, metadata), legal pages, cookie banner.
- QA on mobile Safari/Chrome; accessibility pass; production deploy on Vercel with custom domain; Supabase production project + backups.
- **Done when:** production URL live, seeded with first approved members, admin team trained.

---

## 15. Post-MVP Roadmap
- **Mobile app** (Expo / React Native) on the same Supabase backend + push notifications.
- **Arabic launch** + rollout to KSA, Qatar, Bahrain, Kuwait, Oman.
- **The Sigma Table** — private events for 8 investors + 8 founders (invitations, RSVPs, event passes with the seal).
- Meeting scheduling (Calendly/Cal.com integration), video intro calls.
- Data room per startup, NDA click-through.
- Premium tiers (founder boost, investor syndicate tools), payments.
- AI-assisted matching (thesis ↔ startup embedding similarity), weekly curated digest emails.
- Investor verification upgrades (document checks, accreditation partner).
- WhatsApp notifications (popular in GCC).

---

## 16. Decisions Taken by Default (change if needed)
| # | Question | Default chosen |
|---|---|---|
| 1 | What founders see about investors before a match | Anonymous card: verified seal, type, headline, ticket range, stages, sectors, geographies, deal-count band. **No name, firm, photo, LinkedIn.** |
| 2 | Who can initiate | **Both:** investors "express interest", founders "request intro" (founders limited to 5 per week). |
| 3 | Pitch deck access | **After match** by default; founder may switch to "all approved investors". |
| 4 | Communication on match | **In-app chat** + email notification; contact details shown if investor opted in. |
| 5 | Arabic at launch | **English at launch**, Arabic/RTL infrastructure ready. |
| 6 | Pricing | **Free during MVP**, no payments. |
| 7 | Can founders see other startups | **No.** |
| 8 | Invite codes | Optional field, not required (admin approval is the gate). |

---

## 17. Instructions for the Builder (AI agent or developer)
1. Read this whole document before writing code. Follow the phases in order; finish each phase's acceptance criteria before moving on.
2. Treat **§2.3 visibility rules and §6.5 RLS** as non-negotiable — privacy of investors is the core product promise.
3. Follow the brand system in §1 exactly; gold is an accent, never a fill colour for large areas.
4. Keep all user-facing copy in `messages/en.json` (i18n-ready).
5. Prefer server components and server actions; keep client components to interactive parts (swipe deck, forms, chat).
6. Write migrations as SQL files in `supabase/migrations`; never change the DB by hand without a migration.
7. After each phase: run lint, type-check, build, tests; summarise what was built and what's next.
8. Ask the product owner before changing any rule in §2 or any default in §16.

# Sigma 8

Verified, invitation-only matchmaking between startup founders and investors.
Dubai first, then the wider GCC. Tagline: “Infinite Possibilities. Limitless Growth.”

Live: https://sigma8official.vercel.app/

## Stack

Next.js 16 (App Router) + React 19 + Tailwind CSS 4, Supabase (Postgres + Auth).
Brand: Obsidian `#0B0B0D`, Ivory `#F4F1EA`, Champagne gold `#C6A15B` (accent only),
Cormorant Garamond + Inter. English only. The public site launches empty —
no seeded members.

## What it does

- **Public site (minimalist):** hero with Apply as Founder / Apply as Investor,
  3-step How it works (Apply / Reviewed / Matched), 3 FAQs, short footer.
- **Approval-based membership:** every founder/investor submits one short,
  single-page form (essentials only). It is saved to Supabase (`profiles`
  status `pending` + `applications` + `startups` / `investor_profiles` +
  `investor_private`).
  Nothing gives member access without admin approval. Pending = Under review,
  rejected = polite decline, waitlisted = You’re on the list.
- **Member portal (`/member`):** behind the approval gate. Founders discover
  anonymous investor cards; investors discover startup profiles. Express
  interest / request intro (founders: 5 per rolling 7 days). Mutual interest
  or an accepted request forms a match — only then are investor identity and
  deck revealed, and chat unlocks.
- **Admin (`/admin`):** sign in with admin credentials (Supabase Auth).
  Only a profile with `role = 'admin'` may enter. Applications (full form,
  approve / waitlist / reject — approval assigns the next member number),
  Requests (all express-interest / intro requests), Reports, Members
  (suspend / reinstate), Matches, Settings (intro limit, pass cooldown,
  interest expiry, applications open), Database overview.

## Environment variables

Set in Vercel → Project Settings → Environment Variables (Production),
or in `.env.local` for local dev. See `.env.example`. Never commit real keys.

- `NEXT_PUBLIC_SUPABASE_URL` — e.g. `https://tnjiuzrucjrppzaqxkkg.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — publishable key (browser-safe)
- `SUPABASE_SERVICE_ROLE_KEY` — secret key, server-side only, never in client code

## Admin setup (owner)

1. In Supabase Dashboard → Authentication → Users, create the admin Auth user:
   `management@devmatesolutions.com` (choose its password there — it is not
   stored in this repo).
2. In Supabase SQL Editor, run:
   ```sql
   update public.profiles set role = 'admin', status = 'approved'
   where email = 'management@devmatesolutions.com';
   ```
   (The profile row is created when that email submits any application;
   run the update after that, or insert the profile first.)
3. Sign in at `/admin/login` with those credentials.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build — must pass before pushing
```

## Database

Tables already exist in the Supabase project (schema SQL + one-time repair
already run: `profiles.id` is NOT anchored to `auth.users`, it defaults to
`gen_random_uuid()`). Tables: profiles, applications, startups,
investor_profiles, investor_private, interests, passes, matches, messages,
reports, notifications, admin_audit_log, app_settings.

Sigma 8 is an introduction platform only. It does not hold funds, give
investment advice, or arrange deals.

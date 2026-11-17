import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Supabase env vars are NOT set on the live Vercel deployment yet.
 * Nothing in this module may throw when they are missing — a missing
 * env var must surface as a clear "not configured" message, never as
 * a 500 on /admin or any other route.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export const NOT_CONFIGURED_ERROR =
  "Supabase is not configured on this deployment. Set NEXT_PUBLIC_SUPABASE_URL, " +
  "NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY in Vercel → " +
  "Project Settings → Environment Variables, then redeploy.";

function maybeEnv(name: string): string | null {
  return process.env[name] ?? null;
}

/** Server client bound to the signed-in user's session (cookies). Null when not configured. */
export async function getServerClient() {
  const url = maybeEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anon = maybeEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!url || !anon) return null;
  const cookieStore = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — cookies are set by proxy.
        }
      },
    },
  });
}

/**
 * Service-role client — server only, bypasses RLS. Null when not configured.
 * NEVER import this from client code. Used by server actions / admin pages.
 */
export function getServiceClient() {
  const url = maybeEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = maybeEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return null;
  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** The signed-in Auth user, or null (including when Supabase is not configured). */
export async function getAuthUser() {
  try {
    const supabase = await getServerClient();
    if (!supabase) return null;
    const { data } = await supabase.auth.getUser();
    return data.user ?? null;
  } catch {
    return null;
  }
}

/** Profile row for an email (service client — admin/member gating). Null when not configured. */
export async function getProfileByEmail(email: string) {
  try {
    const sb = getServiceClient();
    if (!sb) return null;
    const { data } = await sb
      .from("profiles")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

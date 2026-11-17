import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}.`);
  return v;
}

export function supabaseUrl(): string {
  return env("NEXT_PUBLIC_SUPABASE_URL");
}

/** Server client bound to the signed-in user's session (cookies). */
export async function getServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    env("NEXT_PUBLIC_SUPABASE_URL"),
    env("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
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
    }
  );
}

/**
 * Service-role client — server only, bypasses RLS.
 * NEVER import this from client code. Used by server actions / admin pages.
 */
export function getServiceClient() {
  return createSupabaseClient(
    env("NEXT_PUBLIC_SUPABASE_URL"),
    env("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

/** The signed-in Auth user, or null. */
export async function getAuthUser() {
  const supabase = await getServerClient();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

/** Profile row for an email (service client — admin/member gating). */
export async function getProfileByEmail(email: string) {
  const sb = getServiceClient();
  const { data } = await sb
    .from("profiles")
    .select("*")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();
  return data;
}

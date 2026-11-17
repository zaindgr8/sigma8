"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = getBrowserClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) { setError(authError.message); setLoading(false); return; }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen min-h-dvh bg-[#0B0B0D] text-[#F4F1EA] flex flex-col items-center justify-center px-4 sm:px-6 py-10">
      <Link href="/" className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] mb-10">← Sigma 8</Link>
      <h1 className="font-serif text-4xl mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Admin</h1>
      <p className="text-sm text-[#8A8780] mb-8">Sign in with your admin credentials.</p>
      {!configured && (
        <p className="text-xs text-[#C6A15B] bg-[#C6A15B]/10 border border-[#C6A15B]/20 rounded-lg px-4 py-3 mb-6 max-w-sm text-center leading-relaxed">
          Supabase is not configured on this deployment yet — sign-in will not work until
          NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY
          are set in Vercel → Project Settings → Environment Variables and the site is redeployed.
        </p>
      )}
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="admin-email" className="block text-xs font-medium text-[#A39E93] uppercase tracking-wider mb-1.5">Admin email</label>
          <input id="admin-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email"
            className="w-full px-4 py-3 min-h-[48px] rounded-lg bg-[#141417] border border-white/10 text-[15px] focus:outline-none focus:border-[#C6A15B]" />
        </div>
        <div>
          <label htmlFor="admin-password" className="block text-xs font-medium text-[#A39E93] uppercase tracking-wider mb-1.5">Password</label>
          <input id="admin-password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            className="w-full px-4 py-3 min-h-[48px] rounded-lg bg-[#141417] border border-white/10 text-[15px] focus:outline-none focus:border-[#C6A15B]" />
        </div>
        <button disabled={loading} className="w-full min-h-[52px] py-3.5 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider disabled:opacity-50">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      {error && <p role="alert" className="text-xs text-red-400 mt-4 max-w-sm text-center">{error}</p>}
    </main>
  );
}

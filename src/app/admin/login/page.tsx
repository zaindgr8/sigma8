"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <main className="min-h-screen bg-[#0B0B0D] text-[#F4F1EA] flex flex-col items-center justify-center px-6">
      <a href="/" className="text-xs uppercase tracking-wider text-[#8A8780] hover:text-[#F4F1EA] mb-10">← Sigma 8</a>
      <h1 className="font-serif text-4xl mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Admin</h1>
      <p className="text-sm text-[#8A8780] mb-8">Sign in with your admin credentials.</p>
      <form onSubmit={submit} className="w-full max-w-sm space-y-3">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email"
          className="w-full px-4 py-3 rounded-lg bg-[#141417] border border-white/10 text-sm focus:outline-none focus:border-[#C6A15B]" />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-[#141417] border border-white/10 text-sm focus:outline-none focus:border-[#C6A15B]" />
        <button disabled={loading} className="w-full py-3 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider disabled:opacity-50">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      {error && <p className="text-xs text-red-400 mt-4 max-w-sm text-center">{error}</p>}
    </main>
  );
}

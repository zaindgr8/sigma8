"use client";

import React from "react";

/** Error boundary for /admin — a friendly message + retry, never Next's generic 500 page. */
export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-[#0B0B0D] text-[#F4F1EA] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-3xl mb-3" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
        The admin page couldn&apos;t load
      </h1>
      <p className="text-sm text-[#8A8780] max-w-md leading-relaxed">
        {error?.message?.includes("not configured")
          ? "Supabase is not configured on this deployment. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY in Vercel → Project Settings → Environment Variables, then redeploy."
          : "Something went wrong loading the admin console. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-6 px-6 py-3 rounded-full bg-[#C6A15B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider"
      >
        Try again
      </button>
      <a href="/admin/login" className="mt-4 text-xs uppercase tracking-wider text-[#8A8780] underline">
        Go to admin login
      </a>
    </main>
  );
}

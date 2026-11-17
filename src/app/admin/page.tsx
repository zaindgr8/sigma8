import { redirect } from "next/navigation";
import { getAdminData } from "@/app/actions";
import { AdminConsole } from "@/components/admin/AdminConsole";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const data = await getAdminData();
  if (!data.ok) {
    // Never a 500: a config problem renders a clear message instead.
    if (data.error?.includes("not configured")) {
      return (
        <main className="min-h-screen bg-[#0B0B0D] text-[#F4F1EA] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-3xl mb-3" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
            Admin is not connected yet
          </h1>
          <p className="text-sm text-[#8A8780] max-w-md leading-relaxed">
            Supabase is not configured on this deployment. Set these in Vercel →
            Project Settings → Environment Variables, then redeploy:
          </p>
          <p className="text-xs text-[#C6A15B] font-mono mt-4 leading-relaxed">
            NEXT_PUBLIC_SUPABASE_URL
            <br />
            NEXT_PUBLIC_SUPABASE_ANON_KEY
            <br />
            SUPABASE_SERVICE_ROLE_KEY
          </p>
          <a href="/admin/login" className="mt-6 text-xs uppercase tracking-wider text-[#C6A15B] underline">
            Go to admin login →
          </a>
        </main>
      );
    }
    redirect("/admin/login");
  }
  return <AdminConsole data={data} />;
}

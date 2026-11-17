import { redirect } from "next/navigation";
import { getAdminData } from "@/app/actions";
import { AdminConsole } from "@/components/admin/AdminConsole";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const data = await getAdminData();
  if (!data.ok) redirect("/admin/login");
  return <AdminConsole data={data} />;
}

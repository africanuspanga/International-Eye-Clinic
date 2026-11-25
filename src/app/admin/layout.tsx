import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/cms/auth";
import { SITE_ADMIN } from "@/lib/cms/collections";

export const metadata: Metadata = {
  title: `Admin · ${SITE_ADMIN.name}`,
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { supabase, user } = await requireAdmin();
  const { count } = await supabase
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");

  return (
    <AdminShell userEmail={user.email ?? ""} newSubmissions={count ?? 0}>
      {children}
    </AdminShell>
  );
}

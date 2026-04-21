import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex">
      <AdminSidebar userEmail={data.user.email || ""} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}

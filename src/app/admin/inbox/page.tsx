import { Inbox, type Submission } from "@/components/admin/Inbox";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/cms/auth";

export default async function InboxPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  return (
    <>
      <PageHeader
        title="Inbox"
        description="Appointment and contact requests sent from the website. Mark each one as you follow up."
      />
      {error ? (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">Could not load submissions: {error.message}</p>
      ) : (
        <Inbox submissions={(data ?? []) as Submission[]} />
      )}
    </>
  );
}

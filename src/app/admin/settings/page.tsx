import { SettingsForm } from "@/components/admin/SettingsForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/cms/auth";

export default async function SettingsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("site_settings").select("key, value");
  const values = Object.fromEntries((data ?? []).map((r) => [r.key, r.value ?? ""]));

  return (
    <>
      <PageHeader title="Settings & Google Tags" description="Clinic contact details, Google Analytics / Tag Manager / Ads, and social links." />
      <SettingsForm initial={values} />
    </>
  );
}

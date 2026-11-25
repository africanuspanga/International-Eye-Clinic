import { notFound } from "next/navigation";
import { EntryForm } from "@/components/admin/EntryForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/cms/auth";
import { getCollection } from "@/lib/cms/collections";

type Props = { params: Promise<{ collection: string; id: string }> };

export default async function EditEntryPage({ params }: Props) {
  const { collection: key, id } = await params;
  const collection = getCollection(key);
  if (!collection || !/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const { supabase } = await requireAdmin();
  const { data } = await supabase.from(collection.table).select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <PageHeader
        title={String(data[collection.titleField] || `Edit ${collection.singular.toLowerCase()}`)}
        description={`Editing ${collection.singular.toLowerCase()}`}
      />
      <EntryForm key={String(data.updated_at ?? id)} collectionKey={collection.key} id={id} initial={data} />
    </>
  );
}

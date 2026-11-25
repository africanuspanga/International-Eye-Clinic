import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { EntryTable } from "@/components/admin/EntryTable";
import { PageHeader, ui } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/cms/auth";
import { getCollection } from "@/lib/cms/collections";

type Props = { params: Promise<{ collection: string }> };

export default async function CollectionPage({ params }: Props) {
  const { collection: key } = await params;
  const collection = getCollection(key);
  if (!collection) notFound();

  const { supabase } = await requireAdmin();
  const columns = new Set([
    "id",
    "is_published",
    collection.titleField,
    ...(collection.subtitleField ? [collection.subtitleField] : []),
    ...(collection.imageField ? [collection.imageField] : []),
    ...(collection.columns ?? []).map((c) => c.name),
    ...(collection.searchFields ?? []),
    ...(collection.fields.some((f) => f.name === "slug") ? ["slug"] : []),
  ]);

  let query = supabase.from(collection.table).select([...columns].join(","));
  for (const o of collection.orderBy) query = query.order(o.column, { ascending: o.ascending });
  const { data, error } = await query;

  return (
    <>
      <PageHeader
        title={collection.label}
        description={collection.description}
        actions={
          <Link href={`/admin/${collection.key}/new`} className={ui.btnPrimary}>
            <Plus className="h-4 w-4" /> Add {collection.singular.toLowerCase()}
          </Link>
        }
      />
      {error ? (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">Could not load {collection.label.toLowerCase()}: {error.message}</p>
      ) : (
        <EntryTable collectionKey={collection.key} rows={(data ?? []) as unknown as (Record<string, unknown> & { id: string })[]} />
      )}
    </>
  );
}

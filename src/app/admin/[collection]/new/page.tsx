import { notFound } from "next/navigation";
import { EntryForm } from "@/components/admin/EntryForm";
import { PageHeader } from "@/components/admin/ui";
import { getCollection } from "@/lib/cms/collections";

type Props = { params: Promise<{ collection: string }> };

export default async function NewEntryPage({ params }: Props) {
  const { collection: key } = await params;
  const collection = getCollection(key);
  if (!collection) notFound();

  return (
    <>
      <PageHeader title={`New ${collection.singular.toLowerCase()}`} description={collection.description} />
      <EntryForm collectionKey={collection.key} />
    </>
  );
}

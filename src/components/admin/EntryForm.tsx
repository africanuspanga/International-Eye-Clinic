"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Loader2, Save, Trash2 } from "lucide-react";
import { deleteEntry, saveEntry } from "@/lib/cms/actions";
import { getCollection } from "@/lib/cms/collections";
import { emptyValue } from "@/lib/cms/normalize";
import { FieldInput } from "./fields";
import { ui, useToast } from "./ui";

type Props = {
  collectionKey: string;
  id?: string;
  initial?: Record<string, unknown> | null;
};

export function EntryForm({ collectionKey, id, initial }: Props) {
  const collection = getCollection(collectionKey)!;
  const router = useRouter();
  const toast = useToast();
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");

  const startValues = useMemo(() => {
    const v: Record<string, unknown> = {};
    for (const f of collection.fields) {
      const existing = initial?.[f.name];
      v[f.name] = existing === null || existing === undefined ? emptyValue(f) : existing;
    }
    return v;
  }, [collection, initial]);

  const [values, setValues] = useState(startValues);
  const dirty = JSON.stringify(values) !== JSON.stringify(startValues);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const set = (name: string, value: unknown) => setValues((v) => ({ ...v, [name]: value }));

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await saveEntry(collectionKey, id ?? null, values);
      if (!result.ok) {
        setError(result.error);
        toast(result.error, "error");
        return;
      }
      toast(`${collection.singular} saved — the website is updated.`);
      if (!id && result.id) {
        router.replace(`/admin/${collectionKey}/${result.id}`);
      } else {
        router.refresh();
      }
    });
  }

  function remove() {
    if (!id) return;
    startTransition(async () => {
      const result = await deleteEntry(collectionKey, id);
      if (!result.ok) {
        toast(result.error, "error");
        return;
      }
      toast(`${collection.singular} deleted`);
      router.replace(`/admin/${collectionKey}`);
      router.refresh();
    });
  }

  const slug = String(values.slug ?? "");
  const viewHref = id && collection.viewPath && (!collection.viewPath.includes("{slug}") || slug)
    ? collection.viewPath.replace("{slug}", slug)
    : null;

  const mainFields = collection.fields.filter((f) => f.name !== "is_published" && f.name !== "sort_order");
  const sideFields = collection.fields.filter((f) => f.name === "is_published" || f.name === "sort_order");

  return (
    <form onSubmit={submit} className="pb-24">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/admin/${collectionKey}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> All {collection.label.toLowerCase()}
        </Link>
        {viewHref && (
          <a href={viewHref} target="_blank" rel="noopener noreferrer" className={ui.btnSecondary}>
            <ExternalLink className="h-4 w-4" /> View on website
          </a>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className={`${ui.card} p-5 sm:p-7`}>
          <div className="grid gap-6 md:grid-cols-2">
            {mainFields.map((field) => (
              <div key={field.name} className={field.half ? "" : "md:col-span-2"}>
                <FieldInput
                  field={field}
                  value={values[field.name]}
                  values={values}
                  isNew={!id}
                  onChange={(v) => set(field.name, v)}
                />
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className={`${ui.card} space-y-4 p-5`}>
            {sideFields.map((field) => (
              <FieldInput key={field.name} field={field} value={values[field.name]} values={values} onChange={(v) => set(field.name, v)} />
            ))}
            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={pending} className={`${ui.btnPrimary} w-full`}>
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {id ? "Save changes" : `Create ${collection.singular.toLowerCase()}`}
            </button>
            {dirty && !pending && <p className="text-center text-xs text-amber-600">You have unsaved changes</p>}
          </div>

          {id && (
            <div className={`${ui.card} p-5`}>
              <p className="mb-3 text-sm text-slate-500">Permanently remove this {collection.singular.toLowerCase()} from the website.</p>
              {confirmDelete ? (
                <div className="flex gap-2">
                  <button type="button" onClick={remove} disabled={pending} className={`${ui.btnDanger} flex-1 border-red-600 bg-red-600 text-white hover:bg-red-700`}>
                    Yes, delete
                  </button>
                  <button type="button" onClick={() => setConfirmDelete(false)} className={ui.btnSecondary}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => setConfirmDelete(true)} className={`${ui.btnDanger} w-full`}>
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              )}
            </div>
          )}
        </aside>
      </div>
    </form>
  );
}

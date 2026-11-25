"use client";

/* eslint-disable @next/next/no-img-element -- thumbnails of uploaded media */
import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Pencil, Search, Trash2 } from "lucide-react";
import { deleteEntry, setPublished } from "@/lib/cms/actions";
import { getCollection } from "@/lib/cms/collections";
import { AdminIcon } from "./icons";
import { ui, useToast } from "./ui";

type Row = Record<string, unknown> & { id: string };

function formatCell(value: unknown, kind?: string) {
  if (value === null || value === undefined || value === "") return <span className="text-slate-300">—</span>;
  if (kind === "date") {
    const d = new Date(String(value));
    return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  if (typeof value === "boolean") return value ? "Yes" : <span className="text-slate-300">—</span>;
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

export function EntryTable({ collectionKey, rows }: { collectionKey: string; rows: Row[] }) {
  const collection = getCollection(collectionKey)!;
  const router = useRouter();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "hidden">("all");
  const [confirmId, setConfirmId] = useState("");
  const [busyId, setBusyId] = useState("");
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const fields = collection.searchFields ?? [collection.titleField];
    return rows.filter((row) => {
      if (status === "published" && !row.is_published) return false;
      if (status === "hidden" && row.is_published) return false;
      if (!q) return true;
      return fields.some((f) => String(row[f] ?? "").toLowerCase().includes(q));
    });
  }, [rows, query, status, collection]);

  function run(id: string, fn: () => Promise<{ ok: boolean; error?: string }>, success: string) {
    setBusyId(id);
    startTransition(async () => {
      const result = await fn();
      setBusyId("");
      setConfirmId("");
      if (!result.ok) toast(result.error ?? "Something went wrong", "error");
      else {
        toast(success);
        router.refresh();
      }
    });
  }

  const published = rows.filter((r) => r.is_published).length;

  return (
    <div className={ui.card}>
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${collection.label.toLowerCase()}…`}
            className={`${ui.input} pl-9`}
          />
        </label>
        <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold">
          {([
            ["all", `All (${rows.length})`],
            ["published", `Live (${published})`],
            ["hidden", `Hidden (${rows.length - published})`],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setStatus(key)}
              className={`rounded-md px-3 py-1.5 ${status === key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <AdminIcon name={collection.icon} className="mx-auto mb-3 h-8 w-8 text-slate-300" />
          <p className="text-sm text-slate-500">
            {rows.length === 0 ? `No ${collection.label.toLowerCase()} yet.` : "Nothing matches your search."}
          </p>
          {rows.length === 0 && (
            <Link href={`/admin/${collectionKey}/new`} className={`${ui.btnPrimary} mt-4`}>
              Add the first {collection.singular.toLowerCase()}
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">{collection.singular}</th>
                {collection.columns?.map((c) => (
                  <th key={c.name} className="hidden px-4 py-3 md:table-cell">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => {
                const title = String(row[collection.titleField] ?? "Untitled");
                const subtitle = collection.subtitleField ? String(row[collection.subtitleField] ?? "") : "";
                const image = collection.imageField ? String(row[collection.imageField] ?? "") : "";
                const slug = String(row.slug ?? "");
                const viewHref = collection.viewPath && (!collection.viewPath.includes("{slug}") || slug)
                  ? collection.viewPath.replace("{slug}", slug)
                  : null;
                const busy = busyId === row.id;

                return (
                  <tr key={row.id} className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/70 ${busy ? "opacity-50" : ""}`}>
                    <td className="px-5 py-3.5">
                      <Link href={`/admin/${collectionKey}/${row.id}`} className="flex items-center gap-3">
                        {collection.imageField && (
                          <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            {image && <img src={image} alt="" className="h-full w-full object-cover" />}
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block font-semibold text-slate-900 hover:text-[var(--admin-accent)]">{title}</span>
                          {subtitle && <span className="mt-0.5 block max-w-md truncate text-xs text-slate-500">{subtitle}</span>}
                        </span>
                      </Link>
                    </td>
                    {collection.columns?.map((c) => (
                      <td key={c.name} className="hidden px-4 py-3.5 text-slate-600 md:table-cell">
                        {formatCell(row[c.name], c.kind)}
                      </td>
                    ))}
                    <td className="px-4 py-3.5">
                      <button
                        type="button"
                        disabled={busy}
                        title={row.is_published ? "Click to hide from website" : "Click to publish"}
                        onClick={() =>
                          run(row.id, () => setPublished(collectionKey, row.id, !row.is_published), row.is_published ? "Hidden from website" : "Published")
                        }
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                          row.is_published ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${row.is_published ? "bg-emerald-500" : "bg-slate-400"}`} />
                        {row.is_published ? "Live" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/${collectionKey}/${row.id}`} className={ui.btnGhost}>
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </Link>
                        {viewHref && row.is_published ? (
                          <a href={viewHref} target="_blank" rel="noopener noreferrer" className={ui.btnGhost} aria-label="View on website">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                        {confirmId === row.id ? (
                          <>
                            <button
                              type="button"
                              onClick={() => run(row.id, () => deleteEntry(collectionKey, row.id), "Deleted")}
                              className="rounded-md bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                            >
                              Delete
                            </button>
                            <button type="button" onClick={() => setConfirmId("")} className={ui.btnGhost}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            aria-label={`Delete ${title}`}
                            onClick={() => setConfirmId(row.id)}
                            className={`${ui.btnGhost} hover:bg-red-50 hover:text-red-600`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, CircleCheck, CircleAlert, ExternalLink, Plus } from "lucide-react";
import { AdminIcon } from "@/components/admin/icons";
import { PageHeader, ui } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/cms/auth";
import { COLLECTIONS } from "@/lib/cms/collections";
import { getGoogleTagIds } from "@/components/site/google-tags";

export default async function AdminDashboard() {
  const { supabase, user } = await requireAdmin();

  const [counts, recent, tagIds] = await Promise.all([
    Promise.all(
      COLLECTIONS.map(async (c) => {
        const { count } = await supabase.from(c.table).select("id", { count: "exact", head: true });
        return count ?? 0;
      })
    ),
    supabase.from("submissions").select("id, name, form, status, created_at, data").order("created_at", { ascending: false }).limit(6),
    getGoogleTagIds(),
  ]);

  const activeTags = [tagIds.gtm, tagIds.ga4, tagIds.ads].filter(Boolean);
  const tagsOn = activeTags.length > 0;
  const newCount = (recent.data ?? []).filter((s) => s.status === "new").length;

  return (
    <>
      <PageHeader
        title="Welcome back"
        description={`Signed in as ${user.email}. Everything you change here goes live on the website as soon as you save.`}
        actions={
          <a href="/" target="_blank" rel="noopener noreferrer" className={ui.btnSecondary}>
            <ExternalLink className="h-4 w-4" /> View website
          </a>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {COLLECTIONS.map((c, i) => (
          <Link key={c.key} href={`/admin/${c.key}`} className={`${ui.card} group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-md`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--admin-accent)]/10 text-[var(--admin-accent)]">
              <AdminIcon name={c.icon} className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-2xl font-bold leading-none text-slate-900">{counts[i]}</span>
              <span className="mt-1 block truncate text-sm text-slate-500">{c.label}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className={ui.card}>
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold text-slate-900">
              Latest requests {newCount > 0 && <span className="ml-1 rounded-full bg-[var(--admin-accent)] px-2 py-0.5 text-xs text-white">{newCount} new</span>}
            </h2>
            <Link href="/admin/inbox" className="text-sm font-semibold text-[var(--admin-accent)] hover:underline">
              Open inbox
            </Link>
          </div>
          {(recent.data ?? []).length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-500">No appointment or contact requests yet.</p>
          ) : (
            <ul className="divide-y divide-slate-50">
              {(recent.data ?? []).map((s) => (
                <li key={s.id}>
                  <Link href="/admin/inbox" className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${s.status === "new" ? "bg-[var(--admin-accent)]" : "bg-slate-200"}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-900">{s.name || "Unnamed"}</span>
                      <span className="block truncate text-xs text-slate-500">
                        {s.form === "appointment" ? "Appointment" : "Contact"}
                        {(s.data as Record<string, string> | null)?.reason ? ` · ${(s.data as Record<string, string>).reason}` : ""}
                      </span>
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(s.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="space-y-4">
          <section className={`${ui.card} p-5`}>
            <h2 className="mb-3 font-bold text-slate-900">Quick add</h2>
            <div className="flex flex-col gap-2">
              {COLLECTIONS.slice(0, 4).map((c) => (
                <Link key={c.key} href={`/admin/${c.key}/new`} className={`${ui.btnSecondary} justify-start`}>
                  <Plus className="h-4 w-4" /> New {c.singular.toLowerCase()}
                </Link>
              ))}
            </div>
          </section>
          <section className={`${ui.card} p-5`}>
            <h2 className="mb-2 font-bold text-slate-900">Google tags</h2>
            <p className={`flex items-start gap-2 text-sm ${tagsOn ? "text-emerald-700" : "text-amber-700"}`}>
              {tagsOn ? <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" /> : <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />}
              {tagsOn ? `Active on the website: ${activeTags.join(", ")}` : "No Google tag ID set yet — visits aren't being tracked."}
            </p>
            <Link href="/admin/settings" className="mt-3 inline-block text-sm font-semibold text-[var(--admin-accent)] hover:underline">
              {tagsOn ? "Manage tags" : "Add your Google tag ID"}
            </Link>
          </section>
        </aside>
      </div>
    </>
  );
}

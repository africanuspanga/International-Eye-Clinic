import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Eye, Plus, Pencil, ArrowRight } from "lucide-react";

export default async function EyeConditionsAdminPage() {
  const supabase = await createClient();
  const { data: conditions, error } = await supabase
    .from("eye_conditions")
    .select("id, slug, name, short_desc, sort_order, is_published, updated_at")
    .order("sort_order", { ascending: true });

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-3xl font-bold text-[#111827]"
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          Eye Conditions
        </h1>
        <Link
          href="/admin/eye-conditions/new"
          className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Plus size={16} /> Add New
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f8f9fc]">
                <th className="text-left px-6 py-4 font-semibold text-[#374151]">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-[#374151]">Slug</th>
                <th className="text-left px-6 py-4 font-semibold text-[#374151]">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-[#374151]">Order</th>
                <th className="text-right px-6 py-4 font-semibold text-[#374151]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {conditions?.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-[#f8f9fc]">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#111827]">{c.name}</div>
                    <div className="text-[#9ca3af] text-xs mt-0.5 max-w-xs truncate">{c.short_desc}</div>
                  </td>
                  <td className="px-6 py-4 text-[#6b7280]">{c.slug}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        c.is_published
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {c.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6b7280]">{c.sort_order}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/eye-conditions/${c.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e8edf7] text-[#1a2a6c] hover:bg-[#1a2a6c] hover:text-white transition-colors text-xs font-semibold"
                      >
                        <Pencil size={12} /> Edit
                      </Link>
                      <Link
                        href={`/news/eye-conditions/${c.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-[#6b7280] hover:border-[#1a2a6c] hover:text-[#1a2a6c] transition-colors text-xs font-semibold"
                      >
                        <ArrowRight size={12} /> View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!conditions || conditions.length === 0) && (
          <div className="text-center py-16 text-[#9ca3af]">
            <Eye size={32} className="mx-auto mb-3 opacity-50" />
            <p>No eye conditions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

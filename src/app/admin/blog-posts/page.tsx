import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";

export default async function BlogPostsAdminPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, category, is_published")
    .order("published_date", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#111827]" style={{ fontFamily: "'Merriweather', serif" }}>
          Blog Posts
        </h1>
        <button className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors opacity-50 cursor-not-allowed">
          <Plus size={16} /> Coming Soon
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f8f9fc]">
                <th className="text-left px-6 py-4 font-semibold text-[#374151]">Title</th>
                <th className="text-left px-6 py-4 font-semibold text-[#374151]">Category</th>
                <th className="text-left px-6 py-4 font-semibold text-[#374151]">Status</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-[#f8f9fc]">
                  <td className="px-6 py-4 font-medium text-[#111827]">{p.title}</td>
                  <td className="px-6 py-4 text-[#6b7280]">{p.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${p.is_published ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"}`}>
                      {p.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!posts || posts.length === 0) && (
          <div className="text-center py-16 text-[#9ca3af]">
            <FileText size={32} className="mx-auto mb-3 opacity-50" />
            <p>No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { Eye, FileText, Stethoscope, Settings } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: conditionsCount },
    { count: blogCount },
    { count: doctorsCount },
  ] = await Promise.all([
    supabase.from("eye_conditions").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("doctors").select("*", { count: "exact", head: true }),
  ]);

  const cards = [
    {
      label: "Eye Conditions",
      count: conditionsCount || 0,
      href: "/admin/eye-conditions",
      icon: Eye,
      color: "bg-blue-50 text-[#1a2a6c]",
    },
    {
      label: "Blog Posts",
      count: blogCount || 0,
      href: "/admin/blog-posts",
      icon: FileText,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Doctors",
      count: doctorsCount || 0,
      href: "/admin/doctors",
      icon: Stethoscope,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div>
      <h1
        className="text-3xl font-bold text-[#111827] mb-8"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        Dashboard
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#1a2a6c]/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon size={22} />
                </div>
                <span className="text-3xl font-bold text-[#111827] group-hover:text-[#1a2a6c] transition-colors" style={{ fontFamily: "'Merriweather', serif" }}>
                  {card.count}
                </span>
              </div>
              <h3 className="font-semibold text-[#374151]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {card.label}
              </h3>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/eye-conditions/new"
            className="inline-flex items-center gap-2 bg-[#1a2a6c] hover:bg-[#243688] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Eye size={15} /> Add Eye Condition
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#1a2a6c] text-[#374151] hover:text-[#1a2a6c] text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Settings size={15} /> View Website
          </Link>
        </div>
      </div>
    </div>
  );
}

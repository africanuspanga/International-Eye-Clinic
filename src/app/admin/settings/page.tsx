import { createClient } from "@/lib/supabase/server";
import { Settings } from "lucide-react";

export default async function SettingsAdminPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .order("key", { ascending: true });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#111827] mb-8" style={{ fontFamily: "'Merriweather', serif" }}>
        Settings
      </h1>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f8f9fc]">
                <th className="text-left px-6 py-4 font-semibold text-[#374151]">Key</th>
                <th className="text-left px-6 py-4 font-semibold text-[#374151]">Value</th>
                <th className="text-left px-6 py-4 font-semibold text-[#374151]">Description</th>
              </tr>
            </thead>
            <tbody>
              {settings?.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 last:border-0 hover:bg-[#f8f9fc]">
                  <td className="px-6 py-4 font-medium text-[#111827]">{s.key}</td>
                  <td className="px-6 py-4 text-[#374151]">{s.value}</td>
                  <td className="px-6 py-4 text-[#6b7280]">{s.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!settings || settings.length === 0) && (
          <div className="text-center py-16 text-[#9ca3af]">
            <Settings size={32} className="mx-auto mb-3 opacity-50" />
            <p>No settings found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

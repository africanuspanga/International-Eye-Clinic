"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Trash2, Plus, X } from "lucide-react";

interface ConditionFormData {
  id?: string;
  slug: string;
  name: string;
  short_desc: string;
  overview: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  when_to_see_doctor: string;
  swahili_overview: string;
  swahili_symptoms: string[];
  swahili_causes: string[];
  swahili_treatments: string[];
  swahili_when_to_see_doctor: string;
  sort_order: number;
  is_published: boolean;
}

interface Props {
  initialData?: ConditionFormData;
  isEdit?: boolean;
}

export default function ConditionForm({ initialData, isEdit }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ConditionFormData>(
    initialData || {
      slug: "",
      name: "",
      short_desc: "",
      overview: "",
      symptoms: [""],
      causes: [""],
      treatments: [""],
      when_to_see_doctor: "",
      swahili_overview: "",
      swahili_symptoms: [""],
      swahili_causes: [""],
      swahili_treatments: [""],
      swahili_when_to_see_doctor: "",
      sort_order: 0,
      is_published: true,
    }
  );

  function updateField<K extends keyof ConditionFormData>(field: K, value: ConditionFormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateArrayField(field: "symptoms" | "causes" | "treatments" | "swahili_symptoms" | "swahili_causes" | "swahili_treatments", index: number, value: string) {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  }

  function addArrayField(field: "symptoms" | "causes" | "treatments" | "swahili_symptoms" | "swahili_causes" | "swahili_treatments") {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  }

  function removeArrayField(field: "symptoms" | "causes" | "treatments" | "swahili_symptoms" | "swahili_causes" | "swahili_treatments", index: number) {
    setForm((prev) => {
      const arr = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: arr.length ? arr : [""] };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      symptoms: form.symptoms.filter((s) => s.trim()),
      causes: form.causes.filter((s) => s.trim()),
      treatments: form.treatments.filter((s) => s.trim()),
      swahili_symptoms: form.swahili_symptoms.filter((s) => s.trim()),
      swahili_causes: form.swahili_causes.filter((s) => s.trim()),
      swahili_treatments: form.swahili_treatments.filter((s) => s.trim()),
    };

    if (isEdit && form.id) {
      const { error } = await supabase.from("eye_conditions").update(payload).eq("id", form.id);
      if (error) setError(error.message);
      else router.push("/admin/eye-conditions");
    } else {
      const { error } = await supabase.from("eye_conditions").insert(payload);
      if (error) setError(error.message);
      else router.push("/admin/eye-conditions");
    }

    setSaving(false);
  }

  async function handleDelete() {
    if (!isEdit || !form.id) return;
    if (!confirm("Are you sure you want to delete this condition?")) return;
    setLoading(true);
    const { error } = await supabase.from("eye_conditions").delete().eq("id", form.id);
    if (error) setError(error.message);
    else router.push("/admin/eye-conditions");
    setLoading(false);
  }

  const sections = [
    { title: "Basic Info", fields: [] },
    { title: "English Content", fields: [] },
    { title: "Swahili Content", fields: [] },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl p-4">{error}</div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Basic Information
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">Slug</label>
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none text-sm"
              placeholder="e.g. cataract"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#374151] mb-1.5">Short Description</label>
            <input
              type="text"
              required
              value={form.short_desc}
              onChange={(e) => updateField("short_desc", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => updateField("sort_order", parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_published"
              checked={form.is_published}
              onChange={(e) => updateField("is_published", e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#1a2a6c] focus:ring-[#1a2a6c]"
            />
            <label htmlFor="is_published" className="text-sm font-medium text-[#374151]">
              Published
            </label>
          </div>
        </div>
      </div>

      {/* English Content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
          English Content
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">Overview</label>
            <textarea
              required
              rows={4}
              value={form.overview}
              onChange={(e) => updateField("overview", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none text-sm"
            />
          </div>

          <ArrayField label="Symptoms" values={form.symptoms} onChange={(i, v) => updateArrayField("symptoms", i, v)} onAdd={() => addArrayField("symptoms")} onRemove={(i) => removeArrayField("symptoms", i)} />
          <ArrayField label="Causes" values={form.causes} onChange={(i, v) => updateArrayField("causes", i, v)} onAdd={() => addArrayField("causes")} onRemove={(i) => removeArrayField("causes", i)} />
          <ArrayField label="Treatments" values={form.treatments} onChange={(i, v) => updateArrayField("treatments", i, v)} onAdd={() => addArrayField("treatments")} onRemove={(i) => removeArrayField("treatments", i)} />

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">When to See a Doctor</label>
            <textarea
              required
              rows={3}
              value={form.when_to_see_doctor}
              onChange={(e) => updateField("when_to_see_doctor", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Swahili Content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Swahili Content 🇹🇿
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">Overview (Swahili)</label>
            <textarea
              required
              rows={4}
              value={form.swahili_overview}
              onChange={(e) => updateField("swahili_overview", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none text-sm"
            />
          </div>

          <ArrayField label="Symptoms (Swahili)" values={form.swahili_symptoms} onChange={(i, v) => updateArrayField("swahili_symptoms", i, v)} onAdd={() => addArrayField("swahili_symptoms")} onRemove={(i) => removeArrayField("swahili_symptoms", i)} />
          <ArrayField label="Causes (Swahili)" values={form.swahili_causes} onChange={(i, v) => updateArrayField("swahili_causes", i, v)} onAdd={() => addArrayField("swahili_causes")} onRemove={(i) => removeArrayField("swahili_causes", i)} />
          <ArrayField label="Treatments (Swahili)" values={form.swahili_treatments} onChange={(i, v) => updateArrayField("swahili_treatments", i, v)} onAdd={() => addArrayField("swahili_treatments")} onRemove={(i) => removeArrayField("swahili_treatments", i)} />

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">When to See a Doctor (Swahili)</label>
            <textarea
              required
              rows={3}
              value={form.swahili_when_to_see_doctor}
              onChange={(e) => updateField("swahili_when_to_see_doctor", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div>
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <Trash2 size={15} /> {loading ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/eye-conditions")}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-[#374151] font-semibold text-sm hover:border-[#1a2a6c] hover:text-[#1a2a6c] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#1a2a6c] hover:bg-[#243688] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 size={15} className="animate-spin" />}
            {isEdit ? "Update Condition" : "Create Condition"}
          </button>
        </div>
      </div>
    </form>
  );
}

function ArrayField({
  label,
  values,
  onChange,
  onAdd,
  onRemove,
}: {
  label: string;
  values: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#374151] mb-2">{label}</label>
      <div className="space-y-2">
        {values.map((value, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(i, e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none text-sm"
              placeholder={`${label} ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="w-9 h-9 rounded-xl bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 inline-flex items-center gap-1.5 text-[#1a2a6c] text-xs font-semibold hover:text-[#e62d26] transition-colors"
      >
        <Plus size={13} /> Add {label}
      </button>
    </div>
  );
}

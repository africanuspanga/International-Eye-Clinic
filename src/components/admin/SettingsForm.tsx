"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { saveSettings } from "@/lib/cms/actions";
import { SETTING_GROUPS } from "@/lib/cms/collections";
import { ui, useToast } from "./ui";

export function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const toast = useToast();
  const [values, setValues] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await saveSettings(values);
      if (!result.ok) {
        setError(result.error);
        toast(result.error, "error");
        return;
      }
      toast("Settings saved — the website is updated.");
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6 pb-16">
      {SETTING_GROUPS.map((group) => (
        <section key={group.title} className={`${ui.card} p-5 sm:p-7`}>
          <h2 className="text-base font-bold text-slate-900">{group.title}</h2>
          {group.description && <p className="mt-1 text-sm text-slate-500">{group.description}</p>}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {group.fields.map((field) => {
              const value = values[field.key] ?? "";
              const invalid = Boolean(value && field.pattern && !new RegExp(field.pattern).test(value.trim()));
              return (
                <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <label htmlFor={`setting-${field.key}`} className={ui.label}>
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={`setting-${field.key}`}
                      rows={2}
                      value={value}
                      placeholder={field.placeholder}
                      onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                      className={ui.input}
                    />
                  ) : (
                    <input
                      id={`setting-${field.key}`}
                      type={field.type === "url" ? "url" : "text"}
                      value={value}
                      placeholder={field.placeholder}
                      onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                      className={`${ui.input} ${invalid ? "border-red-300" : ""}`}
                      aria-invalid={invalid}
                    />
                  )}
                  {(field.patternHint || field.help) && (
                    <p className={`${ui.help} ${invalid ? "text-red-600" : ""}`}>{field.patternHint ?? field.help}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
        {error && <p className="flex-1 text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={pending} className={ui.btnPrimary}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save settings
        </button>
      </div>
    </form>
  );
}

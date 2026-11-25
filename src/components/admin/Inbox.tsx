"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Inbox as InboxIcon, Mail, MessageCircle, Phone, Trash2 } from "lucide-react";
import { deleteSubmission, updateSubmission } from "@/lib/cms/actions";
import { ui, useToast } from "./ui";

export type Submission = {
  id: string;
  form: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  data: Record<string, string> | null;
  status: string;
  notes: string | null;
  created_at: string;
};

const STATUSES: { value: string; label: string; tone: string }[] = [
  { value: "new", label: "New", tone: "bg-[var(--admin-accent)] text-white" },
  { value: "contacted", label: "Contacted", tone: "bg-sky-100 text-sky-700" },
  { value: "booked", label: "Booked", tone: "bg-emerald-100 text-emerald-700" },
  { value: "closed", label: "Closed", tone: "bg-slate-200 text-slate-600" },
  { value: "spam", label: "Spam", tone: "bg-slate-100 text-slate-400" },
];

const humanize = (key: string) =>
  key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").replace(/^./, (c) => c.toUpperCase());

const digits = (v: string) => v.replace(/\D/g, "");

export function Inbox({ submissions }: { submissions: Submission[] }) {
  const router = useRouter();
  const toast = useToast();
  const [filter, setFilter] = useState("open");
  const [openId, setOpenId] = useState<string | null>(submissions.find((s) => s.status === "new")?.id ?? null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [confirmId, setConfirmId] = useState("");
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(
    () =>
      submissions.filter((s) =>
        filter === "all" ? true : filter === "open" ? ["new", "contacted"].includes(s.status) : s.status === filter
      ),
    [submissions, filter]
  );

  function act(fn: () => Promise<{ ok: boolean; error?: string }>, success: string) {
    startTransition(async () => {
      const result = await fn();
      if (!result.ok) toast(result.error ?? "Something went wrong", "error");
      else {
        toast(success);
        router.refresh();
      }
    });
  }

  const count = (s: string) => submissions.filter((x) => x.status === s).length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold">
        {[
          ["open", `Needs attention (${count("new") + count("contacted")})`],
          ["new", `New (${count("new")})`],
          ["booked", `Booked (${count("booked")})`],
          ["closed", `Closed (${count("closed")})`],
          ["spam", `Spam (${count("spam")})`],
          ["all", `All (${submissions.length})`],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-full border px-3.5 py-1.5 ${
              filter === key ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={`${ui.card} px-6 py-16 text-center`}>
          <InboxIcon className="mx-auto mb-3 h-8 w-8 text-slate-300" />
          <p className="text-sm text-slate-500">No submissions here. Appointment and contact requests from the website will appear in this inbox.</p>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {filtered.map((s) => {
            const status = STATUSES.find((x) => x.value === s.status) ?? STATUSES[0];
            const expanded = openId === s.id;
            const details = Object.entries(s.data ?? {}).filter(([, v]) => v !== "" && v !== "false");
            const date = new Date(s.created_at);
            return (
              <li key={s.id} className={`${ui.card} overflow-hidden ${s.status === "new" ? "ring-1 ring-[var(--admin-accent)]/30" : ""}`}>
                <button
                  type="button"
                  onClick={() => setOpenId(expanded ? null : s.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-slate-50/70"
                  aria-expanded={expanded}
                >
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${status.tone}`}>{status.label}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-slate-900">{s.name || "Unnamed"}</span>
                    <span className="block truncate text-xs text-slate-500">
                      {s.form === "appointment" ? "Appointment request" : "Contact message"}
                      {s.data?.reason ? ` · ${s.data.reason}` : s.data?.service ? ` · ${s.data.service}` : ""}
                    </span>
                  </span>
                  <span className="hidden text-right text-xs text-slate-400 sm:block">
                    {date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    <br />
                    {date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>

                {expanded && (
                  <div className="border-t border-slate-100 px-5 py-5">
                    <div className="mb-5 flex flex-wrap gap-2">
                      {s.phone && (
                        <a href={`tel:+${digits(s.phone)}`} className={ui.btnSecondary}>
                          <Phone className="h-4 w-4" /> {s.phone}
                        </a>
                      )}
                      {(s.data?.whatsapp || s.phone) && (
                        <a
                          href={`https://wa.me/${digits(s.data?.whatsapp || s.phone || "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={ui.btnSecondary}
                        >
                          <MessageCircle className="h-4 w-4" /> WhatsApp
                        </a>
                      )}
                      {s.email && (
                        <a href={`mailto:${s.email}`} className={ui.btnSecondary}>
                          <Mail className="h-4 w-4" /> {s.email}
                        </a>
                      )}
                    </div>

                    <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                      {details.map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-xs font-semibold text-slate-400">{humanize(k)}</dt>
                          <dd className="text-slate-800">{v === "true" ? "Yes" : v}</dd>
                        </div>
                      ))}
                    </dl>
                    {s.message && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-slate-400">Message</p>
                        <p className="mt-1 whitespace-pre-line rounded-lg bg-slate-50 p-3 text-sm text-slate-800">{s.message}</p>
                      </div>
                    )}

                    <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 md:grid-cols-[14rem_1fr]">
                      <div>
                        <label className={ui.label} htmlFor={`status-${s.id}`}>
                          Status
                        </label>
                        <select
                          id={`status-${s.id}`}
                          value={s.status}
                          disabled={pending}
                          onChange={(e) => act(() => updateSubmission(s.id, { status: e.target.value }), "Status updated")}
                          className={ui.input}
                        >
                          {STATUSES.map((x) => (
                            <option key={x.value} value={x.value}>
                              {x.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={ui.label} htmlFor={`notes-${s.id}`}>
                          Internal notes
                        </label>
                        <div className="flex gap-2">
                          <textarea
                            id={`notes-${s.id}`}
                            rows={2}
                            value={notes[s.id] ?? s.notes ?? ""}
                            onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))}
                            placeholder="e.g. Called on Monday, booked for Thursday 10am"
                            className={ui.input}
                          />
                          <button
                            type="button"
                            disabled={pending || notes[s.id] === undefined}
                            onClick={() => act(() => updateSubmission(s.id, { notes: notes[s.id] ?? "" }), "Notes saved")}
                            className={ui.btnSecondary}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      {confirmId === s.id ? (
                        <div className="flex gap-2">
                          <button type="button" onClick={() => act(() => deleteSubmission(s.id), "Submission deleted")} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700">
                            Delete permanently
                          </button>
                          <button type="button" onClick={() => setConfirmId("")} className={ui.btnGhost}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setConfirmId(s.id)} className={`${ui.btnGhost} hover:text-red-600`}>
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

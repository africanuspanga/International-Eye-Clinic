"use client";

/* eslint-disable @next/next/no-img-element -- previews of uploaded media */
import { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  FolderOpen,
  Loader2,
  Plus,
  Star,
  Trash2,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import type { Field } from "@/lib/cms/types";
import { emptyValue, slugify } from "@/lib/cms/normalize";
import { RichText } from "@/components/cms/RichText";
import { MediaLibrary } from "./MediaLibrary";
import { uploadToMedia } from "./upload";
import { ui, useToast } from "./ui";

type FieldProps = {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
  values: Record<string, unknown>;
  isNew?: boolean;
};

const str = (v: unknown) => (v === null || v === undefined ? "" : String(v));

export function FieldInput(props: FieldProps) {
  const { field } = props;
  const id = `field-${field.name}`;

  if (field.type === "boolean") return <ToggleField {...props} />;

  return (
    <div>
      <label htmlFor={id} className={ui.label}>
        {field.label}
        {field.required && <span className="ml-0.5 text-[var(--admin-accent)]">*</span>}
      </label>
      <Control {...props} id={id} />
      {field.help && <p className={ui.help}>{field.help}</p>}
    </div>
  );
}

function Control({ field, value, onChange, values, isNew, id }: FieldProps & { id: string }) {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          id={id}
          rows={field.rows ?? 4}
          value={str(value)}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${ui.input} resize-y leading-relaxed`}
        />
      );
    case "markdown":
      return <MarkdownField id={id} field={field} value={str(value)} onChange={onChange} />;
    case "slug":
      return <SlugField id={id} field={field} value={str(value)} onChange={onChange} values={values} isNew={isNew} />;
    case "image":
    case "video":
      return <MediaField id={id} field={field} value={str(value)} onChange={onChange} />;
    case "list":
      return (
        <textarea
          id={id}
          rows={Math.max(3, Math.min(10, (Array.isArray(value) ? value.length : 0) + 1))}
          value={Array.isArray(value) ? value.join("\n") : str(value)}
          placeholder={field.placeholder ?? "One item per line"}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          className={`${ui.input} resize-y leading-relaxed`}
        />
      );
    case "repeater":
      return <RepeaterField field={field} value={value} onChange={onChange} />;
    case "number":
      return (
        <input
          id={id}
          type="number"
          value={str(value)}
          onChange={(e) => onChange(e.target.value)}
          className={`${ui.input} max-w-[10rem]`}
        />
      );
    case "date":
      return (
        <input id={id} type="date" value={str(value).slice(0, 10)} onChange={(e) => onChange(e.target.value)} className={`${ui.input} max-w-[14rem]`} />
      );
    case "rating":
      return (
        <div className="flex items-center gap-1" id={id}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => onChange(n)}
              className="rounded p-0.5 text-amber-400 hover:scale-110"
            >
              <Star className={`h-6 w-6 ${Number(value) >= n ? "fill-current" : "fill-none text-slate-300"}`} />
            </button>
          ))}
        </div>
      );
    case "select":
      if (field.allowCustom) {
        return (
          <>
            <input id={id} list={`${id}-options`} value={str(value)} onChange={(e) => onChange(e.target.value)} className={ui.input} placeholder="Choose or type…" />
            <datalist id={`${id}-options`}>
              {field.options?.map((o) => <option key={o} value={o} />)}
            </datalist>
          </>
        );
      }
      return (
        <select id={id} value={str(value)} onChange={(e) => onChange(e.target.value)} className={ui.input}>
          {!field.required && <option value="">—</option>}
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          id={id}
          type={field.type === "url" ? "url" : "text"}
          value={str(value)}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={ui.input}
        />
      );
  }
}

function ToggleField({ field, value, onChange }: FieldProps) {
  const on = value === true;
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50/60 px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-800">{field.label}</p>
        {field.help && <p className="mt-0.5 text-xs text-slate-500">{field.help}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={field.label}
        onClick={() => onChange(!on)}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${on ? "bg-emerald-500" : "bg-slate-300"}`}
      >
        <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function SlugField({ id, field, value, onChange, values, isNew }: FieldProps & { id: string; value: string }) {
  const [touched, setTouched] = useState(!isNew);
  const source = field.from ? str(values[field.from]) : "";
  const shown = touched ? value : value || slugify(source);

  return (
    <div className="flex gap-2">
      <input
        id={id}
        value={shown}
        onChange={(e) => {
          setTouched(true);
          onChange(e.target.value);
        }}
        onBlur={(e) => onChange(slugify(e.target.value))}
        className={`${ui.input} font-mono text-[13px]`}
        placeholder="auto-generated-from-title"
      />
      {field.from && (
        <button
          type="button"
          title="Generate from title"
          onClick={() => {
            setTouched(true);
            onChange(slugify(source));
          }}
          className={ui.btnSecondary}
        >
          <Wand2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function MarkdownField({ id, field, value, onChange }: { id: string; field: Field; value: string; onChange: (v: unknown) => void }) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        <div className="flex gap-1">
          {(["write", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="hidden text-[11px] text-slate-400 sm:block">
          ## Heading · - bullet · **bold** · [link](https://…) · &gt; tip
        </span>
      </div>
      {tab === "write" ? (
        <textarea
          id={id}
          rows={field.rows ?? 12}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full resize-y border-0 px-3.5 py-3 font-mono text-[13px] leading-relaxed text-slate-900 focus:outline-none"
          placeholder={"Write your article…\n\n## A heading\n\nA paragraph with **bold** text and a [link](https://example.com).\n\n- First point\n- Second point"}
        />
      ) : (
        <div className="max-h-[32rem] overflow-y-auto bg-white px-5 py-4">
          {value.trim() ? (
            <RichText
              source={value}
              classes={{
                h2: "mt-6 mb-3 text-xl font-bold text-slate-900",
                h3: "mt-5 mb-2 text-lg font-bold text-slate-900",
                p: "mb-4 text-[15px] leading-relaxed text-slate-700",
                ul: "mb-4 list-disc space-y-1 pl-6 text-[15px] text-slate-700",
                ol: "mb-4 list-decimal space-y-1 pl-6 text-[15px] text-slate-700",
                quote: "mb-4 rounded-lg border-l-4 border-[var(--admin-accent)] bg-slate-50 px-4 py-3 text-[15px] text-slate-700",
                img: "my-4 max-h-80 rounded-lg",
                a: "font-semibold text-[var(--admin-accent)] underline",
              }}
            />
          ) : (
            <p className="text-sm text-slate-400">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

function MediaField({ id, field, value, onChange }: { id: string; field: Field; value: string; onChange: (v: unknown) => void }) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [picking, setPicking] = useState(false);
  const kind = field.type === "video" ? "video" : "image";

  async function upload(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadToMedia(file));
      toast(`${kind === "video" ? "Video" : "Image"} uploaded`);
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex aspect-video w-full shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-100 sm:w-48">
          {value ? (
            kind === "video" ? (
              <video src={value} className="h-full w-full object-cover" muted playsInline controls preload="metadata" />
            ) : (
              <img src={value} alt="" className="h-full w-full object-cover" />
            )
          ) : (
            <span className="text-xs text-slate-400">No {kind}</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={kind === "video" ? "https://… or /videos/clip.mp4" : "https://… or /images/photo.jpg"}
            className={`${ui.input} text-[13px]`}
          />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className={ui.btnSecondary}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {busy ? "Uploading…" : "Upload"}
            </button>
            <button type="button" onClick={() => setPicking(true)} className={ui.btnSecondary}>
              <FolderOpen className="h-4 w-4" /> Library
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className={`${ui.btnSecondary} text-slate-500`}>
                <X className="h-4 w-4" /> Remove
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={kind === "video" ? "video/*" : "image/*"}
            className="hidden"
            onChange={(e) => upload(e.target.files?.[0])}
          />
        </div>
      </div>

      {picking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={() => setPicking(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Choose from media library"
            className="max-h-[85vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Choose {kind === "video" ? "a video" : "an image"}</h2>
              <button type="button" aria-label="Close" onClick={() => setPicking(false)} className={ui.btnGhost}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <MediaLibrary
              accept={kind}
              onPick={(url) => {
                onChange(url);
                setPicking(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function RepeaterField({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const items = (Array.isArray(value) ? value : []) as Record<string, unknown>[];
  const subs = field.subfields ?? [];
  const update = (next: Record<string, unknown>[]) => onChange(next);

  const blank = () => Object.fromEntries(subs.map((s) => [s.name, emptyValue(s)]));

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">#{index + 1}</span>
            <div className="flex gap-1">
              <button
                type="button"
                aria-label="Move up"
                disabled={index === 0}
                onClick={() => {
                  const next = [...items];
                  [next[index - 1], next[index]] = [next[index], next[index - 1]];
                  update(next);
                }}
                className={ui.btnGhost}
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Move down"
                disabled={index === items.length - 1}
                onClick={() => {
                  const next = [...items];
                  [next[index + 1], next[index]] = [next[index], next[index + 1]];
                  update(next);
                }}
                className={ui.btnGhost}
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Remove item"
                onClick={() => update(items.filter((_, i) => i !== index))}
                className={`${ui.btnGhost} hover:text-red-600`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {subs.map((sub) => (
              <FieldInput
                key={sub.name}
                field={{ ...sub, name: `${field.name}-${index}-${sub.name}` }}
                value={item[sub.name]}
                values={item}
                onChange={(v) => update(items.map((it, i) => (i === index ? { ...it, [sub.name]: v } : it)))}
              />
            ))}
          </div>
        </div>
      ))}
      <button type="button" onClick={() => update([...items, blank()])} className={ui.btnSecondary}>
        <Plus className="h-4 w-4" /> Add {field.label.replace(/s$/, "").toLowerCase()}
      </button>
    </div>
  );
}

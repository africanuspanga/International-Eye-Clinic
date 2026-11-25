"use server";

import { revalidatePath } from "next/cache";
import { adminClientOrThrow } from "./auth";
import { ALL_SETTING_FIELDS, getCollection } from "./collections";
import { normalizeValues } from "./normalize";
import type { ActionResult } from "./types";

const SUBMISSION_STATUSES = ["new", "contacted", "booked", "closed", "spam"];

function fail(error: unknown): ActionResult {
  const e = error as { message?: string; code?: string };
  if (e?.code === "23505") return { ok: false, error: "That URL slug is already used by another entry. Please choose a different one." };
  return { ok: false, error: e?.message || "Something went wrong. Please try again." };
}

/** Refresh every public page so edits show up immediately. */
function refreshSite() {
  revalidatePath("/", "layout");
}

export async function saveEntry(
  collectionKey: string,
  id: string | null,
  values: Record<string, unknown>
): Promise<ActionResult> {
  try {
    const collection = getCollection(collectionKey);
    if (!collection) throw new Error("Unknown content type.");
    const supabase = await adminClientOrThrow();
    const row = normalizeValues(collection.fields, values);

    if (id) {
      const { error } = await supabase.from(collection.table).update(row).eq("id", id);
      if (error) throw error;
    } else {
      const { data, error } = await supabase.from(collection.table).insert(row).select("id").single();
      if (error) throw error;
      id = data.id as string;
    }

    refreshSite();
    return { ok: true, id: id ?? undefined };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteEntry(collectionKey: string, id: string): Promise<ActionResult> {
  try {
    const collection = getCollection(collectionKey);
    if (!collection) throw new Error("Unknown content type.");
    const supabase = await adminClientOrThrow();
    const { error } = await supabase.from(collection.table).delete().eq("id", id);
    if (error) throw error;
    refreshSite();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function setPublished(
  collectionKey: string,
  id: string,
  published: boolean
): Promise<ActionResult> {
  try {
    const collection = getCollection(collectionKey);
    if (!collection) throw new Error("Unknown content type.");
    const supabase = await adminClientOrThrow();
    const { error } = await supabase
      .from(collection.table)
      .update({ is_published: published })
      .eq("id", id);
    if (error) throw error;
    refreshSite();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function saveSettings(values: Record<string, string>): Promise<ActionResult> {
  try {
    const supabase = await adminClientOrThrow();
    const { data: existing } = await supabase.from("site_settings").select("key");
    const saved = new Set((existing ?? []).map((r) => r.key as string));
    const rows = ALL_SETTING_FIELDS.map((field) => {
      const value = String(values[field.key] ?? "").trim();
      if (value && field.pattern && !new RegExp(field.pattern).test(value)) {
        throw new Error(`${field.label}: ${field.patternHint ?? "invalid format."}`);
      }
      if (value && field.type === "url" && !/^https?:\/\//.test(value)) {
        throw new Error(`${field.label} must start with https://`);
      }
      return { key: field.key, value };
    })
      // Never create an empty row for a setting that was never saved: a stored
      // empty value means "switched off" and would override env/default tags.
      .filter((row) => row.value !== "" || saved.has(row.key));
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    if (error) throw error;
    refreshSite();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function updateSubmission(
  id: string,
  patch: { status?: string; notes?: string }
): Promise<ActionResult> {
  try {
    const supabase = await adminClientOrThrow();
    const update: Record<string, string> = {};
    if (patch.status !== undefined) {
      if (!SUBMISSION_STATUSES.includes(patch.status)) throw new Error("Unknown status.");
      update.status = patch.status;
    }
    if (patch.notes !== undefined) update.notes = patch.notes.slice(0, 5000);
    const { error } = await supabase.from("submissions").update(update).eq("id", id);
    if (error) throw error;
    revalidatePath("/admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteSubmission(id: string): Promise<ActionResult> {
  try {
    const supabase = await adminClientOrThrow();
    const { error } = await supabase.from("submissions").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

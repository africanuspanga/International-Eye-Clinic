"use server";

import { createPublicClient } from "@/lib/supabase/public";

export type SubmitResult = { ok: true } | { ok: false; error: string };

const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/**
 * Saves a website form (appointment / contact) to the admin inbox.
 * Anyone may insert; only admins can read (enforced by row-level security).
 */
export async function submitForm(
  form: "appointment" | "contact",
  payload: Record<string, unknown>
): Promise<SubmitResult> {
  // Honeypot: real visitors never fill the hidden "website" field.
  if (clip(payload.website, 200)) return { ok: true };

  const name = clip(payload.fullName ?? payload.name, 200);
  const phone = clip(payload.phone, 50);
  const email = clip(payload.email, 200);
  const message = clip(payload.message, 5000);

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!phone && !email) return { ok: false, error: "Please enter a phone number or email so we can reach you." };

  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (["website", "fullName", "name", "phone", "email", "message"].includes(key)) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      data[key.slice(0, 60)] = clip(value, 500);
    }
  }

  const { error } = await createPublicClient()
    .from("submissions")
    .insert({ form, name, phone, email, message, data });

  if (error) {
    console.error("submitForm failed", error);
    return { ok: false, error: "We couldn't send your request. Please call or WhatsApp us instead." };
  }
  return { ok: true };
}

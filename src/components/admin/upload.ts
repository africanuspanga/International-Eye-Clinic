"use client";

import { createClient } from "@/lib/supabase/client";
import { MEDIA_BUCKET } from "@/lib/supabase/config";
import { slugify } from "@/lib/cms/normalize";

export const MEDIA_FOLDER = "uploads";
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

export type MediaFile = {
  name: string;
  path: string;
  url: string;
  size: number;
  type: string;
  createdAt: string;
};

export const isImage = (nameOrType: string) => /(^image\/|\.(png|jpe?g|gif|webp|avif|svg)$)/i.test(nameOrType);
export const isVideo = (nameOrType: string) => /(^video\/|\.(mp4|webm|mov|m4v)$)/i.test(nameOrType);

export function formatBytes(bytes: number) {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${units[i]}`;
}

/** Uploads a file to the media bucket and returns its public URL. */
export async function uploadToMedia(file: File): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`${file.name} is larger than 50 MB. Please compress it first.`);
  }
  const supabase = createClient();
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "file";
  const path = `${MEDIA_FOLDER}/${Date.now()}-${base}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function listMedia(): Promise<MediaFile[]> {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list(MEDIA_FOLDER, {
    limit: 1000,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error) throw new Error(error.message);
  return (data ?? [])
    .filter((f) => f.id && f.name !== ".emptyFolderPlaceholder")
    .map((f) => {
      const path = `${MEDIA_FOLDER}/${f.name}`;
      return {
        name: f.name.replace(/^\d{10,}-/, ""),
        path,
        url: supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl,
        size: (f.metadata?.size as number) ?? 0,
        type: (f.metadata?.mimetype as string) ?? "",
        createdAt: f.created_at ?? "",
      };
    });
}

export async function deleteMedia(path: string) {
  const supabase = createClient();
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  if (error) throw new Error(error.message);
}

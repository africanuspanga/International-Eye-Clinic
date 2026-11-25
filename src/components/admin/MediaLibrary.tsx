"use client";

/* eslint-disable @next/next/no-img-element -- admin previews of arbitrary uploads */
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, FileText, Film, Loader2, Search, Trash2, Upload } from "lucide-react";
import {
  deleteMedia,
  formatBytes,
  isImage,
  isVideo,
  listMedia,
  uploadToMedia,
  type MediaFile,
} from "./upload";
import { ui, useToast } from "./ui";

type Props = {
  /** When set, the library acts as a picker and clicking a file selects it. */
  onPick?: (url: string) => void;
  accept?: "image" | "video" | "any";
};

export function MediaLibrary({ onPick, accept = "any" }: Props) {
  const toast = useToast();
  const [files, setFiles] = useState<MediaFile[] | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(0);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState("");
  const [confirmDelete, setConfirmDelete] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      setFiles(await listMedia());
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setFiles([]);
    }
  }, []);

  useEffect(() => {
    let active = true;
    listMedia()
      .then((list) => {
        if (active) setFiles(list);
      })
      .catch((e: Error) => {
        if (!active) return;
        setError(e.message);
        setFiles([]);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleFiles(list: FileList | null) {
    if (!list?.length) return;
    const chosen = Array.from(list);
    setUploading(chosen.length);
    let lastUrl = "";
    for (const file of chosen) {
      try {
        lastUrl = await uploadToMedia(file);
      } catch (e) {
        toast((e as Error).message, "error");
      }
      setUploading((n) => n - 1);
    }
    await load();
    if (lastUrl) {
      toast(chosen.length > 1 ? `${chosen.length} files uploaded` : "File uploaded");
      if (onPick && chosen.length === 1) onPick(lastUrl);
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  async function remove(file: MediaFile) {
    try {
      await deleteMedia(file.path);
      setFiles((all) => all?.filter((f) => f.path !== file.path) ?? null);
      toast("File deleted");
    } catch (e) {
      toast((e as Error).message, "error");
    }
    setConfirmDelete("");
  }

  async function copy(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(""), 1500);
  }

  const visible = (files ?? []).filter((f) => {
    if (accept === "image" && !isImage(f.type || f.name)) return false;
    if (accept === "video" && !isVideo(f.type || f.name)) return false;
    return !query || f.name.toLowerCase().includes(query.toLowerCase());
  });

  const acceptAttr = accept === "image" ? "image/*" : accept === "video" ? "video/*" : "image/*,video/*,application/pdf";

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files…"
            className={`${ui.input} pl-9`}
          />
        </label>
        <button type="button" onClick={() => inputRef.current?.click()} className={ui.btnPrimary} disabled={uploading > 0}>
          {uploading > 0 ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading > 0 ? `Uploading ${uploading}…` : "Upload files"}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple={!onPick}
          accept={acceptAttr}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-3"
      >
        {error && <p className="p-4 text-sm text-red-600">{error}</p>}
        {files === null ? (
          <div className="flex items-center justify-center gap-2 p-12 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading media…
          </div>
        ) : visible.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            <Upload className="mx-auto mb-3 h-8 w-8 text-slate-300" />
            {query ? "No files match your search." : "No files yet — drag files here or use Upload."}
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visible.map((file) => {
              const kind = isImage(file.type || file.name) ? "image" : isVideo(file.type || file.name) ? "video" : "file";
              return (
                <li key={file.path} className="group overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => (onPick ? onPick(file.url) : copy(file.url))}
                    className="relative block aspect-[4/3] w-full bg-slate-100"
                    title={onPick ? "Use this file" : "Copy link"}
                  >
                    {kind === "image" ? (
                      <img src={file.url} alt={file.name} loading="lazy" className="h-full w-full object-cover" />
                    ) : kind === "video" ? (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        <Film className="h-8 w-8" />
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        <FileText className="h-8 w-8" />
                      </div>
                    )}
                    {onPick && (
                      <span className="absolute inset-0 flex items-center justify-center bg-[var(--admin-accent)]/0 text-sm font-semibold text-white opacity-0 transition group-hover:bg-[var(--admin-accent)]/70 group-hover:opacity-100">
                        Use this
                      </span>
                    )}
                  </button>
                  <div className="p-2.5">
                    <p className="truncate text-xs font-medium text-slate-800" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-[11px] text-slate-400">{formatBytes(file.size)}</p>
                    {!onPick && (
                      <div className="mt-2 flex gap-1">
                        <button type="button" onClick={() => copy(file.url)} className={ui.btnGhost}>
                          {copied === file.url ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          {copied === file.url ? "Copied" : "Copy link"}
                        </button>
                        {confirmDelete === file.path ? (
                          <button type="button" onClick={() => remove(file)} className={`${ui.btnGhost} text-red-600 hover:bg-red-50 hover:text-red-700`}>
                            Confirm
                          </button>
                        ) : (
                          <button
                            type="button"
                            aria-label={`Delete ${file.name}`}
                            onClick={() => setConfirmDelete(file.path)}
                            className={`${ui.btnGhost} hover:text-red-600`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {!onPick && (
        <p className={ui.help}>
          Tip: files used on the site keep working only while they stay in the library — check before deleting.
        </p>
      )}
    </div>
  );
}

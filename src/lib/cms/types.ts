// Shared CMS types. Collections are plain data so both server pages and
// client forms can import them.

export type FieldType =
  | "text"
  | "textarea"
  | "markdown"
  | "slug"
  | "url"
  | "image"
  | "video"
  | "list"
  | "repeater"
  | "boolean"
  | "number"
  | "select"
  | "date"
  | "rating";

export interface Field {
  /** Database column name. */
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  rows?: number;
  /** For "select" fields. */
  options?: string[];
  /** For "select": let the editor type a value that is not in the list. */
  allowCustom?: boolean;
  /** For "slug": the field the slug is generated from. */
  from?: string;
  /** For "repeater": the fields of each item. */
  subfields?: Field[];
  /** Render at half width on large screens. */
  half?: boolean;
  defaultValue?: unknown;
}

export interface ListColumn {
  name: string;
  label: string;
  kind?: "text" | "date" | "image" | "badge";
}

export interface Collection {
  /** URL segment under /admin. */
  key: string;
  table: string;
  label: string;
  singular: string;
  /** Icon name from components/admin/icons.tsx. */
  icon: string;
  description?: string;
  titleField: string;
  subtitleField?: string;
  imageField?: string;
  columns?: ListColumn[];
  orderBy: { column: string; ascending: boolean }[];
  /** Public URL of an entry, e.g. "/services/{slug}". */
  viewPath?: string;
  searchFields?: string[];
  fields: Field[];
}

export interface SettingField {
  key: string;
  label: string;
  type?: "text" | "textarea" | "url";
  help?: string;
  placeholder?: string;
  /** Validation pattern for the value (e.g. Google tag IDs). */
  pattern?: string;
  patternHint?: string;
}

export interface SettingGroup {
  title: string;
  description?: string;
  fields: SettingField[];
}

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

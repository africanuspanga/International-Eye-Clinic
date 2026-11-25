import type { Field } from "./types";

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function toText(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function toList(value: unknown): string[] {
  const items = Array.isArray(value) ? value : toText(value).split("\n");
  return items.map((v) => toText(v)).filter(Boolean);
}

/** Empty form value for a field, used when creating a new entry. */
export function emptyValue(field: Field): unknown {
  if (field.defaultValue !== undefined) return field.defaultValue;
  switch (field.type) {
    case "list":
    case "repeater":
      return [];
    case "boolean":
      return false;
    case "number":
    case "rating":
      return 0;
    default:
      return "";
  }
}

/**
 * Turn raw form values into a database row. Only configured fields are
 * accepted, so a crafted request can never write other columns.
 */
export function normalizeValues(
  fields: Field[],
  values: Record<string, unknown>
): Record<string, unknown> {
  const row: Record<string, unknown> = {};

  for (const field of fields) {
    const raw = values[field.name];

    switch (field.type) {
      case "list":
        row[field.name] = toList(raw);
        break;
      case "repeater": {
        const subs = field.subfields ?? [];
        const items = Array.isArray(raw) ? raw : [];
        row[field.name] = items
          .map((item) => {
            const obj: Record<string, string> = {};
            for (const sub of subs) obj[sub.name] = toText((item as Record<string, unknown>)?.[sub.name]);
            return obj;
          })
          .filter((obj) => Object.values(obj).some(Boolean));
        break;
      }
      case "boolean":
        row[field.name] = raw === true || raw === "true" || raw === "on";
        break;
      case "number":
      case "rating": {
        const n = Number.parseInt(toText(raw), 10);
        row[field.name] = Number.isFinite(n) ? n : 0;
        break;
      }
      case "date": {
        const d = toText(raw);
        if (d) {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) throw new Error(`${field.label} must be a valid date.`);
          row[field.name] = d;
        }
        // Empty dates are left out so the database default applies.
        break;
      }
      case "slug": {
        const source = field.from ? toText(values[field.from]) : "";
        row[field.name] = slugify(toText(raw) || source);
        break;
      }
      case "url":
      case "image":
      case "video": {
        const url = toText(raw);
        if (url && !/^(https?:\/\/|\/)/.test(url)) {
          throw new Error(`${field.label} must be a full link (https://…) or a site path (/images/…).`);
        }
        row[field.name] = url;
        break;
      }
      default:
        row[field.name] = toText(raw);
    }

    if (field.required) {
      const v = row[field.name];
      if (v === "" || v === undefined || (Array.isArray(v) && v.length === 0)) {
        throw new Error(`${field.label} is required.`);
      }
    }
  }

  return row;
}

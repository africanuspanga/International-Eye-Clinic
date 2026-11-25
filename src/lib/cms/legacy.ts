import type { BlogSection } from "../blog-data";

/** Converts the old structured blog sections into CMS markdown. */
export function sectionsToMarkdown(sections: BlogSection[]): string {
  return sections
    .map((section) => {
      switch (section.type) {
        case "heading":
          return `## ${section.text ?? ""}`;
        case "list":
          return (section.items ?? []).map((item) => `- ${item}`).join("\n");
        case "tip":
          return `> ${section.text ?? ""}`;
        default: {
          let text = section.text ?? "";
          const link = section.link;
          if (link) {
            const at = text.indexOf(link.anchor);
            if (at !== -1) {
              text = `${text.slice(0, at)}[${link.anchor}](${link.href})${text.slice(at + link.anchor.length)}`;
            }
          }
          return text;
        }
      }
    })
    .join("\n\n");
}

/** "2026-03-28" → "March 28, 2026" (UTC, so the day never shifts). */
export function formatPostDate(isoDate: string): string {
  const d = new Date(`${isoDate.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** "March 28, 2026" → "2026-03-28". */
export function toIsoDate(display: string): string {
  const d = new Date(`${display} 00:00:00 UTC`);
  return Number.isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}

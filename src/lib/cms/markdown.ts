// A small, safe Markdown subset for CMS article bodies. Output is plain data
// (never raw HTML), so editors can't inject scripts into the site.
//
//   ## Heading          ### Smaller heading
//   - bullet            1. numbered item
//   > Tip or callout    ![alt text](https://image-url)
//   **bold**  *italic*  [link text](https://…)

export type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string };

export function parseMarkdown(source: string | null | undefined): Block[] {
  const blocks: Block[] = [];
  const lines = (source ?? "").replace(/\r\n?/g, "\n").split("\n");
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let quote: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    if (list) blocks.push({ type: "list", ...list });
    if (quote.length) blocks.push({ type: "quote", text: quote.join(" ") });
    paragraph = [];
    list = null;
    quote = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flush();
      continue;
    }

    const heading = /^(#{2,3})\s+(.*)$/.exec(line) ?? /^#\s+(.*)$/.exec(line);
    if (heading) {
      flush();
      const level = heading.length === 3 && heading[1] === "###" ? 3 : 2;
      blocks.push({ type: "heading", level, text: heading[heading.length - 1] });
      continue;
    }

    const image = /^!\[([^\]]*)\]\((\S+?)\)$/.exec(line);
    if (image && /^(https?:\/\/|\/)/.test(image[2])) {
      flush();
      blocks.push({ type: "image", alt: image[1], src: image[2] });
      continue;
    }

    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (paragraph.length || quote.length || (list && list.ordered !== ordered)) flush();
      list = list ?? { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }

    const q = /^>\s?(.*)$/.exec(line);
    if (q) {
      if (paragraph.length || list) flush();
      quote.push(q[1]);
      continue;
    }

    if (list || quote.length) flush();
    paragraph.push(line);
  }
  flush();
  return blocks;
}

export type InlinePart =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "italic"; text: string }
  | { kind: "link"; text: string; href: string };

/** Split a line of text into bold / italic / link / plain parts. */
export function parseInline(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|\*(?!\s)([^*]+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ kind: "text", text: text.slice(last, m.index) });
    if (m[1] !== undefined) parts.push({ kind: "bold", text: m[1] });
    else if (m[2] !== undefined) {
      const href = m[3];
      if (/^(https?:\/\/|\/|mailto:|tel:|#)/.test(href)) parts.push({ kind: "link", text: m[2], href });
      else parts.push({ kind: "text", text: m[2] });
    } else if (m[4] !== undefined) parts.push({ kind: "italic", text: m[4] });
    last = re.lastIndex;
  }
  if (last < text.length) parts.push({ kind: "text", text: text.slice(last) });
  return parts;
}

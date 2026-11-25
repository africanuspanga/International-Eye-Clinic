/* eslint-disable @next/next/no-img-element -- CMS images can come from any uploaded URL */
import Link from "next/link";
import { parseInline, parseMarkdown, type Block } from "@/lib/cms/markdown";

type Classes = Partial<Record<"h2" | "h3" | "p" | "ul" | "ol" | "li" | "quote" | "img" | "a", string>>;

const DEFAULTS: Required<Classes> = {
  h2: "text-xl font-bold text-[#e62d26] mt-8 mb-2 font-display",
  h3: "text-lg font-bold text-[#1a2a6c] mt-6 mb-2 font-display",
  p: "text-[#374151] text-base leading-relaxed",
  ul: "space-y-2 pl-2",
  ol: "list-decimal space-y-2 pl-6 text-[#374151] text-sm leading-relaxed",
  li: "flex items-start gap-3 text-[#374151] text-sm leading-relaxed before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-[#1a2a6c] before:content-['']",
  quote: "bg-[#fdecea] border-l-4 border-[#e62d26] rounded-r-xl p-5 mt-8 text-[#e62d26] text-sm leading-relaxed font-medium",
  img: "my-6 w-full rounded-2xl",
  a: "text-[#1a2a6c] font-semibold underline underline-offset-4 hover:text-[#e62d26]",
};

export function Inline({ text, linkClass }: { text: string; linkClass?: string }) {
  return (
    <>
      {parseInline(text).map((part, i) => {
        if (part.kind === "bold") return <strong key={i}>{part.text}</strong>;
        if (part.kind === "italic") return <em key={i}>{part.text}</em>;
        if (part.kind === "link") {
          return part.href.startsWith("/") ? (
            <Link key={i} href={part.href} className={linkClass}>
              {part.text}
            </Link>
          ) : (
            <a key={i} href={part.href} className={linkClass} target="_blank" rel="noopener">
              {part.text}
            </a>
          );
        }
        return <span key={i}>{part.text}</span>;
      })}
    </>
  );
}

export function RichText({
  source,
  blocks,
  classes,
  quotePrefix,
}: {
  source?: string | null;
  blocks?: Block[];
  classes?: Classes;
  /** Text shown before each callout, e.g. "💡 ". */
  quotePrefix?: string;
}) {
  const c = { ...DEFAULTS, ...classes };
  const items = blocks ?? parseMarkdown(source);

  return (
    <>
      {items.map((block, i) => {
        switch (block.type) {
          case "heading":
            return block.level === 2 ? (
              <h2 key={i} className={c.h2}>
                <Inline text={block.text} linkClass={c.a} />
              </h2>
            ) : (
              <h3 key={i} className={c.h3}>
                <Inline text={block.text} linkClass={c.a} />
              </h3>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag key={i} className={block.ordered ? c.ol : c.ul}>
                {block.items.map((item, j) => (
                  <li key={j} className={block.ordered ? undefined : c.li}>
                    <Inline text={item} linkClass={c.a} />
                  </li>
                ))}
              </ListTag>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className={c.quote}>
                {quotePrefix}
                <Inline text={block.text} linkClass={c.a} />
              </blockquote>
            );
          case "image":
            return <img key={i} src={block.src} alt={block.alt} loading="lazy" className={c.img} />;
          default:
            return (
              <p key={i} className={c.p}>
                <Inline text={block.text} linkClass={c.a} />
              </p>
            );
        }
      })}
    </>
  );
}

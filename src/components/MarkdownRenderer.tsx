import clsx from "clsx";
import React from "react";

type MarkdownBlock =
  | { type: "heading"; depth: number; content: string }
  | { type: "paragraph"; content: string }
  | { type: "code"; content: string; language?: string }
  | { type: "blockquote"; content: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export function MarkdownRenderer({ content }: { content: string }) {
  const blocks = React.useMemo(() => tokenizeMarkdown(content), [content]);

  return (
    <div className="space-y-8 text-lg leading-relaxed text-gray-800">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const HeadingTag = `h${Math.min(block.depth, 3)}` as const;
            return (
              <HeadingTag
                key={`heading-${index}`}
                className={clsx(
                  "scroll-m-24 font-semibold text-gray-900",
                  block.depth === 1 && "text-3xl",
                  block.depth === 2 && "text-2xl",
                  block.depth >= 3 && "text-xl",
                )}
              >
                {renderInline(block.content)}
              </HeadingTag>
            );
          }
          case "paragraph":
            return (
              <p key={`paragraph-${index}`} className="text-gray-700">
                {renderInline(block.content)}
              </p>
            );
          case "code":
            return (
              <pre
                key={`code-${index}`}
                className="overflow-x-auto rounded-2xl bg-gray-900 p-4 text-sm text-gray-100 shadow-inner"
              >
                <code>{block.content}</code>
              </pre>
            );
          case "blockquote":
            return (
              <blockquote
                key={`blockquote-${index}`}
                className="border-l-4 border-blue-400/60 bg-blue-50/60 p-4 text-gray-700"
              >
                {renderInline(block.content)}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={`ul-${index}`} className="list-disc space-y-2 pl-6 text-gray-700">
                {block.items.map((item, itemIndex) => (
                  <li key={`ul-${index}-${itemIndex}`}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={`ol-${index}`} className="list-decimal space-y-2 pl-6 text-gray-700">
                {block.items.map((item, itemIndex) => (
                  <li key={`ol-${index}-${itemIndex}`}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function tokenizeMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: MarkdownBlock[] = [];

  for (let index = 0; index < lines.length; ) {
    const line = lines[index];
    if (!line || !line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```") || line.startsWith("~~~")) {
      const fence = line.slice(0, 3);
      const language = line.slice(3).trim() || undefined;
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith(fence)) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({ type: "code", content: codeLines.join("\n"), language });
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].startsWith(">")) {
        quoteLines.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push({ type: "blockquote", content: quoteLines.join(" ") });
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        depth: headingMatch[1].length,
        content: headingMatch[2].trim(),
      });
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^[-*]\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "ol", items });
      continue;
    }

    const paragraphLines: string[] = [];

    while (index < lines.length && lines[index].trim()) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    const paragraph = paragraphLines.join(" ").replace(/\s{2,}/g, " ");
    blocks.push({ type: "paragraph", content: paragraph });
  }

  return blocks;
}

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^\)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let tokenIndex = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plain = text.slice(lastIndex, match.index);
      nodes.push(<React.Fragment key={`text-${tokenIndex++}`}>{plain}</React.Fragment>);
    }

    const token = match[0];

    if (token.startsWith("**")) {
      const value = token.slice(2, -2);
      nodes.push(
        <strong key={`strong-${tokenIndex++}`} className="font-semibold text-gray-900">
          {renderInline(value)}
        </strong>,
      );
    } else if (token.startsWith("_")) {
      const value = token.slice(1, -1);
      nodes.push(
        <em key={`em-${tokenIndex++}`} className="text-gray-900">
          {renderInline(value)}
        </em>,
      );
    } else if (token.startsWith("`")) {
      const value = token.slice(1, -1);
      nodes.push(
        <code key={`code-${tokenIndex++}`} className="rounded bg-gray-200 px-1 py-0.5 font-mono text-sm">
          {value}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        nodes.push(
          <a
            key={`link-${tokenIndex++}`}
            href={href}
            className="font-medium text-blue-600 underline-offset-2 hover:underline"
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            {label}
          </a>,
        );
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(
      <React.Fragment key={`text-${tokenIndex++}`}>{text.slice(lastIndex)}</React.Fragment>,
    );
  }

  return nodes;
}

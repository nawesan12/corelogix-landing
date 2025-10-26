import fs from "node:fs/promises";
import path from "node:path";
import type { ReactElement, ReactNode } from "react";

const BLOG_DIRECTORY = path.join(process.cwd(), "src/content/blog");

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author?: string;
  tags: string[];
  coverImage?: string;
}

export interface BlogListItem extends BlogFrontmatter {
  slug: string;
  excerpt: string;
  readingTime: string;
}

export interface BlogPost extends BlogListItem {
  content: ReactElement[];
}

export async function getBlogSlugs(): Promise<string[]> {
  const entries = await fs.readdir(BLOG_DIRECTORY, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

export async function getAllPosts(): Promise<BlogListItem[]> {
  const slugs = await getBlogSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { frontmatter, content } = parseFrontmatter(fileContents, slug);

      const excerpt = extractExcerpt(content);
      const readingTime = calculateReadingTime(content);

      return {
        slug,
        ...frontmatter,
        excerpt,
        readingTime,
      } satisfies BlogListItem;
    }),
  );

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { frontmatter, content } = parseFrontmatter(fileContents, slug);

    const readingTime = calculateReadingTime(content);
    const rendered = renderMarkdown(content);

    return {
      slug,
      ...frontmatter,
      excerpt: extractExcerpt(content),
      readingTime,
      content: rendered,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

export function formatBlogDate(date: string): string {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return formatter.format(new Date(date));
}

function parseFrontmatter(source: string, slug: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
  const match = source.match(frontmatterRegex);

  let content = source;
  let data: Record<string, unknown> = {};

  if (match) {
    content = source.slice(match[0].length);
    data = parseFrontmatterBlock(match[1]);
  }

  const frontmatter = normalizeFrontmatter(data, slug);

  return { frontmatter, content };
}

function parseFrontmatterBlock(block: string): Record<string, unknown> {
  const lines = block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const data: Record<string, unknown> = {};

  for (const line of lines) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    data[key] = parseFrontmatterValue(value);
  }

  return data;
}

function parseFrontmatterValue(rawValue: string): unknown {
  if (!rawValue) {
    return "";
  }

  if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
    const listItems = rawValue.slice(1, -1).split(",");
    return listItems
      .map((item) => item.trim())
      .filter(Boolean)
      .map(stripQuotes);
  }

  return stripQuotes(rawValue);
}

function stripQuotes(value: string): string {
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): BlogFrontmatter {
  const title = typeof data.title === "string" ? data.title : "Untitled";
  const description =
    typeof data.description === "string"
      ? data.description
      : "Read the latest from Grow ERP.";
  const dateValue = typeof data.date === "string" ? data.date : undefined;

  if (!dateValue) {
    throw new Error(
      `The blog post "${slug}" is missing a valid \`date\` value in its frontmatter.`,
    );
  }

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(
      `The blog post "${slug}" includes an invalid \`date\` value: ${dateValue}.`,
    );
  }

  const author = typeof data.author === "string" ? data.author : undefined;
  const coverImage =
    typeof data.coverImage === "string" ? data.coverImage : undefined;
  const tags = Array.isArray(data.tags)
    ? (data.tags.filter((tag): tag is string => typeof tag === "string") ?? [])
    : [];

  return {
    title,
    description,
    date: parsedDate.toISOString(),
    author,
    coverImage,
    tags,
  };
}

function calculateReadingTime(content: string): string {
  const words = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.round(words.length / wordsPerMinute));

  return `${minutes} min read`;
}

function extractExcerpt(content: string): string {
  const sanitized = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^>.*$/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1");

  const paragraphs = sanitized
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").trim())
    .filter(Boolean);

  if (!paragraphs.length) {
    return "";
  }

  const snippet = paragraphs[0];
  if (snippet.length <= 180) {
    return snippet;
  }

  return `${snippet.slice(0, 177).trim()}...`;
}

function renderMarkdown(content: string): ReactElement[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const elements: ReactElement[] = [];
  let index = 0;
  let keyCounter = 0;

  const nextKey = () => {
    keyCounter += 1;
    return `mdx-${keyCounter}`;
  };

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (/^---\s*$/.test(line.trim())) {
      elements.push(
        <hr
          key={nextKey()}
          className="my-12 border-border/80"
        />,
      );
      index += 1;
      continue;
    }

    if (/^```/.test(line.trim())) {
      const fence = line.trim();
      const language = fence.slice(3).trim();
      index += 1;
      const codeLines: string[] = [];
      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      elements.push(
        <pre
          key={nextKey()}
          className="overflow-x-auto rounded-2xl bg-muted/60 px-6 py-5 text-sm text-foreground shadow-sm"
        >
          <code className={language ? `language-${language}` : undefined}>
            {codeLines.join("\n")}
          </code>
        </pre>,
      );
      continue;
    }

    if (/^#{1,6}\s/.test(line)) {
      const level = line.match(/^#{1,6}/)![0].length;
      const text = line.replace(/^#{1,6}\s*/, "");
      const HeadingTag = `h${Math.min(level, 6)}` as const;
      elements.push(
        <HeadingTag key={nextKey()} className={headingClass(level)}>
          {renderInline(text, nextKey())}
        </HeadingTag>,
      );
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      const quoteParagraphs = quoteLines
        .join("\n")
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

      elements.push(
        <blockquote
          key={nextKey()}
          className="space-y-4 border-l-2 border-primary/40 pl-6 text-lg italic text-muted-foreground"
        >
          {quoteParagraphs.map((paragraph, quoteIndex) => (
            <p key={`quote-${quoteIndex}`} className="leading-relaxed">
              {renderInline(paragraph, `quote-${quoteIndex}`)}
            </p>
          ))}
        </blockquote>,
      );
      continue;
    }

    if (/^(\*|\-|\+)\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const isOrdered = /^\d+\.\s+/.test(line);
      const items: string[] = [];

      while (
        index < lines.length &&
        ((isOrdered && /^\d+\.\s+/.test(lines[index])) ||
          (!isOrdered && /^(\*|\-|\+)\s+/.test(lines[index])))
      ) {
        const item = isOrdered
          ? lines[index].replace(/^\d+\.\s+/, "")
          : lines[index].replace(/^(\*|\-|\+)\s+/, "");
        items.push(item.trim());
        index += 1;
      }

      const ListTag = (isOrdered ? "ol" : "ul") as const;

      elements.push(
        <ListTag
          key={nextKey()}
          className="ml-6 list-inside space-y-2 text-muted-foreground"
        >
          {items.map((item, itemIndex) => (
            <li key={`list-item-${itemIndex}`} className="leading-relaxed">
              {renderInline(item, `list-item-${itemIndex}`)}
            </li>
          ))}
        </ListTag>,
      );

      continue;
    }

    const paragraphLines: string[] = [];

    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^#{1,6}\s/.test(lines[index]) &&
      !/^```/.test(lines[index].trim()) &&
      !/^>\s?/.test(lines[index]) &&
      !/^(\*|\-|\+)\s+/.test(lines[index]) &&
      !/^\d+\.\s+/.test(lines[index]) &&
      !/^---\s*$/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    const paragraphText = paragraphLines
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (paragraphText) {
      elements.push(
        <p key={nextKey()} className="leading-7 text-muted-foreground">
          {renderInline(paragraphText, nextKey())}
        </p>,
      );
    }
  }

  return elements;
}

function headingClass(level: number): string {
  switch (level) {
    case 1:
      return "text-4xl font-semibold tracking-tight text-foreground sm:text-5xl";
    case 2:
      return "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl";
    case 3:
      return "text-2xl font-semibold text-foreground";
    case 4:
      return "text-xl font-semibold text-foreground";
    default:
      return "text-lg font-semibold text-foreground";
  }
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let index = 0;

  const pushText = (value: string) => {
    if (!value) return;
    nodes.push(value);
  };

  while (remaining.length > 0) {
    const boldMatch = /\*\*(.+?)\*\*/.exec(remaining);
    if (boldMatch) {
      pushText(remaining.slice(0, boldMatch.index ?? 0));
      nodes.push(
        <strong key={`${keyPrefix}-bold-${index}`} className="font-semibold text-foreground">
          {renderInline(boldMatch[1], `${keyPrefix}-bold-${index}`)}
        </strong>,
      );
      remaining = remaining.slice((boldMatch.index ?? 0) + boldMatch[0].length);
      index += 1;
      continue;
    }

    const doubleUnderscoreMatch = /__(.+?)__/.exec(remaining);
    if (doubleUnderscoreMatch) {
      pushText(remaining.slice(0, doubleUnderscoreMatch.index ?? 0));
      nodes.push(
        <strong key={`${keyPrefix}-bold-${index}`} className="font-semibold text-foreground">
          {renderInline(doubleUnderscoreMatch[1], `${keyPrefix}-bold-${index}`)}
        </strong>,
      );
      remaining = remaining.slice(
        (doubleUnderscoreMatch.index ?? 0) + doubleUnderscoreMatch[0].length,
      );
      index += 1;
      continue;
    }

    const italicMatch = /\*(.+?)\*/.exec(remaining);
    if (italicMatch) {
      pushText(remaining.slice(0, italicMatch.index ?? 0));
      nodes.push(
        <em key={`${keyPrefix}-italic-${index}`} className="italic">
          {renderInline(italicMatch[1], `${keyPrefix}-italic-${index}`)}
        </em>,
      );
      remaining = remaining.slice((italicMatch.index ?? 0) + italicMatch[0].length);
      index += 1;
      continue;
    }

    const underscoreItalicMatch = /_(.+?)_/.exec(remaining);
    if (underscoreItalicMatch) {
      pushText(remaining.slice(0, underscoreItalicMatch.index ?? 0));
      nodes.push(
        <em key={`${keyPrefix}-italic-${index}`} className="italic">
          {renderInline(underscoreItalicMatch[1], `${keyPrefix}-italic-${index}`)}
        </em>,
      );
      remaining = remaining.slice(
        (underscoreItalicMatch.index ?? 0) + underscoreItalicMatch[0].length,
      );
      index += 1;
      continue;
    }

    const strikeMatch = /~~(.+?)~~/.exec(remaining);
    if (strikeMatch) {
      pushText(remaining.slice(0, strikeMatch.index ?? 0));
      nodes.push(
        <span key={`${keyPrefix}-strike-${index}`} className="line-through">
          {renderInline(strikeMatch[1], `${keyPrefix}-strike-${index}`)}
        </span>,
      );
      remaining = remaining.slice((strikeMatch.index ?? 0) + strikeMatch[0].length);
      index += 1;
      continue;
    }

    const codeMatch = /`([^`]+)`/.exec(remaining);
    if (codeMatch) {
      pushText(remaining.slice(0, codeMatch.index ?? 0));
      nodes.push(
        <code
          key={`${keyPrefix}-code-${index}`}
          className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-medium"
        >
          {codeMatch[1]}
        </code>,
      );
      remaining = remaining.slice((codeMatch.index ?? 0) + codeMatch[0].length);
      index += 1;
      continue;
    }

    const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(remaining);
    if (linkMatch) {
      pushText(remaining.slice(0, linkMatch.index ?? 0));
      nodes.push(
        <a
          key={`${keyPrefix}-link-${index}`}
          href={linkMatch[2]}
          className="font-semibold text-primary underline underline-offset-4"
        >
          {linkMatch[1]}
        </a>,
      );
      remaining = remaining.slice((linkMatch.index ?? 0) + linkMatch[0].length);
      index += 1;
      continue;
    }

    const specialIndex = findNextSpecialIndex(remaining);
    if (specialIndex === -1) {
      pushText(remaining);
      break;
    }

    pushText(remaining.slice(0, specialIndex));
    remaining = remaining.slice(specialIndex);
  }

  return nodes;
}

function findNextSpecialIndex(value: string): number {
  const specials = ["*", "_", "~", "`", "["];
  let closest = -1;
  for (const token of specials) {
    const tokenIndex = value.indexOf(token);
    if (tokenIndex !== -1 && (closest === -1 || tokenIndex < closest)) {
      closest = tokenIndex;
    }
  }

  return closest;
}

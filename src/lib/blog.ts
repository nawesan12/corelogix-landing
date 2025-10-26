import fs from "node:fs";
import path from "node:path";

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  author?: string;
  hero?: string;
  tags?: string[];
};

export type BlogMetadata = BlogFrontmatter & {
  slug: string;
  readingTime: string;
  dateLabel: string;
};

export type BlogPost = {
  metadata: BlogMetadata;
  content: string;
};

const BLOG_DIRECTORY = path.join(process.cwd(), "src", "content", "blog");

export function getAllPostsMetadata(): BlogMetadata[] {
  return getSlugs()
    .map((slug) => parsePost(slug).metadata)
    .sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();

      if (Number.isNaN(aTime) && Number.isNaN(bTime)) return 0;
      if (Number.isNaN(aTime)) return 1;
      if (Number.isNaN(bTime)) return -1;

      return bTime - aTime;
    });
}

export function getPost(slug: string): BlogPost {
  return parsePost(slug);
}

export function getSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function parsePost(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontMatter(raw);

  if (!data.title || !data.description || !data.date) {
    throw new Error(`Missing required front matter fields in ${slug}.mdx`);
  }

  const cleanContent = content.trim();
  const readingTime = calculateReadingTime(cleanContent);
  const dateLabel = formatDateLabel(data.date);

  const tags = Array.isArray(data.tags)
    ? data.tags
    : data.tags
      ? [data.tags]
      : [];

  return {
    metadata: {
      ...data,
      slug,
      tags,
      readingTime,
      dateLabel,
    },
    content: cleanContent,
  };
}

type FrontMatterParseResult = {
  data: BlogFrontmatter;
  content: string;
};

function parseFrontMatter(source: string): FrontMatterParseResult {
  if (!source.startsWith("---")) {
    return { data: {} as BlogFrontmatter, content: source };
  }

  const closingIndex = source.indexOf("\n---", 3);

  if (closingIndex === -1) {
    return { data: {} as BlogFrontmatter, content: source };
  }

  const frontMatterBlock = source.slice(3, closingIndex).trim();
  const rest = source.slice(closingIndex + 4).replace(/^\s*/, "");

  const lines = frontMatterBlock
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const data = Object.fromEntries(
    lines
      .filter((line) => line.includes(":"))
      .map((line) => {
        const [key, ...valueParts] = line.split(":");
        const valueRaw = valueParts.join(":").trim();
        return [key.trim(), parseFrontMatterValue(valueRaw)];
      }),
  ) as BlogFrontmatter;

  return { data, content: rest };
}

function parseFrontMatterValue(value: string): string | string[] {
  if (!value) return "";

  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();

    if (!inner) {
      return [];
    }

    return inner
      .split(",")
      .map((item) => item.trim())
      .map((item) => item.replace(/^"|"$/g, "").replace(/^'|'$/g, ""));
  }

  return value.replace(/^"|"$/g, "").replace(/^'|'$/g, "");
}

function calculateReadingTime(content: string): string {
  const words = content.split(/\s+/).filter(Boolean);
  const minutes = Math.max(1, Math.round(words.length / 200));
  return `${minutes} min de lectura`;
}

function formatDateLabel(date: string): string {
  const formatter = new Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const parsed = new Date(date);

  if (Number.isNaN(parsed.valueOf())) {
    return date;
  }

  return formatter.format(parsed);
}

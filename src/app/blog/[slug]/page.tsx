import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatBlogDate,
  getAllPosts,
  getBlogPost,
  type BlogPost,
} from "@/lib/blog";

type BlogPageParams = { slug: string };

type BlogPageProps = {
  params: Promise<BlogPageParams>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Publicación no encontrada | Grow ERP",
      description: "La entrada de blog que buscas no se pudo encontrar.",
    };
  }

  return {
    title: `${post.title} | Grow ERP`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags.length ? post.tags : undefined,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <ArticleContent post={post} />;
}

function ArticleContent({ post }: { post: BlogPost }) {
  return (
    <article className="bg-background">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-8 sm:pt-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>

        <header className="mt-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>{post.readingTime}</span>
            {post.author ? (
              <>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span>{post.author}</span>
              </>
            ) : null}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>

          <p className="text-lg leading-8 text-muted-foreground">{post.description}</p>

          {post.tags.length ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={`${post.slug}-${tag}`}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        {post.coverImage ? (
          <div className="relative my-12 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border/80 bg-muted">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="space-y-8 text-base leading-7 text-muted-foreground">
          {post.content}
        </div>
      </div>
    </article>
  );
}

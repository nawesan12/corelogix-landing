import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { getPost, getSlugs } from "@/lib/blog";

type BlogPostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  try {
    const post = getPost(params.slug);
    return {
      title: `${post.metadata.title} | Corelogix Blog`,
      description: post.metadata.description,
      openGraph: {
        title: post.metadata.title,
        description: post.metadata.description,
      },
    };
  } catch {
    return {
      title: "Artículo no encontrado | Corelogix Blog",
      description: "El artículo que buscas no está disponible.",
    };
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = getPost(params.slug);
    const { metadata, content } = post;

    return (
      <main className="bg-white">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
          <div className="space-y-4 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Volver al blog
            </Link>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-600">Corelogix Blog</p>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">{metadata.title}</h1>
            <p className="text-lg text-gray-600">{metadata.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
              <span>{metadata.dateLabel}</span>
              <span>•</span>
              <span>{metadata.readingTime}</span>
              {metadata.author && (
                <>
                  <span>•</span>
                  <span>{metadata.author}</span>
                </>
              )}
            </div>
            {metadata.tags && metadata.tags.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-2 text-sm">
                {metadata.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700 ring-1 ring-blue-200">
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {metadata.hero && (
            <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl border border-gray-100 shadow-lg">
              <Image
                src={metadata.hero}
                alt={metadata.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          <div className="mt-12 border-t border-gray-100 pt-10">
            <MarkdownRenderer content={content} />
          </div>
        </article>
      </main>
    );
  } catch {
    return notFound();
  }
}

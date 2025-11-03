import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { formatBlogDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Grow ERP",
  description:
    "Historias, actualizaciones de producto y guías para ayudar a los equipos de ingresos, operaciones y finanzas a crecer con confianza.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-primary">
            Blog
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Ideas, actualizaciones y guías del equipo de Grow ERP
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Descubre cómo los operadores modernos escalan sus motores de ingresos, optimizan operaciones y ofrecen mejores
            experiencias a sus clientes con Grow ERP.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {posts.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-border/60 bg-card/40 p-12 text-center">
              <h2 className="text-2xl font-semibold text-foreground">Estamos preparando nuestras primeras historias</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Suscríbete al boletín y sé el primero en enterarte cuando publiquemos nuevas guías y actualizaciones de
                producto.
              </p>
            </div>
          ) : null}

          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/70 shadow-sm transition hover:border-primary/40 hover:shadow-lg"
              >
                {post.coverImage ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={800}
                      height={480}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}

                <div className="flex h-full flex-1 flex-col px-6 pb-6 pt-8">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                    <span>{post.readingTime}</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    {post.excerpt}
                  </p>

                  {post.tags.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={`${post.slug}-${tag}`}
                          className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Leer artículo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

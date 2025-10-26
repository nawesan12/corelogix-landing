import Image from "next/image";
import Link from "next/link";

import { getAllPostsMetadata } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPostsMetadata();
  const [featured, ...rest] = posts;
  const hasPosts = posts.length > 0;

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-24 lg:flex-row lg:items-center lg:gap-20">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              Actualizaciones y guías de Corelogix
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Historias, prácticas recomendadas y lanzamientos en un solo lugar
            </h1>
            <p className="text-lg text-gray-600">
              Explora cómo las empresas crecen con Corelogix, aprende a implementar cada módulo y mantente al día con nuestras
              últimas noticias de producto.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#articulos"
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Ver artículos
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-transparent px-5 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-100"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
          {featured && (
            <article className="w-full max-w-xl overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-100/50">
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={featured.hero || "/hero1.png"}
                    alt={featured.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span>{featured.dateLabel}</span>
                    <span>•</span>
                    <span>{featured.readingTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 transition group-hover:text-blue-600">
                    {featured.title}
                  </h2>
                  <p className="text-gray-600">{featured.description}</p>
                  {featured.tags && featured.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2 text-sm">
                      {featured.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700 ring-1 ring-blue-200"
                        >
                          #{tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Link>
            </article>
          )}
        </div>
      </section>

      <section id="articulos" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-16">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Últimos artículos</h2>
            <p className="text-gray-600">
              Reunimos aprendizajes del equipo de producto, implementación y éxito del cliente para impulsar tus operaciones.
            </p>
          </div>
        </div>
        {hasPosts ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {rest.map((post) => (
              <article
                key={post.slug}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm shadow-gray-100/70 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.hero || "/hero2.png"}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-300 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                      <span>{post.dateLabel}</span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 transition group-hover:text-blue-600">
                      {post.title}
                    </h3>
                    <p className="flex-1 text-gray-600">{post.description}</p>
                    {post.tags && post.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-2 text-sm">
                        {post.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 ring-1 ring-gray-200"
                          >
                            #{tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
              </article>
            ))}
            {rest.length === 0 && (
              <p className="rounded-3xl border border-dashed border-blue-200 bg-blue-50/50 p-8 text-center text-gray-600">
                Estamos preparando más historias. Vuelve pronto para descubrir las novedades del equipo.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-dashed border-blue-200 bg-blue-50/50 p-10 text-center text-gray-600">
            Aún no hay artículos publicados. Estamos trabajando en nuevos contenidos para ayudarte a sacar más provecho de Corelogix.
          </div>
        )}
      </section>
    </main>
  );
}

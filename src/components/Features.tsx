"use client";

import { ReactNode, useMemo } from "react";
import {
  ClipboardList,
  SlidersHorizontal,
  BarChart3,
  Moon,
  Wrench,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

// ----------------------
// Types
// ----------------------
export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  icon?: ReactNode; // Optional custom icon
  badge?: string;
};

export type FeaturesProps = {
  kicker?: string; // small label above the title
  title?: string;
  highlight?: string; // word span to underscore
  subtitle?: string;
  items?: FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
};

// ----------------------
// Defaults
// ----------------------
const DEFAULT_ITEMS: FeatureItem[] = [
  {
    id: "copy-paste",
    title: "Copy & paste components",
    description:
      "Arrancá en minutos con piezas listas para producción. Copiá, pegá y personalizá sin fricción.",
    href: "#",
    ctaLabel: "Read more",
    icon: <ClipboardList className="h-6 w-6" aria-hidden />,
    badge: "Ready to ship",
  },
  {
    id: "zero-config",
    title: "Zero configuration",
    description:
      "Funciona out‑of‑the‑box con Tailwind, shadcn/ui y TypeScript. Sin archivos ocultos ni magia rara.",
    href: "#",
    ctaLabel: "Read more",
    icon: <SlidersHorizontal className="h-6 w-6" aria-hidden />,
  },
  {
    id: "monthly",
    title: "New components every month",
    description:
      "Lanzamos sets frescos con patrones modernos (tables, wizards, layouts), basados en feedback real.",
    href: "#",
    ctaLabel: "See roadmap",
    icon: <BarChart3 className="h-6 w-6" aria-hidden />,
    badge: "Roadmap",
  },
  {
    id: "dark-mode",
    title: "Elegant dark mode",
    description:
      "Temas claros/oscuro consistentes con tokens y contrastes accesibles (WCAG AA).",
    href: "#",
    ctaLabel: "Read more",
    icon: <Moon className="h-6 w-6" aria-hidden />,
  },
  {
    id: "customization",
    title: "Easy customizations",
    description:
      "Configurable por props y design tokens. Cambiá colores, radios, tipografías y densidad en un paso.",
    href: "#",
    ctaLabel: "Docs",
    icon: <Wrench className="h-6 w-6" aria-hidden />,
  },
  {
    id: "clean-designs",
    title: "Simple & clean designs",
    description:
      "Interfaz pulida, estados de carga y empty states listos. Menos ruido, más señal.",
    href: "#",
    ctaLabel: "Read more",
    icon: <Sparkles className="h-6 w-6" aria-hidden />,
  },
];

// ----------------------
// Component
// ----------------------
export default function Features({
  kicker = "Explore",
  title = "Explore our awesome",
  highlight = "Components",
  subtitle = "Componentes listos para producción que podés adaptar a tu marca en minutos.",
  items,
  columns = 3,
  className,
}: FeaturesProps) {
  const data = useMemo(() => items ?? DEFAULT_ITEMS, [items]);

  const colClass = useMemo(() => {
    switch (columns) {
      case 2:
        return "md:grid-cols-2";
      case 4:
        return "md:grid-cols-2 xl:grid-cols-4";
      default:
        return "md:grid-cols-2 xl:grid-cols-3";
    }
  }, [columns]);

  return (
    <section
      className={`mx-auto max-w-7xl ${className ?? ""}`}
      aria-labelledby="features-title"
    >
      <div className="container mx-auto px-6 py-12">
        {/* Heading */}
        <header className="max-w-3xl">
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-wider text-[#007BD3]">
              {kicker}
            </p>
          )}
          <h1
            id="features-title"
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 lg:text-4xl"
          >
            {title} <br className="hidden sm:block" />
            <span className="underline decoration-[#007BD3] decoration-4 underline-offset-4">
              {highlight}
            </span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{subtitle}</p>
        </header>

        {/* Grid */}
        <motion.ul
          role="list"
          className={`mt-10 grid grid-cols-1 gap-6 xl:gap-8 ${colClass}`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
        >
          {data.map((f) => (
            <motion.li
              key={f.id}
              variants={{
                hidden: { y: 12, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F3FC] text-[#007BD3] ring-1 ring-[#BADDFF]">
                  {f.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {f.title}
                    </h3>
                    {f.badge && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-[#007BD3] dark:bg-neutral-800">
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {f.description}
                  </p>

                  {f.href && (
                    <a
                      href={f.href}
                      className="mt-3 inline-flex items-center text-sm font-medium text-[#007BD3] underline-offset-4 transition hover:text-[#0b6dbd] hover:underline"
                    >
                      {f.ctaLabel ?? "Read more"}
                      <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

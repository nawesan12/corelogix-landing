"use client";

import { ReactNode, useMemo } from "react";
import {
  BarChart3,
  BellRing,
  Boxes,
  Building2,
  ClipboardList,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  icon?: ReactNode;
  badge?: string;
};

export type FeaturesProps = {
  kicker?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  items?: FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
};

const DEFAULT_ITEMS: FeatureItem[] = [
  {
    id: "automation",
    title: "Workflows contables automáticos",
    description:
      "Configura reglas para asientos, impuestos y conciliaciones que se ejecutan sin intervención manual.",
    href: "#",
    ctaLabel: "Ver workflows",
    icon: <Workflow className="h-6 w-6" aria-hidden />,
    badge: "Nuevo",
  },
  {
    id: "procurement",
    title: "Compras centralizadas",
    description:
      "Solicitudes, aprobaciones y órdenes conectadas al inventario para evitar faltantes y duplicados.",
    href: "#",
    ctaLabel: "Ver módulo",
    icon: <ClipboardList className="h-6 w-6" aria-hidden />,
  },
  {
    id: "reporting",
    title: "Reportes financieros en tiempo real",
    description:
      "Dashboards configurables por rol con KPIs, flujos de caja proyectados y escenarios multi-moneda.",
    href: "#",
    ctaLabel: "Explorar reportes",
    icon: <BarChart3 className="h-6 w-6" aria-hidden />,
    badge: "Favorito CFO",
  },
  {
    id: "integrations",
    title: "Integraciones bancarias y fiscales",
    description:
      "Conectores certificados para bancos regionales, AFIP y eCommerce líderes con sincronización diaria.",
    href: "#",
    ctaLabel: "Catálogo de integraciones",
    icon: <Building2 className="h-6 w-6" aria-hidden />,
  },
  {
    id: "alerts",
    title: "Alertas inteligentes",
    description:
      "Notificaciones proactivas cuando un presupuesto se excede, una orden se detiene o la demanda cambia.",
    href: "#",
    ctaLabel: "Configurar alertas",
    icon: <BellRing className="h-6 w-6" aria-hidden />,
  },
  {
    id: "inventory",
    title: "Inventario omnicanal",
    description:
      "Control de stock en múltiples depósitos con trazabilidad por lote, serie y picking asistido.",
    href: "#",
    ctaLabel: "Ver inventario",
    icon: <Boxes className="h-6 w-6" aria-hidden />,
  },
];

export default function Features({
  kicker = "Plataforma",
  title = "Todo lo que necesitás para escalar",
  highlight = "en un solo lugar",
  subtitle = "Grow ERP conecta finanzas, compras, ventas e inventario en un sistema intuitivo para equipos híbridos.",
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
    <section className={`mx-auto max-w-7xl ${className ?? ""}`} aria-labelledby="features-title">
      <div className="container mx-auto px-6 py-20">
        <header className="max-w-3xl">
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-wider text-[#007BD3]">
              {kicker}
            </p>
          )}
          <h1
            id="features-title"
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl"
          >
            {title} <br className="hidden sm:block" />
            <span className="underline decoration-[#007BD3] decoration-4 underline-offset-4">
              {highlight}
            </span>
          </h1>
          <p className="mt-4 text-gray-600">{subtitle}</p>
        </header>

        <motion.ul
          role="list"
          className={`mt-12 grid grid-cols-1 gap-6 xl:gap-8 ${colClass}`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {data.map((f) => (
            <motion.li
              key={f.id}
              variants={{ hidden: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F3FC] text-[#007BD3] ring-1 ring-[#BADDFF]">
                  {f.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">{f.title}</h3>
                    {f.badge && (
                      <span className="rounded-full bg-[#E6F3FC] px-2 py-0.5 text-xs font-medium text-[#007BD3]">
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.description}</p>

                  {f.href && (
                    <a
                      href={f.href}
                      className="mt-4 inline-flex items-center text-sm font-medium text-[#007BD3] underline-offset-4 transition hover:text-[#0b6dbd] hover:underline"
                    >
                      {f.ctaLabel ?? "Ver más"}
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

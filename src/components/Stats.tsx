"use client";

import { Building2, Gauge, ShieldCheck, SmilePlus } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    id: "companies",
    value: "320+",
    label: "empresas en LATAM",
    description:
      "Automatizando finanzas, inventario y operaciones con un único panel.",
    icon: Building2,
  },
  {
    id: "efficiency",
    value: "35%",
    label: "menos tiempo administrativo",
    description:
      "Flujos automáticos para conciliaciones bancarias, compras y facturación.",
    icon: Gauge,
  },
  {
    id: "reliability",
    value: "99.9%",
    label: "disponibilidad garantizada",
    description:
      "Infraestructura cloud redundante y monitoreo 24/7 a cargo de nuestro equipo.",
    icon: ShieldCheck,
  },
  {
    id: "satisfaction",
    value: "4.8/5",
    label: "de satisfacción del cliente",
    description:
      "Acompañamiento continuo con especialistas en implementación de ERPs.",
    icon: SmilePlus,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const card = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function Stats() {
  return (
    <motion.section
      className="mx-auto max-w-7xl px-6 py-16"
      aria-labelledby="stats-title"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-[#007BD3]">
          Resultados reales
        </p>
        <h2
          id="stats-title"
          className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          El impacto de Grow ERP en organizaciones como la tuya
        </h2>
        <p className="mt-4 text-gray-600">
          Basado en encuestas a clientes activos en retail, manufactura y
          servicios profesionales durante el último año.
        </p>
      </motion.div>

      <motion.dl
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        variants={container}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              //@ts-expect-error bla
              variants={card}
              whileHover={{ y: -12, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <motion.span
                className="inline-flex items-center gap-2 rounded-full bg-[#E6F3FC] px-3 py-1 text-xs font-semibold text-[#007BD3]"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                  delay: 0.1,
                }}
              >
                <Icon className="h-4 w-4" />
                {stat.label}
              </motion.span>
              <motion.dd
                className="mt-6 text-4xl font-bold text-gray-900"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {stat.value}
              </motion.dd>
              <motion.dt
                className="mt-2 text-sm leading-relaxed text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
              >
                {stat.description}
              </motion.dt>
              <motion.div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-br from-[#E6F3FC] via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
              />
            </motion.div>
          );
        })}
      </motion.dl>
    </motion.section>
  );
}

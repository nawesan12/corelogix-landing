"use client";

import { BrainCircuit, Cable, UsersRound } from "lucide-react";
import { motion } from "framer-motion";

const valueBlocks = [
  {
    id: "implementation",
    title: "Implementación acompañada",
    description:
      "Onboarding en cuatro semanas con workshops, migración de datos y entrenamiento por rol.",
    bullets: [
      "Gestor de proyecto dedicado",
      "Plan de adopción por etapas",
      "Migración segura de históricos",
    ],
    icon: BrainCircuit,
  },
  {
    id: "integrations",
    title: "Integrado a tu ecosistema",
    description:
      "Conectores listos para CRMs, bancos y eCommerce más API abierta para casos especiales.",
    bullets: [
      "Sincronización automática de ventas",
      "Conciliación bancaria diaria",
      "Webhooks para procesos críticos",
    ],
    icon: Cable,
  },
  {
    id: "teams",
    title: "Diseñado para equipos híbridos",
    description:
      "Permisos granulares, aprobaciones móviles y colaboración en tiempo real entre operaciones y finanzas.",
    bullets: [
      "Workflows configurables",
      "Comentarios y seguimiento",
      "Soporte multicompañía",
    ],
    icon: UsersRound,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const card = {
  hidden: { y: 32, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ValueProps() {
  return (
    <motion.section
      className="mx-auto max-w-7xl px-6 py-20"
      aria-labelledby="value-props-heading"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#F5FBFF] via-white to-[#E6F3FC] p-10 sm:p-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.header
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#007BD3]">
            Por qué Grow ERP
          </p>
          <h2
            id="value-props-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Escalá tu operación con procesos claros y datos confiables
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Diseñamos la plataforma junto a líderes financieros y operativos
            para eliminar planillas aisladas y ganar visibilidad en cada
            eslabón.
          </p>
        </motion.header>

        <motion.div
          className="mt-12 grid gap-8 lg:grid-cols-3"
          variants={container}
        >
          {valueBlocks.map((block) => {
            const Icon = block.icon;
            return (
              <motion.article
                key={block.id}
                //@ts-expect-error bla
                variants={card}
                whileHover={{ translateY: -12, rotateX: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 180, damping: 16 }}
                className="flex flex-col justify-between rounded-2xl border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur"
              >
                <div>
                  <motion.span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#007BD3]/10 text-[#007BD3]"
                    whileHover={{ rotate: 6 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.span>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {block.description}
                  </p>
                </div>
                <motion.ul className="mt-6 space-y-2 text-sm text-gray-700">
                  {block.bullets.map((bullet, index) => (
                    <motion.li
                      key={bullet}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <span
                        className="mt-1 h-1.5 w-1.5 rounded-full bg-[#007BD3]"
                        aria-hidden
                      />
                      {bullet}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

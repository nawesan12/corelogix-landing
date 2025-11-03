"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Layers,
  BarChart3,
  Users2,
  Workflow,
} from "lucide-react";

const steps = [
  {
    id: "assessment",
    title: "Descubrimiento ejecutivo",
    description:
      "Mapeamos procesos críticos con finanzas, operaciones y tecnología para priorizar objetivos.",
    deliverables: ["Mapa de procesos", "Casos de uso priorizados"],
    icon: Compass,
  },
  {
    id: "design",
    title: "Diseño y configuración",
    description:
      "Configuramos módulos, permisos y workflows basados en tus políticas corporativas.",
    deliverables: ["Configuraciones iniciales", "Catálogos y maestros importados"],
    icon: Layers,
  },
  {
    id: "enablement",
    title: "Enablement por rol",
    description:
      "Formamos a cada equipo con escenarios reales y material on-demand.",
    deliverables: ["Academia digital", "Workshops presenciales"],
    icon: Users2,
  },
  {
    id: "go-live",
    title: "Go-live asistido",
    description:
      "Acompañamiento dedicado durante las primeras cuatro semanas operativas.",
    deliverables: ["Mesa de ayuda dedicada", "Plan de estabilización"],
    icon: Workflow,
  },
  {
    id: "optimization",
    title: "Optimización continua",
    description:
      "Revisiones trimestrales con el gerente de cuenta para medir KPIs y roadmap.",
    deliverables: ["Tablero ejecutivo", "Roadmap de evolución"],
    icon: BarChart3,
  },
];

export default function ImplementationJourney() {
  return (
    <motion.section
      className="mx-auto max-w-7xl px-6 py-20"
      aria-labelledby="journey-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#007BD3]">
          Metodología corporativa
        </p>
        <h2
          id="journey-title"
          className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Acompañamiento end-to-end para un go-live seguro
        </h2>
        <p className="mt-4 text-gray-600">
          Nuestro equipo de consultoría combina mejores prácticas regionales con un framework de implementación probado en cientos de despliegues.
        </p>
      </div>

      <div className="relative mt-14 grid gap-10 lg:grid-cols-[minmax(260px,_1fr)_minmax(0,_2fr)] lg:items-start">
        <motion.div
          className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-[#F5FBFF] to-white p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <h3 className="text-left text-lg font-semibold text-gray-800">
            Qué podés esperar
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>Equipo dedicado multidisciplinario (finanzas, operaciones, tecnología).</li>
            <li>Sesiones semanales con seguimiento ejecutivo y tableros de avance.</li>
            <li>Plantillas y assets validados por corporaciones líderes.</li>
          </ul>
          <motion.div
            aria-hidden
            className="mt-6 rounded-2xl bg-[#0B1F3A] p-6 text-left text-white"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              KPI promedio
            </p>
            <p className="mt-2 text-3xl font-semibold">+28% adopción en los primeros 90 días</p>
            <p className="mt-2 text-sm text-white/70">
              Gracias al plan de change management y entrenamientos personalizados por rol.
            </p>
          </motion.div>
        </motion.div>

        <motion.ol
          className="relative space-y-6 border-l border-dashed border-[#BADDFF] pl-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.3 },
            },
          }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.id}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className="absolute -left-4 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-4 ring-[#F5FBFF]">
                  <Icon className="h-4 w-4 text-[#007BD3]" />
                </span>
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-[#0b6dbd]">
                  {step.deliverables.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-[#E6F3FC] px-3 py-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </motion.section>
  );
}

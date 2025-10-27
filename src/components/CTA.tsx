"use client";

import { CalendarCheck, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ScheduleDemoForm from "./ScheduleDemoForm";

const points = [
  {
    title: "Recorrido guiado",
    description: "Explorá finanzas, operaciones e inventario con un especialista.",
    icon: CalendarCheck,
  },
  {
    title: "Escenarios reales",
    description:
      "Modelamos tus procesos actuales para que veas cómo se verían en Grow ERP.",
    icon: Sparkles,
  },
  {
    title: "Hoja de ruta clara",
    description:
      "Terminá la sesión con tiempos, inversión estimada y próximos pasos.",
    icon: ShieldCheck,
  },
];

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function CTA() {
  return (
    <motion.section
      className="mx-auto max-w-7xl px-6 py-20"
      aria-labelledby="cta-heading"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-[#0B1F3A] text-white"
        initial={{ scale: 0.98, opacity: 0.9 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0"
          initial={{ opacity: 0.6 }}
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(0,123,211,0.55), transparent 50%)",
              "radial-gradient(circle at 80% 30%, rgba(0,123,211,0.45), transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(9,110,189,0.4), transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        />
        <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[minmax(0,_1fr)_minmax(320px,_380px)] lg:items-center">
          <div>
            <motion.p
              className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            >
              Demo personalizada
            </motion.p>
            <motion.h2
              id="cta-heading"
              className="mt-4 text-3xl font-bold sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
            >
              ¿Listo para ver cómo Grow ERP ordena tu operación?
            </motion.h2>
            <motion.p
              className="mt-4 text-base text-white/80"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
            >
              Coordiná una sesión de 45 minutos con nuestro equipo de especialistas.
              Te mostraremos cómo automatizar procesos, conectar áreas y medir resultados
              en una sola plataforma.
            </motion.p>

            <motion.ul className="mt-8 space-y-4" variants={listVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
              {points.map((point) => {
                const Icon = point.icon;
                return (
                  <motion.li key={point.title} className="flex gap-4" variants={itemVariants} whileHover={{ x: 4 }}>
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold">{point.title}</p>
                      <p className="text-sm text-white/70">{point.description}</p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.p
              className="mt-10 text-xs uppercase tracking-[0.2em] text-white/40"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Implementaciones disponibles en español e inglés
            </motion.p>
          </div>

          <motion.div
            className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-white/20 sm:p-4"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="rounded-2xl border border-gray-100 p-2 sm:p-3"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
            >
              <ScheduleDemoForm />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "LatamFoods", industry: "Alimentos & Bebidas", initials: "LF" },
  { name: "Nova Retail", industry: "Retail omnicanal", initials: "NR" },
  { name: "Helios Pharma", industry: "Life Sciences", initials: "HP" },
  { name: "Porta Logistics", industry: "Logística 3PL", initials: "PL" },
  { name: "Aurea Hotels", industry: "Hospitality", initials: "AH" },
  { name: "Andes Manufacturing", industry: "Manufactura", initials: "AM" },
];

export default function TrustedBy() {
  const items = useMemo(() => logos, []);

  return (
    <motion.section
      className="mx-auto max-w-7xl px-6 pb-12 pt-10 relative z-20"
      aria-labelledby="trusted-by-title"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          Con la confianza de equipos regionales
        </motion.p>
        <motion.h2
          id="trusted-by-title"
          className="text-xl font-semibold text-gray-700 sm:text-2xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
        >
          Más de 300 organizaciones usan Grow ERP para coordinar finanzas y
          operaciones
        </motion.h2>
      </div>

      <motion.div
        className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
          },
        }}
      >
        {items.map((logo) => (
          <motion.div
            key={logo.name}
            variants={{
              hidden: { y: 12, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="group relative flex h-24 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur"
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F3FC] text-base font-semibold text-[#007BD3]">
              {logo.initials}
            </span>
            <span className="mt-3 text-sm font-semibold text-gray-800">
              {logo.name}
            </span>
            <span className="text-xs text-gray-500">{logo.industry}</span>
            <motion.span
              aria-hidden
              className="absolute inset-x-4 bottom-2 h-0.5 rounded-full bg-[#007BD3]/0 transition group-hover:bg-[#007BD3]/60"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

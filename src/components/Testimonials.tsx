"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: "latamfoods",
    quote:
      "Integrar compras y finanzas en Grow ERP nos permitió reducir un 32% los tiempos de aprobación y tener visibilidad diaria de márgenes por canal.",
    name: "Ana Rodríguez",
    role: "CFO, LatamFoods",
  },
  {
    id: "nova-retail",
    quote:
      "Consolidamos operaciones omnicanal en 6 países sin perder control financiero. La gobernanza de datos y trazabilidad son diferenciales clave.",
    name: "Martín Peña",
    role: "COO, Nova Retail",
  },
  {
    id: "helios",
    quote:
      "El equipo de implementación trabajó con nuestras políticas SOX para garantizar auditorías impecables desde el primer cierre mensual.",
    name: "Laura Méndez",
    role: "Directora de Compliance, Helios Pharma",
  },
];

export default function Testimonials() {
  return (
    <motion.section
      className="mx-auto max-w-7xl px-6 py-20"
      aria-labelledby="testimonials-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#007BD3]">
          Historias de clientes
        </p>
        <h2
          id="testimonials-title"
          className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Resultados medibles desde el primer trimestre
        </h2>
        <p className="mt-4 text-gray-600">
          Líderes regionales confían en Grow ERP para tomar decisiones con datos en tiempo real y ejecutar procesos sin fricción.
        </p>
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 },
          },
        }}
      >
        {testimonials.map((testimonial) => (
          <motion.article
            key={testimonial.id}
            variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
          >
            <Quote className="h-8 w-8 text-[#BADDFF]" aria-hidden />
            <p className="mt-6 text-base leading-relaxed text-gray-700">
              “{testimonial.quote}”
            </p>
            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {testimonial.role}
              </p>
            </div>
            <motion.div
              aria-hidden
              className="mt-6 h-0.5 w-16 rounded-full bg-[#BADDFF]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
            />
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

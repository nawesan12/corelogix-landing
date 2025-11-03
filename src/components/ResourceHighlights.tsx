"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Resource = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  category: string;
};

const resources: Resource[] = [
  {
    id: "playbook",
    title: "Playbook de implementación de ERP corporativo",
    description:
      "Checklist de gobernanza, seguridad y cambio organizacional para despliegues regionales.",
    image: "/images/blog/implementation-playbook.svg",
    href: "#",
    category: "Guía descargable",
  },
  {
    id: "operational-intelligence",
    title: "Operational Intelligence Report 2024",
    description:
      "Benchmark de KPIs financieros y operativos de 180 empresas latinoamericanas.",
    image: "/images/blog/operational-intelligence.svg",
    href: "#",
    category: "Estudio exclusivo",
  },
  {
    id: "webinar",
    title: "Webinar: Gobierno de datos en tiempo real",
    description:
      "Conversación con CFOs y COOs sobre cómo automatizar cierres mensuales y auditorías.",
    image: "/globe.svg",
    href: "#",
    category: "Evento virtual",
  },
];

export default function ResourceHighlights() {
  return (
    <motion.section
      className="mx-auto max-w-7xl px-6 py-20"
      aria-labelledby="resources-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#007BD3]">
            Recursos estratégicos
          </p>
          <h2
            id="resources-title"
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Planificá con mejores prácticas y datos accionables
          </h2>
          <p className="mt-4 text-gray-600">
            Descargá guías, estudios y eventos exclusivos para líderes que están diseñando la siguiente fase de crecimiento.
          </p>
        </div>
        <a
          href="#"
          className="inline-flex items-center text-sm font-semibold text-[#007BD3] underline-offset-4 hover:underline"
        >
          Ver biblioteca completa
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
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
        {resources.map((resource) => (
          <motion.article
            key={resource.id}
            variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="relative h-48 w-full bg-[#F5FBFF]">
              <Image
                src={resource.image}
                alt={resource.title}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6">
              <span className="inline-flex w-fit items-center rounded-full bg-[#E6F3FC] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0b6dbd]">
                {resource.category}
              </span>
              <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{resource.description}</p>
              <a
                href={resource.href}
                className="mt-auto inline-flex items-center text-sm font-semibold text-[#007BD3] transition hover:text-[#0b6dbd]"
              >
                Acceder ahora
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

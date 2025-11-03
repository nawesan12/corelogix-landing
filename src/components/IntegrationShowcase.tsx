"use client";

import { motion } from "framer-motion";
import {
  Banknote,
  Building2,
  Globe,
  Link,
  Network,
  ShieldCheck,
} from "lucide-react";

const integrations = [
  {
    id: "bancos",
    title: "Bancos regionales",
    description: "Conectores certificados con conciliación automática diaria.",
    icon: Banknote,
  },
  {
    id: "erp",
    title: "Sistemas corporativos",
    description: "Integraciones bidireccionales con CRMs y ERPs heredados.",
    icon: Building2,
  },
  {
    id: "fiscal",
    title: "Entes fiscales",
    description: "Actualizaciones automáticas de normativas y presentaciones.",
    icon: ShieldCheck,
  },
  {
    id: "api",
    title: "API & webhooks",
    description: "SDKs, documentación y entornos sandbox para tus equipos.",
    icon: Link,
  },
  {
    id: "marketplaces",
    title: "Marketplaces & eCommerce",
    description: "Sincronización de inventario y precios en tiempo real.",
    icon: Globe,
  },
  {
    id: "data",
    title: "Data warehouse",
    description: "Conectores con Snowflake, BigQuery y lakes corporativos.",
    icon: Network,
  },
];

export default function IntegrationShowcase() {
  return (
    <motion.section
      className="mx-auto max-w-7xl px-6 py-20"
      aria-labelledby="integrations-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#007BD3]">
          Ecosistema conectado
        </p>
        <h2
          id="integrations-title"
          className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Integraciones listas para corporaciones regionales
        </h2>
        <p className="mt-4 text-gray-600">
          Combina Grow ERP con tus sistemas existentes para coordinar información financiera, operativa y comercial sin fricciones.
        </p>
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
          },
        }}
      >
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <motion.article
              key={integration.id}
              variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F3FC] text-[#007BD3]">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">{integration.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {integration.description}
              </p>
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#007BD3]/40 to-transparent opacity-0 transition group-hover:opacity-100"
              />
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

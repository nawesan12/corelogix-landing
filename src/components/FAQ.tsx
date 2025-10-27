"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, Tag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

export type FAQProps = {
  title?: string;
  tocTitle?: string;
  categories?: string[];
  items?: FAQItem[];
  defaultOpenIds?: string[];
  className?: string;
};

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function EnhancedFAQ({
  title = "Preguntas frecuentes",
  tocTitle = "Categorías",
  categories,
  items,
  defaultOpenIds = [],
  className,
}: FAQProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpenIds));

  const allItems: FAQItem[] = useMemo(
    () =>
      items ?? [
        {
          id: "pay-appointment",
          question: "¿Cómo puedo pagar mi cita?",
          answer:
            "Aceptamos tarjetas de crédito/débito y transferencias bancarias. Enviamos la factura por correo inmediatamente luego de la reserva.",
          category: "Facturación",
        },
        {
          id: "first-consultation",
          question: "¿Qué esperar de la primera consulta?",
          answer:
            "Revisaremos tus objetivos, analizaremos tu configuración actual y te propondremos un plan de acción con tiempos estimados.",
          category: "General",
        },
        {
          id: "opening-hours",
          question: "¿Cuáles son los horarios de atención?",
          answer:
            "De lunes a viernes de 9:00 a 18:00 (UTC−3). Para soporte enterprise ofrecemos cobertura 24/7.",
          category: "Servicios",
        },
        {
          id: "referral-needed",
          question: "¿Necesito una derivación?",
          answer:
            "No es necesario. Si venís referido por un partner, ingresá tu código al reservar.",
          category: "Confianza",
        },
        {
          id: "insurance-coverage",
          question: "¿El seguro médico cubre el costo?",
          answer:
            "Depende del proveedor. Podemos emitir una factura detallada con los códigos necesarios cuando corresponda.",
          category: "Facturación",
        },
        {
          id: "office-cleaning",
          question: "¿Ofrecen servicios de limpieza?",
          answer:
            "Sí, con horarios flexibles y productos eco-friendly. Pedí nuestro SLA y checklist.",
          category: "Servicios",
        },
      ],
    [items],
  );

  const computedCategories = useMemo(() => {
    const set = new Set<string>();
    allItems.forEach((i) => i.category && set.add(i.category));
    const detected = Array.from(set).sort((a, b) => a.localeCompare(b));
    if (categories && categories.length) {
      const extra = detected.filter((c) => !categories.includes(c));
      return [...categories, ...extra];
    }
    return detected;
  }, [allItems, categories]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((i) => {
      const matchCat =
        activeCategory === "all" || i.category === activeCategory;
      const text = `${i.question} ${i.answer}`.toLowerCase();
      const matchQuery = q === "" || text.includes(q);
      return matchCat && matchQuery;
    });
  }, [allItems, query, activeCategory]);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    const found = allItems.find((i) => i.id === hash);
    if (found) {
      setOpen((prev) => new Set(prev).add(found.id));
      setTimeout(() => {
        document
          .getElementById(found.id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [allItems]);

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <motion.section
      className={`mx-auto max-w-7xl ${className ?? ""}`}
      aria-labelledby="faq-title"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-20">
        <motion.h1
          id="faq-title"
          className="text-center text-2xl font-semibold text-gray-800 lg:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        <motion.div
          className="mt-6 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <div className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <motion.input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar preguntas..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none ring-offset-2 placeholder:text-gray-400 focus:border-[#007BD3] focus:ring-2 focus:ring-[#007BD3]"
              aria-label="Buscar en preguntas frecuentes"
              whileFocus={{ scale: 1.01 }}
            />
          </div>
        </motion.div>

        <div className="mt-10 lg:mt-16 lg:flex lg:-mx-12">
          <motion.aside
            className="lg:mx-12 lg:w-64"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-xl font-semibold text-gray-800">{tocTitle}</h2>
            <nav aria-label="Categorías FAQ" className="mt-4 space-y-2 lg:mt-6">
              <motion.button
                onClick={() => setActiveCategory("all")}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${
                  activeCategory === "all"
                    ? "bg-gray-100 text-[#007BD3]"
                    : "text-gray-600"
                }`}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
              >
                Todas
              </motion.button>
              {computedCategories.map((c) => (
                <motion.button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${
                    activeCategory === c
                      ? "bg-gray-100 text-[#007BD3]"
                      : "text-gray-600"
                  }`}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Tag className="h-4 w-4" /> {c}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.aside>

          <div className="mt-8 flex-1 lg:mx-12 lg:mt-0">
            {visible.length === 0 ? (
              <motion.p
                className="text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No encontramos coincidencias. Probá con otro término.
              </motion.p>
            ) : (
              <motion.ul
                className="space-y-4"
                role="list"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={listVariants}
              >
                {visible.map((item) => {
                  const isOpen = open.has(item.id);
                  const panelId = `${item.id}-panel`;
                  return (
                    <motion.li
                      key={item.id}
                      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm" //@ts-expect-error bla
                      variants={itemVariants}
                    >
                      <motion.button
                        id={item.id}
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        onClick={() => toggle(item.id)}
                        className="flex w-full items-center justify-between gap-4 text-left focus:outline-none"
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-lg font-medium text-gray-800">
                          {item.question}
                        </span>
                        <motion.div
                          animate={{
                            rotate: isOpen ? 180 : 0,
                            color: isOpen ? "#007BD3" : "#9ca3af",
                          }}
                          transition={{ duration: 0.25 }}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.div>
                      </motion.button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            id={panelId}
                            role="region"
                            aria-labelledby={item.id}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="overflow-hidden">
                              <motion.div
                                className="mt-3 border-l-2 border-[#007BD3] pl-4 text-gray-600"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {item.answer}
                              </motion.div>
                              {item.category && (
                                <motion.div
                                  className="mt-3 text-xs text-gray-400"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.15, duration: 0.3 }}
                                >
                                  Categoría: {item.category}
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

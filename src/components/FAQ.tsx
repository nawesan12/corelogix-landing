"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, Tag } from "lucide-react";

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
      const matchCat = activeCategory === "all" || i.category === activeCategory;
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
        document.getElementById(found.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <section className={`mx-auto max-w-7xl ${className ?? ""}`} aria-labelledby="faq-title">
      <div className="container mx-auto px-6 py-20">
        <h1 id="faq-title" className="text-center text-2xl font-semibold text-gray-800 lg:text-3xl">
          {title}
        </h1>

        <div className="mt-6 flex items-center justify-center">
          <div className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar preguntas..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none ring-offset-2 placeholder:text-gray-400 focus:border-[#007BD3] focus:ring-2 focus:ring-[#007BD3]"
              aria-label="Buscar en preguntas frecuentes"
            />
          </div>
        </div>

        <div className="mt-10 lg:mt-16 lg:flex lg:-mx-12">
          <aside className="lg:mx-12 lg:w-64">
            <h2 className="text-xl font-semibold text-gray-800">{tocTitle}</h2>
            <nav aria-label="Categorías FAQ" className="mt-4 space-y-2 lg:mt-6">
              <button
                onClick={() => setActiveCategory("all")}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${
                  activeCategory === "all"
                    ? "bg-gray-100 text-[#007BD3]"
                    : "text-gray-600"
                }`}
              >
                Todas
              </button>
              {computedCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${
                    activeCategory === c
                      ? "bg-gray-100 text-[#007BD3]"
                      : "text-gray-600"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Tag className="h-4 w-4" /> {c}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          <div className="mt-8 flex-1 lg:mx-12 lg:mt-0">
            {visible.length === 0 ? (
              <p className="text-gray-500">No encontramos coincidencias. Probá con otro término.</p>
            ) : (
              <ul className="space-y-4" role="list">
                {visible.map((item) => {
                  const isOpen = open.has(item.id);
                  const panelId = `${item.id}-panel`;
                  return (
                    <li key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <button
                        id={item.id}
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        onClick={() => toggle(item.id)}
                        className="flex w-full items-center justify-between gap-4 text-left focus:outline-none"
                      >
                        <h3 className="text-lg font-medium text-gray-800">{item.question}</h3>
                        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#007BD3]" : "text-gray-400"}`} />
                      </button>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={item.id}
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="mt-3 border-l-2 border-[#007BD3] pl-4 text-gray-600">{item.answer}</div>
                          {item.category && (
                            <div className="mt-3 text-xs text-gray-400">Categoría: {item.category}</div>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

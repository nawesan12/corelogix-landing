"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  categories?: string[]; // Optional fixed order for sidebar
  items?: FAQItem[];
  defaultOpenIds?: string[]; // Which items start expanded
  className?: string;
};

export default function EnhancedFAQ({
  title = "Have any Questions?",
  tocTitle = "Table of Contents",
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
          question: "How can I pay for my appointment?",
          answer:
            "We accept credit/debit cards and bank transfers. Invoices are sent by email immediately after booking.",
          category: "Billing",
        },
        {
          id: "first-consultation",
          question: "What can I expect at my first consultation?",
          answer:
            "We'll review your goals, assess your current setup, and propose an action plan with timelines.",
          category: "General",
        },
        {
          id: "opening-hours",
          question: "What are your opening hours?",
          answer:
            "Monday to Friday 9:00–18:00 (UTC−3). For enterprise support we offer 24/7 coverage.",
          category: "Services",
        },
        {
          id: "referral-needed",
          question: "Do I need a referral?",
          answer:
            "No referral is required. If you're coming from a partner, include your partner code at checkout.",
          category: "Trust & Safety",
        },
        {
          id: "insurance-coverage",
          question:
            "Is the appointment cost covered by private health insurance?",
          answer:
            "Coverage depends on your provider. We can provide a detailed invoice with ICD/CPT equivalents when applicable.",
          category: "Billing",
        },
        {
          id: "office-cleaning",
          question: "Do you offer office cleaning services?",
          answer:
            "Yes, with flexible schedules and eco‑friendly supplies. Ask for our SLA and checklist.",
          category: "Office Cleaning",
        },
      ],
    [items],
  );

  // Build category list (dedupe & order)
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

  // Filter items by search & category
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

  // Open an item if URL has #id
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    const found = allItems.find((i) => i.id === hash);
    if (found) {
      setOpen((prev) => new Set(prev).add(found.id));
      // Scroll into view after a tick
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
    <section
      className={`mx-auto max-w-7xl ${className ?? ""}`}
      aria-labelledby="faq-title"
    >
      <div className="container mx-auto px-6 py-12">
        <h1
          id="faq-title"
          className="text-center text-2xl font-semibold text-gray-800 lg:text-3xl"
        >
          {title}
        </h1>

        <div className="mt-6 flex items-center justify-center">
          <div className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none ring-offset-2 placeholder:text-gray-400 focus:border-[#007BD3] focus:ring-2 focus:ring-[#007BD3]"
              aria-label="Search FAQs"
            />
          </div>
        </div>

        <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12">
          {/* Sidebar */}
          <aside className="lg:mx-12 lg:w-64">
            <h2 className="text-xl font-semibold text-gray-800">{tocTitle}</h2>
            <nav aria-label="FAQ categories" className="mt-4 space-y-2 lg:mt-6">
              <button
                onClick={() => setActiveCategory("all")}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${
                  activeCategory === "all"
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                All
              </button>
              {computedCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${
                    activeCategory === c
                      ? "bg-gray-100 text-blue-600"
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

          {/* Content */}
          <div className="flex-1 lg:mx-12 mt-8 lg:mt-0">
            {visible.length === 0 ? (
              <p className="text-gray-500">
                No results. Try a different search term.
              </p>
            ) : (
              <ul className="space-y-4" role="list">
                {visible.map((item) => {
                  const isOpen = open.has(item.id);
                  const panelId = `${item.id}-panel`;
                  //eslint-disable-next-line
                  const buttonRef = useRef<HTMLButtonElement | null>(null);
                  return (
                    <li
                      key={item.id}
                      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <button
                        ref={buttonRef}
                        id={item.id}
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        onClick={() => toggle(item.id)}
                        className="flex w-full items-center justify-between gap-4 text-left focus:outline-none"
                      >
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.question}
                        </h3>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#007BD3]" : "text-gray-400"}`}
                        />
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
                          <div className="mt-3 border-l-2 border-[#007BD3] pl-4 text-gray-600">
                            {item.answer}
                          </div>
                          {item.category && (
                            <div className="mt-3 text-xs text-gray-400">
                              Category: {item.category}
                            </div>
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

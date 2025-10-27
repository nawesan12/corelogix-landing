"use client";

import { useState, useMemo, useId } from "react";
import { Check, X, Star, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";

export type BillingCycle = "monthly" | "yearly";

export type PricingFeature = {
  label: string;
  included: boolean;
  hint?: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  description?: string;
  priceMonthly: number;
  priceYearly: number;
  highlight?: boolean;
  badgeText?: string;
  ctaLabel?: string;
  features: PricingFeature[];
};

export type PricingProps = {
  title?: string;
  subtitle?: string;
  currency?: string;
  locale?: string;
  defaultCycle?: BillingCycle;
  onSelect?: (planId: string, cycle: BillingCycle) => void;
  plans?: PricingPlan[];
  className?: string;
};

function formatMoney(value: number, currency = "USD", locale = "es-AR") {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

const cardsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { y: 36, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const MotionButton = motion(Button);

export default function EnhancedPricing({
  title = "Planes pensados para cada etapa",
  subtitle = "Comenzá con lo esencial y escalá cuando tu operación lo necesite. Cambiá de plan en cualquier momento.",
  currency = "USD",
  locale = "es-AR",
  defaultCycle = "yearly",
  onSelect,
  plans,
  className,
}: PricingProps) {
  const [cycle, setCycle] = useState<BillingCycle>(defaultCycle);
  const groupId = useId();

  const data: PricingPlan[] = useMemo(
    () =>
      plans ?? [
        {
          id: "launch",
          name: "Launch",
          description: "Ideal para equipos que dejan las planillas y buscan orden.",
          priceMonthly: 99,
          priceYearly: 999,
          features: [
            { label: "Usuarios ilimitados", included: true },
            { label: "Módulos Finanzas + Inventario", included: true },
            { label: "Integraciones estándar", included: true, hint: "CRM y eCommerce" },
            { label: "Automatizaciones avanzadas", included: false },
            { label: "Soporte prioritario 24/7", included: false },
            { label: "Implementación asistida", included: false },
          ],
          ctaLabel: "Elegir Launch",
        },
        {
          id: "scale",
          name: "Scale",
          description: "Todo lo necesario para operar múltiples unidades de negocio.",
          priceMonthly: 199,
          priceYearly: 1990,
          highlight: true,
          badgeText: "Ahorra 2 meses",
          features: [
            { label: "Usuarios ilimitados", included: true },
            { label: "Finanzas + Inventario + Compras", included: true },
            { label: "Automatizaciones avanzadas", included: true },
            { label: "Reportes financieros personalizados", included: true },
            { label: "Soporte prioritario 24/7", included: true },
            { label: "Implementación asistida", included: true },
          ],
          ctaLabel: "Escalar con Scale",
        },
        {
          id: "enterprise",
          name: "Enterprise",
          description: "Para corporaciones con necesidades específicas y SLAs dedicados.",
          priceMonthly: 399,
          priceYearly: 3990,
          features: [
            { label: "Todo lo incluido en Scale", included: true },
            { label: "Ambientes dedicados y Single Sign-On", included: true },
            { label: "Integraciones personalizadas", included: true },
            { label: "Soporte con gerente de cuenta", included: true },
            { label: "Capacitaciones ilimitadas", included: true },
            { label: "Consultoría trimestral", included: true },
          ],
          ctaLabel: "Hablar con ventas",
        },
      ],
    [plans],
  );

  return (
    <motion.section
      aria-labelledby="pricing-heading"
      className={`mx-auto max-w-7xl px-6 py-20 ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.header
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1
          id="pricing-heading"
          className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl"
        >
          {title}
        </h1>
        <p className="mt-4 text-gray-600">{subtitle}</p>

        <div
          className="mt-8 inline-flex items-center gap-3 rounded-full border bg-white p-1 shadow-sm"
          role="group"
          aria-label="Ciclo de facturación"
        >
          <motion.button
            type="button"
            aria-pressed={cycle === "monthly"}
            onClick={() => setCycle("monthly")}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: cycle === "monthly" ? 1 : 1.02 }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              cycle === "monthly"
                ? "bg-[#007BD3] text-white shadow"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Mensual
          </motion.button>
          <motion.button
            type="button"
            aria-pressed={cycle === "yearly"}
            onClick={() => setCycle("yearly")}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: cycle === "yearly" ? 1 : 1.02 }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              cycle === "yearly"
                ? "bg-[#007BD3] text-white shadow"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Anual
            <span className="ml-1 hidden text-xs text-white/80 sm:inline">
              (mejor precio)
            </span>
          </motion.button>
        </div>
      </motion.header>

      <motion.div
        className="mx-auto mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3"
        variants={cardsContainer}
      >
        {data.map((plan) => {
          const price = cycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
          const isFree = price === 0;
          return (
            <motion.article
              key={plan.id}
              aria-labelledby={`${groupId}-${plan.id}-title`}
              className={`relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-within:shadow-md ${
                plan.highlight
                  ? "border-[#007BD3] ring-1 ring-[#007BD3]/30"
                  : "border-gray-200"
              }`}
              variants={cardVariants}
              whileHover={{ translateY: plan.highlight ? -20 : -12, scale: plan.highlight ? 1.02 : 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <AnimatePresence>
                {plan.highlight && (
                  <motion.div
                    key="highlight"
                    className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-[#007BD3] px-3 py-1 text-xs font-semibold text-white shadow"
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Plan recomendado
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <div className="flex items-center gap-2">
                  <Star
                    className={`h-5 w-5 ${plan.highlight ? "text-[#007BD3]" : "text-gray-300"}`}
                  />
                  <h2
                    id={`${groupId}-${plan.id}-title`}
                    className="text-lg font-semibold text-gray-900"
                  >
                    {plan.name}
                  </h2>
                </div>
                {plan.description && (
                  <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                )}

                <div className="mt-6 flex items-baseline gap-2">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`${plan.id}-${cycle}`}
                      className={`text-3xl font-bold ${plan.highlight ? "text-[#007BD3]" : "text-gray-900"}`}
                      aria-live="polite"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {isFree ? "Gratis" : formatMoney(price, currency, locale)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm text-gray-500">
                    / {cycle === "monthly" ? "mes" : "año"}
                  </span>
                  {cycle === "yearly" && plan.badgeText && (
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-[#007BD3]">
                      {plan.badgeText}
                    </span>
                  )}
                </div>

                <ul role="list" className="mt-6 space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      {f.included ? (
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#007BD3]" aria-hidden />
                      ) : (
                        <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden />
                      )}
                      <span
                        className={f.included ? "text-gray-700" : "text-gray-400 line-through"}
                      >
                        {f.label}
                        {f.hint && (
                          <span className="ml-1 text-gray-400">({f.hint})</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <MotionButton
                  className={`w-full justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    plan.highlight
                      ? "bg-[#007BD3] text-white hover:bg-[#0b6dbd] focus-visible:ring-[#007BD3]"
                      : "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-900"
                  }`}
                  onClick={() => onSelect?.(plan.id, cycle)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {plan.ctaLabel ?? "Elegir Plan"}
                </MotionButton>
                {!isFree && cycle === "yearly" && plan.priceMonthly > 0 && (
                  <p className="mt-2 text-center text-xs text-gray-500">
                    Equivale a {formatMoney(Math.round(plan.priceYearly / 12), currency, locale)} / mes
                  </p>
                )}
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        className="mx-auto mt-12 max-w-4xl rounded-2xl bg-[#F5FBFF] p-6 text-sm text-gray-700"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <p>
          ¿Necesitás una propuesta a medida? Nuestro equipo comercial puede armar un plan adaptado a tu estructura, integraciones
          y acuerdos de nivel de servicio. Escribinos a <a className="font-semibold text-[#007BD3]" href="mailto:hola@growerp.com">hola@growerp.com</a>.
        </p>
      </motion.div>
    </motion.section>
  );
}

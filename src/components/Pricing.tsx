"use client";

import { useState, useMemo, useId } from "react";
import { Check, X, Star, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

// ----------------------
// Types
// ----------------------
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
  priceMonthly: number; // in your currency units
  priceYearly: number; // in your currency units
  highlight?: boolean; // visually emphasize this plan
  badgeText?: string; // e.g., "Save 30%"
  ctaLabel?: string; // e.g., "Elegir Plan"
  features: PricingFeature[];
};

export type PricingProps = {
  title?: string;
  subtitle?: string;
  currency?: string; // e.g., "USD" or "ARS"
  locale?: string; // e.g., "en-US" or "es-AR"
  defaultCycle?: BillingCycle;
  onSelect?: (planId: string, cycle: BillingCycle) => void;
  plans?: PricingPlan[];
  className?: string;
};

// ----------------------
// Helpers
// ----------------------
function formatMoney(value: number, currency = "USD", locale = "en-US") {
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

// ----------------------
// Component
// ----------------------
export default function EnhancedPricing({
  title = "Simple pricing plan",
  subtitle = "Elige el plan que mejor se adapte a tu equipo. Puedes cambiarlo en cualquier momento.",
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
          id: "basic",
          name: "Basic",
          description: "Para empezar sin límites esenciales",
          priceMonthly: 0,
          priceYearly: 0,
          features: [
            { label: "Enlaces ilimitados", included: true },
            { label: "Panel de analíticas", included: true },
            { label: "Soporte por email", included: true },
            { label: "Optimización de hashtags", included: false },
            { label: "App móvil", included: false },
            { label: "Usuarios ilimitados", included: false },
          ],
          ctaLabel: "Comenzar",
        },
        {
          id: "standard",
          name: "Standard",
          description: "Lo esencial para equipos en crecimiento",
          priceMonthly: 15,
          priceYearly: 99,
          highlight: true,
          badgeText: "Ahorra 30%",
          features: [
            { label: "Enlaces ilimitados", included: true },
            { label: "Panel de analíticas", included: true },
            { label: "Soporte con foro / discusión", included: true },
            { label: "Optimización de hashtags", included: true },
            { label: "App móvil", included: true },
            { label: "Usuarios ilimitados", included: false },
          ],
          ctaLabel: "Elegir Standard",
        },
        {
          id: "pro",
          name: "Pro",
          description: "Todo lo que necesitas para escalar",
          priceMonthly: 149,
          priceYearly: 1490,
          features: [
            { label: "Enlaces ilimitados", included: true },
            { label: "Analíticas avanzadas", included: true },
            { label: "Soporte prioritario", included: true },
            { label: "Optimización de hashtags", included: true },
            { label: "App móvil", included: true },
            { label: "Usuarios ilimitados", included: true },
          ],
          ctaLabel: "Ir a Pro",
        },
      ],
    [plans],
  );

  return (
    <section
      aria-labelledby="pricing-heading"
      className={"mx-auto max-w-7xl px-6 py-12 " + (className ?? "")}
    >
      {/* Header */}
      <header className="mx-auto max-w-2xl text-center">
        <h1
          id="pricing-heading"
          className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl"
        >
          {title}
        </h1>
        <p className="mt-4 text-gray-600">{subtitle}</p>

        {/* Billing toggle */}
        <div
          className="mt-6 inline-flex items-center gap-3 rounded-full border bg-white p-1 shadow-sm"
          role="group"
          aria-label="Ciclo de facturación"
        >
          <button
            type="button"
            aria-pressed={cycle === "monthly"}
            onClick={() => setCycle("monthly")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              cycle === "monthly"
                ? "bg-[#007BD3] text-white shadow"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Mensual
          </button>
          <button
            type="button"
            aria-pressed={cycle === "yearly"}
            onClick={() => setCycle("yearly")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              cycle === "yearly"
                ? "bg-[#007BD3] text-white shadow"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Anual{" "}
            <span className="ml-1 hidden text-xs text-white/80 sm:inline">
              (mejor precio)
            </span>
          </button>
        </div>
      </header>

      {/* Cards */}
      <div className="mx-auto mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3">
        {data.map((plan) => {
          const price =
            cycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
          const isFree = price === 0;
          return (
            <article
              key={plan.id}
              aria-labelledby={`${groupId}-${plan.id}-title`}
              className={`relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md focus-within:shadow-md ${
                plan.highlight
                  ? "border-[#007BD3] ring-1 ring-[#007BD3]/30"
                  : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-[#007BD3] px-3 py-1 text-xs font-semibold text-white shadow">
                  <Sparkles className="h-3.5 w-3.5" /> Popular
                </div>
              )}

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
                  <p className="mt-2 text-sm text-gray-600">
                    {plan.description}
                  </p>
                )}

                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    className={`text-3xl font-bold ${plan.highlight ? "text-[#007BD3]" : "text-gray-900"}`}
                    aria-live="polite"
                  >
                    {isFree ? "Gratis" : formatMoney(price, currency, locale)}
                  </span>
                  <span className="text-sm text-gray-500">
                    / {cycle === "monthly" ? "mes" : "año"}
                  </span>
                  {cycle === "yearly" && plan.badgeText && (
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-[#007BD3]">
                      {plan.badgeText}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul role="list" className="mt-6 space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      {f.included ? (
                        <Check
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#007BD3]"
                          aria-hidden
                        />
                      ) : (
                        <X
                          className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                          aria-hidden
                        />
                      )}
                      <span
                        className={
                          f.included
                            ? "text-gray-700"
                            : "text-gray-400 line-through"
                        }
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

              {/* CTA */}
              <div className="mt-8">
                <Button
                  className={`w-full justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    plan.highlight
                      ? "bg-[#007BD3] text-white hover:bg-[#0b6dbd] focus-visible:ring-[#007BD3]"
                      : "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-900"
                  }`}
                  onClick={() => onSelect?.(plan.id, cycle)}
                >
                  {plan.ctaLabel ?? "Elegir Plan"}
                </Button>
                {!isFree && cycle === "yearly" && plan.priceMonthly > 0 && (
                  <p className="mt-2 text-center text-xs text-gray-500">
                    Equivale a{" "}
                    {formatMoney(
                      Math.round(plan.priceYearly / 12),
                      currency,
                      locale,
                    )}{" "}
                    / mes
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Guarantee / Notes */}
      <div className="mx-auto mt-10 max-w-3xl rounded-xl bg-gray-50 p-6 text-sm text-gray-600">
        <p>
          ¿Tienes dudas sobre qué plan elegir? Escríbenos y te ayudamos a
          encontrar la mejor opción para tu etapa. Cambia o cancela en cualquier
          momento. Precios mostrados en {currency}.
        </p>
      </div>
    </section>
  );
}

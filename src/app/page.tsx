import CTA from "@/components/CTA";
import FAQ, { FAQItem } from "@/components/FAQ";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import Pricing, { PricingPlan } from "@/components/Pricing";
import Stats from "@/components/Stats";
import ValueProps from "@/components/ValueProps";

const pricingPlans: PricingPlan[] = [
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
];

const faqItems: FAQItem[] = [
  {
    id: "implementation-time",
    question: "¿Cuánto demora la implementación?",
    answer:
      "El onboarding estándar dura entre 4 y 6 semanas. Incluye workshops, migración de datos históricos y capacitación por rol.",
    category: "Implementación",
  },
  {
    id: "integrations",
    question: "¿Con qué sistemas se integra Grow ERP?",
    answer:
      "Contamos con conectores certificados para Salesforce, HubSpot, Tiendanube, Mercado Libre y más de 20 bancos regionales. También ofrecemos API y webhooks abiertos.",
    category: "Integraciones",
  },
  {
    id: "security",
    question: "¿Cómo resguardan la seguridad de la información?",
    answer:
      "Operamos sobre infraestructura cloud con cifrado en tránsito y en reposo, monitoreo 24/7, auditorías SOC2 y backups automáticos por hora.",
    category: "Seguridad",
  },
  {
    id: "support",
    question: "¿Qué tipo de soporte brindan?",
    answer:
      "Todos los planes incluyen mesa de ayuda regional y centro de recursos. Los planes Scale y Enterprise suman soporte prioritario 24/7 y gerente de cuenta dedicado.",
    category: "Soporte",
  },
  {
    id: "pricing",
    question: "¿Puedo cambiar de plan más adelante?",
    answer:
      "Sí. Podés escalar o reducir tu plan en cualquier momento. El ajuste se prorratea automáticamente en tu próxima factura.",
    category: "Facturación",
  },
  {
    id: "training",
    question: "¿Ofrecen capacitaciones para mi equipo?",
    answer:
      "Incluimos sesiones virtuales grabadas, biblioteca on-demand y workshops en vivo según el plan. Los clientes Enterprise cuentan con capacitaciones ilimitadas.",
    category: "Adopción",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ValueProps />
      <Features />
      <CTA />
      <Pricing plans={pricingPlans} />
      <FAQ
        title="Preguntas frecuentes"
        tocTitle="Categorías"
        items={faqItems}
        defaultOpenIds={["implementation-time"]}
        className="pb-12"
      />
      <Newsletter />
    </>
  );
}

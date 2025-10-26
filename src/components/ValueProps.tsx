import { BrainCircuit, Cable, UsersRound } from "lucide-react";

const valueBlocks = [
  {
    id: "implementation",
    title: "Implementación acompañada",
    description:
      "Onboarding en cuatro semanas con workshops, migración de datos y entrenamiento por rol.",
    bullets: [
      "Gestor de proyecto dedicado",
      "Plan de adopción por etapas",
      "Migración segura de históricos",
    ],
    icon: BrainCircuit,
  },
  {
    id: "integrations",
    title: "Integrado a tu ecosistema",
    description:
      "Conectores listos para CRMs, bancos y eCommerce más API abierta para casos especiales.",
    bullets: [
      "Sincronización automática de ventas",
      "Conciliación bancaria diaria",
      "Webhooks para procesos críticos",
    ],
    icon: Cable,
  },
  {
    id: "teams",
    title: "Diseñado para equipos híbridos",
    description:
      "Permisos granulares, aprobaciones móviles y colaboración en tiempo real entre operaciones y finanzas.",
    bullets: [
      "Workflows configurables",
      "Comentarios y seguimiento",
      "Soporte multicompañía",
    ],
    icon: UsersRound,
  },
];

export default function ValueProps() {
  return (
    <section
      className="mx-auto max-w-7xl px-6 py-20"
      aria-labelledby="value-props-heading"
    >
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#F5FBFF] via-white to-[#E6F3FC] p-10 sm:p-16">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#007BD3]">
            Por qué Grow ERP
          </p>
          <h2
            id="value-props-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Escalá tu operación con procesos claros y datos confiables
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Diseñamos la plataforma junto a líderes financieros y operativos para
            eliminar planillas aisladas y ganar visibilidad en cada eslabón.
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {valueBlocks.map((block) => {
            const Icon = block.icon;
            return (
              <article
                key={block.id}
                className="flex flex-col justify-between rounded-2xl border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#007BD3]/10 text-[#007BD3]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {block.description}
                  </p>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-gray-700">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#007BD3]" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

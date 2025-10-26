import { Building2, Gauge, ShieldCheck, SmilePlus } from "lucide-react";

const stats = [
  {
    id: "companies",
    value: "320+",
    label: "empresas en LATAM",
    description:
      "Automatizando finanzas, inventario y operaciones con un único panel.",
    icon: Building2,
  },
  {
    id: "efficiency",
    value: "35%",
    label: "menos tiempo administrativo",
    description:
      "Flujos automáticos para conciliaciones bancarias, compras y facturación.",
    icon: Gauge,
  },
  {
    id: "reliability",
    value: "99.9%",
    label: "disponibilidad garantizada",
    description:
      "Infraestructura cloud redundante y monitoreo 24/7 a cargo de nuestro equipo.",
    icon: ShieldCheck,
  },
  {
    id: "satisfaction",
    value: "4.8/5",
    label: "de satisfacción del cliente",
    description:
      "Acompañamiento continuo con especialistas en implementación de ERPs.",
    icon: SmilePlus,
  },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16" aria-labelledby="stats-title">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#007BD3]">
          Resultados reales
        </p>
        <h2
          id="stats-title"
          className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          El impacto de Grow ERP en organizaciones como la tuya
        </h2>
        <p className="mt-4 text-gray-600">
          Basado en encuestas a clientes activos en retail, manufactura y servicios
          profesionales durante el último año.
        </p>
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E6F3FC] px-3 py-1 text-xs font-semibold text-[#007BD3]">
                <Icon className="h-4 w-4" />
                {stat.label}
              </span>
              <dd className="mt-6 text-4xl font-bold text-gray-900">{stat.value}</dd>
              <dt className="mt-2 text-sm leading-relaxed text-gray-600">
                {stat.description}
              </dt>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

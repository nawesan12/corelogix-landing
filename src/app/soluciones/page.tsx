import CTA from "@/components/CTA";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  LineChart,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

const solutionAreas = [
  {
    title: "Dirección y estrategia",
    description:
      "Tomá decisiones con datos confiables y una vista unificada del negocio.",
    highlights: [
      "Tableros ejecutivos en tiempo real",
      "Alertas automáticas sobre desvíos",
      "Proyecciones financieras y operativas",
    ],
    icon: LineChart,
    accent: "from-[#007BD3]/30 via-transparent to-[#79CFFF]/30",
  },
  {
    title: "Finanzas y administración",
    description:
      "Centralizá la facturación, conciliaciones y flujos de caja para ahorrar horas de trabajo manual.",
    highlights: [
      "Automatización de cobranzas",
      "Conciliación bancaria inteligente",
      "Flujos de aprobación configurables",
    ],
    icon: BarChart3,
    accent: "from-[#3B82F6]/25 via-transparent to-[#A855F7]/30",
  },
  {
    title: "Operaciones y proyectos",
    description:
      "Coordiná equipos híbridos con tableros compartidos, dependencias claras y seguimiento del progreso.",
    highlights: [
      "Planificación visual de proyectos",
      "Gestión de recursos y capacidades",
      "Integraciones con herramientas de campo",
    ],
    icon: Workflow,
    accent: "from-[#6366F1]/25 via-transparent to-[#0EA5E9]/25",
  },
  {
    title: "Equipos comerciales",
    description:
      "Impulsá un ciclo comercial predecible con seguimiento completo de oportunidades.",
    highlights: [
      "Pipeline conectado al ERP",
      "Cotizaciones y contratos en minutos",
      "Paneles de rendimiento por ejecutivo",
    ],
    icon: Users,
    accent: "from-[#0EA5E9]/20 via-transparent to-[#22C55E]/25",
  },
  {
    title: "Inteligencia de negocio",
    description:
      "Explorá tendencias y oportunidades con analítica avanzada sin depender de hojas de cálculo.",
    highlights: [
      "Modelos predictivos listos para usar",
      "Explorador de datos con lenguaje natural",
      "Indicadores clave personalizables",
    ],
    icon: Cpu,
    accent: "from-[#F97316]/20 via-transparent to-[#EAB308]/25",
  },
  {
    title: "Seguridad y cumplimiento",
    description:
      "Protegé los datos sensibles con controles auditables y trazabilidad completa.",
    highlights: [
      "Roles granulares y registro de auditoría",
      "Infraestructura certificada y cifrada",
      "Gobierno de datos adaptado a tu industria",
    ],
    icon: ShieldCheck,
    accent: "from-[#10B981]/25 via-transparent to-[#14B8A6]/25",
  },
];

const implementationPillars = [
  {
    title: "Diagnóstico guiado",
    description:
      "Identificamos los procesos críticos y definimos objetivos medibles junto a tu equipo.",
    icon: Layers,
  },
  {
    title: "Integración sin fricciones",
    description:
      "Conectamos Grow ERP con tus sistemas actuales y migramos los datos de forma segura.",
    icon: Workflow,
  },
  {
    title: "Acompañamiento continuo",
    description:
      "Capacitaciones, soporte experto y sesiones trimestrales para asegurar la adopción.",
    icon: Clock,
  },
  {
    title: "Éxito medible",
    description:
      "Revisamos métricas clave y activamos nuevas funcionalidades conforme evolucionan tus necesidades.",
    icon: CheckCircle2,
  },
];

export default function SolucionesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50/60 to-white">
      <section className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div className="max-w-2xl space-y-8">
            <span className="inline-flex items-center rounded-full bg-[#E8F4FF] px-4 py-1 text-sm font-medium text-[#007BD3]">
              Soluciones Grow ERP
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Diseñado para acompañar cada etapa de crecimiento
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Adaptamos el ecosistema de Grow ERP a tu industria con implementaciones modulares,
              datos conectados y equipos que colaboran en un solo lugar.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/agendar-demo"
                className="inline-flex items-center justify-center rounded-full bg-[#007BD3] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[#007BD3]/20 transition hover:bg-[#0b6dbd]"
              >
                Agendar una demo
              </a>
              <a
                href="/planes"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-8 py-3 text-base font-semibold text-slate-700 transition hover:border-[#007BD3]/40 hover:text-[#007BD3]"
              >
                Ver planes disponibles
              </a>
            </div>
          </div>
          <div className="mt-14 grid flex-1 gap-6 md:grid-cols-2">
            {solutionAreas.slice(0, 2).map((area) => (
              <div
                key={area.title}
                className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#79CFFF]/30 blur-3xl"
                  aria-hidden
                />
                <area.icon className="mb-6 h-10 w-10 text-[#007BD3]" aria-hidden />
                <h2 className="text-xl font-semibold text-slate-900">{area.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{area.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-500">
                  {area.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#2D9AE8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Soluciones para cada equipo
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              Elegí los módulos que necesitás hoy y sumá nuevas capacidades cuando tu negocio esté listo.
              Todos comparten la misma base de datos y se integran con las herramientas que ya usás.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-[#007BD3]/30 px-4 py-2 text-xs font-medium uppercase tracking-wide text-[#007BD3]">
              ERP modular
            </span>
            <span className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              Integraciones abiertas
            </span>
            <span className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              Onboarding asistido
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {solutionAreas.map((area) => (
            <article
              key={area.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div
                  className={`absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${area.accent}`}
                  aria-hidden
                />
              </div>
              <div className="relative">
                <div className="inline-flex items-center justify-center rounded-2xl bg-[#F5F9FF] p-3 text-[#007BD3] shadow-sm">
                  <area.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {area.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {area.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#2D9AE8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Implementación acompañada de principio a fin
              </h2>
              <p className="mt-4 max-w-2xl text-base text-slate-300">
                Un equipo senior especializado en operaciones, finanzas y tecnología te guía en cada etapa del
                proyecto para garantizar que tu inversión genere resultados desde el primer trimestre.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {implementationPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#007BD3]/10 text-[#79CFFF]">
                      <pillar.icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl shadow-black/30">
              <h3 className="text-2xl font-semibold text-white">Resultados a los 90 días</h3>
              <ul className="mt-6 space-y-5 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#79CFFF]" />
                  <span>Visibilidad completa de ingresos, costos y rentabilidad por unidad de negocio.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#79CFFF]" />
                  <span>Reducción de hasta 30% en tareas manuales repetitivas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#79CFFF]" />
                  <span>Reporte automático de KPIs clave para reuniones de dirección.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Más de un software: un partner en crecimiento
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Te ayudamos a definir procesos, preparar a tu equipo y activar integraciones para que cada usuario
                encuentre valor desde el primer día.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  {
                    label: "+45%",
                    subtitle: "productividad en equipos administrativos",
                  },
                  {
                    label: "-35%",
                    subtitle: "ciclo de ventas promedio",
                  },
                  {
                    label: "3 meses",
                    subtitle: "tiempo promedio de implementación",
                  },
                  {
                    label: "99.9%",
                    subtitle: "disponibilidad de la plataforma",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6 text-center">
                    <p className="text-3xl font-semibold text-[#007BD3]">{stat.label}</p>
                    <p className="mt-2 text-sm text-slate-600">{stat.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Integraciones listas para usar
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  Conectá Grow ERP con sistemas contables, herramientas de colaboración, CRMs y aplicaciones de campo.
                  APIs abiertas y webhooks permiten crear flujos personalizados sin romper procesos críticos.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Governanza y seguridad</h3>
                <p className="mt-3 text-sm text-slate-600">
                  Controles por rol, registro de auditoría y reportes de cumplimiento te ayudan a cumplir con normativas
                  locales e internacionales sin complicaciones.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Adopción con foco en las personas</h3>
                <p className="mt-3 text-sm text-slate-600">
                  Planes de lanzamiento, kits de comunicación interna y capacitaciones segmentadas por área aseguran que
                  cada usuario comprenda el valor de la plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}

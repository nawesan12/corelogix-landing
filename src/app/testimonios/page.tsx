import CTA from "@/components/CTA";
import { Quote, Sparkles, Star, UserCircle2, Users2 } from "lucide-react";

const testimonials = [
  {
    quote:
      "Centralizamos operaciones y finanzas en una sola vista. Ahora nuestras reuniones comerciales arrancan con información precisa en vez de planillas desactualizadas.",
    name: "María González",
    role: "COO, Andes Logistics",
    result: "-25% en tiempos de coordinación",
  },
  {
    quote:
      "Grow ERP nos ayudó a estandarizar procesos y a reducir el ciclo de facturación. El equipo de implementación estuvo presente en cada hito.",
    name: "Lucas Falcón",
    role: "Director Financiero, Brava Energy",
    result: "+35% de visibilidad financiera",
  },
  {
    quote:
      "El módulo comercial se conecta con nuestro CRM y genera proyecciones confiables. Tomamos mejores decisiones sobre pricing y capacidad.",
    name: "Sofía Aramburu",
    role: "VP de Revenue, Kilo Retail",
    result: "+18% en ventas recurrentes",
  },
  {
    quote:
      "La automatización de reportes nos liberó más de 20 horas al mes. El seguimiento de auditoría simplifica cualquier control interno.",
    name: "Diego Vega",
    role: "Controller, Prisma Salud",
    result: "Cumplimiento auditado en semanas",
  },
];

const successStories = [
  {
    company: "Andes Logistics",
    summary:
      "Escalaron operaciones regionales conectando depósitos, transporte y finanzas en una plataforma unificada.",
    highlights: [
      "Integración con sistemas de tracking en tiempo real",
      "Forecast de demanda automatizado",
      "Control de rentabilidad por ruta",
    ],
  },
  {
    company: "Brava Energy",
    summary:
      "Estandarizaron procesos financieros y redujeron el cierre contable de 12 a 5 días hábiles.",
    highlights: [
      "Flujos de aprobación multi-divisa",
      "Alertas de desvío de presupuesto",
      "Reportes regulatorios automatizados",
    ],
  },
  {
    company: "Kilo Retail",
    summary:
      "Sincronizaron ventas online y tiendas físicas con inventario en vivo y dashboards personalizados por región.",
    highlights: [
      "Integración con ecommerce y POS",
      "Reposición automática basada en IA",
      "Paneles ejecutivos en tiempo real",
    ],
  },
];

export default function TestimoniosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F4FF] px-4 py-1 text-sm font-medium text-[#007BD3]">
              <Sparkles className="h-4 w-4" aria-hidden /> Casos reales
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Historias de crecimiento impulsadas por Grow ERP
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Empresas de alto crecimiento confían en nuestra plataforma para coordinar equipos, automatizar procesos y
              tomar decisiones con datos confiables.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/soluciones"
                className="inline-flex items-center justify-center rounded-full bg-[#007BD3] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[#007BD3]/20 transition hover:bg-[#0b6dbd]"
              >
                Descubrir soluciones
              </a>
              <a
                href="/agendar-demo"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-8 py-3 text-base font-semibold text-slate-700 transition hover:border-[#007BD3]/40 hover:text-[#007BD3]"
              >
                Agendar una demo
              </a>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-[#007BD3]">
                <Users2 className="h-8 w-8" aria-hidden />
                <p className="text-sm font-semibold uppercase tracking-wide">Comunidades que confían</p>
              </div>
              <p className="mt-4 text-3xl font-semibold text-slate-900">+120 organizaciones activas</p>
              <p className="mt-2 text-sm text-slate-600">
                Desde scaleups hasta empresas consolidadas en logística, energía, retail y servicios profesionales.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-[#E8F4FF] via-white to-[#DFF6FF] p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#007BD3]">Promedio de satisfacción</p>
              <p className="mt-2 flex items-center gap-2 text-3xl font-semibold text-slate-900">
                4.8
                <span className="inline-flex items-center gap-1 text-base text-[#FBBF24]">
                  <Star className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" aria-hidden />
                  <Star className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" aria-hidden />
                  <Star className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" aria-hidden />
                  <Star className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" aria-hidden />
                  <Star className="h-4 w-4 text-[#FBBF24]" aria-hidden />
                </span>
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Según encuestas de onboarding, soporte y evolución trimestral realizadas a más de 300 usuarios activos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Lo que dicen nuestros clientes</h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Testimonios directos de equipos que digitalizaron su operación y transformaron la forma de trabajar con Grow ERP.
            </p>
          </div>
          <div className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            Promedio de adopción del 92%
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="relative flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
            >
              <Quote className="h-10 w-10 text-[#79CFFF]" aria-hidden />
              <blockquote className="mt-6 text-base leading-relaxed text-slate-600">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8 flex flex-col gap-1 text-sm text-slate-500">
                <span className="text-base font-semibold text-slate-900">{testimonial.name}</span>
                <span>{testimonial.role}</span>
                <span className="text-[#007BD3]">{testimonial.result}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Casos destacados</h2>
              <p className="text-base text-slate-300">
                Cada industria enfrenta desafíos distintos. Te acompañamos con procesos probados, integraciones listas para usar y un equipo experto.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200">
                  Implementación guiada
                </span>
                <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200">
                  Integraciones abiertas
                </span>
                <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200">
                  KPIs accionables
                </span>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              {successStories.map((story) => (
                <article
                  key={story.company}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-lg shadow-black/20"
                >
                  <h3 className="text-xl font-semibold text-white">{story.company}</h3>
                  <p className="mt-3 text-sm text-slate-300">{story.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {story.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#79CFFF]" aria-hidden />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Un partner comprometido con tu adopción
              </h2>
              <p className="text-base text-slate-600">
                Nuestro equipo de Customer Success diseña planes de lanzamiento, sesiones de entrenamiento y reuniones de seguimiento adaptadas a cada área.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {["Onboarding personalizado", "Capacitaciones on-demand", "Mesa de ayuda 24/7", "Panel de salud del proyecto"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 text-sm text-slate-600">
                    <span className="font-semibold text-[#007BD3]">{item}</span>
                    <p className="mt-2 text-xs text-slate-500">
                      Diseñado para acelerar resultados sin generar fricción en tus equipos.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Indicadores clave del acompañamiento</h3>
              <ul className="mt-6 space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <UserCircle2 className="h-5 w-5 text-[#007BD3]" aria-hidden />
                  <span>Equipo senior con experiencia en operaciones, finanzas y transformación digital.</span>
                </li>
                <li className="flex items-start gap-3">
                  <UserCircle2 className="h-5 w-5 text-[#007BD3]" aria-hidden />
                  <span>Sesiones de seguimiento quincenales y tableros de avance compartidos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <UserCircle2 className="h-5 w-5 text-[#007BD3]" aria-hidden />
                  <span>Encuestas NPS en cada hito para ajustar planes y acelerar el valor generado.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}

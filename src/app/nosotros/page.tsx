import Newsletter from "@/components/Newsletter";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Empresas impulsadas",
    value: "120+",
    description: "Pymes y scale-ups que digitalizaron sus operaciones con Grow ERP.",
  },
  {
    label: "Horas automatizadas",
    value: "18K",
    description: "Procesos repetitivos que ahora se resuelven con flujos inteligentes.",
  },
  {
    label: "Equipo global",
    value: "7 países",
    description: "Talento distribuido que aporta perspectiva regional y velocidad.",
  },
];

const values = [
  {
    title: "Clientes como socios",
    description:
      "Cocreámos soluciones con cada organización para responder a sus desafíos reales.",
    icon: HeartHandshake,
  },
  {
    title: "Transparencia radical",
    description:
      "Compartimos métricas, aprendizajes y decisiones para construir confianza sostenida.",
    icon: ShieldCheck,
  },
  {
    title: "Innovación pragmática",
    description:
      "Exploramos nuevas tecnologías con foco en entregar valor operativo tangible.",
    icon: Lightbulb,
  },
  {
    title: "Impacto medible",
    description:
      "Cada entrega incorpora indicadores para que nuestros clientes midan resultados.",
    icon: Trophy,
  },
];

const milestones = [
  {
    year: "2019",
    title: "Nace Grow ERP",
    description:
      "Construimos la primera versión del producto junto a tres empresas piloto del sector logístico.",
  },
  {
    year: "2021",
    title: "Expansión regional",
    description:
      "Abrimos operaciones en Chile y México incorporando integraciones con sistemas contables locales.",
  },
  {
    year: "2023",
    title: "Flujos inteligentes",
    description:
      "Sumamos automatizaciones impulsadas por IA generativa para finanzas y cadena de suministro.",
  },
  {
    year: "2024",
    title: "Alianzas estratégicas",
    description:
      "Firmamos partnerships con consultoras especializadas para acompañar implementaciones complejas.",
  },
];

const team = [
  {
    name: "María González",
    role: "CEO & Co-founder",
    bio: "Lidera la visión del producto con más de 12 años construyendo plataformas SaaS en Latam.",
    color: "from-[#007BD3] to-[#53B5FF]",
  },
  {
    name: "Daniel Torres",
    role: "CTO",
    bio: "Arquitecto de software especializado en integraciones financieras y escalabilidad cloud.",
    color: "from-[#1F2937] to-[#4B5563]",
  },
  {
    name: "Lucía Fernández",
    role: "Head of Customer Success",
    bio: "Acompaña implementaciones estratégicas con foco en adopción y métricas de valor.",
    color: "from-[#9333EA] to-[#C084FC]",
  },
  {
    name: "Matías Ríos",
    role: "Lead Product Strategist",
    bio: "Diseña roadmaps basados en entrevistas con clientes y analítica de uso.",
    color: "from-[#0EA5E9] to-[#38BDF8]",
  },
];

export default function NosotrosPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E6F3FF] via-white to-white">
        <div className="absolute left-1/2 top-12 h-72 w-[120%] -translate-x-1/2 rounded-full bg-[#007BD3]/10 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#007BD3]/30 bg-white px-4 py-1 text-sm font-semibold text-[#007BD3] shadow-sm">
            <Compass className="h-4 w-4" /> Nuestro propósito
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Construimos la plataforma que potencia a los equipos que mueven la economía real
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            En Grow ERP combinamos tecnología robusta, acompañamiento experto y una cultura centrada en las personas para que cada organización pueda escalar sin perder control.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/soluciones"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#007BD3] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#007BD3]/30 transition hover:bg-[#0b6dbd]"
            >
              Ver soluciones
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/agendar-demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:border-[#007BD3] hover:text-[#007BD3]"
            >
              Agendar una demo
            </Link>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 pb-20 sm:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/70 bg-white/80 p-8 text-left shadow-[0_20px_45px_-25px_rgba(15,23,42,0.25)] backdrop-blur"
            >
              <p className="text-sm font-medium uppercase tracking-wide text-[#007BD3]">
                {stat.label}
              </p>
              <p className="mt-3 text-4xl font-semibold text-gray-900">{stat.value}</p>
              <p className="mt-4 text-sm text-gray-600">{stat.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Nuestra historia y visión
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Nacimos para resolver la desconexión entre la tecnología corporativa y las necesidades de los equipos operativos. Hoy acompañamos a compañías de alto crecimiento a consolidar datos, automatizar flujos y tomar decisiones con información confiable.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-6">
                <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Rocket className="h-5 w-5 text-[#007BD3]" /> Misión
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  Empoderar a los equipos financieros, de operaciones y supply chain con herramientas intuitivas que liberen tiempo y reduzcan errores.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-6">
                <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Users className="h-5 w-5 text-[#007BD3]" /> Visión
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  Ser la plataforma de referencia en Latinoamérica para organizaciones que desean escalar con procesos conectados y equipos motivados.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white bg-gradient-to-br from-[#F8FBFF] via-white to-[#E9F4FF] p-8 shadow-xl shadow-[#D6E9FF]/40">
            <h3 className="text-xl font-semibold text-gray-900">Cómo trabajamos</h3>
            <p className="mt-4 text-sm text-gray-600">
              Combinamos metodologías ágiles con workshops funcionales para comprender cada proceso en profundidad. Nuestro equipo trabaja en células multidisciplinarias que lanzan mejoras incrementales cada dos semanas.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#007BD3]/10 text-sm font-semibold text-[#007BD3]">
                  1
                </span>
                Diagnóstico colaborativo y definición de objetivos medibles.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#007BD3]/10 text-sm font-semibold text-[#007BD3]">
                  2
                </span>
                Implementación modular priorizando quick wins con alto impacto.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#007BD3]/10 text-sm font-semibold text-[#007BD3]">
                  3
                </span>
                Acompañamiento continuo, capacitación y optimización basada en datos.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Nuestros valores
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Una cultura que promueve la colaboración, la responsabilidad compartida y la búsqueda constante de impacto positivo.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <article
                key={value.title}
                className="group relative overflow-hidden rounded-3xl border border-white bg-white p-8 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#007BD3]/10 blur-3xl transition group-hover:scale-125" />
                <value.icon className="h-10 w-10 text-[#007BD3]" aria-hidden="true" />
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Hitos que marcan nuestro camino
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Seguimos evolucionando junto a nuestros clientes y partners estratégicos para anticiparnos a los desafíos del mercado.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[#007BD3] via-[#53B5FF] to-transparent" aria-hidden="true" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="absolute -left-[22px] top-8 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#007BD3] shadow" aria-hidden="true" />
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#007BD3]">
                    {milestone.year}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-gray-900">{milestone.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">{milestone.description}</p>
                  {index === milestones.length - 1 && (
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#007BD3]">
                      Mirá lo que viene <ArrowRight className="h-4 w-4" />
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#53B5FF]">
                Equipo
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Personas curiosas, empáticas y obsesionadas con el valor
              </h2>
              <p className="mt-4 text-lg text-slate-200">
                Creemos en equipos diversos que aprenden juntos. Organizamos squads multidisciplinarios con foco en resultados medibles y experiencias de usuario memorables.
              </p>
            </div>
            <div className="flex-1">
              <div className="grid gap-6 sm:grid-cols-2">
                {team.map((member) => (
                  <article key={member.name} className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-[0_20px_45px_-25px_rgba(15,23,42,0.65)] backdrop-blur">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${member.color} text-base font-semibold text-white`}>
                      {member.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-slate-200">{member.role}</p>
                    <p className="mt-3 text-sm text-slate-300">{member.bio}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FBFF] p-10 shadow-xl shadow-[#D6E9FF]/30">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#007BD3]">
              Comunidad
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Acompañamos a las organizaciones más dinámicas de la región
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Participamos activamente en ecosistemas emprendedores, cámaras empresariales y redes de innovación para compartir mejores prácticas y amplificar el impacto de la digitalización.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#007BD3]" aria-hidden="true" /> Alianzas con hubs de innovación
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#007BD3]" aria-hidden="true" /> Mentorías a equipos financieros
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#007BD3]" aria-hidden="true" /> Programas de adopción tecnológica
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#007BD3]" aria-hidden="true" /> Publicaciones con insights del mercado
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">¿Querés sumarte?</h3>
              <p className="mt-3 text-sm text-gray-600">
                Estamos creciendo y buscamos personas apasionadas por la tecnología y la mejora continua.
              </p>
              <a
                href="mailto:talento@growerp.com"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#007BD3]"
              >
                Escribinos a talento@growerp.com
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">Recursos destacados</h3>
              <p className="mt-3 text-sm text-gray-600">
                Explorá nuestros informes y guías prácticas para optimizar procesos clave de tu organización.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm text-[#007BD3]">
                <Link href="/blog" className="inline-flex items-center gap-2 font-semibold hover:text-[#0b6dbd]">
                  Reporte de madurez operativa 2024
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/blog" className="inline-flex items-center gap-2 font-semibold hover:text-[#0b6dbd]">
                  Guía para equipos financieros distribuidos
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}

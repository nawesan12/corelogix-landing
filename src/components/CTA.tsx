import { CalendarCheck, ShieldCheck, Sparkles } from "lucide-react";
import ScheduleDemoForm from "./ScheduleDemoForm";

const points = [
  {
    title: "Recorrido guiado",
    description: "Explorá finanzas, operaciones e inventario con un especialista.",
    icon: CalendarCheck,
  },
  {
    title: "Escenarios reales",
    description:
      "Modelamos tus procesos actuales para que veas cómo se verían en Grow ERP.",
    icon: Sparkles,
  },
  {
    title: "Hoja de ruta clara",
    description:
      "Terminá la sesión con tiempos, inversión estimada y próximos pasos.",
    icon: ShieldCheck,
  },
];

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20" aria-labelledby="cta-heading">
      <div className="relative overflow-hidden rounded-3xl bg-[#0B1F3A] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,123,211,0.45),_transparent_45%)]" aria-hidden />
        <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[minmax(0,_1fr)_minmax(320px,_380px)] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
              Demo personalizada
            </p>
            <h2 id="cta-heading" className="mt-4 text-3xl font-bold sm:text-4xl">
              ¿Listo para ver cómo Grow ERP ordena tu operación?
            </h2>
            <p className="mt-4 text-base text-white/80">
              Coordiná una sesión de 45 minutos con nuestro equipo de especialistas.
              Te mostraremos cómo automatizar procesos, conectar áreas y medir resultados
              en una sola plataforma.
            </p>

            <ul className="mt-8 space-y-4">
              {points.map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.title} className="flex gap-4">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold">{point.title}</p>
                      <p className="text-sm text-white/70">{point.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-10 text-xs uppercase tracking-[0.2em] text-white/40">
              Implementaciones disponibles en español e inglés
            </p>
          </div>

          <div className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-white/20 sm:p-4">
            <div className="rounded-2xl border border-gray-100 p-2 sm:p-3">
              <ScheduleDemoForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

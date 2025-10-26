import Link from "next/link";
import ScheduleDemoForm from "@/components/ScheduleDemoForm";

export const metadata = {
  title: "Agendá una demo | Grow ERP",
  description:
    "Coordiná una demostración personalizada de Grow ERP y descubrí cómo optimizar la gestión de tu empresa.",
};

export default function ScheduleDemoPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-24 lg:flex-row lg:items-start lg:gap-20 lg:px-8">
        <div className="w-full space-y-8 lg:max-w-xl">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#007BD3]/10 px-4 py-1 text-sm font-medium text-[#007BD3]">
              <span className="size-2 rounded-full bg-[#007BD3]" aria-hidden />
              Agenda una demo en minutos
            </span>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              Conocé Grow ERP en una sesión personalizada
            </h1>
            <p className="text-base leading-7 text-gray-600">
              Coordiná un encuentro con nuestro equipo para explorar las funcionalidades que mejor se adaptan a tu negocio.
              La demo es 100% personalizada y sin compromiso: analizamos tus procesos actuales y te mostramos cómo Grow puede
              ayudarte a escalar.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900">¿Qué incluye la demo?</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-[#007BD3]/10 text-[#007BD3]">
                  ✓
                </span>
                Recorrido guiado por los módulos clave de Grow ERP.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-[#007BD3]/10 text-[#007BD3]">
                  ✓
                </span>
                Recomendaciones según el tamaño de tu empresa y los objetivos del próximo trimestre.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-[#007BD3]/10 text-[#007BD3]">
                  ✓
                </span>
                Acceso de prueba extendido para tu equipo y materiales de onboarding.
              </li>
            </ul>

            <p className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-gray-500">
              ¿Preferís hablar ahora? Escribinos a {" "}
              <a href="mailto:hola@growerp.com" className="font-medium text-[#007BD3] underline">
                hola@growerp.com
              </a>{" "}
              o llamanos al <span className="font-medium text-gray-700">+54 9 11 0000-0000</span>.
            </p>
          </div>
        </div>

        <div className="w-full lg:max-w-md">
          <ScheduleDemoForm />
          <p className="mt-6 text-xs text-gray-400">
            Al agendar aceptás nuestras políticas de privacidad y el tratamiento de los datos suministrados para coordinar la demostración. Podés cancelar o reprogramar cuando quieras.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            ¿Ya sos cliente? Gestioná tu cuenta desde {" "}
            <Link href="/planes" className="font-medium text-[#007BD3] underline">
              el panel de planes
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

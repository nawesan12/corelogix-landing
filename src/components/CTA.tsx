import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="overflow-hidden sm:grid sm:grid-cols-2 max-w-7xl mx-auto">
      <div className="p-8  md:p-12 md:px-0 lg:py-24">
        <div className=" max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            ¿Listo para ver Grow ERP en acción?
          </h2>

          <p className="hidden text-gray-500 md:mt-4 md:block">
            Coordiná una demo personalizada para descubrir cómo automatizar tareas,
            conectar equipos y tomar decisiones con información en tiempo real.
          </p>

          <div className="mt-4 md:mt-8">
            <Link
              href="/agendar-demo"
              className="inline-block rounded-sm bg-[#007BD3] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#0b6dbd] focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
            >
              Agendar una demo
            </Link>
          </div>
        </div>
      </div>

      <Image
        alt=""
        width={1000}
        height={1000}
        src="/hero2.png"
        className="h-56 w-full object-cover sm:h-full"
      />
    </section>
  );
}

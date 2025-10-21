import Image from "next/image";

export default function CTA() {
  return (
    <section className="overflow-hidden sm:grid sm:grid-cols-2 max-w-7xl mx-auto">
      <div className="p-8  md:p-12 md:px-0 lg:py-24">
        <div className=" max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Estas interesado en usar Grow para tu negocio?
          </h2>

          <p className="hidden text-gray-500 md:mt-4 md:block">
            Empecemos registrandote como dueño y te mostraremos las
            caracteristicas de nuestro dashboard.
          </p>

          <div className="mt-4 md:mt-8">
            <a
              href="#"
              className="inline-block rounded-sm bg-[#007BD3] px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
            >
              Empezar Gratis
            </a>
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

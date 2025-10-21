"use client";

import {
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import { useEffect, useState } from "react";

export type FooterLink = { label: string; href: string; external?: boolean };
export type FooterColumn = { title: string; links: FooterLink[] };

export type FooterProps = {
  companyName?: string;
  brand?: React.ReactNode; // Optional brand/logo node
  description?: string;
  columns?: FooterColumn[];
  cta?: {
    title: string;
    blurb?: string;
    placeholder?: string;
    buttonLabel?: string;
    onSubmit?: (email: string) => Promise<void> | void;
  };
  contacts?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socials?: { name: string; href: string }[];
  copyrightFrom?: number; // if you want "2021–2025"
  className?: string;
};

export default function EnhancedFooter({
  companyName = "Grow ERP",
  brand,
  description = "Creamos herramientas para simplificar la gestión de tu negocio y escalar con claridad.",
  columns = [
    {
      title: "Servicios",
      links: [
        { label: "Coaching 1 a 1", href: "#" },
        { label: "Reseñas Empresa", href: "#" },
        { label: "Accounts Review", href: "#" },
        { label: "Consultas RRHH", href: "#" },
        { label: "Optimización SEO", href: "#" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Nosotros", href: "#" },
        { label: "Conocé al equipo", href: "#" },
        { label: "Trabajá con nosotros", href: "#" },
      ],
    },
    {
      title: "Links útiles",
      links: [
        { label: "Contacto", href: "#" },
        { label: "FAQs", href: "#" },
        { label: "Chat en vivo", href: "#" },
      ],
    },
  ],
  cta = {
    title: "Agendar una demo",
    blurb:
      "Dejanos tu correo y coordinamos una demo personalizada para tu equipo.",
    placeholder: "tu@email.com",
    buttonLabel: "Suscribirse",
  },
  contacts = {
    email: "hola@growerp.com",
    phone: "+54 9 11 0000-0000",
    address: "Av. Siempre Viva 742, CABA",
  },
  socials = [
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Facebook", href: "#" },
  ],
  copyrightFrom,
  className,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await cta?.onSubmit?.(email);
      setOk(true);
      setEmail("");
    } catch (e) {
      setOk(false);
    } finally {
      setSubmitting(false);
      setTimeout(() => setOk(null), 4000);
    }
  }

  // Back to top visibility
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const year = new Date().getFullYear();
  const copyright =
    copyrightFrom && copyrightFrom < year
      ? `${copyrightFrom}–${year}`
      : `${year}`;

  return (
    <footer
      className={`bg-white text-gray-700 ${className ?? ""}`}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="lg:grid lg:grid-cols-2">
          {/* CTA / Newsletter */}
          <div className="border-b border-gray-100 py-10 lg:order-last lg:border-s lg:border-b-0 lg:py-16 lg:ps-16">
            {/* Mobile brand */}
            <div className="block text-[#007BD3] lg:hidden">
              {brand ?? (
                <span className="text-xl font-bold">{companyName}</span>
              )}
            </div>

            <div className="mt-8 space-y-6 lg:mt-0">
              <span
                className="hidden h-1 w-10 rounded-sm bg-[#007BD3] lg:block"
                aria-hidden
              />

              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {cta.title}
                </h3>
                {cta.blurb && (
                  <p className="mt-4 max-w-lg text-gray-500">{cta.blurb}</p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="mt-4 w-full" noValidate>
                <label htmlFor="footer-email" className="sr-only">
                  Email
                </label>
                <div className="rounded-md border border-gray-100 p-2 focus-within:ring-2 focus-within:ring-[#007BD3]/40 sm:flex sm:items-center sm:gap-4">
                  <input
                    type="email"
                    id="footer-email"
                    name="email"
                    placeholder={cta.placeholder ?? "correo@example.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-none text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-transparent"
                    required
                    autoComplete="email"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 w-full rounded-sm bg-[#007BD3] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#0b6dbd] focus:outline-none focus:ring-2 focus:ring-[#007BD3] focus:ring-offset-2 disabled:opacity-70 sm:mt-0 sm:w-auto sm:shrink-0"
                  >
                    {submitting
                      ? "Enviando…"
                      : (cta.buttonLabel ?? "Suscribirse")}
                  </button>
                </div>
                {ok === true && (
                  <p className="mt-2 text-sm text-green-600">
                    ¡Listo! Te contactamos a la brevedad.
                  </p>
                )}
                {ok === false && (
                  <p className="mt-2 text-sm text-red-600">
                    Ups, algo salió mal. Probá de nuevo.
                  </p>
                )}
              </form>

              {/* Contacts */}
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {contacts?.email && (
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#007BD3]" /> {contacts.email}
                  </li>
                )}
                {contacts?.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#007BD3]" />{" "}
                    {contacts.phone}
                  </li>
                )}
                {contacts?.address && (
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#007BD3]" />{" "}
                    {contacts.address}
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Link columns + desktop brand */}
          <div className="py-10 lg:py-16 lg:pe-16">
            <div className="hidden items-center gap-3 text-[#007BD3] lg:flex">
              {brand ?? (
                <span className="text-xl font-bold">{companyName}</span>
              )}
            </div>

            <p className="mt-6 max-w-prose text-sm text-gray-600">
              {description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {columns.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <p className="font-medium text-gray-900">{col.title}</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          {...(l.external
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                          className="text-gray-700 transition hover:opacity-80"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="mt-8 border-t border-gray-100 pt-8">
              {/* Policies */}
              <ul className="flex flex-wrap gap-4 text-xs text-gray-500">
                <li>
                  <a href="#" className="transition hover:text-gray-700">
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-gray-700">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-gray-700">
                    Cookies
                  </a>
                </li>
              </ul>

              {/* Bottom row */}
              <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-xs text-gray-500">
                  &copy; {copyright}. {companyName}. Todos los derechos
                  reservados.
                </p>

                {/* Socials */}
                <ul className="flex items-center gap-3">
                  {socials.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.name}
                        className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#007BD3] hover:text-[#007BD3]"
                      >
                        {s.name === "Instagram" && (
                          <Instagram className="h-4 w-4" />
                        )}
                        {s.name === "LinkedIn" && (
                          <Linkedin className="h-4 w-4" />
                        )}
                        {s.name === "GitHub" && <Github className="h-4 w-4" />}
                        {s.name === "Facebook" && (
                          <Facebook className="h-4 w-4" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-200 transition ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Volver arriba"
      >
        <ArrowUp className="h-5 w-5 text-[#007BD3]" />
      </button>
    </footer>
  );
}

"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export default function EnhancedNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      // Simulate async signup request
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-screen-md text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Suscribite a nuestro boletín ✉️
        </h2>
        <p className="mt-4 text-gray-600">
          Recibí novedades, artículos y actualizaciones exclusivas directamente
          en tu correo.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          aria-label="Formulario de suscripción al boletín"
        >
          <div className="relative w-full max-w-sm">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              required
              id="email"
              name="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm text-gray-800 shadow-sm outline-none transition focus:border-[#007BD3] focus:ring-2 focus:ring-[#007BD3]/50"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#007BD3] bg-[#007BD3] px-8 text-sm font-medium text-white shadow-sm transition hover:bg-[#0b6dbd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BD3] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-white" />
            ) : (
              "Suscribirme"
            )}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm text-green-600">
            ¡Gracias por suscribirte! 🎉 Revisá tu bandeja de entrada.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-600">
            Ocurrió un error. Por favor, intentá nuevamente.
          </p>
        )}
      </div>
    </section>
  );
}

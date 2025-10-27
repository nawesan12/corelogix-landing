"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function EnhancedNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
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
    <motion.section
      className="mx-auto max-w-7xl px-6 py-20"
      aria-labelledby="newsletter-title"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="mx-auto max-w-screen-md text-center"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-[#007BD3]">
          Comunidad Grow ERP
        </p>
        <h2
          id="newsletter-title"
          className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl"
        >
          Insights para líderes de finanzas y operaciones
        </h2>
        <p className="mt-4 text-gray-600">
          Recibí casos de éxito, playbooks y novedades del producto todos los meses.
          Sin spam, solo tácticas accionables para equipos que quieren escalar.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          aria-label="Formulario de suscripción al boletín"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <div className="relative w-full max-w-sm">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <motion.input
              type="email"
              required
              id="newsletter-email"
              name="email"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm text-gray-800 shadow-sm outline-none transition focus:border-[#007BD3] focus:ring-2 focus:ring-[#007BD3]/50"
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#007BD3] bg-[#007BD3] px-8 text-sm font-medium text-white shadow-sm transition hover:bg-[#0b6dbd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BD3] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            whileHover={{ scale: status === "loading" ? 1 : 1.03 }}
            whileTap={{ scale: status === "loading" ? 1 : 0.96 }}
          >
            {status === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-white" />
            ) : (
              "Suscribirme"
            )}
          </motion.button>
        </motion.form>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="success"
              className="mt-4 text-sm text-green-600"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              ¡Gracias por sumarte! Revisa tu bandeja de entrada para confirmar la suscripción.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="error"
              className="mt-4 text-sm text-red-600"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Ocurrió un error. Por favor, intentá nuevamente.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

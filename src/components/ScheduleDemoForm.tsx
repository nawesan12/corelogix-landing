"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const initialFormState = {
  name: "",
  email: "",
  company: "",
  teamSize: "",
  goal: "",
  preferredDate: "",
  preferredTime: "",
};

export default function ScheduleDemoForm() {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name || !form.email || !form.preferredDate) {
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");
      // Fake async submission – replace with API call/integration later
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setForm(initialFormState);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  function updateField(key: keyof typeof form) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      if (status === "error") {
        setStatus("idle");
      }
    };
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-name" className="text-sm font-medium text-gray-700">
            Nombre y apellido
          </label>
          <motion.input
            id="demo-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={updateField("name")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
            placeholder="Ej. Ana González"
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <div>
          <label htmlFor="demo-email" className="text-sm font-medium text-gray-700">
            Correo corporativo
          </label>
          <motion.input
            id="demo-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={updateField("email")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
            placeholder="ana@tuempresa.com"
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <div>
          <label htmlFor="demo-company" className="text-sm font-medium text-gray-700">
            Empresa
          </label>
          <motion.input
            id="demo-company"
            name="company"
            type="text"
            value={form.company}
            onChange={updateField("company")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
            placeholder="Nombre de la organización"
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <div>
          <label htmlFor="demo-team-size" className="text-sm font-medium text-gray-700">
            Tamaño del equipo
          </label>
          <motion.input
            id="demo-team-size"
            name="teamSize"
            type="text"
            value={form.teamSize}
            onChange={updateField("teamSize")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
            placeholder="Ej. 25 personas"
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <div>
          <label htmlFor="demo-date" className="text-sm font-medium text-gray-700">
            Fecha preferida
          </label>
          <motion.input
            id="demo-date"
            name="preferredDate"
            type="date"
            required
            value={form.preferredDate}
            onChange={updateField("preferredDate")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <div>
          <label htmlFor="demo-time" className="text-sm font-medium text-gray-700">
            Horario preferido
          </label>
          <motion.input
            id="demo-time"
            name="preferredTime"
            type="time"
            value={form.preferredTime}
            onChange={updateField("preferredTime")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
            whileFocus={{ scale: 1.01 }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="demo-goal" className="text-sm font-medium text-gray-700">
          ¿Qué te gustaría lograr con la demo?
        </label>
        <motion.textarea
          id="demo-goal"
          name="goal"
          rows={4}
          value={form.goal}
          onChange={updateField("goal")}
          className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
          placeholder="Contanos brevemente tus objetivos o necesidades específicas"
          whileFocus={{ scale: 1.01 }}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-[#007BD3] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0b6dbd] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        whileHover={{ scale: status === "loading" ? 1 : 1.03 }}
        whileTap={{ scale: status === "loading" ? 1 : 0.97 }}
      >
        {status === "loading" ? "Agendando..." : "Agendar demo"}
      </motion.button>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            key="form-success"
            className="text-sm font-medium text-emerald-600"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            ¡Listo! Nos pondremos en contacto dentro de las próximas 24 horas para confirmar tu demo.
          </motion.p>
        )}

        {status === "error" && (
          <motion.p
            key="form-error"
            className="text-sm font-medium text-red-600"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Revisá los datos obligatorios y volvé a intentarlo.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

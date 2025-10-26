"use client";

import { useState } from "react";

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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-name" className="text-sm font-medium text-gray-700">
            Nombre y apellido
          </label>
          <input
            id="demo-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={updateField("name")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
            placeholder="Ej. Ana González"
          />
        </div>

        <div>
          <label htmlFor="demo-email" className="text-sm font-medium text-gray-700">
            Correo corporativo
          </label>
          <input
            id="demo-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={updateField("email")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
            placeholder="ana@tuempresa.com"
          />
        </div>

        <div>
          <label htmlFor="demo-company" className="text-sm font-medium text-gray-700">
            Empresa
          </label>
          <input
            id="demo-company"
            name="company"
            type="text"
            value={form.company}
            onChange={updateField("company")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
            placeholder="Nombre de la organización"
          />
        </div>

        <div>
          <label htmlFor="demo-team-size" className="text-sm font-medium text-gray-700">
            Tamaño del equipo
          </label>
          <input
            id="demo-team-size"
            name="teamSize"
            type="text"
            value={form.teamSize}
            onChange={updateField("teamSize")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
            placeholder="Ej. 25 personas"
          />
        </div>

        <div>
          <label htmlFor="demo-date" className="text-sm font-medium text-gray-700">
            Fecha preferida
          </label>
          <input
            id="demo-date"
            name="preferredDate"
            type="date"
            required
            value={form.preferredDate}
            onChange={updateField("preferredDate")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
          />
        </div>

        <div>
          <label htmlFor="demo-time" className="text-sm font-medium text-gray-700">
            Horario preferido
          </label>
          <input
            id="demo-time"
            name="preferredTime"
            type="time"
            value={form.preferredTime}
            onChange={updateField("preferredTime")}
            className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
          />
        </div>
      </div>

      <div>
        <label htmlFor="demo-goal" className="text-sm font-medium text-gray-700">
          ¿Qué te gustaría lograr con la demo?
        </label>
        <textarea
          id="demo-goal"
          name="goal"
          rows={4}
          value={form.goal}
          onChange={updateField("goal")}
          className="mt-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-[#007BD3] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3]/30"
          placeholder="Contanos brevemente tus objetivos o necesidades específicas"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-[#007BD3] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0b6dbd] focus:outline-hidden focus:ring-2 focus:ring-[#007BD3] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Agendando..." : "Agendar demo"}
      </button>

      {status === "success" && (
        <p className="text-sm font-medium text-emerald-600">
          ¡Listo! Nos pondremos en contacto dentro de las próximas 24 horas para confirmar tu demo.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">
          Revisá los datos obligatorios y volvé a intentarlo.
        </p>
      )}
    </form>
  );
}

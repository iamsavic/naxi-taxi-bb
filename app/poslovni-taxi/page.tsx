"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import { events } from "@/lib/analytics";

const PHONE = "060 000 0000";

const offerings = [
  { icon: "👔", title: "Prevoz zaposlenih", desc: "Organizovan prevoz za vaše zaposlene." },
  { icon: "🤝", title: "Poslovni partneri", desc: "Profesionalan prevoz vaših poslovnih gostiju." },
  { icon: "🏨", title: "Hotel & restorani", desc: "Prevoz gostiju hotela i restorana." },
  { icon: "📋", title: "Mesečni obračun", desc: "Faktura jednom mesečno za sve vožnje." },
];

export default function PoslovniTaxiPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ company: "", contactPerson: "", phone: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        events.submitBusinessForm();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar phoneNumber={PHONE} />
      <main className="pt-20">
        <div className="bg-gray-950 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-yellow-400 text-sm font-medium">🏢 Za firme i partnere</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Poslovni <span className="text-yellow-400">taxi</span>
            </h1>
            <p className="text-gray-400 text-xl">
              Organizovan taxi prevoz za firme, hotele i restorane uz mesečni obračun i individualne uslove.
            </p>
          </div>
        </div>

        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Offerings */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Šta nudimo firmama?</h2>
                <div className="space-y-4 mb-8">
                  {offerings.map((o) => (
                    <div key={o.title} className="flex items-start gap-4 bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <span className="text-3xl">{o.icon}</span>
                      <div>
                        <h3 className="text-white font-semibold">{o.title}</h3>
                        <p className="text-gray-400 text-sm">{o.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} onClick={events.callTaxi} className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-4 rounded-xl transition-all">
                  📞 Pozovite nas
                </a>
              </div>

              {/* Form */}
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 lg:p-8">
                <h2 className="text-white font-semibold text-lg mb-6">Pošaljite poslovni upit</h2>
                {status === "success" ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">✅</div>
                    <p className="text-white font-semibold">Upit je poslat!</p>
                    <p className="text-gray-400 text-sm mt-1">Kontaktiraćemo vas u najkraćem roku.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { name: "company", label: "Naziv firme *", type: "text", placeholder: "ABC d.o.o." },
                      { name: "contactPerson", label: "Kontakt osoba *", type: "text", placeholder: "Marko Marković" },
                      { name: "phone", label: "Telefon *", type: "tel", placeholder: "060 000 0000" },
                      { name: "email", label: "Email *", type: "email", placeholder: "kontakt@firma.rs" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={form[field.name as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Poruka *</label>
                      <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm resize-none" placeholder="Opišite vaše potrebe..." />
                    </div>
                    {status === "error" && <p className="text-red-400 text-sm">Greška. Pokušajte ponovo.</p>}
                    <button type="submit" disabled={status === "loading"} className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-gray-900 font-bold py-3.5 rounded-xl transition-colors">
                      {status === "loading" ? "Slanje..." : "Pošalji upit"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCtaBar phoneNumber={PHONE} />
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import { events } from "@/lib/analytics";

const PHONE = "060 000 0000";

const benefits = [
  { icon: "⏰", text: "Dolazimo tačno u dogovoreno vreme" },
  { icon: "🧳", text: "Prevoz prtljaga uključen" },
  { icon: "✈️", text: "Pratimo dolazak vašeg leta" },
  { icon: "📞", text: "Vozač dostupan na telefonu" },
  { icon: "💳", text: "Plaćanje gotovinom ili karticom" },
  { icon: "🛡️", text: "Licencirani vozači sa iskustvom" },
];

export default function AerodromPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", phone: "", pickup: "", date: "", time: "", passengers: "1", luggage: "1", note: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/airport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, passengers: Number(form.passengers), luggage: Number(form.luggage) }),
      });
      if (res.ok) {
        setStatus("success");
        events.submitAirportForm();
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
        {/* Hero */}
        <div className="bg-gray-950 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6">
                <span className="text-yellow-400 text-sm font-medium">✈️ Aerodromski prevoz</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Taxi do <span className="text-yellow-400">aerodroma</span>
              </h1>
              <p className="text-gray-400 text-xl mb-8">
                Sigurno i na vreme do aerodroma. Zakazivanje unapred, praćenje leta i profesionalni vozači.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} onClick={events.callTaxi} className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-4 rounded-xl transition-all">
                  📞 Pozovi za rezervaciju
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits + Form */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Zašto zakazati unapred?</h2>
                <div className="space-y-4">
                  {benefits.map((b) => (
                    <div key={b.text} className="flex items-center gap-3 bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <span className="text-2xl">{b.icon}</span>
                      <span className="text-gray-300 text-sm">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 lg:p-8">
                <h2 className="text-white font-semibold text-lg mb-6">Zakaži aerodromsku vožnju</h2>
                {status === "success" ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">✅</div>
                    <p className="text-white font-semibold">Rezervacija primljena!</p>
                    <p className="text-gray-400 text-sm mt-1">Kontaktiraćemo vas radi potvrde.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { name: "name", label: "Ime i prezime *", type: "text", placeholder: "Marko Marković" },
                      { name: "phone", label: "Telefon *", type: "tel", placeholder: "060 000 0000" },
                      { name: "pickup", label: "Adresa polaska *", type: "text", placeholder: "Ulica i broj" },
                      { name: "date", label: "Datum polaska *", type: "date" },
                      { name: "time", label: "Vreme polaska *", type: "time" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={form[field.name as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                          required={field.label.includes("*")}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm"
                        />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Br. putnika</label>
                        <select value={form.passengers} onChange={(e) => setForm({ ...form, passengers: e.target.value })} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm">
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Br. kofera</label>
                        <select value={form.luggage} onChange={(e) => setForm({ ...form, luggage: e.target.value })} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm">
                          {[0,1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Napomena</label>
                      <textarea rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm resize-none" placeholder="Broj leta, posebni zahtevi..." />
                    </div>
                    {status === "error" && <p className="text-red-400 text-sm">Greška pri slanju. Pokušajte ponovo.</p>}
                    <button type="submit" disabled={status === "loading"} className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-gray-900 font-bold py-3.5 rounded-xl transition-colors">
                      {status === "loading" ? "Slanje..." : "Zakaži vožnju"}
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

"use client";

import { useState } from "react";
import { events } from "@/lib/analytics";
import type { SiteSettings, WorkingHoursEntry } from "@/lib/cms";
import { getGoogleMapsEmbedUrl } from "@/lib/google-maps";

interface ContactSectionProps {
  settings?: SiteSettings | null;
}

export default function ContactSection({ settings }: ContactSectionProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  const phone = settings?.phoneNumber || "060 000 0000";
  const viber = settings?.viberNumber || "060 000 0000";
  const whatsapp = settings?.whatsappNumber || "060 000 0000";
  const email = settings?.email || "info@naxitaxibb.rs";
  const address = settings?.address || "Beograd, Srbija";
  const workingHoursDetails: WorkingHoursEntry[] = settings?.workingHoursDetails || [];
  const waMessage = encodeURIComponent("Zdravo, potreban mi je taxi. Moja lokacija je: ");
  const mapEmbedUrl = getGoogleMapsEmbedUrl(
    settings?.googleMapsUrl,
    settings?.address ?? address,
    settings?.mapPin
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setFormError("");

    const clientErrors: Record<string, string> = {};
    if (formData.name.trim().length < 2) clientErrors.name = "Ime mora imati najmanje 2 karaktera.";
    if (formData.phone.trim().length < 6) clientErrors.phone = "Unesite validan broj telefona.";
    if (formData.message.trim().length < 10) {
      clientErrors.message = "Poruka mora imati najmanje 10 karaktera.";
    }
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data: { errors?: Record<string, string>; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        setFormError(`Server greška (${res.status}). Pokušajte ponovo.`);
        setStatus("error");
        return;
      }

      if (res.ok) {
        setStatus("success");
        events.submitContactForm();
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
        if (data.errors && Object.keys(data.errors).length > 0) setErrors(data.errors);
        else setFormError(data.error || `Greška pri slanju (${res.status}). Pokušajte ponovo.`);
      }
    } catch {
      setStatus("error");
      setFormError("Mrežna greška. Proverite internet i pokušajte ponovo.");
    }
  }

  return (
    <section id="kontakt" className="py-16 lg:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Kontaktirajte <span className="text-green-600">nas</span>
          </h2>
          <p className="text-gray-400 text-lg">Dostupni smo 24/7 za sve vaše potrebe</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "📞", label: "Telefon", value: phone, href: `tel:${phone.replace(/\s/g, "")}`, onClick: events.callTaxi },
                { icon: "💬", label: "Viber", value: viber, href: `viber://chat?number=${viber.replace(/\s/g, "")}`, onClick: events.clickViber },
                { icon: "📱", label: "WhatsApp", value: whatsapp, href: `https://wa.me/${whatsapp.replace(/[\s+]/g, "")}?text=${waMessage}`, onClick: events.clickWhatsapp },
                { icon: "✉️", label: "Email", value: email, href: `mailto:${email}`, onClick: () => {} },
                { icon: "📍", label: "Adresa", value: address, href: undefined, onClick: () => {} },
              ].map((item) => (
                <div key={item.label} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2 text-white font-medium text-sm hover:text-green-600 transition-colors"
                    >
                      <span>{item.icon}</span> {item.value}
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-white text-sm">
                      <span>{item.icon}</span> {item.value}
                    </div>
                  )}
                </div>
              ))}

              {/* Radno vreme — structured */}
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 sm:col-span-2">
                <div className="text-xs text-gray-500 mb-2">🕐 Radno vreme</div>
                {workingHoursDetails.length > 0 ? (
                  <div className="space-y-1">
                    {workingHoursDetails.map((entry) => (
                      <div key={entry.days} className="flex justify-between text-sm">
                        <span className="text-gray-300">{entry.days}</span>
                        <span className={entry.closed ? "text-red-400 font-medium" : "text-white font-medium"}>
                          {entry.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-white text-sm">Pon–Čet 06:00–00:00 | Pet–Sub 06:00–03:00 | Ned: neradna</div>
                )}
              </div>
            </div>

            {/* Map placeholder */}
            {mapEmbedUrl ? (
              <div className="rounded-xl overflow-hidden h-64 border border-gray-700">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Naxi Taxi BB lokacija"
                />
              </div>
            ) : (
              <div className="rounded-xl h-64 bg-gray-800 border border-gray-700 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="text-sm">Google Maps embed</p>
                  <p className="text-xs">(Dodati u CMS)</p>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 lg:p-8">
            <h3 className="text-white font-semibold text-lg mb-6">Pošaljite poruku</h3>

            {status === "success" ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-white font-semibold text-lg">Poruka je poslata!</p>
                <p className="text-gray-400 text-sm mt-1">Kontaktiraćemo vas u najkraćem roku.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "name", label: "Ime i prezime *", type: "text", placeholder: "Marko Marković" },
                  { name: "phone", label: "Telefon *", type: "tel", placeholder: "060 000 0000" },
                  { name: "email", label: "Email (opciono)", type: "email", placeholder: "email@primer.com" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm"
                    />
                    {errors[field.name] && <p className="text-red-400 text-xs mt-1">{errors[field.name]}</p>}
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Poruka *</label>
                  <textarea
                    rows={4}
                    minLength={10}
                    placeholder="Napišite vašu poruku (najmanje 10 karaktera)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm resize-none"
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                {status === "error" && (formError || !Object.keys(errors).length) && (
                  <p className="text-red-400 text-sm">{formError || "Greška pri slanju. Pokušajte ponovo."}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-gray-900 font-bold py-3.5 rounded-xl transition-colors"
                >
                  {status === "loading" ? "Slanje..." : "Pošalji poruku"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { events } from "@/lib/analytics";

interface HeroProps {
  title?: string;
  subtitle?: string;
  phoneNumber?: string;
  viberNumber?: string;
  whatsappNumber?: string;
  heroImageUrl?: string | null;
}

export default function Hero({
  title = "Naxi Taxi BB — pouzdan taxi prevoz 24/7",
  subtitle = "Brzo i jednostavno naručite taxi pozivom, Viberom ili WhatsApp porukom. Sigurna vožnja, profesionalni vozači i dostupnost svakog dana.",
  phoneNumber = "060 000 0000",
  viberNumber = "060 000 0000",
  whatsappNumber = "060 000 0000",
}: HeroProps) {
  const phone = phoneNumber!.replace(/\s/g, "");
  const waMessage = encodeURIComponent("Zdravo, potreban mi je taxi. Moja lokacija je: ");
  const whatsapp = whatsappNumber!.replace(/[\s+]/g, "");
  const viber = viberNumber!.replace(/\s/g, "");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-yellow-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 lg:pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-yellow-400 text-sm font-medium">Dostupni 24/7</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {title.split("24/7").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-yellow-400">24/7</span>}
              </span>
            ))}
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${phone}`}
              onClick={events.callTaxi}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-4 rounded-xl transition-all hover:scale-105 text-base min-w-[160px] justify-center"
            >
              📞 Pozovi taxi
            </a>

            <a
              href={`viber://chat?number=${viber}`}
              onClick={events.clickViber}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-105 text-base min-w-[160px] justify-center"
            >
              💬 Viber poruka
            </a>

            <a
              href={`https://wa.me/${whatsapp}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={events.clickWhatsapp}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-105 text-base min-w-[160px] justify-center"
            >
              📱 WhatsApp
            </a>

            <Link
              href="/cenovnik"
              onClick={events.viewPricing}
              className="flex items-center gap-2 bg-transparent border-2 border-gray-600 hover:border-yellow-400 text-gray-300 hover:text-yellow-400 font-semibold px-6 py-4 rounded-xl transition-all text-base min-w-[160px] justify-center"
            >
              💰 Cenovnik
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-800">
            {[
              { value: "24/7", label: "Dostupnost" },
              { value: "5★", label: "Ocena" },
              { value: "10+", label: "Godina iskustva" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-yellow-400 text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-gray-600 animate-bounce">
        <span className="text-xs">Skroluj</span>
        <span>↓</span>
      </div>
    </section>
  );
}

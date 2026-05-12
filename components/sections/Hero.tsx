"use client";

import Image from "next/image";
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
  heroImageUrl,
}: HeroProps) {
  const phone = phoneNumber!.replace(/\s/g, "");
  const waMessage = encodeURIComponent("Zdravo, potreban mi je taxi. Moja lokacija je: ");
  const whatsapp = whatsappNumber!.replace(/[\s+]/g, "");
  const viber = viberNumber!.replace(/\s/g, "");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-950">

      {/* ── Background layer ── */}
      {heroImageUrl ? (
        <Image
          src={heroImageUrl}
          alt="Naxi Taxi BB hero"
          fill
          className="object-cover object-center"
          priority
          quality={95}
          sizes="100vw"
        />
      ) : (
        /* Fallback gradient when no image */
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-green-950/20" />
      )}

      {/* ── Dark overlay for text readability ── */}
      <div className="absolute inset-0 bg-black/55 sm:bg-black/50" />

      {/* ── Subtle green tint at top-right ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/15 via-transparent to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-24">
        <div className="max-w-2xl mx-auto text-center lg:mx-0 lg:text-left">


          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 drop-shadow-lg">
            {title.split("24/7").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-green-400">24/7</span>}
              </span>
            ))}
          </h1>

          <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-8 drop-shadow">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href={`tel:${phone}`}
              onClick={events.callTaxi}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-4 rounded-xl transition-all hover:scale-105 text-base shadow-lg shadow-green-900/40 min-w-[160px] justify-center"
            >
              📞 Pozovi taxi
            </a>

            <a
              href={`viber://chat?number=${viber}`}
              onClick={events.clickViber}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-105 text-base shadow-lg min-w-[160px] justify-center"
            >
              💬 Viber
            </a>

            <a
              href={`https://wa.me/${whatsapp}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={events.clickWhatsapp}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-105 text-base shadow-lg min-w-[160px] justify-center"
            >
              📱 WhatsApp
            </a>

            <Link
              href="/cenovnik"
              onClick={events.viewPricing}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-green-400/60 text-white hover:text-green-300 font-semibold px-6 py-4 rounded-xl transition-all text-base min-w-[160px] justify-center"
            >
              💰 Cenovnik
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-10 pt-8 border-t border-white/15 justify-center lg:justify-start">
            {[
              { value: "10", label: "Vozila" },
              { value: "4.86★", label: "Ocena" },
              { value: "10+", label: "Godina iskustva" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-green-400 text-2xl font-bold drop-shadow">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-gray-400 animate-bounce">
        <span className="text-xs">Skroluj</span>
        <span>↓</span>
      </div>
    </section>
  );
}

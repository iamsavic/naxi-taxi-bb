import Link from "next/link";

const benefits = [
  "Prevoz zaposlenih i poslovnih partnera",
  "Prevoz gostiju hotela i restorana",
  "Organizovane vožnje po dogovoru",
  "Mesečni obračun i fakturisanje",
  "Dostupnost 24/7 za firme",
  "Personalizovana usluga",
];

export default function BusinessTaxi() {
  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-yellow-400 text-sm font-medium">🏢 Za firme i partnere</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Poslovni taxi <span className="text-yellow-400">prevoz</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Naxi Taxi BB nudi poseban vid saradnje sa firmama, hotelima i restoranima.
              Omogućavamo organizovan taxi prevoz, vožnje za zaposlene, prevoz gostiju i
              poslovne upite po dogovoru.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-gray-300">
                  <span className="w-5 h-5 bg-yellow-400/20 rounded-full flex items-center justify-center text-yellow-400 text-xs flex-shrink-0">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/poslovni-taxi"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              Pošaljite poslovni upit →
            </Link>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <div className="text-center mb-6">
                <span className="text-6xl">🏢</span>
                <h3 className="text-white font-semibold text-xl mt-4">Partnerska saradnja</h3>
              </div>
              <div className="space-y-4">
                {["Firme", "Hoteli", "Restorani", "Turističke agencije"].map((partner) => (
                  <div key={partner} className="flex items-center gap-3 bg-gray-700/50 rounded-xl px-4 py-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-gray-300 text-sm">{partner}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-xl text-center">
                <p className="text-yellow-400 font-semibold text-sm">Kontaktirajte nas za individualnu ponudu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

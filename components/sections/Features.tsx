const features = [
  {
    icon: "⚡",
    title: "Brzo poručivanje",
    description: "Jednostavnim pozivom, Viber ili WhatsApp porukom. Odgovor za minut.",
  },
  {
    icon: "🕐",
    title: "Radno vreme",
    description: "Pon–Čet 06–00, Pet–Sub 06–03. Uvek tu kad Vam trebamo.",
  },
  {
    icon: "👨‍✈️",
    title: "Profesionalni vozači",
    description: "Iskusni, ljubazni i sigurni vozači koji poznaju svaki kutak grada.",
  },
  {
    icon: "💰",
    title: "Jasan cenovnik",
    description: "Bez skrivenih troškova. Znate cenu pre nego što uđete u vozilo.",
  },
  {
    icon: "✈️",
    title: "Taxi do aerodroma",
    description: "Sigurno i na vreme do aerodroma. Zakazivanje unapred dostupno.",
  },
  {
    icon: "🏢",
    title: "Poslovni taxi",
    description: "Organizovan prevoz za firme, hotele i restorane. Mesečni obračun.",
  },
];

export default function Features() {
  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Zašto izabrati <span className="text-green-600">Naxi Taxi BB</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Kvalitet i pouzdanost u svakoj vožnji
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-green-600/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

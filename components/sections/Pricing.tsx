import Link from "next/link";
import type { PricingTariff } from "@/lib/cms";

const fallbackTariffs: PricingTariff[] = [
  { _id: "1", title: "Tarifa 1", validPeriod: "Radnim danom 06:00–22:00", startPrice: 320, pricePerKm: 105, waitingPrice: 1800, notes: "Nedelja i praznici, van teritorije", isHighlighted: false },
  { _id: "2", title: "Tarifa 2", validPeriod: "Radnim danom 22:00–06:00", startPrice: 320, pricePerKm: 135, waitingPrice: 1800, notes: "Noćna tarifa", isHighlighted: true },
  { _id: "3", title: "Tarifa 3", validPeriod: "Posebni uslovi / van grada", startPrice: 320, pricePerKm: 210, waitingPrice: 1800, notes: "Van gradske zone", isHighlighted: false },
];

interface PricingProps {
  tariffs?: PricingTariff[];
}

export default function Pricing({ tariffs }: PricingProps) {
  const displayTariffs = tariffs && tariffs.length > 0 ? tariffs : fallbackTariffs;

  return (
    <section className="py-16 lg:py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <span className="text-yellow-400">Cenovnik</span>
          </h2>
          <p className="text-gray-400 text-lg">Jasne i transparentne cene, bez iznenađenja</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {displayTariffs.map((tariff) => (
            <div
              key={tariff._id}
              className={`relative rounded-2xl p-6 lg:p-8 border transition-all ${
                tariff.isHighlighted
                  ? "bg-yellow-400 border-yellow-300 text-gray-900"
                  : "bg-gray-900 border-gray-800 text-white"
              }`}
            >
              {tariff.isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-400">
                  Popularna
                </div>
              )}

              <h3 className={`font-bold text-xl mb-1 ${tariff.isHighlighted ? "text-gray-900" : "text-white"}`}>
                {tariff.title}
              </h3>
              <p className={`text-sm mb-6 ${tariff.isHighlighted ? "text-gray-700" : "text-gray-400"}`}>
                {tariff.validPeriod}
              </p>

              <div className="mb-6">
                <span className={`text-5xl font-black ${tariff.isHighlighted ? "text-gray-900" : "text-yellow-400"}`}>
                  {tariff.pricePerKm}
                </span>
                <span className={`text-lg font-semibold ml-1 ${tariff.isHighlighted ? "text-gray-700" : "text-gray-300"}`}>
                  RSD/km
                </span>
              </div>

              <ul className={`space-y-2 text-sm ${tariff.isHighlighted ? "text-gray-800" : "text-gray-400"}`}>
                <li className="flex items-center gap-2">
                  <span>✓</span> Start: {tariff.startPrice} RSD
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> Čekanje: {tariff.waitingPrice} RSD/h
                </li>
                {tariff.notes && (
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">ℹ</span> {tariff.notes}
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm mb-4">
            Cene su informativnog karaktera. Za tačnu cenu pozovite dispečera.
          </p>
          <Link
            href="/cenovnik"
            className="inline-flex items-center gap-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all"
          >
            Pogledaj kompletan cenovnik →
          </Link>
        </div>
      </div>
    </section>
  );
}

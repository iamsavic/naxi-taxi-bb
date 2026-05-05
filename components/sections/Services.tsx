import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/cms";

const fallbackServices: Service[] = [
  { _id: "1", title: "Gradska taxi vožnja", slug: "gradska-voznja", shortDescription: "Brz i siguran prevoz po gradu. Uvek na vreme, uvek dostupni.", imageUrl: null, icon: "🚕", ctaText: "Pozovi", fullDescription: null },
  { _id: "2", title: "Taxi do aerodroma", slug: "taxi-do-aerodroma", shortDescription: "Sigurna i punktualna vožnja do aerodroma. Zakazivanje unapred.", imageUrl: null, icon: "✈️", ctaText: "Zakaži", fullDescription: null },
  { _id: "3", title: "Zakazivanje unapred", slug: "zakazivanje", shortDescription: "Zakažite vožnju dan, nedelju ili mesec ranije. Bez stresa.", imageUrl: null, icon: "📅", ctaText: "Zakaži", fullDescription: null },
  { _id: "4", title: "Poslovni taxi", slug: "poslovni-taxi", shortDescription: "Organizovan prevoz za firme, hotele i restorane.", imageUrl: null, icon: "🏢", ctaText: "Saznaj više", fullDescription: null },
  { _id: "5", title: "Vozilo sa vozačem", slug: "vozilo-sa-vozacem", shortDescription: "Premium usluga sa profesionalnim vozačem za posebne prilike.", imageUrl: null, icon: "🎩", ctaText: "Saznaj više", fullDescription: null },
  { _id: "6", title: "Turističko razgledanje", slug: "turisticko-razgledanje", shortDescription: "Upoznajte grad uz lokalnog vodiča i udoban taxi.", imageUrl: null, icon: "🗺️", ctaText: "Saznaj više", fullDescription: null },
];

interface ServicesProps {
  services?: Service[];
  phoneNumber?: string;
}

export default function Services({ services, phoneNumber = "060 000 0000" }: ServicesProps) {
  const displayServices = services && services.length > 0 ? services : fallbackServices;
  const phone = phoneNumber!.replace(/\s/g, "");

  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Naše <span className="text-yellow-400">usluge</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sve što vam je potrebno na jednom mestu
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service) => (
            <div
              key={service._id}
              className="group bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Image or Icon placeholder */}
              <div className="relative h-44 bg-gray-700 flex items-center justify-center overflow-hidden">
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-6xl opacity-40">{service.icon || "🚕"}</span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{service.icon || "🚕"}</span>
                  <h3 className="text-white font-semibold text-lg">{service.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                  {service.shortDescription}
                </p>
                <div className="flex gap-3 mt-auto">
                  <Link
                    href={`/usluge#${service.slug}`}
                    className="flex-1 text-center bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                  >
                    Saznaj više
                  </Link>
                  <a
                    href={`tel:${phone}`}
                    className="flex-1 text-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-sm font-bold py-2.5 rounded-lg transition-colors"
                  >
                    Pozovi
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/usluge"
            className="inline-flex items-center gap-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all"
          >
            Pogledaj sve usluge →
          </Link>
        </div>
      </div>
    </section>
  );
}

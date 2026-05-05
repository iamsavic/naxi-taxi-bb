import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings, getServices } from "@/lib/cms";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Usluge",
  description: "Pogledajte sve taxi usluge koje nudimo: gradska vožnja, taxi do aerodroma, zakazivanje, poslovni taxi, vozilo sa vozačem i turističko razgledanje.",
};

export default async function UslugePage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);

  const phone = settings?.phoneNumber || "060 000 0000";

  return (
    <>
      <Navbar phoneNumber={phone} />
      <main className="pt-20">
        {/* Page header */}
        <div className="bg-gray-950 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Naše <span className="text-yellow-400">usluge</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Sve što vam je potrebno — brzo, sigurno i profesionalno
            </p>
          </div>
        </div>

        {/* Services grid */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(services && services.length > 0
                ? services
                : [
                    { _id: "1", title: "Gradska taxi vožnja", slug: "gradska-voznja", shortDescription: "Brz i siguran prevoz po gradu 24/7.", imageUrl: null, icon: "🚕", ctaText: "Pozovi", fullDescription: null },
                    { _id: "2", title: "Taxi do aerodroma", slug: "taxi-do-aerodroma", shortDescription: "Punktualna vožnja do aerodroma. Zakazivanje unapred.", imageUrl: null, icon: "✈️", ctaText: "Zakaži", fullDescription: null },
                    { _id: "3", title: "Zakazivanje unapred", slug: "zakazivanje", shortDescription: "Zakažite vožnju dan ili nedelju ranije.", imageUrl: null, icon: "📅", ctaText: "Zakaži", fullDescription: null },
                    { _id: "4", title: "Poslovni taxi", slug: "poslovni-taxi", shortDescription: "Organizovan prevoz za firme i hotele.", imageUrl: null, icon: "🏢", ctaText: "Saznaj više", fullDescription: null },
                  ]
              ).map((service) => (
                <div key={service._id} id={service.slug} className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
                  <div className="relative h-56 bg-gray-700 flex items-center justify-center">
                    {service.imageUrl ? (
                      <Image src={service.imageUrl} alt={service.title} fill className="object-cover" />
                    ) : (
                      <span className="text-8xl opacity-30">{service.icon}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{service.icon}</span>
                      <h2 className="text-white font-bold text-xl">{service.title}</h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4">{service.shortDescription}</p>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-5 py-3 rounded-xl transition-colors"
                    >
                      📞 Pozovi za rezervaciju
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="py-12 bg-gray-950 text-center">
          <Link href="/kontakt" className="inline-flex items-center gap-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all">
            Pošaljite upit →
          </Link>
        </div>
      </main>
      <Footer settings={settings} />
      <MobileCtaBar phoneNumber={phone} viberNumber={settings?.viberNumber} whatsappNumber={settings?.whatsappNumber} />
    </>
  );
}

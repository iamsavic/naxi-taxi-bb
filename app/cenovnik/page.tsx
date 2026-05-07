import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings, getPricingTariffs } from "@/lib/cms";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cenovnik",
  description: "Transparentan cenovnik taxi usluga. Tarifa 1, 2 i 3 — jasne cene bez skrivenih troškova.",
};

export default async function CenovnikPage() {
  const [settings, tariffs] = await Promise.all([getSiteSettings(), getPricingTariffs()]);
  const phone = settings?.phoneNumber || "060 000 0000";

  const displayTariffs = tariffs && tariffs.length > 0 ? tariffs : [
    { _id: "1", title: "Tarifa 1", validPeriod: "06:00 – 00:00", startPrice: 200, pricePerKm: 80, waitingPrice: 700, notes: "Start uključuje prvih 500m", isHighlighted: false },
    { _id: "2", title: "Tarifa 2", validPeriod: "Noćna / vikend", startPrice: 200, pricePerKm: 100, waitingPrice: 700, notes: "Start uključuje prvih 500m", isHighlighted: true },
    { _id: "3", title: "Tarifa 3", validPeriod: "Van teritorije BB", startPrice: 200, pricePerKm: 70, waitingPrice: 700, notes: "Van teritorije Bajine Bašte", isHighlighted: false },
  ];

  return (
    <>
      <Navbar phoneNumber={phone} />
      <main className="pt-20">
        <div className="bg-gray-950 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="text-green-600">Cenovnik</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Jasne i transparentne cene — bez skrivenih troškova
            </p>
          </div>
        </div>

        <section className="py-16 bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Table view (desktop) */}
            <div className="hidden md:block bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-gray-750 border-b border-gray-700">
                  <tr>
                    {["Tarifa", "Period", "Start (+500m)", "Cena/km", "Čekanje (1h)"].map((h) => (
                      <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-gray-300">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayTariffs.map((t) => (
                    <tr key={t._id} className={`border-b border-gray-700 last:border-0 ${t.isHighlighted ? "bg-green-600/5" : ""}`}>
                      <td className="px-6 py-4 font-semibold text-white">{t.title}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{t.validPeriod}</td>
                      <td className="px-6 py-4 text-gray-300">{t.startPrice} RSD</td>
                      <td className="px-6 py-4 text-green-600 font-bold text-lg">{t.pricePerKm} RSD</td>
                      <td className="px-6 py-4 text-gray-300">{t.waitingPrice} RSD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards (mobile) */}
            <div className="md:hidden space-y-4 mb-8">
              {displayTariffs.map((t) => (
                <div key={t._id} className={`rounded-2xl p-5 border ${t.isHighlighted ? "bg-green-600/10 border-green-600/50" : "bg-gray-800 border-gray-700"}`}>
                  <h3 className="text-white font-bold text-lg mb-1">{t.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{t.validPeriod}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ label: "Start", val: `${t.startPrice} RSD` }, { label: "Cena/km", val: `${t.pricePerKm} RSD`, highlight: true }, { label: "Čekanje", val: `${t.waitingPrice}/h` }].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className={`font-bold ${item.highlight ? "text-green-600 text-xl" : "text-white"}`}>{item.val}</div>
                        <div className="text-gray-500 text-xs">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  {t.notes && <p className="text-gray-500 text-xs mt-3">{t.notes}</p>}
                </div>
              ))}
            </div>

            <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-5 mb-8">
              <p className="text-green-600 text-sm">
                <strong>Napomena:</strong> Cene su informativnog karaktera. Konačna cena zavisi od rute, uslova saobraćaja i važeće tarife. Za tačnu cenu pozovite dispečera.
              </p>
            </div>

            <div className="text-center">
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all mr-4">
                📞 Pozovi taxi
              </a>
              <Link href="/taxi-do-aerodroma" className="inline-flex items-center gap-2 border-2 border-gray-600 hover:border-green-600 text-gray-300 hover:text-green-600 font-semibold px-8 py-4 rounded-xl transition-all">
                ✈️ Taxi do aerodroma
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
      <MobileCtaBar phoneNumber={phone} viberNumber={settings?.viberNumber} whatsappNumber={settings?.whatsappNumber} />
    </>
  );
}

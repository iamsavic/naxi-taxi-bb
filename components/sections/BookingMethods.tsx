"use client";

import { events } from "@/lib/analytics";

interface BookingMethodsProps {
  phoneNumber?: string;
  viberNumber?: string;
  whatsappNumber?: string;
}

export default function BookingMethods({
  phoneNumber = "060 000 0000",
  viberNumber = "060 000 0000",
  whatsappNumber = "060 000 0000",
}: BookingMethodsProps) {
  const phone = phoneNumber!.replace(/\s/g, "");
  const viber = viberNumber!.replace(/\s/g, "");

  const methods = [
    {
      icon: "📞",
      title: "Pozivom",
      color: "yellow",
      description: "Pozovite nas i za minut šaljemo najbliže vozilo.",
      number: phoneNumber,
      action: (
        <a
          href={`tel:${phone}`}
          onClick={events.callTaxi}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all"
        >
          📞 Pozovi {phoneNumber}
        </a>
      ),
    },
    {
      icon: "💬",
      title: "Viber pozivom",
      color: "purple",
      description: "Pozovite nas putem Vibera — brzo i jednostavno.",
      action: (
        <a
          href={`viber://call?number=${viber}`}
          onClick={events.clickViber}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-5 py-3 rounded-xl transition-all"
        >
          💬 Pozovi na Viber
        </a>
      ),
    },
    {
      icon: "📋",
      title: "Online formom",
      color: "blue",
      description: "Zakazite vožnju unapred ili pošaljite upit. Odgovaramo u najkraćem roku.",
      action: (
        <a
          href="/kontakt"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-xl transition-all"
        >
          📋 Pošalji upit
        </a>
      ),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Naručite taxi na <span className="text-green-600">3 načina</span>
          </h2>
          <p className="text-gray-400 text-lg">Odaberite način koji vam najviše odgovara</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {methods.map((method, idx) => (
            <div
              key={method.title}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 lg:p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600/10 rounded-xl flex items-center justify-center text-xl">
                  {method.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-green-600 text-xs font-bold border border-gray-700">
                    {idx + 1}
                  </span>
                  <h3 className="text-white font-semibold">{method.title}</h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{method.description}</p>
              <div>{method.action}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

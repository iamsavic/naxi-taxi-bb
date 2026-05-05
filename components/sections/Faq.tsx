"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/cms";

const fallbackFaqs: FaqItem[] = [
  { _id: "1", question: "Da li radite 24/7?", answer: "Da, dostupni smo svakog dana u godini, bez praznika i odmora.", category: "opste" },
  { _id: "2", question: "Kako mogu da naručim taxi?", answer: "Možete nas pozvati telefonom, poslati Viber ili WhatsApp poruku, ili koristiti online formu na sajtu.", category: "narucivanje" },
  { _id: "3", question: "Da li mogu da zakažem vožnju unapred?", answer: "Da, zakazivanje unapred je moguće. Kontaktirajte nas telefonom ili putem forme.", category: "narucivanje" },
  { _id: "4", question: "Da li vozite do aerodroma?", answer: "Da, aerodromske vožnje su jedna od naših specijalnosti. Preporučujemo zakazivanje unapred.", category: "aerodrom" },
  { _id: "5", question: "Da li primate kartično plaćanje?", answer: "Da, prihvatamo plaćanje gotovinom i karticama (Visa, Mastercard, Maestro).", category: "placanje" },
  { _id: "6", question: "Da li sarađujete sa firmama?", answer: "Da, nudimo poseban vid saradnje za firme, hotele i restorane sa mesečnim obračunom.", category: "poslovni" },
];

interface FaqProps {
  items?: FaqItem[];
}

export default function Faq({ items }: FaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const displayItems = items && items.length > 0 ? items : fallbackFaqs;

  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Česta <span className="text-green-600">pitanja</span>
          </h2>
          <p className="text-gray-400 text-lg">Sve što trebate znati o našoj usluzi</p>
        </div>

        <div className="space-y-3">
          {displayItems.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === item._id ? null : item._id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                aria-expanded={openId === item._id}
              >
                <span className="text-white font-medium pr-4">{item.question}</span>
                <span
                  className={`text-green-600 flex-shrink-0 transition-transform duration-300 ${
                    openId === item._id ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openId === item._id && (
                <div className="px-6 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { events } from "@/lib/analytics";

interface MobileCtaBarProps {
  phoneNumber?: string;
  viberNumber?: string;
  whatsappNumber?: string;
}

export default function MobileCtaBar({
  phoneNumber = "060 000 0000",
  viberNumber = "060 000 0000",
  whatsappNumber = "060 000 0000",
}: MobileCtaBarProps) {
  const phone = phoneNumber!.replace(/\s/g, "");
  const viber = viberNumber!.replace(/\s/g, "");
  const whatsapp = whatsappNumber!.replace(/[\s+]/g, "");
  const waMessage = encodeURIComponent("Zdravo, potreban mi je taxi. Moja lokacija je: ");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-gray-950 border-t border-gray-800 safe-area-bottom">
      <div className="grid grid-cols-4">
        <a
          href={`tel:${phone}`}
          onClick={events.callTaxi}
          className="flex flex-col items-center justify-center py-3 gap-1 text-green-600 active:bg-gray-900"
        >
          <span className="text-xl">📞</span>
          <span className="text-xs font-medium">Pozovi</span>
        </a>

        <a
          href={`viber://call?number=${viber}`}
          onClick={events.clickViber}
          className="flex flex-col items-center justify-center py-3 gap-1 text-purple-400 active:bg-gray-900"
        >
          <span className="text-xl">💬</span>
          <span className="text-xs font-medium">Viber</span>
        </a>

        <a
          href={`https://wa.me/${whatsapp}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={events.clickWhatsapp}
          className="flex flex-col items-center justify-center py-3 gap-1 text-green-400 active:bg-gray-900"
        >
          <span className="text-xl">📱</span>
          <span className="text-xs font-medium">WhatsApp</span>
        </a>

        <Link
          href="/cenovnik"
          onClick={events.viewPricing}
          className="flex flex-col items-center justify-center py-3 gap-1 text-gray-300 active:bg-gray-900"
        >
          <span className="text-xl">💰</span>
          <span className="text-xs font-medium">Cenovnik</span>
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { SiteSettings } from "@/lib/cms";

const quickLinks = [
  { href: "/", label: "Početna" },
  { href: "/usluge", label: "Usluge" },
  { href: "/cenovnik", label: "Cenovnik" },
  { href: "/galerija", label: "Galerija" },
  { href: "/kontakt", label: "Kontakt" },
];

const serviceLinks = [
  { href: "/taxi-do-aerodroma", label: "Taxi do aerodroma" },
  { href: "/poslovni-taxi", label: "Poslovni taxi" },
  { href: "/usluge", label: "Sve usluge" },
];

interface FooterProps {
  settings?: SiteSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  const phone = settings?.phoneNumber || "060 000 0000";
  const viber = settings?.viberNumber || "060 000 0000";
  const whatsapp = settings?.whatsappNumber || "060 000 0000";
  const email = settings?.email || "info@naxitaxibb.rs";
  const address = settings?.address || "Beograd, Srbija";
  const workingHours = settings?.workingHours || "Pon–Ned 00:00–24:00";
  const waMessage = encodeURIComponent("Zdravo, potreban mi je taxi. Moja lokacija je: ");

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🚕</span>
              <span className="text-white font-bold text-lg">
                Naxi Taxi<span className="text-yellow-400"> BB</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {settings?.tagline || "Pouzdan taxi prevoz 24/7. Brzo, sigurno i profesionalno."}
            </p>
            {settings?.socialLinks?.facebook && (
              <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-yellow-400 hover:underline mr-4">Facebook</a>
            )}
            {settings?.socialLinks?.instagram && (
              <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-yellow-400 hover:underline">Instagram</a>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Brzi linkovi</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-yellow-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Usluge</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-yellow-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                  <span>📞</span> {phone}
                </a>
              </li>
              <li>
                <a href={`viber://chat?number=${viber.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                  <span>💬</span> Viber: {viber}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsapp.replace(/[\s+]/g, "")}?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                  <span>📱</span> WhatsApp: {whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                  <span>✉️</span> {email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span> <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span> {workingHours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Naxi Taxi BB. Sva prava zadržana.
          </p>
          <p className="text-xs text-gray-600">Dostupni 24/7</p>
        </div>
      </div>
    </footer>
  );
}

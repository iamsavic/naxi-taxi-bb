import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/cms";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import ContactSection from "@/components/sections/ContactSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktirajte Naxi Taxi BB — telefon, Viber, WhatsApp, email i kontakt forma.",
};

export default async function KontaktPage() {
  const settings = await getSiteSettings();
  const phone = settings?.phoneNumber || "060 000 0000";

  return (
    <>
      <Navbar phoneNumber={phone} />
      <main className="pt-20">
        <div className="bg-gray-950 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="text-green-600">Kontakt</span>
            </h1>
            <p className="text-gray-400 text-xl">Pozovite, pišite ili pošaljite poruku</p>
          </div>
        </div>
        <ContactSection settings={settings} />
      </main>
      <Footer settings={settings} />
      <MobileCtaBar phoneNumber={phone} viberNumber={settings?.viberNumber} whatsappNumber={settings?.whatsappNumber} />
    </>
  );
}

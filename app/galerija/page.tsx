import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings, getGalleryImages } from "@/lib/cms";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Galerija",
  description: "Pogledajte naša vozila, tim i brendiranje Naxi Taxi BB taxi službe.",
};

const categoryLabels: Record<string, string> = {
  svi: "Svi",
  vozila: "Vozila",
  enterijer: "Enterijer",
  tim: "Tim",
  brendiranje: "Brendiranje",
  ostalo: "Ostalo",
};

export default async function GalerijaPage() {
  const [settings, images] = await Promise.all([getSiteSettings(), getGalleryImages()]);
  const phone = settings?.phoneNumber || "060 000 0000";

  return (
    <>
      <Navbar phoneNumber={phone} />
      <main className="pt-20">
        <div className="bg-gray-950 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Naša <span className="text-green-600">galerija</span>
            </h1>
            <p className="text-gray-400 text-xl">Vozila, tim i brendiranje Naxi Taxi BB</p>
          </div>
        </div>

        <section className="py-16 bg-gray-900 min-h-[400px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {images && images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div key={image._id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                    <Image
                      src={image.imageUrl}
                      alt={image.altText}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {image.description && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <p className="text-white text-xs">{image.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-gray-400 text-lg">Slike će uskoro biti dodane</p>
                <p className="text-gray-600 text-sm mt-1">Dodajte slike u Sanity Studio</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
      <MobileCtaBar phoneNumber={phone} viberNumber={settings?.viberNumber} whatsappNumber={settings?.whatsappNumber} />
    </>
  );
}

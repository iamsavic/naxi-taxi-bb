import Link from "next/link";
import Image from "next/image";
import type { GalleryImage } from "@/lib/cms";

interface GalleryPreviewProps {
  images?: GalleryImage[];
}

export default function GalleryPreview({ images }: GalleryPreviewProps) {
  const displayImages = images?.slice(0, 6) || [];

  return (
    <section className="py-16 lg:py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Naša <span className="text-yellow-400">galerija</span>
          </h2>
          <p className="text-gray-400 text-lg">Pogledajte naša vozila i tim</p>
        </div>

        {displayImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {displayImages.map((image) => (
              <div key={image._id} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={image.imageUrl}
                  alt={image.altText}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center"
              >
                <span className="text-4xl opacity-20">🚕</span>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/galerija"
            className="inline-flex items-center gap-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all"
          >
            Pogledaj galeriju →
          </Link>
        </div>
      </div>
    </section>
  );
}

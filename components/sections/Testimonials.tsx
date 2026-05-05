import type { Testimonial } from "@/lib/cms";

const fallbackTestimonials: Testimonial[] = [
  { _id: "1", name: "Marko P.", rating: 5, comment: "Odlična usluga! Vozač je bio tačan i ljubazan. Definitivno preporučujem.", source: "google" },
  { _id: "2", name: "Ana S.", rating: 5, comment: "Koristim ih za vožnje do aerodroma godinama. Nikad me nisu izneverili.", source: "google" },
  { _id: "3", name: "Jovana M.", rating: 5, comment: "Brza reakcija, čisto vozilo, korektna cena. Sve što je potrebno od taxi službe.", source: "facebook" },
];

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"}>
          ★
        </span>
      ))}
    </div>
  );
}

const sourceLabels: Record<string, string> = {
  google: "Google recenzija",
  facebook: "Facebook recenzija",
  direktno: "Direktna recenzija",
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const displayTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section className="py-16 lg:py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Šta kažu naši <span className="text-yellow-400">korisnici</span>
          </h2>
          <p className="text-gray-400 text-lg">Proverene recenzije zadovoljnih korisnika</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4"
            >
              <Stars rating={testimonial.rating} />
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-gray-500 text-xs">{sourceLabels[testimonial.source] || testimonial.source}</div>
                </div>
                <span className="text-yellow-400 text-xl">🚕</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

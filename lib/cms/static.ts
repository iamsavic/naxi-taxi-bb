import type {
  SiteSettings,
  Service,
  PricingTariff,
  GalleryImage,
  FaqItem,
  Testimonial,
  Partner,
} from "./types";

export const staticSiteSettings: SiteSettings = {
  siteName: "Naxi Taxi BB",
  tagline: "Brz, pouzdan i uvek dostupan taxi servis u Bajinoj Bašti",
  phoneNumber: "031 861 666",
  viberNumber: "+381 60 386 1 666",
  whatsappNumber: "+381 60 386 1 666",
  email: "info@naxitaxibb.rs",
  address: "Račanskih Boraca 39, 31250 Bajina Bašta, Srbija",
  workingHours: "Pon–Čet 06:00–00:00 | Pet–Sub 06:00–03:00 | Ned: neradna",
  workingHoursDetails: [
    { days: "Ponedeljak – Četvrtak", hours: "06:00 – 00:00" },
    { days: "Petak – Subota", hours: "06:00 – 03:00" },
    { days: "Nedelja", hours: "Neradna", closed: true },
  ],
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d402.8150687680116!2d19.564922200473106!3d43.97779957697882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4759b5b3065fab8b%3A0x413e9e18a3c84975!2sBajina%20Basta!5e1!3m2!1sen!2srs!4v1778188864012!5m2!1sen!2srs",
  heroTitle: "Naxi Taxi Bajina Bašta — Brz i Pouzdan",
  heroSubtitle: "Dostupni 24/7. Pozovite nas ili nas kontaktirajte putem Vibera i WhatsApp-a.",
  heroImageUrl: null,
  logoUrl: null,
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
};

export const staticServices: Service[] = [
  {
    _id: "1",
    title: "Gradska taxi vožnja",
    slug: "gradska-voznja",
    shortDescription: "Brz i siguran prevoz po gradu. Uvek na vreme, uvek dostupni.",
    fullDescription: null,
    imageUrl: null,
    icon: "🚕",
    ctaText: "Pozovi",
  },
  {
    _id: "2",
    title: "Taxi do aerodroma",
    slug: "taxi-do-aerodroma",
    shortDescription: "Sigurna i punktualna vožnja do aerodroma Nikola Tesla. Zakazivanje unapred.",
    fullDescription: null,
    imageUrl: null,
    icon: "✈️",
    ctaText: "Zakaži",
  },
  {
    _id: "3",
    title: "Zakazivanje unapred",
    slug: "zakazivanje",
    shortDescription: "Zakažite vožnju dan, nedelju ili mesec ranije. Bez stresa.",
    fullDescription: null,
    imageUrl: null,
    icon: "📅",
    ctaText: "Zakaži",
  },
  {
    _id: "4",
    title: "Poslovni taxi",
    slug: "poslovni-taxi",
    shortDescription: "Organizovan prevoz za firme, hotele i restorane. Redovne rute i mesečni ugovori.",
    fullDescription: null,
    imageUrl: null,
    icon: "🏢",
    ctaText: "Saznaj više",
  },
  {
    _id: "5",
    title: "Vozilo sa vozačem",
    slug: "vozilo-sa-vozacem",
    shortDescription: "Premium usluga sa profesionalnim vozačem za posebne prilike i svečanosti.",
    fullDescription: null,
    imageUrl: null,
    icon: "🎩",
    ctaText: "Saznaj više",
  },
  {
    _id: "6",
    title: "Turističko razgledanje",
    slug: "turisticko-razgledanje",
    shortDescription: "Upoznajte grad uz lokalnog vodiča i udoban taxi.",
    fullDescription: null,
    imageUrl: null,
    icon: "🗺️",
    ctaText: "Saznaj više",
  },
];

export const staticPricingTariffs: PricingTariff[] = [
  {
    _id: "1",
    title: "Tarifa 1",
    validPeriod: "06:00 – 00:00",
    startPrice: 200,
    pricePerKm: 80,
    waitingPrice: 700,
    notes: "Start uključuje prvih 500m",
    isHighlighted: false,
  },
  {
    _id: "2",
    title: "Tarifa 2",
    validPeriod: "Noćna / vikend",
    startPrice: 200,
    pricePerKm: 100,
    waitingPrice: 700,
    notes: "Start uključuje prvih 500m",
    isHighlighted: true,
  },
  {
    _id: "3",
    title: "Tarifa 3",
    validPeriod: "Van teritorije BB",
    startPrice: 200,
    pricePerKm: 70,
    waitingPrice: 700,
    notes: "Van teritorije Bajine Bašte",
    isHighlighted: false,
  },
];

export const staticGalleryImages: GalleryImage[] = [];

export const staticPartners: Partner[] = [];

export const staticFaqItems: FaqItem[] = [
  {
    _id: "1",
    question: "Kako mogu da naručim taxi?",
    answer: "Možete nas pozvati telefonom, kontaktirati putem Vibera ili WhatsApp-a, ili ispuniti online formu na sajtu.",
    category: "Naručivanje",
  },
  {
    _id: "2",
    question: "Kada radite?",
    answer: "Radimo ponedeljkom do četvrtka od 06:00 do 00:00, petkom i subotom od 06:00 do 03:00. Nedeljom ne radimo.",
    category: "Opšte",
  },
  {
    _id: "3",
    question: "Kolika je cena vožnje do aerodroma?",
    answer: "Vožnja do aerodroma Nikola Tesla ima fiksnu cenu od 2500 RSD, bez obzira na saobraćaj.",
    category: "Cene",
  },
  {
    _id: "4",
    question: "Mogu li da zakažem vožnju unapred?",
    answer: "Da, vožnje možete zakazati dan, nedelju ili mesec ranije. Posebno preporučujemo zakazivanje za aerodrom.",
    category: "Zakazivanje",
  },
  {
    _id: "5",
    question: "Da li prihvatate kartice?",
    answer: "Ne, moguće je platiti samo kešom.",
    category: "Plaćanje",
  },
  {
    _id: "6",
    question: "Nudite li usluge za firme?",
    answer: "Da, nudimo mesečne ugovore za firme sa povoljnijim cenama i prioritetnim uslugom.",
    category: "Pословно",
  },
];

export const staticTestimonials: Testimonial[] = [
  {
    _id: "1",
    name: "Marko Petrović",
    rating: 5,
    comment: "Odlična usluga! Vozač je stigao za 5 minuta. Definitivno preporučujem.",
    source: "Google",
  },
  {
    _id: "2",
    name: "Ana Jovanović",
    rating: 5,
    comment: "Koristim Naxi Taxi svaki dan za posao. Uvek tačni, uvek ljubazni.",
    source: "Google",
  },
  {
    _id: "3",
    name: "Nikola Đorđević",
    rating: 5,
    comment: "Prevoz do aerodroma bio je odličan. Fiksna cena bez iznenađenja.",
    source: "Facebook",
  },
  {
    _id: "4",
    name: "Jelena Simić",
    rating: 5,
    comment: "Profesionalan vozač, čisto vozilo, odlična muzika. 10/10!",
    source: "Google",
  },
];

// Async wrappers za kompatibilnost sa app/page.tsx
export async function fetchSiteSettings(): Promise<SiteSettings> {
  return staticSiteSettings;
}

export async function fetchServices(): Promise<Service[]> {
  return staticServices;
}

export async function fetchPricingTariffs(): Promise<PricingTariff[]> {
  return staticPricingTariffs;
}

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  return staticGalleryImages;
}

export async function fetchPartners(): Promise<Partner[]> {
  return staticPartners;
}

export async function fetchFaqItems(): Promise<FaqItem[]> {
  return staticFaqItems;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return staticTestimonials;
}

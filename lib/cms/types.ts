export interface SiteSettings {
  siteName: string;
  tagline: string;
  phoneNumber: string;
  viberNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  workingHours: string;
  googleMapsUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string | null;
  logoUrl: string | null;
  socialLinks: {
    facebook?: string;
    instagram?: string;
  };
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: unknown;
  imageUrl: string | null;
  icon: string;
  ctaText: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface PricingTariff {
  _id: string;
  title: string;
  validPeriod: string;
  startPrice: number;
  pricePerKm: number;
  waitingPrice: number;
  notes?: string;
  isHighlighted: boolean;
}

export interface GalleryImage {
  _id: string;
  imageUrl: string;
  altText: string;
  category: string;
  description?: string;
}

export interface Partner {
  _id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl?: string;
  description?: string;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  source: string;
}

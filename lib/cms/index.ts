// CMS Abstraction Layer — Static data implementation
// Za budući CMS: zameniti importove iz "./static" sa novom implementacijom.

export {
  fetchSiteSettings as getSiteSettings,
  fetchServices as getServices,
  fetchPricingTariffs as getPricingTariffs,
  fetchGalleryImages as getGalleryImages,
  fetchPartners as getPartners,
  fetchFaqItems as getFaqItems,
  fetchTestimonials as getTestimonials,
} from "./static";

export type {
  SiteSettings,
  Service,
  PricingTariff,
  GalleryImage,
  Partner,
  FaqItem,
  Testimonial,
} from "./types";

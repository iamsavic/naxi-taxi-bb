import { getSiteSettings, getServices, getPricingTariffs, getGalleryImages, getFaqItems, getTestimonials } from "@/lib/cms";
import Navbar from "@/components/layout/Navbar";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import BookingMethods from "@/components/sections/BookingMethods";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import BusinessTaxi from "@/components/sections/BusinessTaxi";
import GalleryPreview from "@/components/sections/GalleryPreview";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";
import Ticker from "@/components/sections/Ticker";
import ContactSection from "@/components/sections/ContactSection";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, services, tariffs, galleryImages, faqItems, testimonials] =
    await Promise.all([
      getSiteSettings(),
      getServices(),
      getPricingTariffs(),
      getGalleryImages(),
      getFaqItems(),
      getTestimonials(),
    ]);

  return (
    <>
      <Navbar phoneNumber={settings?.phoneNumber ?? undefined} />

      <main>
        <Hero
          title={settings?.heroTitle ?? undefined}
          subtitle={settings?.heroSubtitle ?? undefined}
          phoneNumber={settings?.phoneNumber ?? undefined}
          viberNumber={settings?.viberNumber ?? undefined}
          whatsappNumber={settings?.whatsappNumber ?? undefined}
          heroImageUrl={settings?.heroImageUrl ?? undefined}
        />

        <Ticker />

        <Features />

        <BookingMethods
          phoneNumber={settings?.phoneNumber ?? undefined}
          viberNumber={settings?.viberNumber ?? undefined}
          whatsappNumber={settings?.whatsappNumber ?? undefined}
        />

        <Services services={services || []} phoneNumber={settings?.phoneNumber ?? undefined} />

        <Pricing tariffs={tariffs || []} />

        <BusinessTaxi />

        <GalleryPreview images={galleryImages || []} />

        <Faq items={faqItems || []} />

        <Testimonials testimonials={testimonials || []} />

        <ContactSection settings={settings} />
      </main>

      <Footer settings={settings} />

      <MobileCtaBar
        phoneNumber={settings?.phoneNumber ?? undefined}
        viberNumber={settings?.viberNumber ?? undefined}
        whatsappNumber={settings?.whatsappNumber ?? undefined}
      />
    </>
  );
}

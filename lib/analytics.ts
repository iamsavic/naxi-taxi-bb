"use client";

type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

export function trackEvent({ action, category, label, value }: GtagEvent) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_GA_ID) return;

  // GA4
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq("track", action, { category, label });
  }
}

export const events = {
  callTaxi: () => trackEvent({ action: "call_taxi", category: "CTA", label: "phone" }),
  clickViber: () => trackEvent({ action: "click_viber", category: "CTA", label: "viber" }),
  clickWhatsapp: () => trackEvent({ action: "click_whatsapp", category: "CTA", label: "whatsapp" }),
  viewPricing: () => trackEvent({ action: "view_pricing", category: "Navigation" }),
  submitContactForm: () => trackEvent({ action: "submit_contact_form", category: "Form" }),
  submitRideRequest: () => trackEvent({ action: "submit_ride_request", category: "Form" }),
  submitAirportForm: () => trackEvent({ action: "submit_airport_form", category: "Form" }),
  submitBusinessForm: () => trackEvent({ action: "submit_business_form", category: "Form" }),
};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
  }
}

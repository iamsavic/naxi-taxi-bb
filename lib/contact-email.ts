/** Inbox for all site form submissions (overridable via CONTACT_EMAIL). */
export const CONTACT_FORM_EMAIL =
  process.env.CONTACT_EMAIL ?? "taxinaxibb@gmail.com";

/** Resend sender — onboarding@resend.dev until naxitaxibb.rs domain is verified. */
export const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Naxi Taxi BB <onboarding@resend.dev>";

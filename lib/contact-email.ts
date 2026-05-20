/** Inbox for all site form submissions (overridable via CONTACT_EMAIL). */
export const CONTACT_FORM_EMAIL =
  process.env.CONTACT_EMAIL?.trim() || "taxinaxibb@gmail.com";

/** Resend sender — onboarding@resend.dev until naxitaxibb.rs domain is verified. */
export function getResendFromEmail(): string {
  const raw = process.env.RESEND_FROM_EMAIL?.trim();
  if (!raw) return "Naxi Taxi BB <onboarding@resend.dev>";
  if (raw.includes("@") && !raw.includes("<")) return `Naxi Taxi BB <${raw}>`;
  return raw;
}

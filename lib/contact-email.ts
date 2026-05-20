/** Inbox for all site form submissions (overridable via CONTACT_EMAIL). */
export const CONTACT_FORM_EMAIL =
  process.env.CONTACT_EMAIL?.trim() || "taxinaxibb@gmail.com";

/** Gmail account used to send form emails (defaults to inbox address). */
export const GMAIL_USER =
  process.env.GMAIL_USER?.trim() || CONTACT_FORM_EMAIL;

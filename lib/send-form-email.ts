import { CONTACT_FORM_EMAIL, RESEND_FROM_EMAIL } from "@/lib/contact-email";
import { resendErrorMessage } from "@/lib/form-errors";

type SendFormEmailInput = {
  subject: string;
  text: string;
};

export async function sendFormEmail({ subject, text }: SendFormEmailInput) {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false as const, status: 503, error: "Email servis nije podešen (RESEND_API_KEY)." };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: CONTACT_FORM_EMAIL,
    subject,
    text,
  });

  if (error) {
    console.error("[FORM EMAIL] Resend:", error);
    return { ok: false as const, status: 502, error: resendErrorMessage(error.message) };
  }

  return { ok: true as const };
}

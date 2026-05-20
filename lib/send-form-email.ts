import { CONTACT_FORM_EMAIL, getResendFromEmail } from "@/lib/contact-email";
import { resendErrorMessage } from "@/lib/form-errors";

type SendFormEmailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

type SendResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

async function sendViaGmail({ subject, text, replyTo }: SendFormEmailInput): Promise<SendResult | null> {
  const pass = process.env.GMAIL_APP_PASSWORD?.trim();
  if (!pass) return null;

  const user = process.env.GMAIL_USER?.trim() || CONTACT_FORM_EMAIL;

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Naxi Taxi BB <${user}>`,
      to: CONTACT_FORM_EMAIL,
      replyTo: replyTo || undefined,
      subject,
      text,
    });

    return { ok: true };
  } catch (err) {
    console.error("[FORM EMAIL] Gmail:", err);
    const message = err instanceof Error ? err.message : "Gmail slanje nije uspelo.";
    return { ok: false, status: 502, error: message };
  }
}

async function sendViaResend({ subject, text, replyTo }: SendFormEmailInput): Promise<SendResult | null> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: getResendFromEmail(),
      to: [CONTACT_FORM_EMAIL],
      replyTo: replyTo || undefined,
      subject,
      text,
    });

    if (error) {
      console.error("[FORM EMAIL] Resend:", error);
      return { ok: false, status: 502, error: resendErrorMessage(error.message) };
    }

    return { ok: true };
  } catch (err) {
    console.error("[FORM EMAIL] Resend throw:", err);
    const message = err instanceof Error ? err.message : "Resend slanje nije uspelo.";
    return { ok: false, status: 502, error: resendErrorMessage(message) };
  }
}

export async function sendFormEmail(input: SendFormEmailInput): Promise<SendResult> {
  const replyTo = input.replyTo?.trim() || undefined;

  const resendResult = await sendViaResend({ ...input, replyTo });
  if (resendResult?.ok) return resendResult;

  const gmailResult = await sendViaGmail({ ...input, replyTo });
  if (gmailResult?.ok) return gmailResult;

  if (resendResult && !resendResult.ok) return resendResult;
  if (gmailResult && !gmailResult.ok) return gmailResult;

  if (!process.env.RESEND_API_KEY?.trim() && !process.env.GMAIL_APP_PASSWORD?.trim()) {
    return {
      ok: false,
      status: 503,
      error:
        "Email nije podešen. Dodajte RESEND_API_KEY ili GMAIL_APP_PASSWORD na Vercel-u.",
    };
  }

  return {
    ok: false,
    status: 502,
    error: "Email nije poslat. Proverite Resend/Gmail podešavanja na Vercel-u.",
  };
}

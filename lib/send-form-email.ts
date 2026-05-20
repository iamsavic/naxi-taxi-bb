import { CONTACT_FORM_EMAIL, GMAIL_USER } from "@/lib/contact-email";

type SendFormEmailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

type SendResult = { ok: true } | { ok: false; status: number; error: string };

function gmailErrorMessage(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login") || lower.includes("username and password")) {
    return "Gmail App Password nije ispravan. Proverite GMAIL_APP_PASSWORD na Vercel-u.";
  }
  if (lower.includes("application-specific password")) {
    return "Potreban je Gmail App Password (ne obična lozinka).";
  }
  return "Email nije poslat. Pokušajte ponovo ili nas pozovite telefonom.";
}

export async function sendFormEmail(input: SendFormEmailInput): Promise<SendResult> {
  const pass = process.env.GMAIL_APP_PASSWORD?.trim();
  if (!pass) {
    return {
      ok: false,
      status: 503,
      error: "Email servis nije podešen. Dodajte GMAIL_APP_PASSWORD na Vercel-u.",
    };
  }

  const replyTo = input.replyTo?.trim() || undefined;

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass },
    });

    await transporter.sendMail({
      from: `Naxi Taxi BB <${GMAIL_USER}>`,
      to: CONTACT_FORM_EMAIL,
      replyTo: replyTo || undefined,
      subject: input.subject,
      text: input.text,
    });

    return { ok: true };
  } catch (err) {
    console.error("[FORM EMAIL] Gmail:", err);
    const message = err instanceof Error ? err.message : "Gmail slanje nije uspelo.";
    return { ok: false, status: 502, error: gmailErrorMessage(message) };
  }
}

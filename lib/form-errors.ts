import type { ZodError } from "zod";

export function zodFieldErrors(error: ZodError): Record<string, string> {
  return Object.fromEntries(
    error.issues
      .filter((issue) => issue.path[0] !== undefined)
      .map((issue) => [String(issue.path[0]), issue.message])
  );
}

export function resendErrorMessage(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("only send") || lower.includes("your own email")) {
    return "Resend dozvoljava slanje samo na email vašeg naloga dok domen nije verifikovan. Postavite CONTACT_EMAIL na taj email ili verifikujte domen.";
  }
  if (lower.includes("api key") || lower.includes("unauthorized")) {
    return "Resend API ključ nije ispravan. Proverite RESEND_API_KEY na Vercel-u.";
  }
  return "Email nije poslat. Pokušajte ponovo ili nas pozovite.";
}

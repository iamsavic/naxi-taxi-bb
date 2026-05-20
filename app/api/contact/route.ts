import { NextRequest, NextResponse } from "next/server";
import { zodFieldErrors } from "@/lib/form-errors";
import { sendFormEmail } from "@/lib/send-form-email";
import { contactSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Previše zahteva. Pokušajte ponovo za 15 minuta." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan zahtev." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: zodFieldErrors(parsed.error) }, { status: 400 });
  }

  const data = parsed.data;

  if (process.env.NODE_ENV === "development") {
    console.log("[CONTACT FORM]", data);
    return NextResponse.json({ success: true });
  }

  try {
    const result = await sendFormEmail({
      subject: `Nova poruka od ${data.name}`,
      text: `Ime: ${data.name}\nTelefon: ${data.phone}\nEmail: ${data.email || "/"}\n\nPoruka:\n${data.message}`,
      replyTo: data.email || undefined,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[CONTACT FORM]", err);
    const message = err instanceof Error ? err.message : "Greška pri slanju poruke.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

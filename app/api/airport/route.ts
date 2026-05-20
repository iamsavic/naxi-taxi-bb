import { NextRequest, NextResponse } from "next/server";
import { CONTACT_FORM_EMAIL, RESEND_FROM_EMAIL } from "@/lib/contact-email";
import { airportSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(ip);
  if (!success) return NextResponse.json({ error: "Previše zahteva." }, { status: 429 });

  try {
    const body = await request.json();
    const data = airportSchema.parse(body);

    if (process.env.NODE_ENV === "development") {
      console.log("[AIRPORT FORM]", data);
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: CONTACT_FORM_EMAIL,
      subject: `Aerodromska vožnja — ${data.name}`,
      text: `Ime: ${data.name}\nTelefon: ${data.phone}\nAdresa polaska: ${data.pickup}\nDatum: ${data.date}\nVreme: ${data.time}\nBr. putnika: ${data.passengers}\nBr. kofera: ${data.luggage}\nNapomena: ${data.note || "/"}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Greška pri slanju." }, { status: 400 });
  }
}

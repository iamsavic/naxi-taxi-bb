import { NextRequest, NextResponse } from "next/server";
import { CONTACT_FORM_EMAIL } from "@/lib/contact-email";
import { businessSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(ip);
  if (!success) return NextResponse.json({ error: "Previše zahteva." }, { status: 429 });

  try {
    const body = await request.json();
    const data = businessSchema.parse(body);

    if (process.env.NODE_ENV === "development") {
      console.log("[BUSINESS INQUIRY]", data);
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Naxi Taxi BB <noreply@naxitaxibb.rs>",
      to: CONTACT_FORM_EMAIL,
      subject: `Poslovni upit — ${data.company}`,
      text: `Firma: ${data.company}\nKontakt: ${data.contactPerson}\nTelefon: ${data.phone}\nEmail: ${data.email}\n\nPoruka:\n${data.message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Greška pri slanju." }, { status: 400 });
  }
}

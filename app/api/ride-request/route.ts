import { NextRequest, NextResponse } from "next/server";
import { rideRequestSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(ip);
  if (!success) return NextResponse.json({ error: "Previše zahteva." }, { status: 429 });

  try {
    const body = await request.json();
    const data = rideRequestSchema.parse(body);

    if (process.env.NODE_ENV === "development") {
      console.log("[RIDE REQUEST]", data);
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Naxi Taxi BB <noreply@naxitaxibb.rs>",
      to: process.env.CONTACT_EMAIL!,
      subject: `Zahtev za vožnju — ${data.name}`,
      text: `Ime: ${data.name}\nTelefon: ${data.phone}\nPolazak: ${data.pickup}\nDestinacija: ${data.destination}\nDatum: ${data.date}\nVreme: ${data.time}\nNapomena: ${data.note || "/"}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Greška pri slanju." }, { status: 400 });
  }
}

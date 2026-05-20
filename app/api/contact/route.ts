import { NextRequest, NextResponse } from "next/server";
import { CONTACT_FORM_EMAIL, RESEND_FROM_EMAIL } from "@/lib/contact-email";
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

  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (process.env.NODE_ENV === "development") {
      console.log("[CONTACT FORM]", data);
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: CONTACT_FORM_EMAIL,
      subject: `Nova poruka od ${data.name}`,
      text: `Ime: ${data.name}\nTelefon: ${data.phone}\nEmail: ${data.email || "/"}\n\nPoruka:\n${data.message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Greška pri slanju poruke." }, { status: 400 });
  }
}

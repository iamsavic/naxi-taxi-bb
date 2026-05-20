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

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: zodFieldErrors(parsed.error) }, { status: 400 });
    }

    const data = parsed.data;

    if (process.env.NODE_ENV === "development") {
      console.log("[CONTACT FORM]", data);
      return NextResponse.json({ success: true });
    }

    const result = await sendFormEmail({
      subject: `Nova poruka od ${data.name}`,
      text: `Ime: ${data.name}\nTelefon: ${data.phone}\nEmail: ${data.email || "/"}\n\nPoruka:\n${data.message}`,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Greška pri slanju poruke." }, { status: 400 });
  }
}

import { NextResponse } from "next/server";

const getDeskEmail = () =>
  process.env.CONTACT_EMAIL ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  "zahidhussainpsr@gmail.com";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please provide your name, email, and message." },
        { status: 400 }
      );
    }

    const deskEmail = getDeskEmail();
    const payload = {
      to: deskEmail,
      from: email,
      name,
      subject: subject || "Zahid Trader website inquiry",
      message,
      receivedAt: new Date().toISOString(),
    };

    const resendKey = process.env.RESEND_API_KEY;
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "Zahid Trader Desk <onboarding@resend.dev>";

    if (!resendKey) {
      if (process.env.NODE_ENV === "development") {
        console.info("[contact] Message queued for desk:", payload);
        return NextResponse.json({
          success: true,
          message:
            "Development mode: message logged for the desk. Configure RESEND_API_KEY on Vercel to deliver to your inbox.",
        });
      }

      return NextResponse.json(
        {
          error: `Live email delivery is not configured yet. Please email ${deskEmail} directly or message us on WhatsApp.`,
        },
        { status: 503 }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [deskEmail],
        reply_to: email,
        subject: `[Contact] ${payload.subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend delivery failed:", err);
      return NextResponse.json(
        {
          error: `Could not deliver your message. Please email ${deskEmail} directly or use WhatsApp.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Your message has been delivered to the Zahid Trader desk. We will respond within 24 hours.",
    });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

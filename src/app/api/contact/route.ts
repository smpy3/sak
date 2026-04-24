/* Route handler that receives the contact form and emails it to the configured inbox. */
import { contactSchema } from "@/lib/contact";
import { sendContactEmail } from "@/lib/sendContactEmail";

const recent = new Map<string, number>();

function getClientKey(request: Request) {
  // Basic key to limit spam; good enough for a portfolio site.
  const xff = request.headers.get("x-forwarded-for");
  const ip = xff?.split(",")[0]?.trim() || "unknown";
  const ua = request.headers.get("user-agent") || "unknown";
  return `${ip}:${ua.slice(0, 60)}`;
}

export async function POST(request: Request) {
  try {
    const key = getClientKey(request);
    const now = Date.now();
    const last = recent.get(key) ?? 0;
    if (now - last < 25_000) {
      return Response.json(
        { ok: false, message: "Please wait a few seconds and try again." },
        { status: 429 },
      );
    }
    recent.set(key, now);

    const body = await request.json().catch(() => null);
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { ok: false, message: "Invalid form data." },
        { status: 400 },
      );
    }

    // Honeypot: if filled, treat as spam (still return OK to not help bots).
    if (parsed.data.website && parsed.data.website.length > 0) {
      return Response.json({ ok: true, message: "Thanks — we’ll reply soon." });
    }

    await sendContactEmail(parsed.data);

    return Response.json({
      ok: true,
      message: "Sent. We’ll reply with options shortly.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error.";
    return Response.json(
      {
        ok: false,
        message:
          message.includes("Missing env:")
            ? "Email is not configured yet. Set SMTP env vars and try again."
            : "Server error. Please try again later.",
      },
      { status: 500 },
    );
  }
}


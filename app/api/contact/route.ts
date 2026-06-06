import { NextRequest, NextResponse } from "next/server";

// ── Rate limiting (in-memory, resets on server restart) ──
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 hour
  const max = 5; // max 5 emails per hour per IP

  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

// ── Validation ──
function validate(data: unknown): { ok: boolean; error?: string } {
  if (!data || typeof data !== "object") return { ok: false, error: "Invalid request body" };
  const { name, email, message } = data as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length < 2)
    return { ok: false, error: "Name must be at least 2 characters" };
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Valid email required" };
  if (!message || typeof message !== "string" || message.trim().length < 10)
    return { ok: false, error: "Message must be at least 10 characters" };
  if (name.length > 100 || email.length > 200 || message.length > 2000)
    return { ok: false, error: "Input too long" };

  return { ok: true };
}

export async function POST(req: NextRequest) {
  try {
    // Get IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown";

    // Rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    // Parse body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Validate
    const validation = validate(body);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { name, email, message } = body as { name: string; email: string; message: string };

    // ── Send email via Nodemailer ──
    // Install: npm install nodemailer @types/nodemailer
    // Set env vars: EMAIL_USER, EMAIL_PASS, EMAIL_TO
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const nodemailer = await import("nodemailer");

        const transporter = nodemailer.createTransport({
          service: "gmail", // or 'outlook', 'yahoo', or use host/port for custom SMTP
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Use Gmail App Password, not your real password
          },
        });

        await transporter.sendMail({
          from: `"Zewin Group" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
          replyTo: email,
          subject: `New message from ${name} — Zewin Group`,
          html: `
            <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #0c1015; color: #e8eaf0; border-radius: 16px; overflow: hidden;">
              <div style="padding: 32px; background: linear-gradient(135deg, #4f8ef722, #a78bfa11); border-bottom: 1px solid #232d3d;">
                <h1 style="font-size: 24px; margin: 0; font-weight: 700;">New Portfolio Message</h1>
                <p style="margin: 8px 0 0; color: #6b7685; font-size: 14px;">From Zewin Group Contact Form</p>
              </div>
              <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #232d3d; color: #6b7685; font-size: 13px; width: 80px;">From</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #232d3d; font-size: 15px; font-weight: 500;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #232d3d; color: #6b7685; font-size: 13px;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #232d3d; font-size: 15px;">
                      <a href="mailto:${email}" style="color: #4f8ef7;">${email}</a>
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 24px;">
                  <p style="color: #6b7685; font-size: 13px; margin-bottom: 10px;">Message</p>
                  <div style="background: #161b22; border: 1px solid #232d3d; border-radius: 12px; padding: 16px; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
                </div>
                <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #232d3d;">
                  <a href="mailto:${email}?subject=Re: Your message to KurdCod" style="display: inline-block; padding: 10px 22px; background: linear-gradient(135deg, #4f8ef7, #a78bfa); color: #fff; text-decoration: none; border-radius: 99px; font-size: 13px; font-weight: 600;">Reply to ${name}</a>
                </div>
              </div>
              <div style="padding: 16px 32px; background: #161b22; font-size: 12px; color: #6b7685; text-align: center;">
                Sent from zewin.dev portfolio · ${new Date().toLocaleString()}
              </div>
            </div>
          `,
          text: `New message from ${name} (${email}):\n\n${message}`,
        });
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
        // Don't fail the request — log and continue
      }
    }

    // Log to console (always)
    console.log(`[Contact] ${new Date().toISOString()} — ${name} <${email}>`);

    return NextResponse.json({
      success: true,
      message: "Message received! I'll get back to you within 24 hours.",
    });

  } catch (err) {
    console.error("[Contact API] Error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "POST /api/contact" });
}

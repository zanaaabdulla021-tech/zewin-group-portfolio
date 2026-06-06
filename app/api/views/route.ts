import { NextRequest, NextResponse } from "next/server";

// In-memory view counter (resets on server restart)
// For production: use Redis/Vercel KV/database
const views: Record<string, number> = {};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "/";

  return NextResponse.json({
    page,
    views: views[page] ?? 0,
    total: Object.values(views).reduce((a, b) => a + b, 0),
    all: views,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();
    if (!page || typeof page !== "string") {
      return NextResponse.json({ error: "page required" }, { status: 400 });
    }

    const clean = page.slice(0, 100); // max length
    views[clean] = (views[clean] ?? 0) + 1;

    return NextResponse.json({ page: clean, views: views[clean] });
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}

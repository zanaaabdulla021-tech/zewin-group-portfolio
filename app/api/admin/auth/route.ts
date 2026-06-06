import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const correct = process.env.ADMIN_PASSWORD ?? "admin123";

    if (password !== correct) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    const secret = process.env.ADMIN_SECRET ?? "kurdcod_admin_2025";
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_session", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_session");
  return res;
}

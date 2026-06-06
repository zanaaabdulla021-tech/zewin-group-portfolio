import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/app/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured  = searchParams.get("featured");
  const id        = searchParams.get("id");

  let result = [...projects];

  if (id) {
    const project = result.find((p) => p.id === id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: project });
  }

  if (category && category !== "all") {
    result = result.filter((p) => p.category === category);
  }

  if (featured === "true") {
    result = result.filter((p) => p.featured);
  }

  return NextResponse.json({
    data: result,
    total: result.length,
  });
}

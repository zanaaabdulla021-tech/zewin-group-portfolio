import { NextRequest, NextResponse } from "next/server";
import { blogPosts } from "@/app/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id  = searchParams.get("id");
  const tag = searchParams.get("tag");

  if (id) {
    const post = blogPosts.find((p) => p.id === id);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: post });
  }

  let result = [...blogPosts];

  if (tag) {
    result = result.filter((p) => p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()));
  }

  // Don't send full content in list view
  const list = result.map(({ content: _, ...rest }) => rest);

  return NextResponse.json({ data: list, total: list.length });
}

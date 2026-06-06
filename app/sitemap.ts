import { MetadataRoute } from "next";
import { projects, blogPosts } from "@/app/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zewin.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/#about`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#projects`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/#skills`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#blog`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/#contact`,  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];

  return staticPages;
}

import type { MetadataRoute } from "next";
import { getServices } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const services = await getServices();
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/services`, priority: 0.9 },
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, priority: 0.8 })),
    { url: `${base}/about`, priority: 0.6 },
    { url: `${base}/contact`, priority: 0.7 },
  ];
}

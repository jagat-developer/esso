import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/business";
import { allRoutePaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-22");

  return allRoutePaths().map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.82,
  }));
}

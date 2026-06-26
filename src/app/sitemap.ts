import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/business";
import { allRoutePaths } from "@/lib/seo";
import { listBlogs } from "@/lib/upliftai";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-06-22");
  const blogResult = await listBlogs({
    limit: 100,
    status: "PUBLISH",
  });

  const staticRoutes: MetadataRoute.Sitemap = allRoutePaths().map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.82,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogResult.blogs.map((blog) => ({
    url: new URL(`/blog/${blog.slug}`, siteConfig.url).toString(),
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : lastModified,
    changeFrequency: "monthly",
    priority: 0.76,
  }));

  return [...staticRoutes, ...blogRoutes];
}

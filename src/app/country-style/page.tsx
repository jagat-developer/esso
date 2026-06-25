import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page-template";
import { servicePages } from "@/data/business";
import { pageMetadata } from "@/lib/seo";

const page = servicePages.find((item) => item.slug === "country-style")!;
const path = `/${page.slug}`;

export const metadata: Metadata = pageMetadata(page, path);

export default function CountryStylePage() {
  return <ServicePageTemplate page={page} path={path} />;
}

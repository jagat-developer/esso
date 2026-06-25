import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page-template";
import { servicePages } from "@/data/business";
import { pageMetadata } from "@/lib/seo";

const page = servicePages.find(
  (item) => item.slug === "gas-station-whitchurch-stouffville",
)!;
const path = `/${page.slug}`;

export const metadata: Metadata = pageMetadata(page, path);

export default function GasStationPage() {
  return <ServicePageTemplate page={page} path={path} />;
}

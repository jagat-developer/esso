import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page-template";
import { offerPage } from "@/data/business";
import { pageMetadata } from "@/lib/seo";

const path = `/offers/${offerPage.slug}`;

export const metadata: Metadata = pageMetadata(offerPage, path);

export default function FreeDrinkWithGasOfferPage() {
  return <ServicePageTemplate page={offerPage} path={path} isOffer />;
}

import type { Metadata } from "next";
import {
  allPages,
  businessProfile,
  homeFaq,
  offerPage,
  ServicePage,
  siteConfig,
} from "@/data/business";

const address = businessProfile.address;

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.url).toString();
}

export function pageMetadata(page: ServicePage, path: string): Metadata {
  const url = absoluteUrl(path);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: path,
    },
    keywords: page.seoKeywords,
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: businessProfile.name,
      type: "website",
      locale: "en_CA",
      images: [
        {
          url: page.image.src,
          width: 1200,
          height: 630,
          alt: page.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image.src],
    },
  };
}

export function localBusinessSchema(page?: ServicePage) {
  const schemaType = page?.schemaType ?? "GasStation";

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${siteConfig.url}/#business`,
    name: businessProfile.name,
    legalName: businessProfile.legalName,
    alternateName: businessProfile.alternateNames,
    url: siteConfig.url,
    email: businessProfile.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessProfile.coordinates.latitude,
      longitude: businessProfile.coordinates.longitude,
    },
    areaServed: [
      "Whitchurch-Stouffville",
      "Stouffville",
      "Bloomington Road",
      "Highway 48",
    ],
    openingHours: "Mo-Su 00:00-23:59",
    hasMap: businessProfile.mapUrl,
    amenityFeature: [
      "24 Hour Pay at the Pump",
      "Air Pump",
      "Vacuum",
      "ATM",
      "Retail Diesel",
      "DEF",
      "Key to the Highway",
      "Esso Fleet",
      "Premium Gasoline",
      "Parking",
      "LCBO Convenience",
      "Beer Store",
      "Bloomington Convenience Store",
      "Country Style",
      "Free Coffee",
      "Free Water",
      "Free Can of Pop",
      "Donuts",
      "Sandwiches",
      "Bagels",
      "Samosas",
      "Patties",
      "Indian Chai",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    sameAs: businessProfile.sourceUrls,
  };
}

export function faqSchema(
  items: Array<{
    question: string;
    answer: string;
  }> = homeFaq,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  crumbs: Array<{
    name: string;
    url: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function offerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: offerPage.title,
    description: offerPage.description,
    availability: "https://schema.org/LimitedAvailability",
    eligibleTransactionVolume: {
      "@type": "PriceSpecification",
      description: "Gas purchase required. Ask in store for current terms.",
    },
    offeredBy: {
      "@id": `${siteConfig.url}/#business`,
    },
  };
}

export function allRoutePaths() {
  return [
    "/",
    "/blog",
    "/directions",
    ...allPages.map((page) =>
      page.slug === offerPage.slug ? `/offers/${page.slug}` : `/${page.slug}`,
    ),
  ];
}

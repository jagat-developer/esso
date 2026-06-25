import type { Metadata } from "next";
import { ArrowRight, Clock3, MapPin, Navigation, Phone } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animated";
import { JsonLd } from "@/components/json-ld";
import { MapEmbed } from "@/components/map-embed";
import { businessProfile } from "@/data/business";
import {
  absoluteUrl,
  breadcrumbSchema,
  localBusinessSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Directions to Esso Bloomington",
  description:
    "Get directions to Esso Bloomington, LCBO Bloomington, and Country Style at 5241 Bloomington Rd, Stouffville, ON L4A 7X3 near Highway 48.",
  alternates: {
    canonical: "/directions",
  },
};

export default function DirectionsPage() {
  const address = businessProfile.address;

  return (
    <main>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Directions", url: absoluteUrl("/directions") },
        ])}
      />
      <section className="site-shell grid min-h-[72vh] items-center gap-10 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:py-18">
        <FadeIn>
          <div className="eyebrow">Directions</div>
          <h1 className="display-type mt-6 max-w-[11ch] text-5xl font-black leading-[0.96] sm:text-7xl">
            Route to Esso Bloomington.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#625a50]">
            Find Esso Bloomington, LCBO Bloomington, and Country Style at{" "}
            {address.street}, {address.locality}, {address.region}{" "}
            {address.postalCode}, near {businessProfile.intersection}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={businessProfile.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#17130f] px-6 text-sm font-black text-white shadow-xl shadow-black/10 hover:bg-[#004a98]"
            >
              Open Google Maps
              <Navigation size={17} aria-hidden="true" />
            </a>
            <a
              href={`tel:${businessProfile.phone}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 text-sm font-black text-[#17130f] hover:bg-white"
            >
              Call first
              <Phone size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              ["Fuel", "24-hour access listed by Esso"],
              ["LCBO", "Hours may vary; verify in store"],
              ["Diesel", "Commercial cardlock diesel, DEF, and fleet programs listed by client"],
              ["Offer", "Ask in store for current terms"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[8px] border border-black/10 bg-white/72 p-4"
              >
                <div className="text-sm font-black text-[#17130f]">
                  {label}
                </div>
                <div className="mt-1 text-sm font-medium text-[#625a50]">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <MapEmbed
            title="Directions map to Esso Bloomington"
            className="[&_.map-embed]:min-h-[560px]"
          />
        </FadeIn>
      </section>

      <section className="section-pad bg-[#fffdf8]/64">
        <div className="site-shell grid gap-5 md:grid-cols-3">
          {[
            {
              icon: MapPin,
              title: "Address",
              text: `${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`,
            },
            {
              icon: Clock3,
              title: "Fuel hours",
              text: "Fuel is listed as available 24 hours by the official Esso station page.",
            },
            {
              icon: Navigation,
              title: "Cross roads",
              text: businessProfile.intersection,
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn
                key={item.title}
                delay={index * 0.05}
                className="premium-card rounded-[8px] p-6"
              >
                <Icon size={24} className="text-[#e1251b]" aria-hidden="true" />
                <h2 className="mt-6 text-xl font-black text-[#17130f]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm font-medium leading-7 text-[#625a50]">
                  {item.text}
                </p>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="section-pad">
        <div className="site-shell rounded-[8px] bg-[#17130f] p-6 text-white sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="display-type text-4xl font-black">
                More than directions.
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/70">
                View the full service pages for gas, commercial cardlock diesel,
                parking, LCBO Bloomington, Country Style, and the current
                in-store offer.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#17130f]"
            >
              Explore the website
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

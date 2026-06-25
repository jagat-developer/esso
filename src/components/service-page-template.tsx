import { ArrowRight, CheckCircle2, Mail, MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animated";
import { ImageCard } from "@/components/image-card";
import { JsonLd } from "@/components/json-ld";
import { MapEmbed } from "@/components/map-embed";
import { businessProfile, ServicePage } from "@/data/business";
import {
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  offerSchema,
} from "@/lib/seo";

export function ServicePageTemplate({
  page,
  path,
  isOffer = false,
}: {
  page: ServicePage;
  path: string;
  isOffer?: boolean;
}) {
  const Icon = page.icon;

  return (
    <main>
      <JsonLd data={localBusinessSchema(page)} />
      <JsonLd data={faqSchema(page.faq)} />
      {isOffer ? <JsonLd data={offerSchema()} /> : null}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: page.title, url: absoluteUrl(path) },
        ])}
      />

      <section className="site-shell grid min-h-[72vh] items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-18">
        <FadeIn>
          <div className="eyebrow">{page.eyebrow}</div>
          <h1 className="display-type mt-6 max-w-[12ch] text-5xl font-black leading-[0.96] sm:text-7xl">
            {page.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#625a50]">
            {page.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={businessProfile.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#17130f] px-6 text-sm font-black text-white shadow-xl shadow-black/10 transition-colors hover:bg-[#004a98]"
            >
              Open Google Maps
              <Navigation size={17} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${businessProfile.email}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 text-sm font-black text-[#17130f] transition-colors hover:bg-white"
            >
              Email store
              <Mail size={17} aria-hidden="true" />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <ImageCard
            image={page.image}
            label={page.navLabel}
            priority
            className="h-[34rem]"
          />
        </FadeIn>
      </section>

      <section className="section-pad bg-[#fffdf8]/64">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeIn>
            <div
              className="grid h-14 w-14 place-items-center rounded-[8px] text-white shadow-xl shadow-black/10"
              style={{ backgroundColor: page.color }}
            >
              <Icon size={28} aria-hidden="true" />
            </div>
            <h2 className="display-type mt-6 text-4xl font-black leading-tight sm:text-5xl">
              Why this page ranks and helps customers.
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-[#625a50]">
              The page targets local service intent while staying honest about
              verified facts and client-provided details.
            </p>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.highlights.map((item, index) => (
              <FadeIn
                key={item}
                delay={index * 0.04}
                className="premium-card rounded-[8px] p-5"
              >
                <CheckCircle2
                  size={22}
                  className="text-[#e1251b]"
                  aria-hidden="true"
                />
                <div className="mt-5 text-base font-black text-[#17130f]">
                  {item}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <MapEmbed title={`Map for ${page.title}`} />
          </FadeIn>
          <FadeIn delay={0.08} className="flex flex-col justify-center">
            <div className="eyebrow">Address</div>
            <h2 className="display-type mt-5 text-4xl font-black leading-tight">
              5241 Bloomington Road, Stouffville.
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-[#625a50]">
              Esso Bloomington sits near {businessProfile.intersection}, making
              it a useful stop for local customers, route traffic, and drivers
              moving through Whitchurch-Stouffville.
            </p>
            <Link
              href="/directions"
              className="mt-7 inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-[#17130f] px-6 text-sm font-black text-white hover:bg-[#004a98]"
            >
              Full directions page
              <MapPin size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad bg-[#fffdf8]/64">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeIn>
            <div className="eyebrow">FAQ</div>
            <h2 className="display-type mt-5 text-4xl font-black leading-tight sm:text-5xl">
              Common questions about {page.navLabel.toLowerCase()}.
            </h2>
          </FadeIn>
          <div className="grid gap-3">
            {page.faq.map((item, index) => (
              <FadeIn
                key={item.question}
                delay={index * 0.04}
                className="rounded-[8px] border border-black/10 bg-white/72 p-5"
              >
                <h3 className="text-base font-black text-[#17130f]">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm font-medium leading-7 text-[#625a50]">
                  {item.answer}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-shell rounded-[8px] bg-[#17130f] p-6 text-white shadow-2xl shadow-black/20 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.14em] text-white/50">
                Next stop
              </div>
              <h2 className="display-type mt-3 text-4xl font-black">
                Make Esso Bloomington part of the route.
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/70">
                Fuel, retail diesel, DEF, LCBO Bloomington, Country
                Style, parking, and practical convenience at one address.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#17130f]"
            >
              Back home
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
